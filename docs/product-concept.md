# Product Concept & Architecture

> This document defines the core product vision, workflow, and architecture for the Watch360 PDF Reports generation system. All agents working on this project must understand and align with this workflow.

## The Vision
The ultimate goal is to build a **maximally autonomous system** that bridges raw data and high-end premium design. We are building a report generation engine where:
`Data Source (Google Sheets) + Absolute Layout Templates = Premium Report`

## Core Workflow (How the Product Works)
1. **Data Input:** The system (or agent) is provided with a link to a Google Sheet containing the underlying data.
2. **Analysis & Mapping:** The system analyzes the data within the Google Sheet and maps specific tabs/datasets to our pre-built layout templates (e.g., mapping a list of top brands to the `TableSlide`, or mentions to the `WatchReferencesSlide`).
3. **Dynamic Generation:** A new report is created autonomously by hydrating our layout templates with the parsed data.
4. **PDF Export:** The web-based report is seamlessly exported via a headless browser (Puppeteer) into a high-quality, vector PDF retaining all exact dimensions (720x450px).

## Application Interface & Versioning
- **Main Viewer:** The application has a main view/dashboard where the report is rendered.
- **Default State:** By default, the application always opens and displays the **latest** available report.
- **Version Control:** A dropdown navigation menu allows the user to select and view previous versions of the report (e.g., "February 2026", "January 2026"), maintaining full historical versioning.

## Template Library (Future Goal)
After testing and finalizing the first few versions of the report, we will expand our **Template Library**:
- Templates will exist as **absolutes**—pure, immutable React components that define the high-end layout, typography, and structure.
- The overarching idea is autonomy: operators simply provide a data link, and the system intelligently selects the right absolute templates to present that data.

## Guiding Rule for Agents
Do **not** hardcode data into slides. Always build slides as pure "absolute" layouts that accept data via props. The system's intelligence lies in the mapping layer (`src/data/`), which connects the raw Google Sheet data output to the generic visual templates.
