'use client';

import { Button } from '@/components/ui/button';
import { Phone, Mail, Globe, MessageCircle, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ContactButtonsProps {
  phone?: string;
  email?: string;
  website?: string;
  whatsapp?: string;
  address?: string;
  className?: string;
  layout?: 'row' | 'column';
}

export function ContactButtons({
  phone,
  email,
  website,
  whatsapp,
  address,
  className,
  layout = 'row',
}: ContactButtonsProps) {
  const whatsappNumber = whatsapp || phone;
  const whatsappUrl = whatsappNumber
    ? `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`
    : null;

  const mapsUrl = address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address + ', Tarifa, Spain')}`
    : null;

  return (
    <div
      className={cn(
        'flex gap-2',
        layout === 'column' ? 'flex-col' : 'flex-wrap',
        className
      )}
    >
      {whatsappUrl && (
        <Button
          asChild
          variant="outline"
          size="sm"
          className="gap-2 border-green-300 text-green-700 hover:bg-green-50"
        >
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
        </Button>
      )}

      {phone && (
        <Button
          asChild
          variant="outline"
          size="sm"
          className="gap-2 border-ocean-300 text-ocean-700 hover:bg-ocean-50"
        >
          <a href={`tel:${phone}`}>
            <Phone className="h-4 w-4" />
            Call
          </a>
        </Button>
      )}

      {email && (
        <Button
          asChild
          variant="outline"
          size="sm"
          className="gap-2 border-driftwood-300 text-driftwood-500 hover:bg-sand-50"
        >
          <a href={`mailto:${email}`}>
            <Mail className="h-4 w-4" />
            Email
          </a>
        </Button>
      )}

      {website && (
        <Button
          asChild
          variant="outline"
          size="sm"
          className="gap-2 border-ocean-300 text-ocean-700 hover:bg-ocean-50"
        >
          <a href={website} target="_blank" rel="noopener noreferrer">
            <Globe className="h-4 w-4" />
            Website
          </a>
        </Button>
      )}

      {mapsUrl && (
        <Button
          asChild
          variant="outline"
          size="sm"
          className="gap-2 border-sunset-300 text-sunset-600 hover:bg-orange-50"
        >
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
            <MapPin className="h-4 w-4" />
            Directions
          </a>
        </Button>
      )}
    </div>
  );
}
