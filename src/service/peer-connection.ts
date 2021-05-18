const STUN_SERVERS = [
  'stun.l.google.com:19302',
  'stun1.l.google.com:19302',
  'stun2.l.google.com:19302',
  'stun3.l.google.com:19302',
  'stun4.l.google.com:19302',
  'stun.ekiga.net',
  'stun.ideasip.com',
  'stun.iptel.org',
  'stun.rixtelecom.se',
  'stun.schlund.de',
  'stunserver.org',
  'stun.softjoys.com',
  'stun.voiparound.com',
  'stun.voipbuster.com',
  'stun.voipstunt.com',
];

export const createPeerConnection = () => new PeerConnection();

class PeerConnection {
  private conn;

  constructor() {
    const myPeerConnection = (this.conn = new RTCPeerConnection({
      iceServers: STUN_SERVERS.map(url => ({
        urls: url,
      })),
    }));

    myPeerConnection.onicecandidate = this.handleICECandidateEvent;
    myPeerConnection.ontrack = this.handleTrackEvent;
    myPeerConnection.onnegotiationneeded = this.handleNegotiationNeededEvent;
    myPeerConnection.removeTrack = this.handleRemoveTrackEvent;
    myPeerConnection.oniceconnectionstatechange = this.handleICEConnectionStateChangeEvent;
    myPeerConnection.onicegatheringstatechange = this.handleICEGatheringStateChangeEvent;
    myPeerConnection.onsignalingstatechange = this.handleSignalingStateChangeEvent;
  }

  handleICECandidateEvent = () => {
    console.log('handleICECandidateEvent');
  };
  handleTrackEvent = () => {
    console.log('handleTrackEvent');
  };
  handleNegotiationNeededEvent = () => {
    console.log('handleNegotiationNeededEvent');
  };
  handleRemoveTrackEvent = () => {
    console.log('handleRemoveTrackEvent');
  };
  handleICEConnectionStateChangeEvent = () => {
    console.log('handleICEConnectionStateChangeEvent');
  };
  handleICEGatheringStateChangeEvent = () => {
    console.log('handleICEGatheringStateChangeEvent');
  };
  handleSignalingStateChangeEvent = () => {
    console.log('handleSignalingStateChangeEvent');
  };
}
