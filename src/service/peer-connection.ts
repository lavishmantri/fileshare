import { reportError } from '../utils/error';
import { getSocket } from './websocket';

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

let pConn: PeerConnection;

export const createPeerConnection = () => (pConn = new PeerConnection());

export const getPeerConnection = () => pConn;

class PeerConnection {
  public conn;
  public channel;

  constructor() {
    const myPeerConnection = (this.conn = new RTCPeerConnection({
      iceServers: STUN_SERVERS.map(url => ({
        urls: ['stun:stun.I.google.com:19302'],
      })),
    }));

    const channel = (this.channel = myPeerConnection.createDataChannel('file_transfer'));
    channel.binaryType = 'arraybuffer';

    channel.onopen = () => {
      console.log('Send channel open: ');
      // channel.send('Hi there!, Channel open');
    };

    channel.onclose = () => {
      console.log('Send channel close: ');
      // channel.send('Hi there!, Channel open');
    };

    channel.onmessage = evt => console.log('On channel msg: ', evt.data);

    myPeerConnection.onicecandidate = this.handleICECandidateEvent;
    myPeerConnection.ontrack = this.handleTrackEvent;
    myPeerConnection.onnegotiationneeded = this.handleNegotiationNeededEvent;
    myPeerConnection.removeTrack = this.handleRemoveTrackEvent;
    myPeerConnection.oniceconnectionstatechange = this.handleICEConnectionStateChangeEvent;
    myPeerConnection.onicegatheringstatechange = this.handleICEGatheringStateChangeEvent;
    myPeerConnection.onsignalingstatechange = this.handleSignalingStateChangeEvent;
  }

  handleICECandidateEvent = evt => {
    console.log('handleICECandidateEvent ', evt);

    if (evt.candidate) {
      getSocket().emit('new-ice-candidate', {
        candidate: evt.candidate,
      });
    }
  };
  handleTrackEvent = track => {
    console.log('handleTrackEvent ', track);
  };
  handleNegotiationNeededEvent = () => {
    console.log('handleNegotiationNeededEvent');

    this.conn
      .createOffer()
      .then(offer => {
        return this.conn.setLocalDescription(offer);
      })
      .then(() => {
        const socket = getSocket();
        socket.emit(
          'connection-offer',
          {
            name: socket.id,
            target: '',
            sdp: this.conn.localDescription,
          },
        );
      })
      .catch(err => console.error('Error handled ---- ', err));
  };
  handleRemoveTrackEvent = evt => {
    console.log('handleRemoveTrackEvent ', evt);
  };
  handleICEConnectionStateChangeEvent = evt => {
    console.log('handleICEConnectionStateChangeEvent ', evt);
  };
  handleICEGatheringStateChangeEvent = evt => {
    console.log('handleICEGatheringStateChangeEvent ', evt);
  };
  handleSignalingStateChangeEvent = evt => {
    console.log('handleSignalingStateChangeEvent ', evt);
  };
}

interface SessionDescription {
  type: string;
  name: string;
  target: string;
  sdp: RTCSessionDescription;
}

interface ICECandidate {
  type: string;
  target: string;
  candidate: string;
}

export const createOffer = () => {};

const handleConnectionOffer = (msg: any) => {
  pConn = createPeerConnection();
  const desc = new RTCSessionDescription(msg.sdp);

  pConn.conn
    .setRemoteDescription(desc)
    .then(stream => {
      console.log('Streaming... ', stream);
    })
    .then(() => pConn.conn.createAnswer())
    .then(answer => pConn.conn.setLocalDescription(answer))
    .then(() => {
      const socket = getSocket();
      socket.emit(
        'connection-accept',
        JSON.stringify({
          name: socket.id,
          target: '',
          sdp: pConn.conn.localDescription,
        }),
      );
    })
    .catch(err => console.error('Error handled ---- ', err));
};

const handleNewICECandidateMsg = msg => {
  const candidate = new RTCIceCandidate(msg.candidate);
  pConn.conn.addIceCandidate(candidate).catch(reportError);
};
