import { r as reactExports, f as useApp, u as useNavigate, j as jsxRuntimeExports, L as Link, a as BadgeCheck, m as motion } from "./index-Dpq2E7IO.js";
import { B as Button } from "./button-Cfz4lVsS.js";
import { L as Label, I as Input } from "./input-ndI6bRbf.js";
import { s as staggerContainer, a as staggerItem } from "./motion-DSc3ayC3.js";
import { A as ArrowLeft } from "./arrow-left-BCNZdNCL.js";
import { M as Mail } from "./mail-DIoUC0NZ.js";
import { L as Lock } from "./lock-COV5hqxd.js";
function Login() {
  const [email, setEmail] = reactExports.useState("alex.morgan@lookapp.io");
  const [password, setPassword] = reactExports.useState("lookapp-demo");
  const [error, setError] = reactExports.useState("");
  const { setRole, pushToast } = useApp();
  const navigate = useNavigate();
  const submit = (event) => {
    event.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Enter both your email address and password to continue.");
      return;
    }
    setError("");
    setRole("customer");
    pushToast({
      title: "Welcome back, Alex",
      description: "You are signed in to the customer experience.",
      variant: "success"
    });
    navigate("/app");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid min-h-screen lg:grid-cols-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative hidden flex-col justify-between overflow-hidden bg-gradient-primary p-10 lg:flex", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "orb -left-20 top-10 size-72 bg-primary-foreground/20",
          "aria-hidden": "true"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "orb bottom-0 right-0 size-80 bg-primary-foreground/15",
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold leading-tight text-primary-foreground", children: "The right professional, verified before you book." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm leading-relaxed text-primary-foreground/85", children: "Eighteen specialists across ten fields, each with credentials checked and reviews from real sessions." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex items-center gap-3 rounded-[var(--radius)] border border-primary-foreground/20 bg-primary-foreground/10 p-4 backdrop-blur", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { className: "size-5 shrink-0 text-primary-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs leading-relaxed text-primary-foreground/90", children: "This is a demonstration environment. No real accounts, payments or personal data are involved." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "relative text-xs text-primary-foreground/70", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " LookApp"
      ] })
    ] }),
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
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold tracking-tight", children: "Welcome back" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm leading-relaxed text-muted-foreground", children: "Sign in to manage your bookings, messages and saved professionals." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.form,
            {
              variants: staggerItem,
              onSubmit: submit,
              className: "mt-8 space-y-5",
              noValidate: true,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "login-email", children: "Email address" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "login-email",
                        type: "email",
                        autoComplete: "email",
                        value: email,
                        onChange: (event) => setEmail(event.target.value),
                        placeholder: "you@company.com",
                        className: "pl-10",
                        "data-ocid": "login.email_input"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "login-password", children: "Password" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Link,
                      {
                        to: "/forgot-password",
                        className: "text-xs font-medium text-primary transition-smooth hover:underline",
                        children: "Forgot password?"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "login-password",
                        type: "password",
                        autoComplete: "current-password",
                        value: password,
                        onChange: (event) => setPassword(event.target.value),
                        placeholder: "••••••••",
                        className: "pl-10",
                        "data-ocid": "login.password_input"
                      }
                    )
                  ] })
                ] }),
                error ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    role: "alert",
                    "data-ocid": "login.error_state",
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
                    "data-ocid": "login.submit_button",
                    children: "Sign in"
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
                "New to LookApp?",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/register",
                    className: "font-medium text-primary transition-smooth hover:underline",
                    children: "Create an account"
                  }
                )
              ]
            }
          )
        ]
      }
    ) })
  ] });
}
export {
  Login as default
};
