import { r as reactExports, f as useApp, u as useNavigate, j as jsxRuntimeExports, m as motion, L as Link, g as User, h as Briefcase, e as cn, a as BadgeCheck } from "./index-Dpq2E7IO.js";
import { B as Button } from "./button-Cfz4lVsS.js";
import { L as Label, I as Input } from "./input-ndI6bRbf.js";
import { s as staggerContainer, a as staggerItem } from "./motion-DSc3ayC3.js";
import { A as ArrowLeft } from "./arrow-left-BCNZdNCL.js";
const ACCOUNT_TYPES = [
  {
    value: "customer",
    label: "I need a professional",
    body: "Browse, book and manage sessions.",
    icon: User
  },
  {
    value: "professional",
    label: "I am a professional",
    body: "Offer services and manage bookings.",
    icon: Briefcase
  }
];
function Register() {
  const [accountType, setAccountType] = reactExports.useState(
    "customer"
  );
  const [name, setName] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [error, setError] = reactExports.useState("");
  const { setRole, pushToast } = useApp();
  const navigate = useNavigate();
  const submit = (event) => {
    event.preventDefault();
    if (!name.trim() || !email.trim() || password.length < 8) {
      setError(
        "Enter your name, a valid email address and a password of at least 8 characters."
      );
      return;
    }
    setError("");
    setRole(accountType);
    pushToast({
      title: "Account created",
      description: accountType === "professional" ? "Your professional portal is ready. Add your services next." : "Your customer account is ready. Start exploring professionals.",
      variant: "success"
    });
    navigate(accountType === "professional" ? "/pro" : "/app");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid min-h-screen lg:grid-cols-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center bg-background px-4 py-12 md:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        variants: staggerContainer,
        initial: "hidden",
        animate: "visible",
        className: "w-full max-w-md",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { variants: staggerItem, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/",
              className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-smooth hover:text-primary",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "size-4" }),
                "Back to home"
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { variants: staggerItem, className: "mt-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold tracking-tight", children: "Create your account" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm leading-relaxed text-muted-foreground", children: "Free to join. You only pay when you book a session." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.form,
            {
              variants: staggerItem,
              onSubmit: submit,
              className: "mt-8 space-y-5",
              noValidate: true,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("fieldset", { className: "space-y-2.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("legend", { className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground", children: "Account type" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-2.5 sm:grid-cols-2", children: ACCOUNT_TYPES.map((type) => {
                    const isActive = accountType === type.value;
                    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        "aria-pressed": isActive,
                        onClick: () => setAccountType(type.value),
                        "data-ocid": `register.${type.value}_button`,
                        className: cn(
                          "flex flex-col gap-1.5 rounded-[var(--radius)] border p-4 text-left transition-smooth",
                          isActive ? "border-primary bg-primary-soft ring-2 ring-ring/25" : "border-border/60 bg-card hover:border-primary/40"
                        ),
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            type.icon,
                            {
                              className: cn(
                                "size-4.5",
                                isActive ? "text-primary" : "text-muted-foreground"
                              )
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: type.label }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs leading-relaxed text-muted-foreground", children: type.body })
                        ]
                      },
                      type.value
                    );
                  }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "register-name", children: "Full name" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "register-name",
                      autoComplete: "name",
                      value: name,
                      onChange: (event) => setName(event.target.value),
                      placeholder: "Alex Morgan",
                      "data-ocid": "register.name_input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "register-email", children: "Email address" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "register-email",
                      type: "email",
                      autoComplete: "email",
                      value: email,
                      onChange: (event) => setEmail(event.target.value),
                      placeholder: "you@company.com",
                      "data-ocid": "register.email_input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "register-password", children: "Password" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "register-password",
                      type: "password",
                      autoComplete: "new-password",
                      value: password,
                      onChange: (event) => setPassword(event.target.value),
                      placeholder: "At least 8 characters",
                      "data-ocid": "register.password_input"
                    }
                  )
                ] }),
                error ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    role: "alert",
                    "data-ocid": "register.error_state",
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
                    "data-ocid": "register.submit_button",
                    children: "Create account"
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.p,
            {
              variants: staggerItem,
              className: "mt-6 text-center text-sm text-muted-foreground",
              children: [
                "Already have an account?",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/login",
                    className: "font-medium text-primary transition-smooth hover:underline",
                    children: "Sign in"
                  }
                )
              ]
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative hidden flex-col justify-between overflow-hidden bg-gradient-primary p-10 lg:flex", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "orb -right-20 top-10 size-72 bg-primary-foreground/20",
          "aria-hidden": "true"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "orb bottom-0 left-0 size-80 bg-primary-foreground/15",
          "aria-hidden": "true"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/",
          className: "relative inline-flex items-center gap-2 text-primary-foreground",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid size-9 place-items-center rounded-xl bg-primary-foreground/15 font-display text-sm font-bold backdrop-blur", children: "LA" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-lg font-bold tracking-tight", children: "LookApp" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold leading-tight text-primary-foreground", children: "Join a marketplace built on verification." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-6 space-y-3", children: [
          "Credentials checked before a profile goes live",
          "Transparent pricing on every service",
          "Funds held until the session is complete"
        ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "li",
          {
            className: "flex items-start gap-2.5 text-sm text-primary-foreground/90",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { className: "mt-0.5 size-4 shrink-0" }),
              item
            ]
          },
          item
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "relative text-xs text-primary-foreground/70", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " LookApp"
      ] })
    ] })
  ] });
}
export {
  Register as default
};
