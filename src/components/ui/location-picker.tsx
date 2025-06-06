"use client";

import { useState, useCallback, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { MapPin, Navigation, AlertCircle } from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";
import { useToast } from "./use-toast";

const containerStyle = {
  width: "100%",
  height: "300px",
  borderRadius: "0.5rem",
};

const defaultCenter = {
  lat: 41.0082, // Istanbul coordinates
  lng: 28.9784,
};

interface LocationPickerProps {
  value?: {
    address: string;
    lat: number;
    lng: number;
  };
  onChange: (location: { address: string; lat: number; lng: number }) => void;
  disabled?: boolean;
}

export function LocationPicker({
  value,
  onChange,
  disabled,
}: LocationPickerProps) {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.LatLng | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasRequestedLocation, setHasRequestedLocation] = useState(false);
  const { toast } = useToast();

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const onMapClick = useCallback(
    (e: google.maps.MapMouseEvent) => {
      if (!e.latLng || disabled) return;
      setMarker(e.latLng);
      reverseGeocode(e.latLng);
    },
    [disabled]
  );

  const reverseGeocode = async (latLng: google.maps.LatLng) => {
    if (!latLng) return;
    setIsLoading(true);
    try {
      const geocoder = new google.maps.Geocoder();
      const response = await geocoder.geocode({
        location: { lat: latLng.lat(), lng: latLng.lng() },
      });

      if (response.results[0]) {
        onChange({
          address: response.results[0].formatted_address,
          lat: latLng.lat(),
          lng: latLng.lng(),
        });
      }
    } catch (error) {
      toast({
        title: "Hata",
        description: "Adres bilgisi alınamadı. Lütfen tekrar deneyin.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentLocation = useCallback(() => {
    if (disabled) return;
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          if (!isLoaded) return;
          const latLng = new google.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          );
          setMarker(latLng);
          map?.panTo(latLng);
          await reverseGeocode(latLng);
        },
        (error) => {
          toast({
            title: "Hata",
            description:
              "Konum bilgisi alınamadı. Lütfen konum izinlerini kontrol edin.",
            variant: "destructive",
          });
          setIsLoading(false);
        }
      );
    } else {
      toast({
        title: "Hata",
        description: "Tarayıcınız konum özelliğini desteklemiyor.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  }, [disabled, map, toast, isLoaded]);

  // Request location permission immediately when component mounts
  useEffect(() => {
    if (!hasRequestedLocation && !value?.lat && !value?.lng) {
      setHasRequestedLocation(true);
      getCurrentLocation();
    }
  }, [hasRequestedLocation, value, getCurrentLocation]);

  // Update map when location is set
  useEffect(() => {
    if (isLoaded && value?.lat && value?.lng && map) {
      const latLng = new google.maps.LatLng(value.lat, value.lng);
      setMarker(latLng);
      map.panTo(latLng);
    }
  }, [value, map, isLoaded]);

  if (loadError) {
    return (
      <div className="w-full h-[300px] bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-red-500">Harita yüklenirken bir hata oluştu.</p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-[300px] bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">Harita yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={value ? { lat: value.lat, lng: value.lng } : defaultCenter}
          zoom={13}
          onClick={onMapClick}
          onLoad={setMap}
          options={{
            disableDefaultUI: true,
            zoomControl: true,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
        >
          {marker && <Marker position={marker} />}
        </GoogleMap>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="absolute bottom-4 right-4 bg-white shadow-lg hover:bg-gray-50"
          onClick={getCurrentLocation}
          disabled={disabled || isLoading}
        >
          <Navigation className="h-4 w-4" />
        </Button>
      </div>

      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
        <Input
          value={value?.address || ""}
          onChange={(e) => {
            if (value) {
              onChange({ ...value, address: e.target.value });
            }
          }}
          placeholder="Adres"
          className="pl-10"
          disabled={disabled || isLoading}
        />
      </div>

      {!value?.address && (
        <div className="flex items-center space-x-2 text-sm text-amber-600 bg-amber-50 p-3 rounded-lg">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <p>
            Konumunuzu seçmek için haritaya tıklayın veya sağ alttaki butonu
            kullanarak mevcut konumunuzu alın.
          </p>
        </div>
      )}
    </div>
  );
}
