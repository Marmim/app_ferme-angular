
export interface Culture{
  nom: string;
  cultureCoefficient : number;
}
export interface Farm {
  id?: number,
  nom: string;
  region: string;
  commune: string;
  douar: string;
  cultures: string[];
  longitude: number;
  latitude: number;

}
export interface Modified {
  id?: number,
  nom: string;
  region: string;
  commune: string;
  douar: string;
  cultures: Culture[];
  longitude: number;
  latitude: number;

}
