import { apiClient } from "./apiClient";

export interface PredictionRequest {
  dur: number;
  proto: string;
  service: string;
  state: string;
  spkts: number;
  dpkts: number;
  sbytes: number;
  dbytes: number;
  rate: number;
  sload: number;
  dload: number;
  sloss: number;
  dloss: number;
  sinpkt: number;
  dinpkt: number;
  sjit: number;
  djit: number;
  swin: number;
  stcpb: number;
  dtcpb: number;
  dwin: number;
  tcprtt: number;
  synack: number;
  ackdat: number;
  smean: number;
  dmean: number;
  trans_depth: number;
  response_body_len: number;
  ct_src_dport_ltm: number;
  ct_dst_sport_ltm: number;
  is_ftp_login: number;
  ct_ftp_cmd: number;
  ct_flw_http_mthd: number;
  is_sm_ips_ports: number;
}

export interface PredictionResponse {
  prediction: string;
  confidence: number;
}

export async function predictThreat(
  data: PredictionRequest
): Promise<PredictionResponse> {

  const response = await apiClient.post(
    "/prediction/predict",
    data
  );

  return response.data;
}