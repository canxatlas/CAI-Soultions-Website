import { EstimationResult } from '@/components/ui/survey-modal';

interface GHLContact {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  companyName?: string;
  address1?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  website?: string;
  tags?: string[];
  source?: string;
}

interface GHLOpportunity {
  title: string;
  status: 'open' | 'won' | 'lost';
  stageId: string;
  monetaryValue?: number;
  source?: string;
  contactId: string;
  name?: string;
  companyName?: string;
  tags?: string[];
}

interface GHLNote {
  body: string;
  userId?: string;
}

interface GHLCustomValue {
  name: string;
  value: string;
}

interface SurveyData {
  role: string;
  companySize: string;
  useCase: string;
  budget: string;
  timeline: string;
  estimation?: EstimationResult;
}

// Custom field IDs for the survey
const CUSTOM_FIELD_IDS = {
  ROLE: 'role_field_id',
  COMPANY_SIZE: 'company_size_field_id',
  USE_CASE: 'use_case_field_id',
  BUDGET_RANGE: 'budget_range_field_id',
  IMPLEMENTATION_TIMELINE: 'implementation_timeline_field_id',
  ESTIMATED_MINUTES: 'estimated_minutes_field_id',
  ESTIMATED_COST: 'estimated_cost_field_id',
  ESTIMATED_AGENTS: 'estimated_agents_field_id',
};

export class GHLApi {
  private static baseUrl = 'https://rest.gohighlevel.com/v1';
  private static apiKey = process.env.NEXT_PUBLIC_GHL_API_KEY;
  private static pipelineId = process.env.NEXT_PUBLIC_GHL_PIPELINE_ID;
  private static defaultStageId = process.env.NEXT_PUBLIC_GHL_DEFAULT_STAGE_ID;

  private static async makeRequest(endpoint: string, method: string, data?: any) {
    const url = `${this.baseUrl}${endpoint}`;
    console.log('Making request to:', url);
    console.log('Request data:', data);

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.apiKey || '',
        },
        body: data ? JSON.stringify(data) : undefined,
      });

      const responseData = await response.json().catch(() => ({}));
      console.log('Response:', { status: response.status, data: responseData });

      if (!response.ok) {
        throw new Error(responseData.message || responseData.msg || `HTTP error! status: ${response.status}`);
      }

      return responseData;
    } catch (error) {
      console.error('GHL API Error:', error);
      throw error;
    }
  }

  private static async createCustomValue(customValue: GHLCustomValue) {
    return this.makeRequest(
      '/custom-values',
      'POST',
      customValue
    );
  }

  private static async createNote(contactId: string, note: GHLNote) {
    return this.makeRequest(
      `/contacts/${contactId}/notes/`,
      'POST',
      note
    );
  }

  static async createContact(contact: GHLContact) {
    // Make sure we have required fields
    if (!contact.email && !contact.phone) {
      throw new Error('Either email or phone is required');
    }

    // Set the full name if first and last name are provided
    if (contact.firstName && contact.lastName) {
      contact.name = `${contact.firstName} ${contact.lastName}`;
    }

    return this.makeRequest(
      '/contacts/',
      'POST',
      {
        ...contact,
        source: contact.source || 'Website Survey',
        tags: [...(contact.tags || []), 'Website Lead', 'Survey Completed'],
        country: contact.country || 'US',
      }
    );
  }

  static async createOpportunity(opportunity: GHLOpportunity) {
    if (!this.pipelineId) {
      throw new Error('Pipeline ID is required');
    }

    if (!opportunity.stageId) {
      throw new Error('Stage ID is required');
    }

    if (!opportunity.contactId) {
      throw new Error('Contact ID is required');
    }

    // Create opportunity in the pipeline
    const opportunityData = {
      title: opportunity.title || 'New Opportunity',
      status: opportunity.status || 'open',
      stageId: opportunity.stageId,
      monetaryValue: opportunity.monetaryValue,
      source: opportunity.source,
      contactId: opportunity.contactId,
      name: opportunity.name,
      companyName: opportunity.companyName,
      tags: opportunity.tags,
    };

    console.log('Sending opportunity data:', opportunityData);

    return this.makeRequest(
      `/pipelines/${this.pipelineId}/opportunities`,
      'POST',
      opportunityData
    );
  }

  static async submitSurvey(
    contact: GHLContact,
    surveyData: SurveyData
  ): Promise<{ success: boolean; contactId?: string; opportunityId?: string; error?: string }> {
    try {
      // Create contact first
      console.log('Creating contact:', contact);
      const contactResponse = await this.createContact(contact);
      console.log('Contact created:', contactResponse);

      if (!contactResponse.contact?.id) {
        throw new Error('Contact creation failed: No contact ID returned');
      }

      // Format survey data as a note
      const noteBody = `Website Contact Form Submission:
Name: ${contact.firstName} ${contact.lastName}
Email: ${contact.email}
Company: ${contact.companyName || 'Not provided'}

Message:
${surveyData.useCase}

Additional Information:
Role: ${surveyData.role}
Company Size: ${surveyData.companySize}
Budget Range: ${surveyData.budget}
Implementation Timeline: ${surveyData.timeline}
${surveyData.estimation ? `
Estimated Usage:
- Minutes per Month: ${surveyData.estimation.minutesPerMonth}
- Cost per Month: $${surveyData.estimation.costPerMonth}
- Agents Needed: ${surveyData.estimation.agentsNeeded}` : ''}`;

      // Create note for the contact
      console.log('Creating note for contact');
      await this.createNote(contactResponse.contact.id, { body: noteBody });

      // Create opportunity
      const opportunity: GHLOpportunity = {
        title: `${contact.firstName || ''} ${contact.lastName || ''} - Website Survey`,
        status: 'open',
        stageId: this.defaultStageId || '',
        monetaryValue: surveyData.estimation?.costPerMonth || 0,
        source: 'Website Survey',
        contactId: contactResponse.contact.id,
        name: contact.name,
        companyName: contact.companyName,
        tags: ['Website Lead', 'Survey Completed'],
      };

      console.log('Creating opportunity:', opportunity);
      const opportunityResponse = await this.createOpportunity(opportunity);
      console.log('Opportunity created:', opportunityResponse);

      return {
        success: true,
        contactId: contactResponse.contact.id,
        opportunityId: opportunityResponse.id,
      };
    } catch (error) {
      console.error('Error submitting survey to GHL:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to submit survey. Please try again.',
      };
    }
  }
} 