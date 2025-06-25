# Asint Internship Task: SAPUI5 Fiori App

This project is developed as part of the internship at **Asint**, focusing on key SAP Fiori concepts, data integration using OData services, dynamic UI rendering, and testing.

## 🚀 Features

- **Table Personalization & FilterBar**
  - Users can personalize columns (visibility, order, sort) and apply filters.
  
- **OData API Integration (Northwind V2)**
  - Supports both **live OData services** (Northwind) and **mock/local data**.
  - Compatible with **V2** service versions.
  
- **Complex UI Controls**
  - `FlexibleColumnLayout` for responsive multi-column views.
  - `VizFrame` charts for data visualization.
  - `TreeTable` or `ResponsiveTable` for hierarchical/tabular data display.
  
- **Dynamic UI Rendering**
  - Fields and UI elements are dynamically rendered based on **OData metadata**.
  
- **Simple Unit Testing**
  - Basic unit test setup to validate core logic and utility functions.

---

## 📁 Getting Started

To access Data from Northwind V2
```
npm start
```

To access Data from Local Storage
```
npm run start-mock
```

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/)

---
