import { Campaign } from "@shared/schema";

export function exportToCSV(data: Campaign[], filename: string = 'campaigns.csv'): void {
  const headers = ['Campaign Name', 'Platform', 'Budget', 'Spent', 'Conversions', 'CTR', 'Status'];
  
  const csvContent = [
    headers.join(','),
    ...data.map(campaign => [
      `"${campaign.name}"`,
      campaign.platform,
      campaign.budget,
      campaign.spent,
      campaign.conversions,
      campaign.ctr,
      campaign.status
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
