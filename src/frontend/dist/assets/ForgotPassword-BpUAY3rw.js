import { r as reactExports, j as jsxRuntimeExports, m as motion, L as Link, i as CircleCheck } from "./index-Dpq2E7IO.js";
import { B as Button } from "./button-Cfz4lVsS.js";
import { L as Label, I as Input } from "./input-ndI6bRbf.js";
import { s as staggerContainer, a as staggerItem } from "./motion-DSc3ayC3.js";
import { A as ArrowLeft } from "./arrow-left-BCNZdNCL.js";
import { M as Mail } from "./mail-DIoUC0NZ.js";
function ForgotPassword() {
  const [email, setEmail] = reactExports.useState("");
  const [sent, setSent] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const submit = (event) => {
    event.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      setError("Enter the email address associated with your account.");
      return;
    }
    setError("");
    setSent(true);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-gradient-subtle px-4 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      variants: staggerContainer,
      initial: "hidden",
      animate: "visible",
      className: "w-full max-w-md rounded-[calc(var(--radius)+4px)] border border-border/60 bg-card p-8 shadow-elevated-lg",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { variants: staggerItem, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/login",
            className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-smooth hover:text-primary",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "size-4" }),
              "Back to sign in"
            ]
          }
        ) }),
        sent ? /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { variants: staggerItem, className: "mt-8 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-auto grid size-14 place-items-center rounded-full bg-success/12 text-success", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "size-7" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 font-display text-2xl font-bold tracking-tight", children: "Check your inbox" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-sm leading-relaxed text-muted-foreground", children: [
            "We have sent a password reset link to",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: email }),
            ". The link expires in thirty minutes."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "secondary",
              className: "mt-6 w-full",
              onClick: () => setSent(false),
              "data-ocid": "forgot_password.retry_button",
              children: "Use a different email"
            }
          )
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { variants: staggerItem, className: "mt-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold tracking-tight", children: "Reset your password" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm leading-relaxed text-muted-foreground", children: "Enter your email address and we will send you a link to choose a new password." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.form,
            {
              variants: staggerItem,
              onSubmit: submit,
              className: "mt-6 space-y-5",
              noValidate: true,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "reset-email", children: "Email address" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "reset-email",
                        type: "email",
                        autoComplete: "email",
                        value: email,
                        onChange: (event) => setEmail(event.target.value),
                        placeholder: "you@company.com",
                        className: "pl-10",
                        "data-ocid": "forgot_password.email_input"
                      }
                    )
                  ] })
                ] }),
                error ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    role: "alert",
                    "data-ocid": "forgot_password.error_state",
                    className: "rounded-lg border border-destructive/30 bg-destructive/10 px-3.5 py-2.5 text-sm text-destructive",
                    children: error
                  }
                ) : null,
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "submit",
                    size: "lg",
                    className: "w-full",
                    "data-ocid": "forgot_password.submit_button",
                    children: "Send reset link"
                  }
                )
              ]
            }
          )
        ] })
      ]
    }
  ) });
}
export {
  ForgotPassword as default
};
