"use server";

import mailchimp, {
  type Status,
  ErrorResponse,
} from "@mailchimp/mailchimp_marketing";

function isVariableDefined(variable: unknown): variable is string {
  return !!variable && typeof variable === "string";
}

function isMemberErrorResponse(error: any): error is ErrorResponse {
  return !!(error as any).status;
}

interface SubscribeToNewsletterActionData {
  email: string;
  firstName?: string;
}

interface SubscribeToNewsletterActionReturn {
  success: boolean;
  error?: string;
}

export async function subscribeToNewsletterAction(
  data: SubscribeToNewsletterActionData
): Promise<SubscribeToNewsletterActionReturn> {
  const { MAILCHIMP_AUDIENCE_ID, MAILCHIMP_API_KEY, MAILCHIMP_SERVER } =
    process.env;

  console.log(
    "HERE",
    MAILCHIMP_AUDIENCE_ID,
    MAILCHIMP_API_KEY,
    MAILCHIMP_SERVER
  );

  if (!isVariableDefined(MAILCHIMP_AUDIENCE_ID)) {
    throw new Error("MAILCHIMP_AUDIENCE_ID is not defined");
  }

  if (!isVariableDefined(MAILCHIMP_API_KEY)) {
    throw new Error("MAILCHIMP_API_KEY is not defined");
  }

  if (!isVariableDefined(MAILCHIMP_SERVER)) {
    throw new Error("MAILCHIMP_SERVER is not defined");
  }

  const options = {
    email_address: data.email,
    merge_fields: {
      FNAME: data?.firstName || undefined,
    },
    status: "subscribed" as Status,
  };

  mailchimp.setConfig({
    apiKey: MAILCHIMP_API_KEY,
    server: MAILCHIMP_SERVER,
  });

  try {
    await mailchimp.lists.addListMember(MAILCHIMP_AUDIENCE_ID, options);

    return { success: true };
  } catch (error) {
    if (isMemberErrorResponse(error)) {
      return { success: false, error: "Members already exist" };
    }

    return {
      success: false,
      error: "Unexpected error while adding member to newsletter",
    };
  }
}
