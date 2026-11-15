export interface GalleryImage {
  id: string;
  url: string;
  thumbnailUrl: string;
  title: string;
  description?: string;
  isDrive: boolean;
}

// Fallback images from verified completed pest control projects
const DEFAULT_GALLERY_ITEMS: Omit<GalleryImage, "id">[] = [
  {
    url: "/services/termite.jpg",
    thumbnailUrl: "/services/termite.jpg",
    title: "Anti-Termite Drilling & Injection",
    description:
      "Sub-slab drilling and high-pressure chemical barrier treatment for residential foundation.",
    isDrive: false,
  },
  {
    url: "/services/residential.jpg",
    thumbnailUrl: "/services/residential.jpg",
    title: "Complete Home Disinfection & Shield",
    description:
      "Full interior treatment targeting hidden pest harborage in apartments and independent villas.",
    isDrive: false,
  },
  {
    url: "/services/commercial.jpg",
    thumbnailUrl: "/services/commercial.jpg",
    title: "Corporate IT Park Pest Maintenance",
    description: "Scheduled weekend pest management across multi-floor commercial office space.",
    isDrive: false,
  },
  {
    url: "/services/factory.jpg",
    thumbnailUrl: "/services/factory.jpg",
    title: "Industrial Warehouse Pest Exclusion",
    description:
      "Perimeter bait stations and barrier spray for high-capacity manufacturing warehouse.",
    isDrive: false,
  },
  {
    url: "/services/restaurant.jpg",
    thumbnailUrl: "/services/restaurant.jpg",
    title: "HACCP & FSSAI Commercial Kitchen Treatment",
    description:
      "Food-grade cockroach gel baiting and deep drain sanitation in restaurant kitchen.",
    isDrive: false,
  },
  {
    url: "/services/hospital.jpg",
    thumbnailUrl: "/services/hospital.jpg",
    title: "Sterile Healthcare Pest Control",
    description:
      "Low-toxicity, non-allergenic disinfection protocol across hospital wards and clinical areas.",
    isDrive: false,
  },
  {
    url: "/services/mosquito.jpg",
    thumbnailUrl: "/services/mosquito.jpg",
    title: "Outdoor Thermal Fogging & Larvicide",
    description:
      "Community outdoor fogging targeting mosquito breeding hotspots and drainage gutters.",
    isDrive: false,
  },
  {
    url: "/services/rat.jpg",
    thumbnailUrl: "/services/rat.jpg",
    title: "Tamper-Resistant Rodent Bait Stations",
    description:
      "Rodent exclusion barriers and heavy-duty bait boxes installed along building perimeter.",
    isDrive: false,
  },
  {
    url: "/services/car.jpg",
    thumbnailUrl: "/services/car.jpg",
    title: "Engine Bay Anti-Rat Repellent Treatment",
    description:
      "Automobile wire-harness protection and ultrasonic repellent spray for luxury vehicles.",
    isDrive: false,
  },
  {
    url: "/services/cockroach.jpg",
    thumbnailUrl: "/services/cockroach.jpg",
    title: "Odorless Gel Baiting Treatment",
    description:
      "Targeted dot application of odorless German cockroach gel in modular kitchen cabinets.",
    isDrive: false,
  },
  {
    url: "/services/school.jpg",
    thumbnailUrl: "/services/school.jpg",
    title: "Child-Safe School & Campus Sanitation",
    description:
      "Weekend treatment using non-toxic eco-certified formulations for educational facilities.",
    isDrive: false,
  },
  {
    url: "/services/restro-bar.jpg",
    thumbnailUrl: "/services/restro-bar.jpg",
    title: "Discreet Bar & Lounge Pest Proofing",
    description:
      "Night-shift discreet service protecting beverage inventory and bar counter areas.",
    isDrive: false,
  },
];

// Known Drive file metadata mapping
const KNOWN_DRIVE_PHOTOS: Record<string, { title: string; description: string }> = {
  "1rrNlnJK7d3ys1fZgmTINkqYwyNP0XlZZ": {
    title: "Sub-Slab Termite Chemical Barrier Drilling",
    description: "Deep chemical injection creating an impenetrable barrier beneath residential floors.",
  },
  "12i7LPRKypg0ImFQqD-Ud-G0G3gn52IFb": {
    title: "Commercial Kitchen Grease & Pest Sanitization",
    description: "Deep food-safe treatment protecting food prep areas and kitchen drain lines.",
  },
  "1JURSZJy4SkiM1KWBOXzQDVTHIe-66TF9": {
    title: "Exterior Perimeter Shield Spraying",
    description: "Targeted perimeter barrier preventing pest ingress along boundary walls and foundations.",
  },
  "18getJXTefi-MOWF9Sw2sSx5agtgNtDWC": {
    title: "Automotive Anti-Rat Wiring Protection",
    description: "Ultrasonic and bitterant repellent application safeguarding car engine wiring harnesses.",
  },
  "1eTG8oRwqeSJqoo_HIw2XTaXhrQOF5OXz": {
    title: "Hospital & Healthcare Sterile Area Disinfection",
    description: "Medical-grade odorless treatment compliant with stringent clinical safety standards.",
  },
  "1yBlMEPFRZJai8_vB0e_lMMEavgTcbjL0": {
    title: "Targeted Cockroach Gel Bait Application",
    description: "Precision dot baiting reaching deep cabinet crevices with zero disruption to daily routine.",
  },
  "1MNxE-bh819YLSGV021e6u-g4f36qq_Iv": {
    title: "Industrial Warehouse Pest Bait Station Check",
    description: "Tamper-resistant perimeter monitoring stations defending large manufacturing floor space.",
  },
  "1Y5NC2bs9G3QCVaiNoRIBuYcHYHYDZ0_0": {
    title: "Outdoor Mosquito Thermal Fogging Treatment",
    description: "High-density thermal fogging clearing outdoor foliage and stormwater breeding pockets.",
  },
  "1yIYK8vPWuZerN8Zj278g6pOKO_qBYeqw": {
    title: "Pre-Construction Termite Reticulation Piping",
    description: "Underground perforated piping installation for lifetime periodic chemical recharge.",
  },
};

// Known folder preset mappings
const KNOWN_DRIVE_FOLDERS: Record<string, string[]> = {
  "1jYmUGxQUBkklwpa5ss4ymuadgpq0ifz8": [
    "1rrNlnJK7d3ys1fZgmTINkqYwyNP0XlZZ",
    "12i7LPRKypg0ImFQqD-Ud-G0G3gn52IFb",
    "1JURSZJy4SkiM1KWBOXzQDVTHIe-66TF9",
    "18getJXTefi-MOWF9Sw2sSx5agtgNtDWC",
    "1eTG8oRwqeSJqoo_HIw2XTaXhrQOF5OXz",
    "1yBlMEPFRZJai8_vB0e_lMMEavgTcbjL0",
    "1MNxE-bh819YLSGV021e6u-g4f36qq_Iv",
    "1Y5NC2bs9G3QCVaiNoRIBuYcHYHYDZ0_0",
    "1yIYK8vPWuZerN8Zj278g6pOKO_qBYeqw",
  ],
};

/**
 * Extracts a Google Drive Folder ID from a link:
 * - https://drive.google.com/drive/folders/{id}
 */
export function extractGoogleDriveFolderId(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;
  const match = trimmed.match(/\/folders\/([a-zA-Z0-9_-]{20,})/);
  if (match) return match[1];
  return null;
}

/**
 * Extracts a Google Drive File ID from various link formats:
 * - https://drive.google.com/file/d/{id}/view...
 * - https://drive.google.com/open?id={id}
 * - https://drive.google.com/uc?id={id}
 * - https://lh3.googleusercontent.com/d/{id}
 * - Raw file ID (25+ chars without slashes)
 */
export function extractGoogleDriveId(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  // Pattern 1: /file/d/{id}
  const fileDMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]{20,})/);
  if (fileDMatch) return fileDMatch[1];

  // Pattern 2: id={id}
  const idParamMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]{20,})/);
  if (idParamMatch) return idParamMatch[1];

  // Pattern 3: lh3.googleusercontent.com/d/{id}
  const lh3Match = trimmed.match(/\/d\/([a-zA-Z0-9_-]{20,})/);
  if (lh3Match) return lh3Match[1];

  // Pattern 4: direct ID (typically 25 to 50 alphanum + underscores/hyphens, no slashes or protocols)
  if (/^[a-zA-Z0-9_-]{25,50}$/.test(trimmed)) {
    return trimmed;
  }

  return null;
}

/**
 * Converts a Google Drive File ID or URL into high-resolution viewable image URLs
 */
export function formatDriveImageUrl(fileId: string): { url: string; thumbnailUrl: string } {
  // Google's CDN endpoint lh3.googleusercontent.com/d/{id} serves direct images without HTML frames
  // thumbnail endpoint is also an extremely reliable fallback
  return {
    url: `https://lh3.googleusercontent.com/d/${fileId}`,
    thumbnailUrl: `https://drive.google.com/thumbnail?id=${fileId}&sz=w800`,
  };
}

/**
 * Parses raw environment variable string (comma-separated, newline-separated, or JSON)
 * and returns structured GalleryImage array.
 */
export function parseGalleryImages(rawEnv?: string): {
  images: GalleryImage[];
  isFromEnv: boolean;
} {
  if (!rawEnv || typeof rawEnv !== "string" || !rawEnv.trim()) {
    return {
      images: DEFAULT_GALLERY_ITEMS.map((item, index) => ({
        ...item,
        id: `default-${index}`,
      })),
      isFromEnv: false,
    };
  }

  // Parse items from string (support JSON array, commas, newlines, semicolons)
  let rawList: string[] = [];
  const trimmed = rawEnv.trim();

  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        rawList = parsed.map((item) => String(item).trim()).filter(Boolean);
      }
    } catch {
      // Fallback to delimiter splitting
      rawList = trimmed.replace(/^\[|\]$/g, "").split(/[,;\n]+/);
    }
  }

  if (rawList.length === 0) {
    rawList = trimmed
      .split(/[\n,;]+/)
      .map((s) => s.trim().replace(/^['"]|['"]$/g, ""))
      .filter(Boolean);
  }

  if (rawList.length === 0) {
    return {
      images: DEFAULT_GALLERY_ITEMS.map((item, index) => ({
        ...item,
        id: `default-${index}`,
      })),
      isFromEnv: false,
    };
  }

  const images: GalleryImage[] = [];

  rawList.forEach((entry, index) => {
    // Check if the entry has a custom label formatted as "Title | URL"
    let customTitle: string | null = null;
    let urlString = entry;

    if (entry.includes("|")) {
      const parts = entry.split("|");
      customTitle = parts[0].trim();
      urlString = parts.slice(1).join("|").trim();
    }

    // Check if entry is a Google Drive folder URL
    const folderId = extractGoogleDriveFolderId(urlString);
    if (folderId && KNOWN_DRIVE_FOLDERS[folderId]) {
      const folderFiles = KNOWN_DRIVE_FOLDERS[folderId];
      folderFiles.forEach((fid, fIdx) => {
        const formatted = formatDriveImageUrl(fid);
        const meta = KNOWN_DRIVE_PHOTOS[fid];
        images.push({
          id: `drive-${fid}`,
          url: formatted.url,
          thumbnailUrl: formatted.thumbnailUrl,
          title: meta?.title || `Treatment Project #${fIdx + 1}`,
          description:
            meta?.description ||
            "Field photo from Global Elite Pest Management treatment site in Chennai.",
          isDrive: true,
        });
      });
      return;
    }

    const driveId = extractGoogleDriveId(urlString);
    if (driveId) {
      const formatted = formatDriveImageUrl(driveId);
      const meta = KNOWN_DRIVE_PHOTOS[driveId];
      images.push({
        id: `drive-${driveId}`,
        url: formatted.url,
        thumbnailUrl: formatted.thumbnailUrl,
        title: customTitle || meta?.title || `Drive Photo #${index + 1}`,
        description:
          meta?.description ||
          "Field photo from Global Elite Pest Management treatment site in Chennai.",
        isDrive: true,
      });
      return;
    }

    // Standard direct image URL
    images.push({
      id: `custom-${index}`,
      url: urlString,
      thumbnailUrl: urlString,
      title: customTitle || `Project Treatment #${index + 1}`,
      description: "Field photo from Global Elite Pest Management treatment site.",
      isDrive: false,
    });
  });

  return {
    images,
    isFromEnv: true,
  };
}

/**
 * Reads the gallery images from available env variables:
 * VITE_GALLERY_IMAGES, VITE_DRIVE_IMAGES, VITE_GOOGLE_DRIVE_IMAGES
 */
export function getGalleryData(): { images: GalleryImage[]; isFromEnv: boolean } {
  let envVal: string | undefined;

  // Check client-side Vite import.meta.env
  if (typeof import.meta !== "undefined" && import.meta.env) {
    envVal =
      (import.meta.env.VITE_GALLERY_IMAGES as string | undefined) ||
      (import.meta.env.VITE_DRIVE_IMAGES as string | undefined) ||
      (import.meta.env.VITE_GOOGLE_DRIVE_IMAGES as string | undefined);
  }

  // Fallback for SSR / Node process.env if available
  if (!envVal && typeof process !== "undefined" && process.env) {
    envVal =
      process.env.VITE_GALLERY_IMAGES ||
      process.env.VITE_DRIVE_IMAGES ||
      process.env.VITE_GOOGLE_DRIVE_IMAGES;
  }

  return parseGalleryImages(envVal);
}
