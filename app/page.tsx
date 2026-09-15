import { Mail, MapPin, MessageSquare } from "lucide-react"
import { ContactForm } from "./contact-form"

export default function Page() {
  return (
    <main className="flex min-h-dvh items-center justify-center px-4 py-12 sm:py-16">
      <div className="w-full max-w-5xl">
        <div className="grid gap-8 overflow-hidden rounded-2xl border border-border bg-card shadow-sm lg:grid-cols-[1fr_1.25fr]">
          {/* Left: intro / context */}
          <aside className="flex flex-col justify-between gap-8 bg-gradient-to-br from-primary to-accent-foreground p-8 text-primary-foreground sm:p-10">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
                <MessageSquare className="size-3.5" aria-hidden="true" />
                Contact us
              </span>
              <h1 className="text-3xl font-bold tracking-tight text-balance">
                Let&apos;s start a conversation
              </h1>
              <p className="text-sm leading-relaxed text-primary-foreground/85 text-pretty">
                Questions, feedback, or a project in mind? Fill out the form and
                our team will get back to you within one business day.
              </p>
            </div>

            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-md bg-white/15">
                  <Mail className="size-4" aria-hidden="true" />
                </span>
                <span className="text-primary-foreground/90">hello@example.com</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-md bg-white/15">
                  <MapPin className="size-4" aria-hidden="true" />
                </span>
                <span className="text-primary-foreground/90">San Francisco, CA</span>
              </li>
            </ul>
          </aside>

          {/* Right: form */}
          <section className="p-8 sm:p-10" aria-label="Contact form">
            <ContactForm />
          </section>
        </div>
      </div>
    </main>
  )
}
