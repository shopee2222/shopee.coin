"use server"

export type ContactState = {
  status: "idle" | "success" | "error"
  message: string
  errors?: Partial<Record<"name" | "email" | "subject" | "message", string>>
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim()
  const email = String(formData.get("email") ?? "").trim()
  const subject = String(formData.get("subject") ?? "").trim()
  const message = String(formData.get("message") ?? "").trim()

  const errors: ContactState["errors"] = {}

  if (name.length < 2) errors.name = "Please enter your name."
  if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email address."
  if (subject.length < 3) errors.subject = "Subject must be at least 3 characters."
  if (message.length < 10) errors.message = "Message must be at least 10 characters."

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Please fix the highlighted fields and try again.",
      errors,
    }
  }

  // Simulate delivering the message (email/DB integration would go here).
  await new Promise((resolve) => setTimeout(resolve, 700))

  return {
    status: "success",
    message: `Thanks, ${name}! Your message has been sent. We'll reply to ${email} soon.`,
  }
}
