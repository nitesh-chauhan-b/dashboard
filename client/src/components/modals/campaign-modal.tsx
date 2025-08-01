import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Campaign } from "@shared/schema";

interface CampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaign?: Campaign | null;
  mode: 'view' | 'edit' | 'create';
  onSave?: (campaign: Partial<Campaign>) => void;
  onDelete?: (campaignId: string) => void;
}

export function CampaignModal({ isOpen, onClose, campaign, mode, onSave, onDelete }: CampaignModalProps) {
  const [formData, setFormData] = useState({
    name: campaign?.name || '',
    platform: campaign?.platform || '',
    budget: campaign?.budget || '',
    spent: campaign?.spent || '',
    conversions: campaign?.conversions || 0,
    ctr: campaign?.ctr || '',
    status: campaign?.status || 'active'
  });

  const platforms = ["Facebook", "Google Ads", "Instagram", "LinkedIn", "TikTok", "Twitter", "YouTube", "Snapchat"];
  const statuses = ["active", "paused", "completed"];

  const handleSave = () => {
    if (onSave) {
      onSave({
        ...formData,
        conversions: Number(formData.conversions),
        id: campaign?.id || Date.now().toString(),
        createdAt: campaign?.createdAt || new Date(),
        updatedAt: new Date()
      });
    }
    onClose();
  };

  const handleDelete = () => {
    if (campaign?.id && onDelete) {
      onDelete(campaign.id);
    }
    onClose();
  };

  const isEditable = mode === 'edit' || mode === 'create';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {mode === 'view' && 'Campaign Details'}
            {mode === 'edit' && 'Edit Campaign'}
            {mode === 'create' && 'Create New Campaign'}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Campaign Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              disabled={!isEditable}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="platform">Platform</Label>
            <Select
              value={formData.platform}
              onValueChange={(value) => setFormData({ ...formData, platform: value })}
              disabled={!isEditable}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select platform" />
              </SelectTrigger>
              <SelectContent>
                {platforms.map((platform) => (
                  <SelectItem key={platform} value={platform}>
                    {platform}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="budget">Budget ($)</Label>
              <Input
                id="budget"
                type="number"
                step="0.01"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                disabled={!isEditable}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="spent">Spent ($)</Label>
              <Input
                id="spent"
                type="number"
                step="0.01"
                value={formData.spent}
                onChange={(e) => setFormData({ ...formData, spent: e.target.value })}
                disabled={!isEditable}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="conversions">Conversions</Label>
              <Input
                id="conversions"
                type="number"
                value={formData.conversions}
                onChange={(e) => setFormData({ ...formData, conversions: parseInt(e.target.value) || 0 })}
                disabled={!isEditable}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="ctr">CTR (%)</Label>
              <Input
                id="ctr"
                value={formData.ctr}
                onChange={(e) => setFormData({ ...formData, ctr: e.target.value })}
                disabled={!isEditable}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => setFormData({ ...formData, status: value as Campaign['status'] })}
              disabled={!isEditable}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    <Badge variant={status === 'active' ? 'default' : status === 'paused' ? 'secondary' : 'outline'}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Badge>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {campaign && (
            <div className="text-sm text-muted-foreground space-y-1">
              <p>Created: {campaign.createdAt ? campaign.createdAt.toLocaleDateString() : 'N/A'}</p>
              <p>Updated: {campaign.updatedAt ? campaign.updatedAt.toLocaleDateString() : 'N/A'}</p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            {mode === 'view' ? 'Close' : 'Cancel'}
          </Button>
          
          {mode === 'edit' && campaign && (
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          )}
          
          {isEditable && (
            <Button onClick={handleSave} className="gradient-primary text-white">
              {mode === 'create' ? 'Create Campaign' : 'Save Changes'}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}