# Vercel Deployment Guide

This document explains how to deploy **St. George Church – Sandbis** to Vercel.

---

## 1. Prerequisites

- A GitHub, GitLab, or Bitbucket repository containing this project.
- A Vercel account linked to your git provider.
- A configured Supabase project (see `SUPABASE_SETUP.md`).

---

## 2. Import Project into Vercel

1. Log in to [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **"Add New..." → "Project"**.
3. Import the `st-george` repository.
4. Select **Next.js** as the Framework Preset.

---

## 3. Configure Environment Variables in Vercel

In the Vercel project setup screen (or under **Project Settings → Environment Variables**), add the following environment variables:

| Key | Value | Environment Scope |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://your-project-ref.supabase.co` | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOi...` (your anon key) | Production, Preview, Development |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGciOi...` (your secret service role key) | Production, Preview, Development |

> [!CAUTION]
> **NEVER** prefix `SUPABASE_SERVICE_ROLE_KEY` with `NEXT_PUBLIC_`.
> Ensure `SUPABASE_SERVICE_ROLE_KEY` is kept confidential and only added to Vercel's server-side Environment Variables.

---

## 4. Deploy

1. Click **"Deploy"**.
2. Vercel will run `npm install` and `npm run build`.
3. Once completed, your Next.js App Router application will be live on Vercel's global edge network.

---

## 5. Continuous Integration / Automatic Deployments

- Pushes to `main` or `master` branch automatically trigger production deployments on Vercel.
- Pull Requests automatically generate preview deployments.
