/**
 * Database utility for tracking issue selections
 *
 * SETUP INSTRUCTIONS:
 *
 * Choose ONE of the following options:
 *
 * OPTION A: Vercel Postgres
 * 1. Run: npm install @vercel/postgres
 * 2. Add to .env.local:
 *    POSTGRES_URL="postgres://..."
 *    POSTGRES_PRISMA_URL="postgres://..."
 *    POSTGRES_URL_NON_POOLING="postgres://..."
 * 3. Uncomment the Vercel Postgres implementation below
 * 4. Comment out or remove the Supabase implementation
 *
 * OPTION B: Supabase (RECOMMENDED for easier setup)
 * 1. Run: npm install @supabase/supabase-js
 * 2. Add to .env.local:
 *    NEXT_PUBLIC_SUPABASE_URL="https://xxx.supabase.co"
 *    SUPABASE_SERVICE_KEY="your-service-key"
 * 3. Uncomment the Supabase implementation below
 * 4. Comment out or remove the Vercel Postgres implementation
 */

// ============================================================================
// OPTION A: VERCEL POSTGRES IMPLEMENTATION
// ============================================================================
// Uncomment the following lines to use Vercel Postgres:

/*
import { sql } from '@vercel/postgres';

export async function saveIssueSelection(issueId, issueLabel, sessionId) {
  try {
    await sql`
      INSERT INTO issue_selections (issue_id, issue_label, session_id)
      VALUES (${issueId}, ${issueLabel}, ${sessionId})
    `;
    return { success: true };
  } catch (error) {
    console.error('DB Error:', error);
    return { success: false, error: error.message };
  }
}

export async function getIssuePercentages() {
  try {
    const result = await sql`
      SELECT
        issue_id,
        COUNT(*) as count
      FROM issue_selections
      GROUP BY issue_id
    `;

    const total = result.rows.reduce((sum, row) => sum + parseInt(row.count), 0);

    const percentages = {};
    result.rows.forEach(row => {
      percentages[row.issue_id] = total > 0
        ? Math.round((parseInt(row.count) / total) * 100)
        : 0;
    });

    return percentages;
  } catch (error) {
    console.error('DB Error:', error);
    return {};
  }
}
*/

// ============================================================================
// OPTION B: SUPABASE IMPLEMENTATION (DEFAULT)
// ============================================================================
// This is the default implementation. Comment it out if using Vercel Postgres.

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export async function saveIssueSelection(issueId, issueLabel, sessionId) {
  try {
    const { error } = await supabase
      .from('issue_selections')
      .insert({ issue_id: issueId, issue_label: issueLabel, session_id: sessionId });

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('DB Error:', error);
    return { success: false, error: error.message };
  }
}

export async function getIssuePercentages() {
  try {
    const { data, error } = await supabase
      .from('issue_selections')
      .select('issue_id');

    if (error) throw error;

    const counts = {};
    data.forEach(row => {
      counts[row.issue_id] = (counts[row.issue_id] || 0) + 1;
    });

    const total = data.length;
    const percentages = {};
    Object.keys(counts).forEach(issueId => {
      percentages[issueId] = total > 0
        ? Math.round((counts[issueId] / total) * 100)
        : 0;
    });

    return percentages;
  } catch (error) {
    console.error('DB Error:', error);
    return {};
  }
}
