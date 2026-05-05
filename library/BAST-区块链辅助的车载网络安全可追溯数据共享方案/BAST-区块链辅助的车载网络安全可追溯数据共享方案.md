

# Page 1

4664
IEEE TRANSACTIONS ON INFORMATION FORENSICS AND SECURITY, VOL. 20, 2025
BAST: Blockchain-Assisted Secure and Traceable
Data Sharing Scheme for Vehicular Networks
Xinzhong Liu , Jie Cui , Senior Member, IEEE, Jing Zhang , Rongwang Yin, Hong Zhong ,
Lu Wei , Member, IEEE, Irina Bolodurina , and Debiao He , Member, IEEE
Abstract—In vehicular networks, caching service content on
edge servers (ESs) is a widely accepted strategy for promptly
responding to vehicle requests, reducing communication over-
head, and improving service experience. However, implementing
such an architecture requires addressing the challenges associated
with ES response data reliability and communication security.
In this study, to tackle the ES response data reliability issue, a
blockchain-assisted threshold signature scheme for cache-based
vehicular networks is proposed. The scheme utilizes a threshold
mechanism to sign the data broadcast by the ES, incorporates
blockchain to trace malicious signers, and avoids the shortcom-
ings and limitations associated with idealized assumptions for
the ES in existing data-sharing schemes. Moreover, considering
the communication security and high-speed mobility of vehicles,
using the non-interactive signatures of knowledge based on the
Σ-protocol, a secure and eﬃcient message authentication scheme
for vehicles and ESs is provided. Through rigorous security
proofs and comprehensive analyses, our scheme satisﬁes the
communication security requirements of vehicular networks.
By leveraging the JPBC library for performance analysis, the
proposed scheme demonstrates advantages as concerns both
computation and communication overheads compared to related
schemes. Moreover, we implemented the proposed scheme on an
Ethereum test network (i.e., Goerli) to validate its feasibility.
Index Terms—Vehicular networks, blockchain, threshold sig-
nature, signatures of knowledge, authentication.
I. INTRODUCTION
T
HE rapid advancement of information technology has
paved the way for a new paradigm of service-oriented
Received 16 February 2024; revised 24 September 2024, 26 January 2025,
and 16 April 2025; accepted 17 April 2025. Date of publication 29 April
2025; date of current version 8 May 2025. This work was supported in
part by the National Natural Science Foundation of China under Grant
U23A20308, Grant 62472003, Grant 62202008, and Grant 62302008; in
part by the Natural Science Foundation of Anhui Province, China, under
Grant 2408085JX010; and in part by the University Synergy Innovation
Program of Anhui Province under Grant GXXT-2022-049. The associate
editor coordinating the review of this article and approving it for publication
was Dr. Dusit Niyato. (Corresponding author: Jie Cui.)
Xinzhong Liu, Jie Cui, Jing Zhang, Hong Zhong, and Lu Wei are with the
Key Laboratory of Intelligent Computing and Signal Processing of Ministry
of Education, School of Computer Science and Technology, and Anhui
Engineering Laboratory of IoT Security Technologies, Anhui University, Hefei
230039, China (e-mail: cuijie@mail.ustc.edu.cn).
Rongwang Yin is with the Department of Basic Experiment and Training,
Hefei University, Hefei 230601, China (e-mail: rwyin@hfuu.edu.cn).
Irina Bolodurina is with the Faculty of Mathematics and Information
Technologies, Orenburg State University, 460018 Orenburg, Russia (e-mail:
prmat@mail.osu.ru).
Debiao He is with the School of Cyber Science and Engineering, Wuhan
University, Wuhan 430072, China, and also with Shanghai Key Laboratory
of Privacy Preserving Computation, MatrixElements Technologies, Shanghai
201204, China (e-mail: hedebiao@163.com).
Digital Object Identiﬁer 10.1109/TIFS.2025.3565372
applications in vehicular networks. In the vehicular networks,
vehicles within the network download application services,
encompassing navigation maps, voice broadcasts, and enter-
tainment content from the application service provider (ASP)
to improve the driving experience [1]. However, accessing
data directly from the ASP poses signiﬁcant challenges for
latency-sensitive applications and computationally intensive
tasks in vehicular networks. Employing this method not only
engenders signiﬁcant consumption of broadband resources,
placing substantial pressure on the network infrastructure,
but also leads to considerable delays in the communication
process [2]. Moreover, when vehicles submit a large volume
of service requests, this can overwhelm the ASP and result in
its performance bottleneck [3].
To address the limitations associated with vehicles obtaining
service data directly from the ASP, researchers have proposed
caching the ASP service content to an edge server (ES) in close
proximity to the vehicle [4]. Therefore, vehicles can directly
access service content from the ES, mitigate data center
bandwidth pressure, and enhance the driving experience [5].
However, in most cache-based vehicular networks, messages
transmitted between vehicles and ESs or roadside units (RSUs)
often utilize open and insecure communication channels, mak-
ing them vulnerable to interception, modiﬁcation, and replay
attacks [6]. To address these issues, an authentication protocol
is needed to ensure the security of message transmission in
cache-based vehicular networks [7]. A well-designed authen-
tication protocol should possess essential properties such as
authentication, integrity, and non-repudiation. Together, these
properties ensure that authentication schemes in cache-based
vehicular networks can eﬀectively protect user privacy and
communication security [8] and [9].
Most existing authentication schemes for vehicular networks
depend on a centralized and fully trusted remote authenti-
cation server to manage registration, authentication, and key
distribution for vehicles and other entities (i.e., RSUs and
ESs) [10]. The centralized authentication schemes in vehicular
networks require frequent interactions between the remote
authentication server, vehicles, and other entities. However,
these multi-party interactions introduce signiﬁcant authentica-
tion and communication delays, making them unacceptable
for resource-constrained vehicles (e.g., in vehicle-to-vehicle
scenarios based on IEEE 802.11n devices, the maximum
coverage range is 850 meters, and the throughput is 15 Mbps,
in vehicle-to-infrastructure scenarios based on IEEE 802.11n,
when the vehicle passes through the three infrastructures at
a speed of 100 km/h, the average eﬀective throughput is
1556-6021 © 2025 IEEE. All rights reserved, including rights for text and data mining, and training of artiﬁcial intelligence and
similar technologies. Personal use is permitted, but republication/redistribution requires IEEE permission.
See https://www.ieee.org/publications/rights/index.html for more information.
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:43:56 UTC from IEEE Xplore.  Restrictions apply. 



# Page 2

LIU et al.: BAST: BLOCKCHAIN-ASSISTED SECURE AND TRACEABLE DATA SHARING SCHEME
4665
9.83 Mbps) [11], [12]. Furthermore, centralized schemes are
vulnerable to single-point attacks, causing the leakage of
user privacy data (e.g., the attackers can use side channel
attacks to compromise the system and obtain the system
private key) [13]. Clearly, constructing a remote authentica-
tion server that fulﬁlls these ideal security requirements is
costly.
Blockchain provides a new approach to addressing the
limitations of centralized vehicular networks authentication
schemes [14], [15]. By abstracting data sharing between
vehicles into a transaction process between nodes in the
blockchain, and using a consensus algorithm to verify and
record these transactions, the shared data is recorded in the
blockchain and encrypted using hash encryption [16]. This
process ensures the tamper-proof and privacy of the data
and can meet the requirements for communication security
and data integrity in vehicular networks [17]. The chain
structure and timestamping ensure the continuity of vehicle
data-sharing transactions and the traceability of data sharing.
Additionally, the anonymity of the blockchain, combined
with a public-key-based authentication mechanism, eﬀectively
protects user privacy. Through blockchain, vehicular networks
can achieve a more secure and reliable method of data
sharing.
While blockchain-based vehicular networks enhance secu-
rity and enable distributed data storage for vehicle data
sharing, they also have certain limitations [18]. Speciﬁcally, in
vehicular networks, RSUs and base stations (BSs) function as
nodes within the blockchain, assuming critical roles in main-
taining network integrity and processing transactions. These
infrastructures connect with vehicles through communication
technologies (e.g., IEEE 802.11p or cellular communication
network), enabling vehicles to request and receive services
by executing blockchain transactions. In certain scenarios,
vehicles upload shared data to the blockchain, enabling drivers
and passengers to stay informed about road conditions [19].
However, malicious vehicles may spread false or harmful
data, causing traﬃc disruptions. The traceability of blockchain
provides favorable conditions for tracing malicious vehicles,
enhancing the overall security and reliability of vehicular
networks. Additionally, while vehicles have limited comput-
ing resources, they may still need to employ public key
or symmetric encryption algorithms to ensure secure com-
munication and protect the privacy of shared data [20]. In
light of these challenges, the following questions naturally
arise:
“How can traceability and communication security require-
ments be met with acceptable vehicle performance overhead?”
A. Contributions
In this study, we propose a blockchain-assisted secure
and traceable data sharing scheme for cache-based vehicu-
lar networks (BAST), which gives a positive answer to the
above questions. The main contributions of this work are as
follows.
1) We propose a blockchain-based threshold signature
scheme that employs threshold signatures for data broad-
cast by ES and utilizes RSUs to generate aggregate
signatures. By integrating blockchain into the cache-
based vehicular networks system, this scheme mitigates
the need for complete trust in the ES and provides a
traceable function for malicious signers. This design
makes our proposed signature scheme be more suitable
for the application of response data reliability in cache-
based vehicular networks data sharing.
2) We propose a non-interactive knowledge signature
scheme based on the Σ-protocol. Notably, the proposed
scheme eliminates the need for a remote authentica-
tion server, supporting eﬃcient and fast authentication
between vehicles and ESs. The design can make our
proposed signature scheme be more suitable for secur-
ing delay-sensitive applications in cache-based vehicular
networks data sharing.
3) The security analysis demonstrates that our scheme
fulﬁlls the security and privacy requirements of vehicular
networks while providing additional functions. Through
performance evaluation comparing our scheme with
related schemes, the results show that the performance
of the scheme is acceptable and suitable for deployment
in vehicular networks.
B. Organization of the Rest Paper
In Sections II and III, the technology relevant to this
study is introduced and some representative related works are
reviewed. In Section IV, we provide the detailed construc-
tion of the proposed scheme. The security and performance
analysis of this scheme are described in Sections V and VI.
In Section VII, we provide a comprehensive summary of
this scheme and indicate potential avenues for future research
directions.
II. RELATED WORK
This section summarizes the research on privacy and secu-
rity in vehicular networks, focusing on the aggregate signature
protocol for cache-based vehicular networks and blockchain-
assisted data sharing for vehicular networks.
A. The Aggregate Signature Authentication Protocol for
Cache-Based Vehicular Networks
In [10], to ensure the secure data sharing for cache-
based vehicular networks and establish secure communication
between vehicles and fog nodes (FNs). Zhang et al. designed
an eﬃcient authentication scheme for vehicles and FNs cache
content based on the TESLA protocol. Moreover, address-
ing the high-speed mobility of vehicles, a privacy-preserving
challenge and response mechanism based on Pedersen com-
mitment has been devised for communication between vehicles
and FNs. However, Cheng et al. [7] pointed out that this
scheme does not achieve message reliability.
In [3], through delegating authentication capabilities to dis-
tributed edge nodes (ENs), Yang et al. introduced an eﬃcient
and rapid mutual authentication protocol based on threshold
cryptography. With the help of multiple ENs that collaborate,
this scheme veriﬁes the authenticity of the vehicle identity and
issues tokens to permitted vehicles, which the vehicles use to
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:43:56 UTC from IEEE Xplore.  Restrictions apply. 



# Page 3

4666
IEEE TRANSACTIONS ON INFORMATION FORENSICS AND SECURITY, VOL. 20, 2025
accelerate up the second veriﬁcation phase. But, the scheme
has high computation and communication overheads [21], and
lacks considerations of access control to EN.
Later, to achieve access control for ENs in the cache-
based vehicular networks, Zhang et al. [22] proposed a secure
and eﬃcient data sharing mechanism based on multi-authority
ciphertext-policy attribute-based encryption. The scheme pro-
vides a ﬁne-grained access control for ES, ensuring that
only ES that complies with the vehicle requested access
policy has the ability to provide vehicle the necessary service.
Furthermore, this scheme facilitates eﬃcient and fast authenti-
cation for vehicles and ESs by integrating token mechanisms.
However, the attribute set has a signiﬁcant eﬀect on the
computational overhead of this scheme.
Previous research has indicated that cache-based vehicular
networks constitute a promising area of investigation. How-
ever, the openness of the vehicular networks communication
environment presents signiﬁcant challenges for the security
communications. Moreover, [3], [10], and [22] inadequately
addresses prevailing security and performance issues, such as
ensure the reliability of messages received by the vehicle,
and handle data simultaneously transmitted by multiple ESs.
Fortunately, several schemes have been proposed to tackle
these challenges in vehicular networks.
In [23], through employing message recovery signature
technology, Shen et al. proposed a secure and eﬃcient real-
time traﬃc data aggregation scheme for vehicular networks.
In this study, it achieves the validity veriﬁcation of vehicle
signatures, ensuring the security of traﬃc data. Moreover, it
provides batch veriﬁcation of signatures for multiple vehi-
cles. In this research, the aggregator is fully trusted and is
utilized to recover the original traﬃc data of vehicle [24],
which makes this scheme unsuitable for cache-based vehicular
networks.
In [25], Yang et al. proposed a privacy-preserving aggre-
gate authentication scheme for the security warning system
in fog-cloud vehicular networks, which employs pseudonym
mechanism achieves the anonymity of the vehicle. More-
over, the scheme employs signcryption algorithms to achieve
ciphertext aggregation and batch veriﬁcation. However, the
solution requires vehicles to be pre-loaded with pseudonyms,
resulting in high storage burden, and vulnerable to collusion
attacks [26].
For resist collusion attacks and establish traceability in
vehicular networks, Zhou et al. [27] introduced an anonymous
and traceable multi-authority ciphertext-policy attribute-based
encryption scheme designed for secure communication in edge
computing environments, which realizes access control to
ENs. This scheme employs signatures of knowledge to trace
malicious behaviors and provides detailed security proofs.
However, the scheme entails high computational overhead and
is unsuitable for vehicular networks characterized by high
delay sensitivity.
According to the foregoing, while the aggregated signature
authentication protocol holds considerable promise for appli-
cations in vehicular networks, it is burdened by unreasonable
security assumptions, vulnerability to various attacks, and
lacks the capability of trace malicious signers.
B. The Blockchain-Assisted Data Sharing Scheme for
Vehicular Networks
In [28], a mutual authentication mechanism for Internet
of Things (IoT) nodes was proposed, which utilizes both
public and private blockchains to enhance the eﬃciency of
node identity authentication and reduce dependence on remote
authentication servers. Moreover, considering the requirements
of delay-sensitive applications in the IoT environment, Cheng
et al. [29] integrated elliptic curve cryptography (ECC) and
blockchain to propose a mutual authentication scheme specif-
ically designed for IoT devices. However, Wang et al. [30]
pointed out that the authentication process of this scheme
incurs a high computational overhead.
In [31], to mitigate computational overhead and enhance
data sharing eﬃciency, Wang et al. introduced a blockchain-
assisted lightweight cross-domain message authentication
scheme for the IoT. This scheme employs ECC and hash
functions to realize lightweight cross-domain communication
for ES-assisted smart devices. However, this scheme involves
numerous interactions, and the ES assumptions are idealized.
Although the integration of blockchain into IoT for secure
data sharing holds signiﬁcant research potential, the direct
application of blockchain in vehicular networks faces major
challenges because to the frequent changes in network connec-
tions and the high mobility of vehicle. Fortunately, researchers
have devised innovative scheme to tackle these issues.
To enhance the security of vehicular networks com-
munication and improve the overall driving experience,
Feng et al. [32] proposed a privacy-preserving scheme for
vehicular networks by employing blockchain and attribute-
based encryption, which eliminates the need for a remote
authentication server to verify the credibly of transmitted
messages. Moreover, Lin et al. [33] employed signatures of
knowledge and smart contract to design a traceable one-time
public key authentication scheme. However, these schemes
may be vulnerable to compromised authorities attacks [34].
In [35], to address various attacks and ensure the reliability
of vehicle broadcast messages, Li et al. employed threshold
signatures and smart contracts to design a secure and trustwor-
thy announcement dissemination scheme for vehicular cloud
networks. Speciﬁcally, with the assistance of nearby vehicles,
this scheme utilizes threshold signatures and the reputation
mechanism of the blockchain to ensure the reliability of
the messages that vehicles broadcast. However, this scheme
neglects the utilization of ENs to broadcast traﬃc information,
aiming to alleviate the computation overhead on vehicles.
To fulﬁll the demands for frequent authentication of vehicles
and ENs in vehicular networks, while ensuring a seamless
service experience, Shen et al. [6] presented a secure and
eﬃcient blockchain-assisted authentication scheme designed
for ENs-integrated vehicular networks. In this scheme, the EN
directly queries the authentication results in the consortium
blockchain, enabling swift authentication of vehicles and edge
nodes. However, this scheme does not consider collusion
attacks and lacks a trace mechanism for malicious ENs.
Based
on
the
aforementioned
survey,
while
integrat-
ing blockchain into cache-based vehicular networks holds
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:43:56 UTC from IEEE Xplore.  Restrictions apply. 



# Page 4

LIU et al.: BAST: BLOCKCHAIN-ASSISTED SECURE AND TRACEABLE DATA SHARING SCHEME
4667
promising research prospects, the establishment of a reliable
and traceable data sharing scheme presents considerable chal-
lenges. Moreover, the imperative to design an eﬃcient and
fast authentication scheme based on vehicle characteristics is
crucial in cache-based vehicular networks.
III. BACKGROUND
A. System Model and Assumptions
Fig. 1 shows the cache-based data sharing system model in
vehicular networks, the trust authority (TA), blockchain, ES,
RSU, and vehicle are among the parties involved in this study.
The main communication methods are vehicle/RSU/ES/-to-TA
(V2T), vehicle-to-vehicle (V2V), vehicle-to-RSU/ES (V2I),
and vehicle-to-blockchain (V2B). V2T is for vehicle/RSU/ES/
to obtain encryption materials from TA through oﬄine reg-
istration. V2V is for vehicle-to-vehicle communication using
the IEEE 802.11p protocol. V2I is for vehicles to commu-
nicate with RSUs/ESs to obtain traﬃc information (e.g., road
conditions). V2B is for vehicles to request blockchain services
to trace malicious message signers or share ES traﬃc status.
The main functions and security assumptions of each entity
are described as follows.
• TA: It serves the responsibilities of the creating system
parameters. Moreover, it is responsible for generating
corresponding encryption materials for entities, deploying
smart contracts, and facilitating secure communication.
• Vehicle: Each vehicle has an onboard device that securely
and dependably takes out encryption and decryption
processes. Moreover, it is employed to conﬁrm that the
requested message is correct and that the aggregate sig-
nature is legitimate.
• ES: It is installed on both sides of the road, where it
uses the ASP to cache application and traﬃc-related data.
In response to vehicle queries, the ES is in charge of
disseminating the service type list and delivering related
information. Moreover, to enhance the credibility of the
message, multiple ESs independently sign the message.
• RSU: It is serves as a wireless infrastructure positioned
alongside roads, primarily tasked with providing network
connectivity, forwarding service information, and various
services to vehicles. Each RSU controls several ESs and
is in charge of aggregating the signatures that the ESs
produce.
• Blockchain: The blockchain provides immutable, unde-
niable, and veriﬁable data storage, which facilitates
the formation of transactions and the construction of
blockchains [36]. Speciﬁcally, we embed traceable private
keys within the transaction, enabling the identiﬁcation of
malicious signers based on these private keys, rather than
requiring the pre-loading of all traceable private keys in
the TA. We recommend that the BS (i.e., BS is assumed
to be a fully trusted entity and does not provide a pseudo
API [33]) join the network as a full node to provide
services to nearby RSUs and vehicles.
In this study, we assume that the onboard unit sensi-
tive material is uncompromised, and consider the TA as a
completely trustworthy entity it cannot be cracked [10]. To
Fig. 1. The cache-based vehicular networks data sharing system model.
get closer to real, we assume RSU is honest but curious
participants [22].
B. Security Objectives
To better reﬂect real-world scenarios, we assume that ES
may be malicious or compromised by attackers. However,
to ensure system security, we also assume that the attacker
can compromise only a limited number of ES, with this limit
determined by speciﬁc system parameters. The communication
channel between vehicles and ESs/RSUs is assumed to be
vulnerable to attackers who may eavesdrop, inject, transmit,
or even modify messages. Therefore, ensuring security and
privacy is paramount for maintaining secure communication
between vehicles and ESs/RSUs. In addition, we need to
consider the impact of blockchain with consensus mechanisms
on security objectives. We conducted a survey of existing
vehicular networks focusing on cached aggregate signature
authentication protocols such as [3], [10], [25], and [26], and
blockchain-based data sharing schemes such as [6], [32], [35],
and [37]. Based on this survey, we propose the following
security requirements for the BAST protocol.
• Message authentication: In vehicular networks, it is
imperative to authenticate the authenticity and legality of
transmitted messages. In this study, any altered or incor-
rect message cannot successfully pass the authentication
process.
• Malicious ES traceability: In real-world scenarios, ES
is assumed to be malicious or easily cracked by an
attacker. If an adversary cracks ES to obtain the signature
private key, the attacker/malicious ES may use the private
key to sign a false message and broadcast the message.
Therefore, it is necessary to make malicious ES traceable.
• Resistance
to
51%
attacks:
In
blockchain-based
schemes, the attacker can manipulate individual nodes to
verify fake blocks they generate by forcing them to cease
conﬁrming legitimate blocks [38]. Therefore, the BAST
protocol must ensure that an attacker cannot control the
majority of computing or consensus power (e.g., hashrate
in PoW [33]). If such control is achieved, the attacker
could reverse and modify historical transactions to obtain
trace keys and disseminate false messages.
• Resistance
collusion
attacks:
Malicious
ESs
may
collude with RSUs to generate fraudulent aggregate sig-
natures and tamper with transmitted messages, leading
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:43:56 UTC from IEEE Xplore.  Restrictions apply. 



# Page 5

4668
IEEE TRANSACTIONS ON INFORMATION FORENSICS AND SECURITY, VOL. 20, 2025
to the broadcast of false information. Additionally, an
attacker might control a group of ESs with the intent of
compromising the message signing mechanism, allowing
any message (including malicious or false information) to
be broadcast irrespective of its legitimacy. Therefore, the
scheme must resist collusion attacks and mitigate security
risks to the system.
• Resistance to modiﬁcation attacks: If the message
obtained by the receiver is inconsistent with the signed
message, the receiver must reject the message because
the message may have been modiﬁed and broadcast by
an attacker.
• Resistance to impersonation attacks of vehicle: The
attacker may use the identity information of the legitimate
vehicle to request the blockchain to trace the malicious
ES, then the blockchain should reject the message.
• Resistance to replay attacks: A malicious sender is
unable to collect and store a signed message to deliver
it after the original message has expired, making the
receiver believe that the communication is legitimate.
C. Schnorr Signature
In this study, the primary steps of the Schnorr signature
algorithm and hardness assumptions are as follows [39].
KeyGen(λ) →(sk, pk). Enter implicit security parameters λ
in the system. It randomly selects sk ∈Z∗
p as the signing key,
and computes the corresponding public key pk = gsk.
S ign(sk, m) →σ. The algorithm inputs the signing key sk
and the message m. The process of generating a signature σ is
as follows. It randomly selects an r ∈Z∗
p, computes the public
key R = gr, sign the R, m, and generates c = H(pk, R, m),
z = r + sk · c. Then, it outputs the signature σ = (R, z).
Veri fy(pk, m, σ) →0/1. The algorithm takes the pk, m, σ
as input, and the signature veriﬁcation process is as follows.
If the c = H(pk, R, m) and gz = pkcR indicate success output
1, otherwise, output 0.
• Discrete logarithm assumption: The discrete logarithm
assumption (DL) is deﬁned as follows. Assume that give
g, α ∈G, to compute β ∈Z∗
p such that α = gβ is negligible.
The following is the deﬁnition of the adversary A that can
solve the DL.
Pr[(G, g, p) ←K(n), β ∈Z∗
p : α ←A(G, g, p, gβ)]
≤negl(n].
D. ElGamal Encryption
The Diﬃe-Hellman computational assumption is the foun-
dation of the ElGamal encryption algorithm. According to
[27], the following outlines the speciﬁc steps of the algorithm.
KeyGen(1n) →(sk, pk). Enter implicit security parameters
n in the system. It randomly chooses secret keys sk ∈Z∗
p, and
calculates the corresponding public key pk = gsk.
Enc(pk, m) →ct. In the encryption algorithm, input the pk
and the message to be encrypted m. It randomly chooses u ∈
Z∗
p, and computes encrypted messages ct1 = gu, ct2 = mpku.
Then, it outputs the ciphertext ct = {ct1, ct2}.
Dec(sk, ct) →m. The decryption process involves input
the secret keys sk, ciphertext ct, and the message m can be
decrypted by calculating m = ct2
ctsk
1 .
E. Signatures of Knowledge
The signature of knowledge represents a distinctive signa-
ture technology that facilitates the process of signing messages
in a zero-knowledge manner [40]. This innovative approach
allows the signer to provide a signature without disclosing any
information or knowledge surrounding the signed message.
The speciﬁc steps of the algorithm are summarized below.
S etup(1k) →pp. Enter implicit security parameters k in the
system. Then, the system outputs public parameters pp.
S ign(pp, m, x, w) →σ. The algorithm inputs the pp, a
message m, and a diﬃculty relation (x, w) ∈R (where w is
a valid witness for x, and x is a statement). Then, it outputs
the signature σ.
Verify(pp, m, x, σ) →0/1. The algorithm inputs the pp,
m, x, and the signature σ. Then, if the σ is valid outputs 1,
otherwise, it outputs 0.
F. Non-Interactive Zero Knowledge Argument
The non-interactive zero-knowledge argument, encompasses
three key components (i.e., a single message that was
exchanged between prover P and veriﬁer V). Without learning
any additional relevant knowledge, the veriﬁer can convince
the prover that they have certain values. Let R be a relationship
that deﬁnes a language within NP, and (x, w) ∈R, where w is
a witness. It consists of three algorithms (i.e., K, P, V) and
satisﬁes the following properties [41].
• Completeness: For each K(1n) →crs and (x, w) ∈R. If
the probability equals 1, property is considered perfect.
This property is speciﬁcally described as follows.
Pr[π ←P(x, w, crs) : V(x, π, crs) = 1] ≥1 −negl(n)
• Soundness: For all probabilistic polynomial time (PPT)
adversary A, the probability as follows.
Pr
 crs ←K(1n), (x, π) ←A(crs) :
x < R ∧V(x, π, crs) = 1

≤negl(n).
• Zero-knowledge: The proof sent by P to V does not dis-
close any secret or additional information to V. Therefore,
the V gains no knowledge of secret information from the
proof.
G. Σ-Protocol
According to [42], the Σ-protocol is regarded as a 3-move
process that operates on the relationship R, where (x, w) ∈R
is a computable binary relation, x is a statement, and w is
a witness. The Σ-protocol is executed by a prover P and a
veriﬁer V that receive a common input x, ﬁnish interaction, a
triple (a, c, z) will be generated as the output of the protocol.
It has the following properties and hardness assumptions.
• Completeness: If P and V execute the protocol, input
(x, w) ∈R is always received by V.
• Special soundness: It is able to construct witness w for
each statement x employing the PPT algorithm Ext, given
two accepted (x, a, c, z) and (x, a, c∗, z∗), where c , c∗.
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:43:56 UTC from IEEE Xplore.  Restrictions apply. 



# Page 6

LIU et al.: BAST: BLOCKCHAIN-ASSISTED SECURE AND TRACEABLE DATA SHARING SCHEME
4669
• Special honest veriﬁer zero knowledge: From a known
c, there is a PPT algorithm Sim that produces an accept-
able (x, a, c, z) that is identical to the result of the actual
interaction between honest P and V.
• Decisional diﬃe-hellman assumption: The decisional
diﬃe-hellman assumption (DDH) is deﬁned as follows.
Assume that give g, gα, gβ, gr ∈G, decide r = αβ or
r ∈Z∗
p is negligible. The A can solve the DDH is deﬁned
as follows.
ˇˇˇˇˇˇˇˇ
Pr
 (G, p, g) ←K(1n), α, β, r ∈Z∗
p :
A
 (G, p, g) , gα, gβ, gr
= 1

−Pr
 (G, p, g) ←K(1n), α, β, r ∈Z∗
p :
A
 (G, p, g) , gα, gβ, gαβ
= 1

ˇˇˇˇˇˇˇˇ
≤negl(n).
H. Security Deﬁnition
•Deﬁnition 1 (Existential Unforgeability Against a Chosen
Message Attack with Traceability): In this scheme, while
meeting the requirements of unforgeability against a cho-
sen message attack, also needs to meet the requirements
of accountability. According to [43], the game deﬁnes the
advantage that the adversary has over the security parameter
λ in terms of unforgeability and traceability against the BAST
scheme. The adversary obtains the signature share and the
signer’s private key for the generated message m from the set
C. However, the adversary cannot generate a valid signature
σ using the acquired information, preventing the Trace from
either failing or incorrectly identifying the signer outside of
set C. This condition reﬂects the property of traceability. If
the signature share obtained by the adversary is below the
threshold t, a valid signature σ can still be generated. In
this phase, the Trace assigns some responsibility to the subset
Ct. According to the deﬁnition of the Trace in BAST, when
|Ct| ≥t, Ct is excluded from participating in the traceability
process. Therefore, the adversary has successfully compro-
mised the honest party and won the game. If the adversary
fails to win this game, BAST is considered unforgeable.
IV. PRESENTATION OF BAST
A. The Algorithm Description of the BAST
In the traditional threshold signature scheme, signatures
contributed by multiple users are aggregated, with an aggre-
gator responsible for generating aggregate signatures [44].
However, there may be illegal signers signing messages, and
the aggregator may aggregate the signature information of
malicious signers without being aware of their illegitimacy. In
this study, there exists a tracker that has the ability to trace the
identity of an illegal signer if it possesses the corresponding
trace key. According to [45], the following is an algorithm
description of the proposed scheme.
KeyGen(λ, n, t) →(pk, sk, skag, skt). In the execution of the
KeyGen algorithm, the security parameter λ, the number of
parties n, and the threshold t are all inputted as parameters.
Then, it outputs public key pk, private key sk of the ES, the
skag for the RSU, and skt for the blockchain.
S ign(ski, m,C) →σi. The inputs for the Sign algorithm are
the signer who uses its secret key ski, data m, and C, where
C represents the number of participating signers ES. Then, it
generates the corresponding signature σi for the ES.
Aggregate(skag, m,C, {σi}i∈C) →σ. The inputs for the
Aggregate algorithm are the skag, data m, C, and the signature
information σi generated from diﬀerent ESs. Then, it generates
aggregate signature σ and sends the vehicle.
Verify(pk, m, σ) →0/1. The Verify algorithm employs the
input public key pk to verify the legitimacy of the signature
σ on message m. If σ is a valid signature, it outputs 1,
otherwise, it outputs 0. Trace(skt, m, σ)
→C/ fail. The
blockchain employs a Trace algorithm to trace the members
of the signature based on the input trace key skt, the σ,
and m. If the signature member is successfully traced, the
algorithm outputs the member set C. Otherwise, it outputs
fail.
B. Detailed Construction of the BAST
The BAST framework is illustrated in Fig. 2 and can be
summarized as follows. First, during the system initialization
phase, the TA sets the system parameters and provides regis-
tration services for ES, RSU, and vehicle. Then, multiple ESs
collaboratively sign the broadcast message, which is then sent
to the RSU for the generation of an aggregate signature. The
RSU forwards the signature and message to the vehicle, which
veriﬁes the message and checks its legitimacy. If the veriﬁ-
cation fails, the vehicle submits a malicious signature trace
request to the blockchain. Finally, leveraging the immutability
of blockchain to trace the malicious signer.
• System Initialization: During this process, TA initializes
the system parameters and generates corresponding public,
private keys and other encryption materials for ES, RSU, and
vehicle, respectively.
KeyGen(λ, n, t) →(pk, sk, skag, skt). In the phase, the TA
selects a prime order p group G1 with two independent
generators g, h, and a hash function H : {0, 1}∗→Z∗
p.
Subsequently, computes the public and private key pair of
ES according to n, randomly selected sk1, . . . skn ∈Z∗
p (i.e.,
sk = {sk1, . . . , skn}), calculates the corresponding public key
pki = gski, i ∈[1, . . . , n] (i.e., pk∗= {pk1, . . . , pkn}). The
TA uses ElGamal algorithm to encrypt t, chooses randomly
ω ∈Z∗
p, computes T0 = gω, and T1 = gthω. Furthermore,
the TA provides the randomly generated private keys ske,
skrs
∈Z∗
p, and computes the corresponding public keys
pkt = gske and pkrs = gskrs, respectively. Here, TA generates a
pair of (skTA, vkTA) for sign and verify, where vkTA is known
publicly. During this period, TA assigns a unique identity
vidi for each legal vehicle, randomly generates the private
key kvidi ∈Z∗
p, and calculates the corresponding public key
pkvidi = gkvidi. Moreover, TA generate a unique certiﬁcate
Certvidi for the vehicle for identity veriﬁcation.
Finally, the TA sends pk = {pk∗, pkt, pkrs, vkTA, T0, T1} and
{vidi, kvidi,Certvidi} to the vehicle for veriﬁcation. Meanwhile,
the TA provides the combined key skag = {pk, skrs, t, ω} and
the trace key skt = {pk, ske, t} to the RSU and blockchain,
respectively. Moreover, each ES obtains its own signature
secret key ski issued by TA.
• ES Generate Signature: S ign(ski, m,C) →σi. In the
phase, to enhance the reliability of message m, multiple ESs
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:43:56 UTC from IEEE Xplore.  Restrictions apply. 



# Page 7

4670
IEEE TRANSACTIONS ON INFORMATION FORENSICS AND SECURITY, VOL. 20, 2025
Fig. 2. Framework of the BAST scheme.
Fig. 3. Sequence diagram of the BAST scheme.
collaborate to sign the broadcasted message m from the head
ES. The ES selects randomly ri ∈Z∗
p, computes Ri = gri,
ci = H(pk, Ri, m), and zi = ri + ski · ci. Finally, the ES sends
the signature σi = (Ri, zi) and message m to the RSU for
generate the aggregate signature. Moreover, to make it easier to
understand the interaction between entities, we give a sequence
diagram (i.e., Fig. 3).
• RSU Aggregate Signature:Agg(skag, m,C, {σi}i∈C) →σ.
In the phase, the RSU receives the signature information
σi from the ES. Subsequently, RSU obtains Ri with each
ES taking part in the present signing procedure, computes
R = Q
i∈C Ri, z = P
i∈C zi, c = H(pk, R, m), and checks
gz =
Q
i∈C pki
c·R through the signature information obtained
by ES. Next, RSU uses the ElGamal algorithm to encrypt z,
chooses randomly ρ ∈Z∗
p, computes ct1 = gρ, ct2 = gzpkρ
t .
The RSU chooses randomly (b1, . . . , bn) ∈{0, 1}n, if i = C,
calculates the gz =
Qt
i=1 (pki)bic·R, where bi = 1, C is a set of
size t of participating signers. Then, RSU generates knowledge
proof π = {z, ρ, η, w, κ1, . . . , κn, ε1, . . . , εn ∈Z∗
p} that can prove
that R and the encrypted z are valid. The RSU uses pravite
key skrs to sign the (skrs, (m, R, ct1, ct2, ψ)) for generate tg.
Finally, the RSU sends σ = {R, ct1, ct2, π, tg, TS exp} and m to
the vehicle, where TS exp is a timestamp.
• Vehicle Verify Signature: Verify(pk, m, σ) →0/1. In
this phase, once the vehicle receives the signature σ sent by
RSU, the vehicle performs the following steps. To ascertain
whether the message is new, the vehicle evaluates whether
the equation TS c ≤TS exp holds, where TS c represents the
timestamp at when the message was received. If not, vehicle
drops oﬀthe message. Otherwise, the vehicle veriﬁes the
legitimacy of signature and consistency of required message.
Due to the pk
=
{pk∗, pkt, pkrs, T0, T1} and computes
c
=
H(pk, R, m). If the vehicle uses the Schnorr ver-
iﬁcation algorithm accepts the (pkrs, (m, R, ct, π), tg), i.e.,
Verify(pkrs, (m, R, ct, π), tg) = 1. Moreover, the following is
the calculation of vehicle.
R ·
" tY
i=1
pki
κi
#c
?= gz,
ct1
?= gρ,
ct2
?= pkρ
t · gz.
T0
?= gλ,
T1
?=
 n
Y
i=1
gki
!
· hλ,
v0
?= gη,
vi
?= gκihi
η,
n
Y
i=1
vαi
i
?=
n
Y
i=1
hυi
i , bi(1 −bi)
?= 0, (i.e., bi ∈{0, 1}).
Algorithm 1 Blockchain Trace Malicious Signature
If the aforementioned equation is validated, it signiﬁes the
correctness of the message, allowing for its reception by
the vehicle. Otherwise, in the event of a failed veriﬁcation,
the reception of the message will be declined, necessitating the
reporting of such message to the blockchain to assist in the
identiﬁcation and trace of the signing member responsible for
the message.
• Blockchain Trace Signature: Trace(skt, m, σ) →C/ fail.
As shown in Algorithm 1, blockchain trace malicious signers
mainly steps as follows. The blockchain obtains the service
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:43:56 UTC from IEEE Xplore.  Restrictions apply. 



# Page 8

LIU et al.: BAST: BLOCKCHAIN-ASSISTED SECURE AND TRACEABLE DATA SHARING SCHEME
4671
request messages
˚
vid i, Cert vid i, m, σ, TS vid i
	
from the
vehicle. Then, the blockchain employs veriﬁcation processes to
validate the legitimacy of vehicles. Following a successful ver-
iﬁcation, by determining whether the equation TS B ≤TS vidi
holds, where TS B denote the blockchain receives message
timestamp. The blockchain drops oﬀthe connection if the
timestamp expired. Otherwise, to determine whether (m, σ) is
a legitimate signature, the blockchain employs the Schnorr sig-
nature veriﬁcation algorithm. If verify fail, blockchain returns
error.
If the above veriﬁcation is successful. The blockchain
retrieves {R, ct1, ct2, π, tg} based on vehicle request messages.
Then, computes signature c = H(pk, R, m), chooses randomly
z∗∈Z∗
p, uses the ElGamal algorithm decrypt {ct1, ct2}, and
computes gz∗=
ct2
ct1 ske . Then, the blockchain ﬁnds C ⊆[n],
calculates public key pkC = Q
i∈C pki, where the size of C is
equal to t. The blockchain calculation and veriﬁcation whether
the equation gz∗= R · (pkC)c holds. If not, the blockchain
then drops the connection and returns failure to the vehicle.
Otherwise, the blockchain sends C to the vehicle and records
the signers in the set C in the blockchain.
V. SECURITY ANALYSIS
In this section, we perform security proofs for the Σ-
protocol, utilizing both formal and informal proofs to analyze
the security of the proposed scheme. Here, we reference the
methods outlined in [27] and [33] to establish the security of
the proposed scheme structure.
A. Σ-Protocol Proof
We elucidate the Σ-protocol through the interaction between
the prover P and the veriﬁer V. Subsequently, provide the
security proof that this scheme satisﬁes the random oracle
model of knowledge signature security requirements. We pro-
vide the Σ-protocol statement of interaction as follows [46].
{g, h, h1, . . . , hn, pk1 = gsk1, . . . , pkn = gskn, pkt = gske,
T0 = gλ, T1 = gthλ, R = Q
i∈C Ri, ct = (ct1, ct2), v0 = gη,
v1 = gκ1h1η, . . . , vn = gκnhnη, α, c = H(pk, R, m)}, m
Moreover, the P has the witness z, ρ, η, w, κ1, . . . , κn,
ε1, . . . , εn,
and
selects
fz,
fρ,
fη,
fw,
( fκ1, . . . , fκn),
( fε1, . . . , fεn)
∈
Z∗
p
randomly.
The
P
computes
F1 = g fz ·
tQ
i=1
pkic· fκi , F2 = gfρ, F3 = pk
fρ
t
· g fz, F4 = gfw,
F5i
= g
Pn
i=1 fκi · hfw, F6
= g fη, for each i ∈{1, . . . , n},
F7i = gfκih
fη
i , F8i =
nQ
i=1
υ
αi fκi
i
h
fεi
i . Then, the P calculates
ϕ = H(pk, R, tg, F1, F2, F3, F4, F5i, F6, F7i, F8i, m). Finally, the
P computes Γ1 = fz + z · ϕ, Γ2 = fρ + ρ · ϕ, Γ3 = fη + η · ϕ,
Γ4 = fw + w · ϕ, for each i ∈{1, . . . , n}, Ki = fκi + κi · ϕ,
Vi
=
fυi + υi · ϕ, and sends (m, σ) to the V, where
σ = {Γ1, Γ2, Γ3, Γ4, (Ki, Vi)i∈[1,n], ϕ, R, tg}.
The V receives message (m, σ) from P. Then, V com-
putes F1
=
gΓ1/

Rϕ ·
tQ
i=1
pkic·Ki

, F2
=
gΓ2/ctϕ
1, F3
=
(pkΓ2
t
· gΓ1)/ctϕ
2, F4
= gΓ4/T ϕ
0 , F5i
=
 nQ
i=1
gKi · hΓ4

/T ϕ
1 ,
F6 = gΓ3/vϕ
0, for each i ∈{1, . . . , n}, F7i = (gKi · hΓ3
i )/vϕ
i ,
F8i =
 nQ
i=1
vαiKi
i
· hVi
i

/
 nQ
i=1
vϕαi
i

. Then, the veriﬁer V checks
if ϕ = H(pk, R, tg, F1, F2, F3, F4, F5i, F6, F7i, F8i, m).
Theorem 1: In the random oracle model, the presented
Σ-protocol scheme is a non-interactive zero-knowledge argu-
ment. The following is the Σ-protocol security proof.
Completeness. In this study, direct veriﬁcation follows to
ensure completeness.
Soundness. We demonstrate that the Σ-protocol is sound-
ness under the random oracle model, and the unforge-
ability
of
the
Schnorr
signature
scheme
depends
on
the DL assumption. Assume that an accepted argument
(m, σ) is generated by a PPT prover P, where σ
=
{Γ1, Γ2, Γ3, Γ4, (Ki, Vi)i∈[1,n], ϕ, R, tg}. Then, we construct a
such an extractor EXT, which rewind P
back to ora-
cle query H(pk, R, tg, F1, F2, F3, F4, F5i, F6, F7i, F8i, m) and
return the result to ϕ. It then reprograms the ϕ∗
=
H(pk, R, tg, F1, F2, F3, F4, F5i, F6, F7i, F8i, m) with ϕ , ϕ∗, and
continue the remaining execution of prover P. In expected
PPT, obtain another valid argument (m, σ∗), where σ∗=
{Γ∗
1, Γ∗
2, Γ∗
3, Γ∗
4, (K∗
i , V∗
i )i∈[1,n], ϕ∗, R∗, tg∗}. Then, extractor EXT
can computes as follows.
z = Γ1 −Γ∗
1
ϕ −ϕ∗,
ρ = Γ2 −Γ∗
2
ϕ −ϕ∗,
η = Γ3 −Γ∗
3
ϕ −ϕ∗,
w = Γ4 −Γ∗
4
ϕ −ϕ∗,
κi = Ki −K∗
i
ϕ −ϕ∗,
υi = Vi −V∗
i
ϕ −ϕ∗,
where i ∈[1, n], for the sake of brevity, we omit the modular
operation of the above equations.
According to the aforementioned description, with a
non-negligible possibility, it seems possible to eﬀectively
compromise the DL assumption. Therefore, the Σ-protocol
satisﬁes the criterion of special soundness.
Special honest veriﬁer zero knowledge. Without relying
on the conventional Fiat-Shamir heuristic, by construct-
ing simulator Sim a perfect zero-knowledge is established,
which simulates any interaction with the veriﬁer V. The
Sim randomly selects (m, σ∗∈Z∗
p), where σ∗
=
{Γ∗
1, Γ∗
2,
Γ∗
3, Γ∗
4, (K∗
i , V∗
i )i∈[1,n], ϕ∗, R∗, tg∗∈Z∗
p} and computes F∗
1 =
gΓ∗
1/

R∗ϕ∗·
tQ
i=1
pkic·K∗
i

, F∗
2 = gΓ∗
2/ctϕ∗
1 , F∗
3 = (pk
Γ∗
2
t
· gΓ∗
1)/ctϕ∗
2 ,
F∗
4 = gΓ∗
4/T ∗ϕ∗
0 , F∗
5i =
 nQ
i=1
gKi∗· hΓ4∗
/T ∗ϕ∗
1 , F∗
6 = gΓ∗
3/v∗ϕ∗
0 , for
each i ∈{1, . . . , n}, F7i∗= (gKi∗·hΓ3∗
i
)/vϕ∗
i , F7i∗= (gKi∗·hΓ3∗
i
)/vϕ∗
i .
Then, the simulator Sim sets the random oracle ϕ∗
=
OH(pk, R∗, tg∗, F∗
1, F∗
2, F∗
3, F∗
4, F∗
5i, F∗
6, F7i∗, F8i∗, m), and Sim
returns the result (m, {Γ∗
j} j∈[1,4],
(K∗
i , V∗
i )i∈[1,n], tg∗,
R∗, ϕ∗).
Moreover, the {Γj} j∈[1,4], (Ki, Vi)i∈[1,n], ϕ∗, R, tg in the Sim pos-
sess a same distribution as the result of a transcript that is
truthfully generated. Therefore, we demonstrate that the Σ-
protocol adheres to the zero-knowledge property.
B. Security Proof
In this section, we prove that the BAST protocol can
meet the security requirements of Deﬁnition1 (e.g., Section
III-H). We describe that the BAST satisﬁes unforgeability and
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:43:56 UTC from IEEE Xplore.  Restrictions apply. 



# Page 9

4672
IEEE TRANSACTIONS ON INFORMATION FORENSICS AND SECURITY, VOL. 20, 2025
traceability, ensuring that the malicious signer ES can be traced
by the blockchain or the adversary. That is, no PPT adversary
A can distinguish valid forgery of the BAST. To arrive at a def-
inition which is both formal and speciﬁc, we denote (n, t,C) ←
A(λ), where C ⊆[n], t is threshold, (pk, sk, skag, skt) ←
TKG(λ, n, t) as the trace key of ES generation algorithm,
σi ←S ign(ski, m,C) as the message share signature algorithm,
σ ←RAg(skag, m,C, {σi}i∈C) as the RSU aggregate signature
algorithm, {0, 1} ←Verify(pk, m, σ) as the vehicle veriﬁcation
algorithm, and C/fail ←BTrace(skt, m, σ) as the blockchain
trace signature algorithm.
Lemma
1:
This
BAST
protocol
Z
=
(Veri fy, BTrace RAg, TKG, S ign) is considered traceable
if for every adversary A that attacks BAST, there exists an
adversary B that operates almost simultaneously with A, such
that
AdvA,BAS T(λ) ≤(AdvN (λ)) · q(λ) + ε(λ),
where the rigor of proof system and knowledge errors are
denoted by q and ε.
Proof 1: The games following demonstrate this lemma.
Game 0. When A seeks assistance from challenger B with
an oracle query, challenger B will respond, and the detailed
process is as follows.
S end(ΠA, req). The A run A(λ), after receiving the query,
the challenger B outputs n, t,C for A, where t is the threshold
number, and C is the number of participants.
S end(ΠTA, req). When the challenger B receives the query
information, B randomly selected sk1, . . . skn ∈Z∗
p, calculates
the corresponding public key pki = gski, i ∈[1, . . . , n]. The B
computes T0 = gω and T1 = gthω for encrypt t. Moreover, the
B generates the random private key ske, skrs ∈Z∗
p, calculates
the corresponding public key pkt = gske and pkrs = gskrs,
respectively. Finally, the B generates the trace key skt =
{pk, ske, t}, public key pk = {pk∗, pkt, pkrs, vkTA, T0, T1}, and
the combined key skag = {pk, skrs, t, ω} for A.
S end(ΠES , m). When the challenger B receives the infor-
mation, B selects randomly Ri ∈G1, i.e., R = Q
i∈C Ri. Then,
the B computes c = H(pk, R, m), chooses randomly zi ∈Z∗
p,
gzi = pkc
i · Ri, and σi = (Ri, zi). Finally, the B sends the
signature information σi to the A.
S end(ΠRS U, m). When the challenger B receives the infor-
mation, B computes R
=
Q
i∈C Ri, z
=
P
i∈C zi, c
=
H(pk, R, m). Then, the B computes ct1 = gρ, ct2 = gzpkρ
t
through selects randomly ρ
∈
Z∗
p, and calculates the
gz =
Qt
i=1 (pki)bic · R, where bi = 1 if i ∈C. Then,
the B uses zero-knowledge proof knowledge to generate the
π = {z, ρ, η, λ, κ1, . . . , κn, υ1, . . . , υn}. Finally, the B sends the
signature information σ = {R, ct1, ct2, π, tg, TS exp} to the A,
where TS exp is a timestamp.
S end(Πvehicle, m). When the challenger B receives the infor-
mation, B computes c = H(pk, R, m), and valid of veriﬁcation
the (pkrs, (m, R, ct, π), tg), if the message is valid, the authen-
ticity of message is demonstrated by the ﬂag information that
the challenger B returns to A. Otherwise, B returns ⊥and
rejects the communication.
S end(ΠBlockchain, m). When the challenger B receives the
information, B veriﬁes the legitimacy of the message. If
the above veriﬁcation is successful, the B chooses randomly
z∗∈Z∗
p for computes gz∗=
ct2
ct1 ske . Then, the B calculates
pkC = Q
i∈C pki, where C ⊆[n]. Moreover, B calculation and
veriﬁcation whether the equation gz∗= R · (pkC)c holds. If
equal, the B return C to the A, otherwise, the B outputs the
fail to the A.
In conclusion, Game 0 simulates a real attack. If W0 is the
event that A wins in Game 0, we have.
AdvA,BAS T(λ) = Pr[W0].
Game 1. The A obtains the public key pk = {pk1, . . . , pkn,
pkt, pkrs, vkTA, T0, T1} and the combined key skag = {pk, t,
skrs, ω}. Game 1 is similar to Game 0, with the exception
that Game 1 that the A must outputs a valid forgery message
(m∗, σ∗), where σ∗= {R∗, ct∗
1, ct∗
2, π∗, tg∗, TS ∗
exp}.
We
established
adversary
A∗
for
the
Game
1,
the
A∗
initiates
a
request
to
A
until
it
obtains
{pk1, . . . , pkn, pkt, T0, T1, c∗,
R∗, ct∗
1, ct∗
2}.
Then,
A∗
run
the extractor A∗for the proof system (P, V), and outputs
a witness ψ = {z∗, ρ∗, η∗, κ∗
1, . . . , κ∗
n, λ∗, υ∗
1, . . . , υ∗
n}. If ψ is
a valid witness, A∗generates π∗and tg∗for computes σ∗.
Then, A∗outputs (m∗, σ∗, ψ).
According to the deﬁnition of extractor Ext, if W1 is the
event that A∗wins in Game 1, we have.
Pr[W1] ≥(Pr[W0] −ε(λ))/q(λ),
where the rigor of proof system and knowledge errors are
denoted by q and ε.
Game 2. The diﬀerences between Game 1 and Game 2 are
mostly because N has the same advantage over A∗in terms
of its capacity to compromise the security of the underlying
Schnorr signature. According to the above description, if W1
is the event, adversary N wins Game 2, we have.
AdvN (λ) ≥Pr[W1].
Finally, by combining equation Game 0-2, we have.
AdvA,BAS T(λ) ≤(AdvN (λ)) · q(λ) + ε(λ).
C. Informal Theoretical Security Analysis
In this section, we show that the BAST protocol can meet
the above security objectives (e.g., Section III-B). The detailed
analysis process is as follows.
1) Message Authentication: Building on the adopted Σ-
protocol ﬂawless completeness and soundness, PPT adver-
saries are incapable of forging valid messages and signatures.
Moreover, the message receiver can verify the authenticity of
the message by inspecting Verify(pkrs, (m, R, ct, π), tg) = 1
and Verify(pk, m, σ) →1 hold. The former is a proof used
to verify that π is valid, and the latter is used to ensure the
validity of messages and signatures.
2) Malicious ES Traceability: For the malicious signer ES,
this proposed scheme provides a traceability function. The
blockchain has the ability to ﬁnd a C ⊆[n] and the size of c
is equal to t, i.e., gz = R·
 Q
i∈C pki
c. Therefore, the proposed
scheme meets the malicious ES traceability.
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:43:56 UTC from IEEE Xplore.  Restrictions apply. 



# Page 10

LIU et al.: BAST: BLOCKCHAIN-ASSISTED SECURE AND TRACEABLE DATA SHARING SCHEME
4673
3) Resistance to 51% Attacks: The proposed scheme might
be compromised if a group of attackers controls more than half
of the processing power. However, we implement a blockchain
wherein the record nodes are trusted and resilient against
malicious attacks.
4) Resistance Collusion Attacks:
To prevent collusion
between ES and RSU for the generation of valid messages
and signatures. The vehicle veriﬁes the message and signature
received from the RSU. If the veriﬁcation failure, the receipt
of the message is rejected, and both the message and signature
are reported to the blockchain. The blockchain will obtain
the malicious ES of the signature by calculating the gz =
R·
 Q
i∈C pki
c. Moreover, we consider that multiple malicious
ESs collude to generate malicious signatures, sending their
individual signatures to the RSU to generation an aggregate
signature. The vehicle veriﬁes the validity of the signature
by calculating Verify(pkrs, (m, R, ct, π), tg) = 1, thereby pre-
venting malicious signature information. Therefore, the above
collusion attack is thwarted by the proposed scheme.
5) Resistance Modiﬁcation Attacks: The request will be
rejected if the vehicle or blockchain is unable to successfully
validate the received message and signature.
6) Resistance Impersonation Attacks of Vehicle: The pro-
posed scheme employs VerifyvkTA(Certvidi, vidi) →true and
TS B ≤TS vidi for legality veriﬁcation of the vehicle identity
before trace the signature of the messages reported by the
vehicle to the blockchain.
7) Resistance Replay Attacks: In this proposed scheme,
both the vehicle and the blockchain will reject replay requests
messages that do not pass timestamp freshness veriﬁcation.
D. Comparison of Security and Functionality
In this section, we conducted a security and functionality
comparison of the proposed scheme with comparable schemes
[3], [8], [35], and [47]. Since the analyses in [3], [8], [35],
and [47], are similar concerning security and functionality.
Here, we further analyze the security and functionality of
[3]. The scheme [3] employs a (t, n) threshold signature to
resist collusion attacks involving multiple ENs. Moreover,
the ENs in the scheme are capable of directly providing
services to vehicles. However, the scheme does not incorpo-
rate blockchain technology into the design of the vehicular
network. A detailed analysis of other security properties is
provided below.
1) Support Mutual Authentication: The scheme achieves
mutual authentication between vehicles and ENs by verify-
ing equations e(Y, P) = e(R1, Ppub) · e(H1(IDV||TS ||R1), R2)
and e
 P
k∈T σk

= e
 H(EXP), P
k∈T PKFk

. Only legitimate
vehicles with secret key skV = xH(IDV) can generate valid
Y = r1(skV + H1(IDV||TS ||R1)). Similarly, only legitimate
EN with the corresponding private key si can generate valid
signature.
2) Resistance to Replay Attacks: During authentication, the
vehicle transmits a message {IDV, Y, R1, R2, TS } to the EN. If
the included timestamp TS has expired, the proof {Y, R1, R2}
cannot be authenticated. Therefore, the scheme eﬀectively
resistance replay attacks.
TABLE I
COMPARISON OF SECURITY AND FUNCTIONALITY
3) Resistance to Impersonation Attacks: To impersonate a
legitimate vehicle, an attacker must generate a valid proof
Y = r1(skV + H1(IDV||TS ||R1)). However, without access to
the vehicle secret key skV, the attacker cannot construct a
veriﬁable Y. Even if the attacker attempts to forge a value
Y′ = r′r1(skV + H1(IDV||TS ||R1)) based on the intercepted Y,
the timestamp TS contained in Y′ would be expired, and thus
the proof would fail veriﬁcation by the EN. Therefore, the
scheme is capable of resisting vehicle impersonation attacks.
Table I provides a comparison of our scheme with schemes
[3], [8], [35], [47] in terms of security and functionality. The
results show that our scheme has greater advantages.
VI. PERFORMANCE EVALUATION
In this section, through a combination of theoretical anal-
ysis and experimental approaches, we implement a thorough
assessment to determine the eﬃcacy of the proposed scheme
and the performance of related schemes [3], [8], [35], [47].
In this study, we implements e : G1 × G1 →GT to achieve
an 80-bit security level. Constructed by P over on the curve
E : y2 = x3 + x mod p, the G1 with order q is an additive
group, where p and q are prime numbers with bit lengths of
160 bits and 512 bits, respectively. Furthermore, the ECC-
based scheme usually employs the prime numbers ¯p and
¯q. The additive group G on the non-singular elliptic curve
E : y2 = x3 + ax + b mod ¯p, where ¯p, ¯q are 160 bits prime
numbers, a, b ∈Z∗
¯p.
A. Computational Cost Analysis
We let Tebp, Tbp, Tbpm, Tecm, Tap, Th, Tsig, Tver, TAES , TB,
and TMAC denote the time needed to exponentiate operation
over GT, a bilinear pairing operation, a scale multiplication
operation over G1, a scale multiplication operation over G, a
point addition operation over G1, a MapToPoint hash operation
over Z∗
p, a message signature operation, a message veriﬁcation
operation, a symmetric encryption/decryption operation using
AES algorithm in cipher block chaining mode, a Bloom ﬁlter
lookup operation, and a message authentication code (MAC)
operation, respectively. Note, this scheme ignores for the time
required to perform XOR and || operations.
To facilitate the computation of the computational overhead
of [3], [8], [35], and [47], and the corresponding entities in
the proposed scheme, We utilizes the JPBC1 cryptography
library to measure the time taken for cryptographic operations
across various experimental platforms. We simulate the esti-
mated time required for vehicle, ES/RSU/EN, and TA/ASP to
1http://gas.dia.unisa.it/projects/jpbc/
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:43:56 UTC from IEEE Xplore.  Restrictions apply. 



# Page 11

4674
IEEE TRANSACTIONS ON INFORMATION FORENSICS AND SECURITY, VOL. 20, 2025
TABLE II
COMPUTATIONAL COST COMPARISON AMONG THE PROPOSED SCHEME AND RELATED SCHEMES
TABLE III
EXECUTION TIME OF BASIC OPERATIONS (MS)
perform cryptographic operations, employing Raspberry Pi 3
model B, common desktop computer, and cloud server (CS)
(ecs.t6-c1m1.large, 2 vCPU, 2 GiB, Ubuntu 18.04, 64 bits). As
indicated in Table III, the vehicle, ES, and CS execution times
are represented by the variables Time1, Time2, and Time3,
respectively.
A thorough study was conducted out to enable a thorough
knowledge of the computational and communication over-
heads of [3], [8], [35], and [47], and the proposed scheme.
Because the analysis of the [3], [8], [47], [35] is similar,
we will focus on a detailed analysis of the Yang et al.
[3] and our scheme. According to Table II, our theoretical
analysis provides valuable insights into the performance of
signature generation and veriﬁcation in the relevant schemes.
In this table, we let t represents the threshold of the threshold
signature or ring signature, and n represents the size of the
member set in the threshold signature.
Here, we conducted a detailed analysis of the computational
overhead of Yang et al. [3] in the signature generation and
signature veriﬁcation processes. In [3], the process of signature
generation and veriﬁcation is separated into two phases. In
the ﬁrst phase, the vehicle performs signature veriﬁcation in
collaboration with a consortium of ENs, which collectively
generate a valid token, the vehicle needs to perform (5 + 2t)
scale multiplication operations over G, (t+11) hash operations,
(t + 9) bilinear pairing operations, and (4t + 1) point addition
operations, therefore, the computational cost for the vehicle at
this phase is (5+2t)Tecm+(t+11)Th+(t+9)Tbp+(4t+1)Tap.
And this EN needs to perform 4t bilinear pairing operations,
(5t + 1) hash operations, t scale multiplication operation over
G1, and 2t point multiplication operations for the vehicle
generates a valid token, therefore, the computational cost for
the EN at this phase is 4tTbp + (5t + 1)Th + 2tTecm + tTbpm.
Fig. 4. Computational cost comparison for signature generation.
In the second phase, the vehicle needs to perform three scale
multiplication operations over G and three hash operations.
Therefore, the total computational overhead of the vehicle is
(8 + 2t)Tecm + (t + 14)Th + (t + 9)Tbp + (4t + 1)Tap. And
this EN needs to perform two hash operations, three bilinear
pairing operations, and one point multiplication operation over
G1 to verify the signature. Therefore, the total computational
cost of the EN is (4t + 3)Tbp + (5t + 3)Th + 2tTecm+
(t + 1)Tbpm.
In our scheme, the signature generation is composed of
two phases, to enhance the analytical rigor, we conducted
an in-depth examination of both phase in this scheme. In
the ﬁrst phase, to generate a shared signature, ES needs
to perform t exponentiate operations, t hash operations, t
point addition operations, and t scale multiplication operations
over G1, therefore, the computational cost for the ES at this
phase is t(Tebp + Th + Tecm + Tap). In the second phase, the
RSU receives the signature sent by ES and needs to perform
(4n + 4) exponentiate operations, one hash operation, (3t + 2)
scale multiplication operations over G1, (n + t) point addition
operations, and one message signature operation. Therefore,
the total computational overhead during signature generation
is (4n+t+4)Tebp+(t+1)Th+(4t+2)Tecm+(n+2t)Tap+Tsig.
In the signature veriﬁcation phase, when the vehicle receives
the aggregate signature sent by RSU, it needs to perform a
hash operation, a message veriﬁcation operation, (3n + t + 4)
exponentiate operations, and (2n + 3) scale multiplication
operations over G1 for verify the signature and message
credibility. Therefore, the total computational overhead during
signature veriﬁcation is Th+Tver+(3n+t+4)Tebp+(2n+3)Tecm.
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:43:56 UTC from IEEE Xplore.  Restrictions apply. 



# Page 12

LIU et al.: BAST: BLOCKCHAIN-ASSISTED SECURE AND TRACEABLE DATA SHARING SCHEME
4675
Fig. 5. Computational cost comparison for signature veriﬁcation.
According to [35], to present a more complex and practical
threshold signature environment, we let n = 1.5t, and the value
of threshold t changes from 2 to 20. To visually compare the
results, Fig. 4 and Fig. 5 show the computational overhead
of the relevant schemes in signature generation and signature
veriﬁcation, respectively. Analyzing Fig. 4 reveals that the
signature generation overhead of the proposed scheme is
the lowest. Speciﬁcally, compared with [3], [8], [35], and
[47], when the threshold t = 20, it is reduced compared
to the total computational overhead of related schemes are
about (4744.46 −603.522)/4744.46 = 87.28%, (3879.45 −
603.522)/3879.45 = 84.44%, (9571.89 −603.522)/9571.89 =
93.69%, (10278.4−603.522)/10278.4 = 94.13%, respectively.
Analyzing Fig. 5 illustrates that this schemes has a greater
computational overhead for signature veriﬁcation than related
schemes. This is primarily due to the fact that the signature
veriﬁcation in the proposed scheme is performed by the vehi-
cle. However, when both schemes utilize vehicles for signature
veriﬁcation, the proposed scheme demonstrates lower compu-
tational overhead compared to Baza et al. [8]. Speciﬁcally,
when the threshold t = 20, the proposed scheme reduce com-
putational overhead is about (5809.35 −3859.76)/5809.35 =
33.56%. Moreover, in this study, comparing the total over-
head of signature generation and signature veriﬁcation with
related schemes, this scheme has lower computational over-
head. Speciﬁcally, compared with [3], [8], [35], and [47],
the decrease in overall computational cost are about 17.92%,
53.51%, 53.93%, 56.62%, respectively.
B. Communication Cost Analysis
According to the existing scheme, p is 64 bytes and ¯p is 20
bytes, the elements G1 and G are represented using 128 bytes,
and 40 bytes, respectively. Moreover, the size of the timestamp
is set to 4 bytes and represented by T. And we consider the
random number, output of the MAC function, general hash
function, symmetric encryption/decryption, and message are
set to 20 bytes and represented by Z∗
p.
Since the analyses in [3], [8], [35], and [47], are similar
concerning communication overhead, our detailed analysis
delves into the calculation process of communication overhead
Fig. 6. Communication cost comparison for signature generation.
in both Yang et al. [3] and the proposed scheme. In [3],
we primarily analyze the communication overhead in the
signature (token) generation process. The vehicle sends a
request req = (IDV, Y = r1(skV + H1(IDV||TS ||R1), R1 =
r1H(IDV), R2 = r1P, TS ), and at least t ENs sends the message
{Vk = rk
2P, Wk = σk ⊕H2(Uk),C = EXP ⊕H3(Uk)}. Therefore,
the total ciphertext size required to generate a signature is
(2t + 3)|G1| + (t + 1)|Z∗
p| + |T|.
In this proposed scheme, generating a complete signature
involves two parts (i.e., the ES shared signature and the
aggregate signature generated by RSU). Therefore, when
calculating the communication overhead, the sum of these
two parts must be considered. These t ESs individually
send their signature information σi
=
{Ri
=
gri, zi
=
ri + ski · ci} to RSU, requesting the generation of a com-
plete signature, and the RSU sends this full signature
σ =
˚
R = Q
i∈C Ri, ct1 = gρ, ct2 = gzpkρ
t , π, tg, TS exp
	
. There-
fore, the total ciphertext size required to generate a signature
is (2t + 6)|G1| + (2n + t + 5)|Z∗
p| + 2|T|.
Based on the above theoretical analysis, we can determine
the communication overhead during the signature generation
process. As shown in Fig. 6, the comparison results of commu-
nication overhead between the proposed scheme and related
schemes are clearly visible. For [3], [8], [35], [47], and our
scheme, when the threshold t = 20, the total communica-
tion overhead is 5928 bytes, 5640 bytes, 7988 bytes, 5044
bytes, and 7596 bytes, respectively. Despite the notably higher
communication overhead observed in this scheme compared
to [3], [35], and [47], this discrepancy is primarily attributed
to the signature generation process, which necessitates RSU
aggregation. It should be noted that in practical scenarios
where RSU and ES are connected through wires network, the
actual communication overhead is expected to be lower than
what is indicated by theoretical analysis.
C. Blockchain-Related Costs Analysis
The proposed scheme is implemented on the Ethereum
test network Goerli2 for evaluate its feasibility for blockchain
2https://goerli.etherscan.io/
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:43:56 UTC from IEEE Xplore.  Restrictions apply. 



# Page 13

4676
IEEE TRANSACTIONS ON INFORMATION FORENSICS AND SECURITY, VOL. 20, 2025
Fig. 7. The deployment of smart contract.
implementation. Here, Goerli provides free fund requests
for the implementation of smart contracts and features a
user-friendly interface for block browsing. We connect the
Remix3 compiler in Chrome and the Ethereum network
Rinkeby employing the MetaMask4 plug-in in Google Chrome
for deploy and run the developed smart contract. Notably,
the Goerli network represents any blockchain based on the
Ethereum protocol, whether it is a public or private network.
Additionally, we do not consider the overhead in private
networks. The speciﬁc deployment and testing processes as
follows.
First
and
foremost,
we
utilize
MetaMask
to
create
two accounts (TA, vehicle) for evaluating this scheme,
designated
as
addresses
0 × 4861D85334EfB0c4cdD11a
19E33BAcB759b2F5
51,
and
0 × 945A81106aD17654
F075111469aC89b9A00B8f51.
Then,
switch
to
the
TA
account and request a certain amount of Ethers from Goerli
to load the private key trace the malicious signature into
the blockchain. In this way, the TA account is capable of
executing various operations, including vehicle identity veriﬁ-
cation, malicious signature trace, publishing malicious vehicle
information.
Besides, we perform the following operations as TA.
As shown in Fig. 7, we use Remix to deploy the smart
contract to the Goerli and obtain its address (i.e., 0 ×
5ae99bb5a1386b 660a7c195babf15f20ba89816b). Moreover,
we invoke the vehicle request algorithm using Remix and add
the vehicle request information to the Goerli, to assess the
overhead in transaction fees, we evaluated related operations,
including vehicle authentication, malicious signature trace, and
publishing malicious vehicle or signer information.
Last but not least, according to the data presented in
Table IV, the gas cost associated with the execution of the
pertinent operations has been determined. Speciﬁcally, the
exchange rate is 1 ETHER =2240.42 USD, the gas maximum
is 10,000,000 gas, and the average price per GAS is 1.5 GWEI.
According to Table IV, the deployment (i.e., Deploy), the
process with the highest cost associated with smart contracts,
costs about 4.064712255, but it only executes once. Moreover,
3https://remix.ethereum.org/
4chromewebstore.google.com/detail/nkbihfbeogaeaoehlefnkodbefgpgknn
TABLE IV
THE SMART CONTRACT OPERATION GAS COST
the cost for other operations is below 0.16, making it an
acceptable cost for blockchain transactions even with frequent
calls to these operations.
VII. CONCLUSION
Herein, we proposed a blockchain-assisted secure and trace-
able data sharing scheme for cache-based vehicular networks.
This scheme addressed the reliability of ES broadcast data and
achieved traceability of a malicious signer ES. Moreover, the
BAST enhanced the eﬃciency of vehicle veriﬁcation for ES
broadcast data using non-interactive signatures of knowledge
based on the Σ-protocol. Only a single interaction with the ES
was required to obtain the necessary data, which signiﬁcantly
improved the practicality of the scheme. According to the
security analysis, this scheme successfully met the vehic-
ular networks security objectives. In terms of performance
evaluation, our scheme demonstrated greater acceptability to
blockchain-assisted vehicular networks, speciﬁcally regarding
signature generation and traceability.
However, this scheme still faces challenges in improving the
eﬃciency of vehicle veriﬁcation, particularly due to limitations
in vehicle computing resources and network conditions. Future
research will focus on optimizing the vehicle veriﬁcation pro-
cess with lightweight encryption algorithms, edge computing,
and network optimization. For example, outsourcing vehicle
computing tasks to edge servers can further reduce veriﬁcation
overhead on the vehicle side. The edge server will be responsi-
ble for performing complex encryption and veriﬁcation tasks,
while the vehicle side will handle only lightweight computing
tasks. This approach will greatly improve system eﬃciency
and reduce the burden on the vehicle side.
VIII. ACKNOWLEDGMENT
The authors are very grateful to the anonymous referees for
their detailed comments and suggestions regarding this article.
REFERENCES
[1]
B. Baruah and S. Dhal, “A security and privacy preserved intelligent
vehicle navigation system,” IEEE Trans. Dependable Secure Comput.,
vol. 20, no. 2, pp. 944–959, Mar./Apr. 2023.
[2]
J. Zhang, R. Ying, J. Cui, H. Zhong, I. Bolodurina, and D. He, “Secure
and eﬃcient user-centric V2C communication for intelligent cyber-
physical transportation system,” IEEE Trans. Inf. Forensics Security,
vol. 19, pp. 7674–7689, 2024.
[3]
A. Yang, J. Weng, K. Yang, C. Huang, and X. Shen, “Delegating
authentication to edge: A decentralized authentication architecture for
vehicular networks,” IEEE Trans. Intell. Transp. Syst., vol. 23, no. 2,
pp. 1284–1298, Feb. 2022.
[4]
C. Wang, C. Chen, Q. Pei, Z. Jiang, and S. Xu, “An information-
centric in-network caching scheme for 5G-enabled Internet of Connected
Vehicles,” IEEE Trans. Mobile Comput., vol. 22, no. 6, pp. 3137–3150,
Jun. 2023.
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:43:56 UTC from IEEE Xplore.  Restrictions apply. 



# Page 14

LIU et al.: BAST: BLOCKCHAIN-ASSISTED SECURE AND TRACEABLE DATA SHARING SCHEME
4677
[5]
L. Bai, J. Cao, M. Zhang, and B. Li, “Collaborative edge intelligence
for autonomous vehicles: Opportunities and challenges,” IEEE Netw.,
vol. 39, no. 2, pp. 52–60, Mar. 2025.
[6]
M. Shen, H. Lu, F. Wang, H. Liu, and L. Zhu, “Secure and eﬃ-
cient blockchain-assisted authentication for edge-integrated Internet-of-
Vehicles,” IEEE Trans. Veh. Technol., vol. 71, no. 11, pp. 12250–12263,
Nov. 2022.
[7]
H. Cheng, J. Yang, M. Shojafar, J. Cao, N. Jiang, and Y. Liu, “VFAS:
Reliable and privacy-preserving V2F authentication scheme for road
condition monitoring system in IoV,” IEEE Trans. Veh. Technol., vol. 72,
no. 6, pp. 7958–7972, Jun. 2023.
[8]
M. Baza et al., “Detecting Sybil attacks using proofs of work and
location in VANETs,” IEEE Trans. Dependable Secure Comput., vol. 19,
no. 1, pp. 39–53, Jan. 2022.
[9]
Y. Zuo, C. Dai, J. Guo, Z. Guo, F. Xiao, and S. Jin, “Secure data sharing
for autonomous vehicles in mobile blockchain networks,” IEEE Netw.,
vol. 39, no. 2, pp. 166–175, Mar. 2025.
[10] X. Zhang, H. Zhong, C. Fan, I. Bolodurina, and J. Cui, “CBACS:
A privacy-preserving and eﬃcient cache-based access control scheme
for software deﬁned vehicular networks,” IEEE Trans. Inf. Forensics
Security, vol. 17, pp. 1930–1945, 2022.
[11] A. Matsumoto, K. Yoshimura, S. Aust, T. Ito, and Y. Kondo,
“Performance evaluation of IEEE 802.11n devices for vehicular
networks,” in Proc. IEEE 34th Conf. Local Comput. Netw., Oct. 2009,
pp. 669–670.
[12] J. Jansons, E. Petersons, and N. Bogdanovs, “Vehicle-to-infrastructure
communication
based
on
802.11n
wireless
local
area
network
technology,” in Proc. 2nd Baltic Congr. Future Internet Commun., Apr.
2012, pp. 26–31.
[13] A. T. Mozipo and J. M. Acken, “Analysis of countermeasures against
remote and local power side channel attacks using correlation power
analysis,” IEEE Trans. Dependable Secure Comput., vol. 21, no. 6,
pp. 5128–5142, Nov. 2024.
[14] X. Zhang, W. Xia, Q. Cui, X. Tao, and R. P. Liu, “Eﬃcient and trusted
data sharing in a sharding-enabled vehicular blockchain,” IEEE Netw.,
vol. 37, no. 2, pp. 230–237, Feb. 2023.
[15] L. Wei, Y. Zhang, J. Cui, H. Zhong, I. Bolodurina, and D. He,
“A threshold-based full-decentralized authentication and key agree-
ment scheme for VANETs powered by consortium blockchain,”
IEEE Trans. Mobile Comput., vol. 23, no. 12, pp. 12505–12521,
Dec. 2024.
[16] E. Zeydan, J. Baranda, J. Mangues-Bafalluy, S. S. Arslan, and Y. Turk,
“A trustworthy framework for multi-cloud service management: Self-
sovereign identity integration,” IEEE Trans. Netw. Sci. Eng., vol. 11,
no. 3, pp. 3135–3147, May 2024.
[17] S. K. Dwivedi, R. Amin, S. Vollala, and M. K. Khan, “B-HAS:
Blockchain-assisted eﬃcient handover authentication and secure com-
munication protocol in VANETs,” IEEE Trans. Netw. Sci. Eng., vol. 10,
no. 6, pp. 3491–3504, Nov. 2023.
[18] L. Wei, J. Cui, H. Zhong, I. Bolodurina, C. Gu, and D. He, “A decen-
tralized authenticated key agreement scheme based on smart contract
for securing vehicular ad-hoc networks,” IEEE Trans. Mobile Comput.,
vol. 23, no. 5, pp. 4318–4333, May 2024.
[19] X. Meng, B. Liu, X. Meng, Y. Liang, and H. Deng, “A lightweight
group authentication protocol for blockchain-based vehicular edge com-
puting networks,” IEEE Trans. Intell. Transp. Syst., vol. 25, no. 8,
pp. 8556–8567, Aug. 2024.
[20] S. K. Dwivedi, R. Amin, S. Vollala, and A. K. Das, “Design of
blockchain and ECC-based robust and eﬃcient batch authentication
protocol for vehicular ad-hoc networks,” IEEE Trans. Intell. Transp.
Syst., vol. 25, no. 1, pp. 275–288, Jan. 2024.
[21] X. Feng, Q. Shi, Q. Xie, and L. Wang, “P2BA: A privacy-preserving
protocol with batch authentication against semi-trusted RSUs in vehic-
ular ad hoc networks,” IEEE Trans. Inf. Forensics Security, vol. 16,
pp. 3888–3899, 2021.
[22] J. Zhang et al., “CBDDS: Secure and revocable cache-based distributed
data sharing for vehicular networks,” IEEE Trans. Mobile Comput.,
vol. 23, no. 6, pp. 6579–6591, Jun. 2024.
[23] J. Shen, D. Liu, X. Chen, J. Li, N. Kumar, and P. Vijayakumar,
“Secure real-time traﬃc data aggregation with batch veriﬁcation for
vehicular cloud in VANETs,” IEEE Trans. Veh. Technol., vol. 69, no. 1,
pp. 807–817, Jan. 2020.
[24] J. Wang, L. Wu, S. Zeadally, M. K. Khan, and D. He, “Privacy-
preserving data aggregation against malicious data mining attack for
IoT-enabled smart grid,” ACM Trans. Sensor Netw., vol. 17, no. 3,
pp. 1–25, 2021.
[25] Y. Yang, L. Zhang, Y. Zhao, K.-K.-R. Choo, and Y. Zhang, “Privacy-
preserving aggregation-authentication scheme for safety warning system
in fog-cloud based VANET,” IEEE Trans. Inf. Forensics Security,
vol. 17, pp. 317–331, 2022.
[26] G. Cheng et al., “Conditional privacy-preserving multi-domain authen-
tication and pseudonym management for 6G-enabled IoV,” IEEE Trans.
Inf. Forensics Security, vol. 19, pp. 10206–10220, 2024.
[27] X. Zhou, D. He, J. Ning, M. Luo, and X. Huang, “AADEC: Anony-
mous and auditable distributed access control for edge computing
services,” IEEE Trans. Inf. Forensics Security, vol. 18, pp. 290–303,
2023.
[28] Z. Cui et al., “A hybrid BlockChain-based identity authentication
scheme for multi-WSN,” IEEE Trans. Services Comput., vol. 13, no. 2,
pp. 241–251, Mar. 2020.
[29] G. Cheng, Y. Chen, S. Deng, H. Gao, and J. Yin, “A blockchain-
based mutual authentication scheme for collaborative edge computing,”
IEEE Trans. Computat. Social Syst., vol. 9, no. 1, pp. 146–158,
Feb. 2022.
[30] M. Wang, L. Rui, Y. Yang, Z. Gao, and X. Chen, “A blockchain-
based multi-CA cross-domain authentication scheme in decentralized
autonomous network,” IEEE Trans. Netw. Service Manag., vol. 19,
no. 3, pp. 2664–2676, Sep. 2022.
[31] F. Wang, J. Cui, Q. Zhang, D. He, C. Gu, and H. Zhong, “Blockchain-
based lightweight message authentication for edge-assisted cross-domain
industrial Internet of Things,” IEEE Trans. Dependable Secure Comput.,
vol. 21, no. 4, pp. 1587–1604, Aug. 2023.
[32] Q. Feng, D. He, S. Zeadally, and K. Liang, “BPAS: Blockchain-assisted
privacy-preserving authentication system for vehicular ad hoc networks,”
IEEE Trans. Ind. Informat., vol. 16, no. 6, pp. 4146–4155, Jun. 2020.
[33] C. Lin, X. Huang, and D. He, “EBCPA: Eﬃcient blockchain-based con-
ditional privacy-preserving authentication for VANETs,” IEEE Trans.
Depend. Secure Comput., vol. 20, no. 3, pp. 1818–1832, May/Jun. 2023.
[34] J. Noh, Y. Kwon, J. Son, and S. Cho, “Blockchain-based one-time
authentication for secure V2X communication against insiders and
authority compromise attacks,” IEEE Internet Things J., vol. 10, no. 7,
pp. 6235–6248, Apr. 2023.
[35] X. Li, X. Yin, and J. Ning, “Trustworthy announcement dissemination
scheme with blockchain-assisted vehicular cloud,” IEEE Trans. Intell.
Transp. Syst., vol. 24, no. 2, pp. 1786–1800, Feb. 2023.
[36] M. L¨ucking, F. Kretzer, N. Kannengießer, M. Beigl, A. Sunyaev,
and W. Stork, “When data ﬂy: An open data trading system
in vehicular ad hoc networks,” Electronics, vol. 10, no. 6, p. 654,
Mar. 2021.
[37] A. Shahidinejad and J. H. Abawajy, “Anonymous blockchain-assisted
authentication protocols for secure cross-domain IoD communications,”
IEEE
Trans.
Netw.
Sci.
Eng.,
vol. 11,
no. 3,
pp. 2661–2674,
May 2024.
[38] S. Rath, L. D. Nguyen, S. Sahoo, and P. Popovski, “Self-healing secure
blockchain framework in microgrids,” IEEE Trans. Smart Grid, vol. 14,
no. 6, pp. 4729–4740, Jun. 2023.
[39] C. P. Schnorr, “Eﬃcient identiﬁcation and signatures for smart cards,” in
Advances in Cryptology (CRYPTO). Cham, Switzerland: Springer, 1990,
pp. 239–252.
[40] M. Chase and A. Lysyanskaya, “On signatures of knowledge,” in Proc.
Annu. Int. Cryptol. Conf., Santa Barbara, CA, USA. Cham, Switzerland:
Springer, Aug. 2006, pp. 78–96.
[41] M. Blum, P. Feldman, and S. Micali, “Non-interactive zero-knowledge
and its applications,” in Providing Sound Foundations for Cryptography:
On the Work of ShaﬁGoldwasser and Silvio Micali. New York, NY,
USA: ACM, 2019, pp. 329–349, doi: 10.1145/3335741.3335757.
[42] M. Ciampi, G. Persiano, A. Scafuro, L. Siniscalchi, and I. Visconti,
“Improved OR-composition of sigma-protocols,” in Proc. 13th Int.
Conf. Theory Cryptography, Tel Aviv-Yafo, Israel. Cham, Switzerland:
Springer, Dec. 2015, pp. 112–141.
[43] D.
Boneh
and
C.
Komlo,
“Threshold
signatures
with
private
accountability,” in Proc. 42nd Annu. Int. Cryptol. Conf. (CRYPTO).
Cham, Switzerland: Springer, Aug. 2022, pp. 551–581.
[44] V. Shoup, “Practical threshold signatures,” in Proc. 19th Int. Conf.
Theory Appl. Cryptogr. Techn., Bruges, Belgium. Cham, Switzerland:
Springer, May 2000, pp. 207–220.
[45] J. Nick, T. Ruﬃng, and Y. Seurin, “MuSig2: Simple two-round
Schnorr multi-signatures,” in Proc. Annu. Int. Cryptol. Conf., Jan. 2021,
pp. 189–221.
[46] A. Fiat and A. Shamir, “How to prove yourself: Practical solutions
to identiﬁcation and signature problems,” in Proc. Conf. Theory Appl.
Cryptograph. Techn. Cham, Switzerland: Springer, 1986, pp. 186–194.
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:43:56 UTC from IEEE Xplore.  Restrictions apply. 



# Page 15

4678
IEEE TRANSACTIONS ON INFORMATION FORENSICS AND SECURITY, VOL. 20, 2025
[47] L. Li et al., “CreditCoin: A privacy-preserving blockchain-based incen-
tive announcement network for communications of smart vehicles,”
IEEE Trans. Intell. Transp. Syst., vol. 19, no. 7, pp. 2204–2220, Jul.
2018.
Xinzhong Liu is currently a Research Student with
the School of Computer Science and Technology,
Anhui University. His research focuses on the secu-
rity of vehicular ad hoc networks.
Jie Cui (Senior Member, IEEE) was born in Henan,
China, in 1980. He received the Ph.D. degree from
the University of Science and Technology of China
in 2012. He is currently a Professor and a Ph.D.
Supervisor of the School of Computer Science and
Technology, Anhui University. He has over 150
scientiﬁc publications in reputable journals, such
as IEEE TRANSACTIONS ON DEPENDABLE AND
SECURE COMPUTING, IEEE TRANSACTIONS ON
INFORMATION FORENSICS AND SECURITY, IEEE
JOURNAL ON SELECTED AREAS IN COMMUNICA-
TIONS, IEEE TRANSACTIONS ON MOBILE COMPUTING, IEEE TRANSAC-
TIONS ON PARALLEL AND DISTRIBUTED SYSTEMS, IEEE TRANSACTIONS
ON COMPUTERS, IEEE TRANSACTIONS ON VEHICULAR TECHNOLOGY,
IEEE TRANSACTIONS
ON INTELLIGENT TRANSPORTATION SYSTEMS,
IEEE TRANSACTIONS ON NETWORK AND SERVICE MANAGEMENT, IEEE
TRANSACTIONS ON INDUSTRIAL INFORMATICS, IEEE TRANSACTIONS
ON INDUSTRIAL ELECTRONICS, IEEE TRANSACTIONS ON CLOUD COM-
PUTING, IEEE TRANSACTIONS ON MULTIMEDIA, academic books, and
international conferences. His current research interests include applied cryp-
tography, the IoT security, vehicular ad hoc networks, cloud computing
security, and software-deﬁned networking (SDN).
Jing Zhang was born in Henan, China, in 1990.
She received the M.A.Eng. and Ph.D. degrees in
computer science from Anhui University in 2021.
She is currently an Associate Professor with the
School of Computer Science and Technology, Anhui
University. She has nearly 20 scientiﬁc publications
in reputable journals, such as IEEE TRANSAC-
TIONS ON DEPENDABLE AND SECURE COMPUT-
ING,
IEEE TRANSACTIONS
ON INFORMATION
FORENSICS AND SECURITY, IEEE JOURNAL ON
SELECTED AREAS IN COMMUNICATIONS, IEEE
TRANSACTIONS ON VEHICULAR TECHNOLOGY, IEEE TRANSACTIONS ON
INTELLIGENT TRANSPORTATION SYSTEMS, Information Sciences, Science
China Information Sciences, Vehicular Communications, and international
conferences. Her research interests include vehicular ad hoc networks, the
IoT security, and applied cryptography.
Rongwang
Yin
received the Ph.D. degree in
mechanics from the University of Science and Tech-
nology of China, Hefei, China. He is currently with
the Basic Experiment and Training Center, Hefei
University, Anhui, China. His current research inter-
ests include machine learning, reservoir numerical
simulation, and information security.
Hong Zhong was born in Anhui, China, in 1965.
She received the Ph.D. degree in computer science
from the University of Science and Technology of
China in 2005. She is currently a Professor and
a Ph.D. Supervisor with the School of Computer
Science and Technology, Anhui University. She has
over 200 scientiﬁc publications in reputable journals,
such as IEEE JOURNAL ON SELECTED AREAS
IN COMMUNICATIONS, IEEE TRANSACTIONS ON
PARALLEL AND DISTRIBUTED SYSTEMS, IEEE
TRANSACTIONS ON MOBILE COMPUTING, IEEE
TRANSACTIONS
ON DEPENDABLE
AND SECURE COMPUTING,
IEEE
TRANSACTIONS ON INFORMATION FORENSICS AND SECURITY, IEEE
TRANSACTIONS
ON INTELLIGENT TRANSPORTATION SYSTEMS, IEEE
TRANSACTIONS ON MULTIMEDIA, IEEE TRANSACTIONS ON VEHICU-
LAR TECHNOLOGY, IEEE TRANSACTIONS ON NETWORK AND SERVICE
MANAGEMENT, IEEE TRANSACTIONS ON CLOUD COMPUTING, IEEE
TRANSACTIONS ON INDUSTRIAL INFORMATICS, IEEE TRANSACTIONS ON
INDUSTRIAL ELECTRONICS, IEEE TRANSACTIONS ON BIG DATA, aca-
demic books, and international conferences. Her research interests include
applied cryptography, the IoT security, vehicular ad hoc networks, cloud
computing security, and software-deﬁned networking (SDN).
Lu Wei (Member, IEEE) is currently pursuing
the Ph.D. degree with the School of Computer
Science and Technology, Anhui University, Hefei,
China. He has over ten scientiﬁc publications in rep-
utable journals, such as IEEE TRANSACTIONS ON
INFORMATION FORENSICS AND SECURITY, IEEE
JOURNAL ON SELECTED AREAS IN COMMUNICA-
TIONS, IEEE TRANSACTIONS ON MOBILE COM-
PUTING, and IEEE TRANSACTIONS ON INTELLI-
GENT TRANSPORTATION SYSTEMS. His research
interests include vehicular ad hoc networks and
applied cryptography.
Irina Bolodurina received the Ph.D. degree from
South Ural State University. She is currently a Pro-
fessor and the Head of the Department of Applied
Mathematics, Orenburg State University. She has
participated in over 20 scientiﬁc projects supported
by the RFBR and other Russian scientiﬁc programs.
She has over 60 scientiﬁc publications in aca-
demic journals and international conferences which
indexing in Scopus and WoS. Her current research
interests include theory of optimal control, math-
ematical modeling, information analysis software,
control of social and economic systems, decision support systems, data
integration, and processing.
Debiao He (Member, IEEE) received the Ph.D.
degree in applied mathematics from the School
of Mathematics and Statistics, Wuhan University,
Wuhan, China, in 2009. He is currently a Professor
with the School of Cyber Science and Engineering,
Wuhan University, and Shanghai Key Laboratory
of Privacy Preserving Computation, MatrixElements
Technologies, Shanghai, China. His work has been
cited more than 10000 times at Google Scholar. He
has published over 100 research papers in refer-
eed international journals and conferences, such as
IEEE TRANSACTIONS ON DEPENDABLE AND SECURE COMPUTING, IEEE
TRANSACTIONS ON INFORMATION FORENSICS AND SECURITY, and the
Usenix Security Symposium. His main research interests include cryptography
and information security, in particular, cryptographic protocols. He was a
recipient of the 2018 IEEE Systems Journal Best Paper Award and the 2019
IET Information Security Best Paper Award. He is on the editorial board of
several international journals, such as Journal of Information Security and
Applications, Frontiers of Computer Science, and Human-Centric Computing
and Information Sciences.
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:43:56 UTC from IEEE Xplore.  Restrictions apply. 
