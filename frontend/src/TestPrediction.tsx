import { useState } from "react";
import { predictThreat } from "./services/prediction.service";

export default function TestPrediction() {

  const [result, setResult] = useState<any>(null);

  const handleClick = async () => {

    const prediction = await predictThreat({
      dur: 0,
      proto: "tcp",
      service: "http",
      state: "FIN",
      spkts: 1,
      dpkts: 1,
      sbytes: 100,
      dbytes: 200,
      rate: 1,
      sload: 1,
      dload: 1,
      sloss: 0,
      dloss: 0,
      sinpkt: 0,
      dinpkt: 0,
      sjit: 0,
      djit: 0,
      swin: 0,
      stcpb: 0,
      dtcpb: 0,
      dwin: 0,
      tcprtt: 0,
      synack: 0,
      ackdat: 0,
      smean: 0,
      dmean: 0,
      trans_depth: 0,
      response_body_len: 0,
      ct_src_dport_ltm: 0,
      ct_dst_sport_ltm: 0,
      is_ftp_login: 0,
      ct_ftp_cmd: 0,
      ct_flw_http_mthd: 0,
      is_sm_ips_ports: 0,
    });

    setResult(prediction);
  };

  return (
    <div style={{ padding: 40 }}>
      <button onClick={handleClick}>
        Test Prediction
      </button>

      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
}