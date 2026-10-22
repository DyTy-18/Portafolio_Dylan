import type { ComponentType } from "react";
import { AdmisionDemo } from "./admision";
import { BotDemo } from "./bot";
import { CrmDemo } from "./crm";
import { DashboardDemo } from "./dashboard";
import { DytyDemo, dytyVerticalSize } from "./dyty";
import { PipelinesDemo } from "./pipelines";
import { ProgramadorDemo } from "./programador";
import { SitioDemo } from "./sitio";

// Demo de cada proyecto, por slug (videos/src/scripts.ts). Datos ficticios.
export const demos: Record<string, ComponentType<{ vertical?: boolean }>> = {
  "crm-a-medida": CrmDemo,
  "bot-citas-whatsapp": BotDemo,
  "dashboard-estudiantes": DashboardDemo,
  "admision-pacientes": AdmisionDemo,
  "programador-whatsapp": ProgramadorDemo,
  "pipelines-datos": PipelinesDemo,
  "sitio-corporativo": SitioDemo,
  "dyty-dev": DytyDemo,
};

// Demos con su propio tamaño en vertical. Las demás se agrandan y la cámara las recorre.
export const verticalSizes: Record<string, { w: number; h: number }> = {
  "dyty-dev": dytyVerticalSize,
};
