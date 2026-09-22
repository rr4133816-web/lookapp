import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label, Textarea } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { getProfessional } from "@/data/professionals";
import { useApp } from "@/hooks/use-app";
import { staggerContainer, staggerItem } from "@/lib/motion";
import type { Service } from "@/types";
import { motion } from "framer-motion";
import { Clock, Pencil, Plus, Sparkles, Trash2 } from "lucide-react";
import { useState } from "react";

const PRO_ID = "p-01";

export default function ProServices() {
  const { pushToast } = useApp();
  const professional = getProfessional(PRO_ID);
  const [services, setServices] = useState<Service[]>(
    professional?.services ?? [],
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("200");
  const [duration, setDuration] = useState("60");

  if (!professional) return null;

  const openCreate = () => {
    setEditingId(null);
    setName("");
    setDescription("");
    setPrice("200");
    setDuration("60");
    setModalOpen(true);
  };

  const openEdit = (service: Service) => {
    setEditingId(service.id);
    setName(service.name);
    setDescription(service.description);
    setPrice(`${service.price}`);
    setDuration(`${service.durationMinutes}`);
    setModalOpen(true);
  };

  const save = () => {
    if (!name.trim() || !description.trim()) return;
    if (editingId) {
      setServices((current) =>
        current.map((service) =>
          service.id === editingId
            ? {
                ...service,
                name: name.trim(),
                description: description.trim(),
                price: Number(price) || 0,
                durationMinutes: Number(duration) || 60,
              }
            : service,
        ),
      );
      pushToast({ title: "Service updated", variant: "success" });
    } else {
      setServices((current) => [
        ...current,
        {
          id: `s-new-${Date.now()}`,
          name: name.trim(),
          description: description.trim(),
          price: Number(price) || 0,
          durationMinutes: Number(duration) || 60,
        },
      ]);
      pushToast({
        title: "Service added",
        description: "It is now bookable from your profile.",
        variant: "success",
      });
    }
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Services
          </p>
          <h1 className="mt-1.5 font-display text-2xl font-bold tracking-tight md:text-3xl">
            What you offer
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Each service has its own price and duration. Customers book directly
            from this list.
          </p>
        </div>
        <Button
          type="button"
          onClick={openCreate}
          data-ocid="pro_services.add_button"
        >
          <Plus className="size-4" />
          Add service
        </Button>
      </header>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid gap-4 lg:grid-cols-2"
      >
        {services.map((service, index) => (
          <motion.div key={service.id} variants={staggerItem}>
            <Card className="h-full">
              <CardContent className="flex h-full flex-col gap-4 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display text-base font-semibold">
                        {service.name}
                      </h3>
                      {service.popular ? (
                        <Badge variant="accent">
                          <Sparkles className="size-3" />
                          Popular
                        </Badge>
                      ) : null}
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className="mt-auto flex items-center justify-between gap-3 border-t border-border/60 pt-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-lg font-semibold">
                      ${service.price}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="size-3.5" />
                      {service.durationMinutes} min
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      aria-label={`Edit ${service.name}`}
                      onClick={() => openEdit(service)}
                      data-ocid={`pro_services.edit_button.${index + 1}`}
                    >
                      <Pencil className="size-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      aria-label={`Delete ${service.name}`}
                      className="text-destructive hover:bg-destructive/10"
                      onClick={() => {
                        setServices((current) =>
                          current.filter((item) => item.id !== service.id),
                        );
                        pushToast({
                          title: "Service removed",
                          description: `${service.name} is no longer bookable.`,
                          variant: "default",
                        });
                      }}
                      data-ocid={`pro_services.delete_button.${index + 1}`}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Pricing guidance</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-3">
          {[
            {
              label: "Your average",
              value: `$${Math.round(services.reduce((total, service) => total + service.price, 0) / Math.max(services.length, 1))}`,
            },
            { label: "Category average", value: "$310" },
            { label: "Top earners", value: "$480" },
          ].map((item) => (
            <div key={item.label} className="rounded-lg bg-muted/50 p-4">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                {item.label}
              </p>
              <p className="mt-1 font-mono text-xl font-semibold">
                {item.value}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingId ? "Edit service" : "Add a service"}
        description="Customers see this exactly as you write it."
        footer={
          <>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setModalOpen(false)}
              data-ocid="pro_services.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={save}
              data-ocid="pro_services.save_button"
            >
              {editingId ? "Save changes" : "Add service"}
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="service-name">Service name</Label>
            <Input
              id="service-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Cloud Architecture Audit"
              data-ocid="pro_services.name_input"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="service-description">Description</Label>
            <Textarea
              id="service-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="What the customer gets from this session."
              data-ocid="pro_services.description_input"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="service-price">Price (USD)</Label>
              <Input
                id="service-price"
                type="number"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                data-ocid="pro_services.price_input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="service-duration">Duration (minutes)</Label>
              <Input
                id="service-duration"
                type="number"
                value={duration}
                onChange={(event) => setDuration(event.target.value)}
                data-ocid="pro_services.duration_input"
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
