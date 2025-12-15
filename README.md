# DLENSAI Spotlight Generator

Generate Spotlight HTML reports for stocks using OpenAI – beginner-friendly guide included.

---

## Getting Started

Follow these steps to run the script and create a Spotlight report. No prior coding experience is required.

---

### 1. Install Node.js (and npm)

Node.js lets you run the script, and npm comes with it.

1. Go to [https://nodejs.org](https://nodejs.org).
2. Download the **LTS (Long Term Support)** version.
3. Run the installer and follow the instructions.
4. Reopen your terminal/command prompt to make sure `node` and `npm` work.

**Check installation:**

```bash
node -v   # Should show a version number, e.g., v20.3.1
npm -v    # Should show a version number
```

---

### 2. Download the Project

1. Open your terminal/command prompt.
2. Clone the repository:

```bash
git clone https://github.com/sobremontepjaycyrill-pixel/dlensai-spotlight-phase1-main.git
```

3. Go into the project folder:

```bash
cd dlensai-spotlight-phase1-main
```

---

### 3. Install Dependencies

Run the following command to install the required packages:

```bash
npm install
```

---

### 4. Add Your OpenAI Information

1. In the project folder, create a file named `.env`.
2. Open `.env` in a text editor and add your OpenAI info like this:

```env
OPENAI_API_KEY=sk-...
OPENAI_ORG_ID=org_...
OPENAI_PROJECT_ID=proj_...
OPENAI_MODEL=gpt-4.1
```

> Replace the `...` with your actual API key, organization ID, and project ID from OpenAI.

---

### 5. Run the Script

In the terminal, type the command with the stock ticker and the term in years. Example:

```bash
node spotlight.js TSLA 10
```

This generates a 10-year Spotlight report for Tesla.

---

### 6. Wait for the Report

After the script finishes, you will see:

```
Spotlight generated
```

A file like `DLENS_Spotlight_TSLA_10y_via_API.html` will appear in the folder.

---

### 7. Open the Report

Double-click the HTML file to view it in your browser.

---

### Notes

* Make sure `.env` is **never shared publicly**.
* Node.js and npm must be installed correctly for the script to work.
* Follow the steps exactly to avoid errors.
