export interface Camera {
  id: string;
  name: string;
  location: string;
  createdAt: string; // Added to match your new schema
}

export interface IncidentWithCamera {
  id: string;
  type: string;
  tsStart: string;
  tsEnd: string;
  thumbnailUrl: string;
  resolved: boolean;
  camera: Camera;
}
