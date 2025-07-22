export interface Camera {
  id: string;
  name: string;
  location: string;
  liveFeedUrl: string;
  createdAt: string;
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
