export type SubdomainType = "marketing" | "planner" | "builder" | "custom";

export interface HostContext {
  type: SubdomainType;
  hostname: string;
  isSimulator: boolean;
  customDomain?: string;
}

/**
 * Resolves the subdomain and tenant context from the incoming request hostname
 * and optional `__host` development query simulator parameter.
 */
export function resolveHostContext(
  hostHeader: string | null,
  searchParams?: URLSearchParams | null,
): HostContext {
  const hostParam = searchParams?.get("__host");
  const isSimulator = Boolean(hostParam);
  const rawHost = hostParam || hostHeader || "";

  // Strip port (e.g. localhost:5173 -> localhost, plan.invitea.cards:443 -> plan.invitea.cards)
  const hostname = rawHost.split(":")[0].trim().toLowerCase();

  if (hostname === "plan.invitea.cards") {
    return {
      type: "planner",
      hostname,
      isSimulator,
    };
  }

  if (hostname === "create.invitea.cards") {
    return {
      type: "builder",
      hostname,
      isSimulator,
    };
  }

  if (
    hostname === "invitea.cards" ||
    hostname === "www.invitea.cards" ||
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    !hostname
  ) {
    return {
      type: "marketing",
      hostname: hostname || "invitea.cards",
      isSimulator,
    };
  }

  // Any other domain is treated as a bespoke custom domain
  return {
    type: "custom",
    hostname,
    isSimulator,
    customDomain: hostname,
  };
}

/**
 * Generates an absolute or simulator-friendly URL for cross-subdomain transitions.
 */
export function buildSubdomainUrl(
  target: SubdomainType,
  path: string = "/",
  currentContext?: HostContext,
): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  if (currentContext?.isSimulator) {
    const targetHost =
      target === "planner"
        ? "plan.invitea.cards"
        : target === "builder"
        ? "create.invitea.cards"
        : "invitea.cards";

    const joinChar = cleanPath.includes("?") ? "&" : "?";
    return `${cleanPath}${joinChar}__host=${targetHost}`;
  }

  if (typeof window !== "undefined") {
    const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
    if (isLocalhost) {
      const targetHost =
        target === "planner"
          ? "plan.invitea.cards"
          : target === "builder"
          ? "create.invitea.cards"
          : "invitea.cards";
      const joinChar = cleanPath.includes("?") ? "&" : "?";
      return `${cleanPath}${joinChar}__host=${targetHost}`;
    }
  }

  const protocol = "https://";
  const domain =
    target === "planner"
      ? "plan.invitea.cards"
      : target === "builder"
      ? "create.invitea.cards"
      : "invitea.cards";

  return `${protocol}${domain}${cleanPath}`;
}
