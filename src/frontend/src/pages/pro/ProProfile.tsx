import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label, Textarea } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { getProfessional } from "@/data/professionals";
import { useApp } from "@/hooks/use-app";
import { staggerContainer, staggerItem } from "@/lib/motion";
import { motion } from "framer-motion";
import {
  Award,
  BadgeCheck,
  Globe,
  MapPin,
  Pencil,
  Plus,
  Save,
  Trash2,
} from "lucide-react";
import { useState } from "react";

const PRO_ID = "p-01";

export default function ProProfile() {
  const { pushToast } = useApp();
  const professional = getProfessional(PRO_ID);
  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState(professional?.bio ?? "");
  const [location, setLocation] = useState(professional?.location ?? "");
  const [price, setPrice] = useState(`${professional?.startingPrice ?? 0}`);
  const [credentialOpen, setCredentialOpen] = useState(false);
  const [credentialTitle, setCredentialTitle] = useState("");
  const [credentialIssuer, setCredentialIssuer] = useState("");
  const [credentials, setCredentials] = useState(
    professional?.credentials ?? [],
  );

  if (!professional) return null;

  const save = () => {
    setEditing(false);
    pushToast({
      title: "Profile saved",
      description: "Your public profile has been updated.",
      variant: "success",
    });
  };

  const addCredential = () => {
    if (!credentialTitle.trim() || !credentialIssuer.trim()) return;
    setCredentials((current) => [
      ...current,
      {
        id: `c-new-${Date.now()}`,
        title: credentialTitle.trim(),
        issuer: credentialIssuer.trim(),
        year: new Date().getFullYear(),
      },
    ]);
    setCredentialTitle("");
    setCredentialIssuer("");
    setCredentialOpen(false);
    pushToast({
      title: "Credential added",
      description: "It will appear on your public profile.",
      variant: "success",
    });
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Profile
          </p>
          <h1 className="mt-1.5 font-display text-2xl font-bold tracking-tight md:text-3xl">
            Your public profile
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            This is what customers see when they find you in search results.
          </p>
        </div>
        {editing ? (
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setEditing(false)}
              data-ocid="pro_profile.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={save}
              data-ocid="pro_profile.save_button"
            >
              <Save className="size-4" />
              Save changes
            </Button>
          </div>
        ) : (
          <Button
            type="button"
            onClick={() => setEditing(true)}
            data-ocid="pro_profile.edit_button"
          >
            <Pencil className="size-4" />
            Edit profile
          </Button>
        )}
      </header>

      <motion.section
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="overflow-hidden rounded-[calc(var(--radius)+4px)] border border-border/60 bg-card shadow-elevated"
      >
        <div className="h-24 bg-gradient-primary" />
        <div className="px-5 pb-6 md:px-8">
          <div className="-mt-10 flex flex-col gap-4 sm:flex-row sm:items-end">
            <Avatar
              src={professional.avatar}
              name={professional.name}
              size="xl"
              className="ring-4 ring-card"
            />
            <div className="pb-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-display text-xl font-bold tracking-tight">
                  {professional.name}
                </h2>
                {professional.verified ? (
                  <Badge variant="accent">
                    <BadgeCheck className="size-3" />
                    Verified
                  </Badge>
                ) : null}
                {professional.topRated ? (
                  <Badge variant="primary">Top rated</Badge>
                ) : null}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {professional.profession}
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 border-t border-border/60 pt-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: MapPin, label: "Location", value: location },
              {
                icon: Globe,
                label: "Languages",
                value: professional.languages.join(", "),
              },
              {
                icon: Award,
                label: "Experience",
                value: `${professional.yearsExperience} years`,
              },
              {
                icon: BadgeCheck,
                label: "Completed",
                value: `${professional.completedJobs} sessions`,
              },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground">
                  <item.icon className="size-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                    {item.label}
                  </p>
                  <p className="truncate text-sm font-medium">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Professional bio</CardTitle>
          </CardHeader>
          <CardContent>
            {editing ? (
              <div className="space-y-2">
                <Label htmlFor="pro-bio">Bio</Label>
                <Textarea
                  id="pro-bio"
                  value={bio}
                  onChange={(event) => setBio(event.target.value)}
                  rows={6}
                  data-ocid="pro_profile.bio_input"
                />
              </div>
            ) : (
              <p className="text-sm leading-relaxed text-muted-foreground">
                {bio}
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Contact and pricing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="pro-location">Location</Label>
              <Input
                id="pro-location"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                disabled={!editing}
                data-ocid="pro_profile.location_input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pro-price">Starting price (USD)</Label>
              <Input
                id="pro-price"
                type="number"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                disabled={!editing}
                data-ocid="pro_profile.price_input"
              />
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Your starting price is shown on search cards. Individual services
              can be priced separately.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="text-base">Credentials</CardTitle>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => setCredentialOpen(true)}
            data-ocid="pro_profile.add_credential_button"
          >
            <Plus className="size-4" />
            Add credential
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {credentials.map((credential, index) => (
            <motion.div
              key={credential.id}
              variants={staggerItem}
              initial="hidden"
              animate="visible"
              className="flex items-center justify-between gap-4 rounded-lg bg-muted/50 p-3.5"
              data-ocid={`pro_profile.credential.${index + 1}`}
            >
              <div className="flex items-center gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
                  <Award className="size-4" />
                </span>
                <div>
                  <p className="text-sm font-medium">{credential.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {credential.issuer} · {credential.year}
                  </p>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label={`Remove ${credential.title}`}
                className="text-destructive hover:bg-destructive/10"
                onClick={() =>
                  setCredentials((current) =>
                    current.filter((item) => item.id !== credential.id),
                  )
                }
                data-ocid={`pro_profile.remove_credential_button.${index + 1}`}
              >
                <Trash2 className="size-4" />
              </Button>
            </motion.div>
          ))}
        </CardContent>
      </Card>

      <Modal
        open={credentialOpen}
        onClose={() => setCredentialOpen(false)}
        title="Add a credential"
        description="Credentials appear on your public profile once verified."
        footer={
          <>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setCredentialOpen(false)}
              data-ocid="pro_profile.cancel_credential_button"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={addCredential}
              data-ocid="pro_profile.save_credential_button"
            >
              Add credential
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="credential-title">Credential name</Label>
            <Input
              id="credential-title"
              value={credentialTitle}
              onChange={(event) => setCredentialTitle(event.target.value)}
              placeholder="AWS Solutions Architect Professional"
              data-ocid="pro_profile.credential_title_input"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="credential-issuer">Issuing body</Label>
            <Input
              id="credential-issuer"
              value={credentialIssuer}
              onChange={(event) => setCredentialIssuer(event.target.value)}
              placeholder="Amazon Web Services"
              data-ocid="pro_profile.credential_issuer_input"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
