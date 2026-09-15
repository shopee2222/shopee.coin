"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { CheckCircle2, AlertCircle, Send, Loader2 } from "lucide-react"
import { submitContact, type ContactState } from "./actions"

const initialState: ContactState = { status: "idle", message: "" }

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? (
        <>
          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          Sending...
        </>
      ) : (
        <>
          <Send className="size-4" aria-hidden="true" />
          Send message
        </>
      )}
    </button>
  )
}

function FieldError({ id, error }: { id: string; error?: string }) {
  if (!error) return null
  return (
    <p id={id} className="mt-1.5 text-xs font-medium text-destructive">
      {error}
    </p>
  )
}

export function ContactForm() {
  const [state, formAction] = useActionState(submitContact, initialState)

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-center gap-4 rounded-lg border border-border bg-card p-8 text-center"
      >
        <span className="flex size-14 items-center justify-center rounded-full bg-accent text-accent-foreground">
          <CheckCircle2 className="size-7" aria-hidden="true" />
        </span>
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-card-foreground">Message sent</h2>
          <p className="text-sm text-muted-foreground text-pretty">{state.message}</p>
        </div>
      </div>
    )
  }

  return (
    <form action={formAction} noValidate className="space-y-5">
      {state.status === "error" && !state.errors && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          <span>{state.message}</span>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Jane Doe"
            aria-invalid={Boolean(state.errors?.name)}
            aria-describedby={state.errors?.name ? "name-error" : undefined}
            className="w-full rounded-md border border-input bg-card px-3 py-2.5 text-sm text-card-foreground placeholder:text-muted-foreground transition-colors focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/40 aria-[invalid=true]:border-destructive"
          />
          <FieldError id="name-error" error={state.errors?.name} />
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="jane@example.com"
            aria-invalid={Boolean(state.errors?.email)}
            aria-describedby={state.errors?.email ? "email-error" : undefined}
            className="w-full rounded-md border border-input bg-card px-3 py-2.5 text-sm text-card-foreground placeholder:text-muted-foreground transition-colors focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/40 aria-[invalid=true]:border-destructive"
          />
          <FieldError id="email-error" error={state.errors?.email} />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="mb-1.5 block text-sm font-medium">
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          placeholder="How can we help?"
          aria-invalid={Boolean(state.errors?.subject)}
          aria-describedby={state.errors?.subject ? "subject-error" : undefined}
          className="w-full rounded-md border border-input bg-card px-3 py-2.5 text-sm text-card-foreground placeholder:text-muted-foreground transition-colors focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/40 aria-[invalid=true]:border-destructive"
        />
        <FieldError id="subject-error" error={state.errors?.subject} />
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Tell us a little about what you need..."
          aria-invalid={Boolean(state.errors?.message)}
          aria-describedby={state.errors?.message ? "message-error" : undefined}
          className="w-full resize-y rounded-md border border-input bg-card px-3 py-2.5 text-sm text-card-foreground placeholder:text-muted-foreground transition-colors focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/40 aria-[invalid=true]:border-destructive"
        />
        <FieldError id="message-error" error={state.errors?.message} />
      </div>

      <SubmitButton />
    </form>
  )
}
