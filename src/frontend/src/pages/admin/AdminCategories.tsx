import { StatCard } from "@/components/StatCard";
import { PageHeader, PageTransition } from "@/components/layout/PageTransition";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Input, Label, Textarea } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Search } from "@/components/ui/search";
import { Tabs } from "@/components/ui/tabs";
import { categories as seedCategories } from "@/data/categories";
import { useApp } from "@/hooks/use-app";
import { staggerContainer, staggerItem } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { Category, CategorySlug } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import {
  Briefcase,
  Calculator,
  Code2,
  Cog,
  FolderTree,
  GraduationCap,
  HeartPulse,
  LayoutGrid,
  type LucideIcon,
  Palette,
  Pencil,
  Plus,
  Ruler,
  Sparkles,
  Trash2,
  Users,
  Wrench,
} from "lucide-react";
import { useMemo, useState } from "react";

const ICONS: Record<string, LucideIcon> = {
  Code2,
  Calculator,
  Cog,
  Ruler,
  HeartPulse,
  GraduationCap,
  Palette,
  Wrench,
  Briefcase,
  Sparkles,
};

const ICON_OPTIONS = Object.keys(ICONS);

interface CategoryDraft {
  name: string;
  tagline: string;
  icon: string;
}

const EMPTY_DRAFT: CategoryDraft = { name: "", tagline: "", icon: "Sparkles" };

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function CategoryIcon({
  name,
  className,
}: { name: string; className?: string }) {
  const Icon = ICONS[name] ?? Sparkles;
  return <Icon className={className} />;
}

export default function AdminCategories() {
  const { pushToast } = useApp();
  const [items, setItems] = useState<Category[]>(seedCategories);
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<"grid" | "table">("grid");
  const [editing, setEditing] = useState<Category | null>(null);
  const [draft, setDraft] = useState<CategoryDraft>(EMPTY_DRAFT);
  const [formOpen, setFormOpen] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; tagline?: string }>({});
  const [pendingDelete, setPendingDelete] = useState<Category | null>(null);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return items;
    return items.filter((category) =>
      `${category.name} ${category.tagline}`.toLowerCase().includes(needle),
    );
  }, [items, query]);

  const activeCount = items.filter(
    (category) => category.professionalCount > 0,
  ).length;
  const totalProfessionals = items.reduce(
    (sum, category) => sum + category.professionalCount,
    0,
  );

  const openCreate = () => {
    setEditing(null);
    setDraft(EMPTY_DRAFT);
    setErrors({});
    setFormOpen(true);
  };

  const openEdit = (category: Category) => {
    setEditing(category);
    setDraft({
      name: category.name,
      tagline: category.tagline,
      icon: category.icon,
    });
    setErrors({});
    setFormOpen(true);
  };

  const validate = (): boolean => {
    const next: { name?: string; tagline?: string } = {};
    if (draft.name.trim().length < 3) {
      next.name = "Enter a category name of at least 3 characters.";
    } else if (
      items.some(
        (category) =>
          category.name.toLowerCase() === draft.name.trim().toLowerCase() &&
          category.slug !== editing?.slug,
      )
    ) {
      next.name = "A category with this name already exists.";
    }
    if (draft.tagline.trim().length < 10) {
      next.tagline = "Write a tagline of at least 10 characters.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = () => {
    if (!validate()) return;
    const name = draft.name.trim();
    const tagline = draft.tagline.trim();

    if (editing) {
      setItems((current) =>
        current.map((category) =>
          category.slug === editing.slug
            ? { ...category, name, tagline, icon: draft.icon }
            : category,
        ),
      );
      pushToast({
        variant: "success",
        title: "Category updated",
        description: `${name} now shows the latest name, tagline and icon.`,
      });
    } else {
      const slug = slugify(name) as CategorySlug;
      if (items.some((category) => category.slug === slug)) {
        setErrors({ name: "A category with this name already exists." });
        return;
      }
      setItems((current) => [
        ...current,
        { slug, name, tagline, icon: draft.icon, professionalCount: 0 },
      ]);
      pushToast({
        variant: "success",
        title: "Category added",
        description: `${name} is live and ready for professionals to join.`,
      });
    }
    setFormOpen(false);
    setEditing(null);
    setDraft(EMPTY_DRAFT);
  };

  const toggleActive = (category: Category) => {
    const nextCount = category.professionalCount > 0 ? 0 : 1;
    setItems((current) =>
      current.map((item) =>
        item.slug === category.slug
          ? { ...item, professionalCount: nextCount }
          : item,
      ),
    );
    pushToast({
      variant: "default",
      title: nextCount > 0 ? "Category activated" : "Category deactivated",
      description:
        nextCount > 0
          ? `${category.name} is accepting new professionals again.`
          : `${category.name} is hidden from the public marketplace.`,
    });
  };

  const confirmDelete = () => {
    if (!pendingDelete) return;
    setItems((current) =>
      current.filter((category) => category.slug !== pendingDelete.slug),
    );
    pushToast({
      variant: "error",
      title: "Category removed",
      description: `${pendingDelete.name} was removed from the marketplace.`,
    });
    setPendingDelete(null);
  };

  const stats = [
    {
      label: "Total categories",
      value: items.length.toString(),
      icon: FolderTree,
      hint: "Across the marketplace",
      tone: "primary" as const,
    },
    {
      label: "Active categories",
      value: activeCount.toString(),
      icon: LayoutGrid,
      hint: "Accepting professionals",
      tone: "success" as const,
    },
    {
      label: "Professionals listed",
      value: totalProfessionals.toString(),
      icon: Users,
      hint: "Sum across all categories",
      tone: "accent" as const,
    },
  ];

  return (
    <PageTransition className="space-y-8" data-ocid="admin.categories.page">
      <PageHeader
        eyebrow="Admin console"
        title="Categories management"
        description="Shape how customers browse the marketplace. Add, edit and retire the categories that organise every professional."
        actions={
          <Button
            size="sm"
            onClick={openCreate}
            data-ocid="admin.categories.add_button"
          >
            <Plus />
            Add category
          </Button>
        }
      />

      <motion.section
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
        aria-label="Category metrics"
      >
        {stats.map((stat, index) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            hint={stat.hint}
            tone={stat.tone}
            index={index}
          />
        ))}
      </motion.section>

      <Card data-ocid="admin.categories.panel">
        <CardContent className="space-y-5 p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <Tabs
              items={[
                { value: "grid", label: "Grid" },
                { value: "table", label: "Table" },
              ]}
              value={tab}
              onValueChange={(value) => setTab(value as "grid" | "table")}
              className="lg:max-w-xs"
            />
            <Search
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onClear={() => setQuery("")}
              placeholder="Search categories"
              aria-label="Search categories"
              containerClassName="lg:w-72"
              data-ocid="admin.categories.search_input"
            />
          </div>

          {visible.length === 0 ? (
            <EmptyState
              icon={FolderTree}
              title="No categories match your search"
              description="Try a different term, or add a new category to expand the marketplace."
              action={
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setQuery("")}
                  data-ocid="admin.categories.reset_button"
                >
                  Clear search
                </Button>
              }
            />
          ) : tab === "grid" ? (
            <motion.ul
              layout
              className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
              data-ocid="admin.categories.list"
            >
              <AnimatePresence initial={false}>
                {visible.map((category, index) => {
                  const active = category.professionalCount > 0;
                  return (
                    <motion.li
                      key={category.slug}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      className="flex flex-col gap-4 rounded-[var(--radius)] border border-border/60 bg-card p-5 shadow-elevated transition-smooth hover:shadow-elevated-lg"
                      data-ocid={`admin.categories.item.${index + 1}`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="grid size-11 place-items-center rounded-xl bg-primary-soft text-primary">
                          <CategoryIcon
                            name={category.icon}
                            className="size-5"
                          />
                        </span>
                        <Badge variant={active ? "success" : "neutral"}>
                          {active ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <div className="min-w-0">
                        <h3 className="truncate font-display text-base font-semibold">
                          {category.name}
                        </h3>
                        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                          {category.tagline}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Users className="size-3.5" />
                        <span className="font-mono">
                          {category.professionalCount}
                        </span>
                        professionals
                      </div>
                      <div className="mt-auto flex items-center justify-between gap-2 border-t border-border/60 pt-4">
                        <button
                          type="button"
                          role="switch"
                          aria-checked={active}
                          aria-label={`Toggle ${category.name} active state`}
                          onClick={() => toggleActive(category)}
                          data-ocid={`admin.categories.toggle.${index + 1}`}
                          className={cn(
                            "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-smooth",
                            active ? "bg-primary" : "bg-muted",
                          )}
                        >
                          <span
                            className={cn(
                              "inline-block size-4 rounded-full bg-card shadow-xs transition-smooth",
                              active ? "translate-x-6" : "translate-x-1",
                            )}
                          />
                        </button>
                        <div className="flex items-center gap-1.5">
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            aria-label={`Edit ${category.name}`}
                            onClick={() => openEdit(category)}
                            data-ocid={`admin.categories.edit_button.${index + 1}`}
                          >
                            <Pencil />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            aria-label={`Remove ${category.name}`}
                            onClick={() => setPendingDelete(category)}
                            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                            data-ocid={`admin.categories.delete_button.${index + 1}`}
                          >
                            <Trash2 />
                          </Button>
                        </div>
                      </div>
                    </motion.li>
                  );
                })}
              </AnimatePresence>
            </motion.ul>
          ) : (
            <div className="overflow-hidden rounded-[var(--radius)] border border-border/60">
              <table className="w-full border-collapse text-left text-sm">
                <thead className="sticky top-0 z-10 bg-muted/70 backdrop-blur">
                  <tr className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    <th scope="col" className="px-4 py-3 font-semibold">
                      Category
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold">
                      Tagline
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-right font-semibold"
                    >
                      Professionals
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold">
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-right font-semibold"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence initial={false}>
                    {visible.map((category, index) => {
                      const active = category.professionalCount > 0;
                      return (
                        <motion.tr
                          key={category.slug}
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="border-t border-border/60 transition-smooth hover:bg-muted/40"
                          data-ocid={`admin.categories.row.${index + 1}`}
                        >
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-3">
                              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary-soft text-primary">
                                <CategoryIcon
                                  name={category.icon}
                                  className="size-4"
                                />
                              </span>
                              <span className="font-medium">
                                {category.name}
                              </span>
                            </div>
                          </td>
                          <td className="max-w-sm px-4 py-4 text-muted-foreground">
                            <span className="line-clamp-1">
                              {category.tagline}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-right font-mono">
                            {category.professionalCount}
                          </td>
                          <td className="px-4 py-4">
                            <Badge variant={active ? "success" : "neutral"}>
                              {active ? "Active" : "Inactive"}
                            </Badge>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center justify-end gap-1.5">
                              <Button
                                variant="ghost"
                                size="icon-sm"
                                aria-label={`Edit ${category.name}`}
                                onClick={() => openEdit(category)}
                                data-ocid={`admin.categories.edit_button.${index + 1}`}
                              >
                                <Pencil />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon-sm"
                                aria-label={`Remove ${category.name}`}
                                onClick={() => setPendingDelete(category)}
                                className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                                data-ocid={`admin.categories.delete_button.${index + 1}`}
                              >
                                <Trash2 />
                              </Button>
                            </div>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <Modal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        title={editing ? "Edit category" : "Add category"}
        description={
          editing
            ? "Update how this category appears across the marketplace."
            : "Create a new category for professionals to list their services under."
        }
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => setFormOpen(false)}
              data-ocid="admin.categories.cancel_button"
            >
              Cancel
            </Button>
            <Button onClick={submit} data-ocid="admin.categories.save_button">
              {editing ? "Save changes" : "Add category"}
            </Button>
          </>
        }
      >
        <form
          className="space-y-5"
          onSubmit={(event) => {
            event.preventDefault();
            submit();
          }}
        >
          <div className="space-y-2">
            <Label htmlFor="category-name">Category name</Label>
            <Input
              id="category-name"
              value={draft.name}
              onChange={(event) =>
                setDraft((current) => ({
                  ...current,
                  name: event.target.value,
                }))
              }
              placeholder="e.g. Legal Advisory"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "category-name-error" : undefined}
              data-ocid="admin.categories.name_input"
            />
            {errors.name ? (
              <p
                id="category-name-error"
                className="text-xs text-destructive"
                data-ocid="admin.categories.name_error"
              >
                {errors.name}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="category-tagline">Tagline</Label>
            <Textarea
              id="category-tagline"
              value={draft.tagline}
              onChange={(event) =>
                setDraft((current) => ({
                  ...current,
                  tagline: event.target.value,
                }))
              }
              placeholder="A short line describing who customers will find here."
              aria-invalid={Boolean(errors.tagline)}
              aria-describedby={
                errors.tagline ? "category-tagline-error" : undefined
              }
              data-ocid="admin.categories.tagline_input"
            />
            {errors.tagline ? (
              <p
                id="category-tagline-error"
                className="text-xs text-destructive"
                data-ocid="admin.categories.tagline_error"
              >
                {errors.tagline}
              </p>
            ) : null}
          </div>

          <fieldset className="space-y-2">
            <legend className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Icon
            </legend>
            <div className="flex flex-wrap gap-2">
              {ICON_OPTIONS.map((iconName) => {
                const selected = draft.icon === iconName;
                return (
                  <button
                    key={iconName}
                    type="button"
                    aria-label={`Use ${iconName} icon`}
                    aria-pressed={selected}
                    onClick={() =>
                      setDraft((current) => ({ ...current, icon: iconName }))
                    }
                    data-ocid={`admin.categories.icon_option.${iconName}`}
                    className={cn(
                      "grid size-11 place-items-center rounded-xl border transition-smooth",
                      selected
                        ? "border-primary/50 bg-primary-soft text-primary"
                        : "border-border/60 text-muted-foreground hover:border-primary/30 hover:text-foreground",
                    )}
                  >
                    <CategoryIcon name={iconName} className="size-5" />
                  </button>
                );
              })}
            </div>
          </fieldset>
        </form>
      </Modal>

      <Modal
        open={pendingDelete !== null}
        onClose={() => setPendingDelete(null)}
        title="Remove this category?"
        description="Professionals listed under it will need to be reassigned. This cannot be undone."
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => setPendingDelete(null)}
              data-ocid="admin.categories.cancel_button"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              data-ocid="admin.categories.confirm_button"
            >
              Remove category
            </Button>
          </>
        }
      >
        {pendingDelete ? (
          <div className="flex items-center gap-3 rounded-lg border border-border/60 bg-muted/40 p-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
              <CategoryIcon name={pendingDelete.icon} className="size-5" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-medium">{pendingDelete.name}</p>
              <p className="truncate text-xs text-muted-foreground">
                {pendingDelete.professionalCount} professionals listed
              </p>
            </div>
          </div>
        ) : null}
      </Modal>
    </PageTransition>
  );
}
