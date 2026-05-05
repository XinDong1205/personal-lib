

# Page 1

2854
IEEE TRANSACTIONS ON NETWORK AND SERVICE MANAGEMENT, VOL. 20, NO. 3, SEPTEMBER 2023
Blockchain-Assisted Privacy-Preserving Trafﬁc
Route Management Scheme for Fog-Based
Vehicular Ad-Hoc Networks
Jing Zhang
, Huixia Fang, Hong Zhong
, Member, IEEE, Jie Cui
, Senior Member, IEEE,
and Debiao He
, Member, IEEE
Abstract—Trafﬁc route management is essential for reducing
trafﬁc jams and enhancing driving safety because of the growing
number of vehicles and frequent occurrence of trafﬁc accidents.
However, in vehicular ad-hoc networks (VANETs), real-time mes-
sages are transmitted via wireless channels, which can result
in security and privacy concerns. Existing proposals for traf-
ﬁc route management exist security vulnerabilities, as well as
high calculation and communication costs. Encouraged by this
fact, we design a lightweight trafﬁc route management scheme
for fog-based VANETs. In this scheme, vehicles utilize homomor-
phic encryption to encrypt their driving routes and then send the
encrypted information to a fog node. The trafﬁc management cen-
ter (TMC) decrypts the received ciphertexts that are aggregated
by the fog node and performs trafﬁc management according to
the decrypted data, without knowing individual route of each
vehicle. Furthermore, blockchain is used in the scheme to con-
duct public keys management of vehicles. Our detailed security
proof and analysis indicate that our proposal can meet the secu-
rity objectives of VANETs. Further, to demonstrate the feasibility
of the scheme, we also implement it in the Ethereum test network
(i.e., Rinkeby). Signiﬁcantly, the performance analysis demon-
strates that our proposal achieves a better performance than
other relevant representative schemes.
Index Terms—VANETs, privacy-preserving, trafﬁc route man-
agement, homomorphic encryption, blockchain.
I. INTRODUCTION
O
WING to the rapid growth in the number of vehicles and
the continuous progress of communication technology,
Manuscript received 24 October 2022; revised 7 January 2023; accepted 12
January 2023. Date of publication 19 January 2023; date of current version
9 October 2023. The work was supported in part by the National Natural
Science Foundation of China under Grant 62202008, Grant 62272002, Grant
62011530046, and Grant 61872001, in part by the Excellent Youth Foundation
of Anhui Scientiﬁc Committee under Grant 2108085J31, in part by the Natural
Science Foundation of Anhui Province, China under Grant 2208085QF196, in
part by the University Synergy Innovation Program of Anhui Province under
Grant GXXT-2022-049 and the Open Fund of Key Laboratory of Embedded
System and Service Computing (Tongji University), Ministry of Education
(No. ESSCKF 2022-04). The associate editor coordinating the review of this
article and approving it for publication was J.-H. Cho. (Corresponding author:
Hong Zhong.)
Jing Zhang, Huixia Fang, Hong Zhong, and Jie Cui are with the Key
Laboratory of Intelligent Computing and Signal Processing of Ministry of
Education, School of Computer Science and Technology, and the Anhui
Engineering Laboratory of IoT Security Technologies, Anhui University,
Hefei 230039, China (e-mail: zhongh@ahu.edu.cn).
Debiao He is with the School of Cyber Science and Engineering, Wuhan
University, Wuhan 430072, China (e-mail: hedebiao@163.com).
Digital Object Identiﬁer 10.1109/TNSM.2023.3238307
vehicular ad-hoc networks (VANETs) have become promi-
nent research topics in both academia and industry recently.
VANETs consist of three fundamental components for build-
ing an intelligent transportation system (ITS), such as vehi-
cles, roadside units (RSUs), and trusted authorities (TAs). In
VANETs, there are two main types of communication includ-
ing vehicle-to-vehicle (V2V) and vehicle-to-infrastructure
(V2I) [1], [2]. In V2V communication, the vehicle periodically
broadcasts trafﬁc-related messages such as its speed, loca-
tion, driving route, and so on, which can be used to enhance
driving safety and reduce trafﬁc accidents. In V2I communi-
cation, infrastructure such as an RSU is required to provide
some trafﬁc-related services to nearby vehicles. The lead-
ing communication technologies for realizing V2V and V2I
communications are IEEE 802.11p and cellular networks [3].
Although VANETs have extensive applications and provide
signiﬁcant beneﬁts, the prevailing security and privacy con-
cerns cannot be ignored. VANETs are susceptible to multiple
attacks owing to the public wireless networks used in V2V and
V2I communication [4]. Without a secure protection mecha-
nism for communication, messages transmitted in VANETs
can be easily modiﬁed by the attackers [5]. For instance, driv-
ing route information can be altered maliciously to result in
a trafﬁc congestions, and speed information can be modiﬁed
to result in a trafﬁc accident. Therefore, trafﬁc-related com-
munications can affect personal life and property safety, it
is extremely indispensable to design a message authentication
scheme that is suitable for both V2V and V2I communications.
Because the number of vehicles is growing rapidly, the
need for processing the associated data similarly expands.
For example, trafﬁc route aggregation and trafﬁc sensing both
require real-time trafﬁc data produced by vehicles. Thus, to
collect as well as process the data, cloud computing technol-
ogy is introduced into the traditional VANETs architecture.
However, cloud computing servers are far away from vehi-
cles, which leads to great energy consumption and high
latency [6], [7]. For overcoming these drawbacks, fog com-
puting technology has been introduced to build the vehicular
network models. In fog-based vehicular networks, fog nodes
with certain computing and storage capabilities are distributed
at the edge of the network, it can process the data that
generated by vehicles more timely [8], [9]. A fog node
can be any device, such as an RSU or a powerful server.
The fog-based VANETs environments have several distinctive
1932-4537 c⃝2023 IEEE. Personal use is permitted, but republication/redistribution requires IEEE permission.
See https://www.ieee.org/publications/rights/index.html for more information.
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:53 UTC from IEEE Xplore.  Restrictions apply. 



# Page 2

ZHANG et al.: BLOCKCHAIN-ASSISTED PRIVACY-PRESERVING TRAFFIC ROUTE MANAGEMENT SCHEME
2855
Fig. 1.
Typical VANETs structure.
features, including low latency, location awareness, support for
more edge nodes and wide geographical distribution [10].
In order to simultaneously achieve privacy and secu-
rity, designing a privacy-preserving authentication mechanism
is essential. During recent years, several various privacy-
preserving authentication schemes have been proposed. These
schemes can be divided into four types: public key infras-
tructure (PKI), identity-based, certiﬁcateless, and blockchain-
based. we ﬁnd that the PKI-based schemes are usually efﬁcient
and easy to implement, but the majority of them need great
storage costs. Existing ID-based schemes have problems with
key escrow and key revocation. In key escrow, the secret key of
the vehicle is generated by the key generation center (KGC).
However, if the KGC is compromised, the entire system is
vulnerable to attack. Afterward, the key escrow problem has
been solved using certiﬁcateless schemes, where the secret key
of a vehicle is produced by both the KGC and itself. However,
the key revocation problem remains unsolved in ID-based and
certiﬁcateless schemes.
Blockchain technology has recently been introduced to
the VANETs environment, and has drawn the attention of
researchers in the realm of VANETs, because in the context of
solving the above-mentioned security and performance prob-
lems, it affords the features of anonymity, decentralization, and
immutability [11], [12]. Speciﬁcally, public information such
as public keys, pseudonyms, and certiﬁcates can be managed
by a smart contract in the blockchain, so that the authentication
and revocation can be realized effectively. In addition, dur-
ing authentication, it only needs to retrieve public information
from the blockchain and not involve store new data into the
blockchain.
To address the above-mentioned drawbacks, we design a
blockchain-assisted privacy-preserving vehicle route manage-
ment scheme for trafﬁc management with a fog computing
model, which is built by applying lightweight cryptographic
technologies. In this scheme, each vehicle uses homomorphic
encryption to encrypt its driving routes. Next, it transmits
the ciphertext to the fog node, which aggregates all vehicle
routes. After aggregation, the fog node transmits the aggre-
gated routes (not the route for each individual vehicle) to the
TMC. Subsequently, the TMC decrypts the ciphertext, thus
receiving the total number of vehicles in each segment without
knowing their individual routes, The TMC can then conduct
trafﬁc management accordingly.
A. Our Contributions
The following are the main contributions of this paper that
summarized by us.
• We propose a novel privacy-preserving vehicle route
management scheme with a fog computing model based
on elliptic-curve cryptography and homomorphic encryp-
tion algorithm. To guarantee the privacy of vehicle users,
the TMC only knows the total number of vehicles in
each segment without knowing the individual route of
each vehicle. In addition, the scheme can support batch
veriﬁcation and is more appropriate for securing delay-
sensitive applications in VANETs using a fog computing
model.
• Blockchain is adopted to record the anonymous public
keys of vehicles. Based on smart contract technology, it
can perform update, query, and delete the public keys of
vehicles that are recorded on the blockchain. In addition,
during the authentication process, it does not require the
trusted authority (TA) to be online, which can reduce the
TA’s workload.
• We provide a formal proof to indicate that the proposal
is extremely secure and efﬁcient. Meanwhile, the secu-
rity analysis demonstrates that it can achieve several
essential security objectives in VANETs. Additionally,
the performance analysis reveals that the proposal can
exhibit better performance than other related representa-
tive schemes.
B. Organization
Section II shows some related works. The preliminaries
and background are demonstrated in Section III, including the
system model, security objectives, and related preliminaries.
We show the detailed process of our scheme in Section IV.
The security proof and analysis are provided in Section V.
Next, the performance analysis is introduced in Section VI.
Finally, we draw the conclusion in Section VII.
II. RELATED WORK
A. Privacy and Security Research
To realize effective message authentication and ensure
secure privacy-preserving mechanism in vehicular communi-
cation, lots of beneﬁcial schemes have been proposed. In 2007,
Raya and Hubaux [13] ﬁrst designed a PKI-based scheme to
achieve CPPA, in which a lot of anonymous public/private key
pairs and the corresponding certiﬁcates are required to preload
in vehicle’s TPD, which brings about signiﬁcant communica-
tion and storage overhead. Additionally, complex operations
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:53 UTC from IEEE Xplore.  Restrictions apply. 



# Page 3

2856
IEEE TRANSACTIONS ON NETWORK AND SERVICE MANAGEMENT, VOL. 20, NO. 3, SEPTEMBER 2023
are required to revoke the anonymous certiﬁcate. For solving
the storage problems, Lu et al. [14] introduced an effective
CPPA scheme where vehicles could ask for anonymous keys
from their nearby RSUs. Even though it improves the stor-
age efﬁciency of OBU, frequent interactions could result in
a high authentication delay. Khodaei and Papadimitratos [15]
proposed a practical scheme to distribute certiﬁcate revoca-
tion list in vehicle-centric system, which demonstrated that
the scheme is highly efﬁcient, scalable, and can withstand DoS
attacks.
Since PKI-based schemes need to transmit digital certiﬁ-
cates, the transmission delay and storage overhead may bring
about a great effect on performance, especially when the
number of vehicles is highly large. Thus, a lot of identity-
based authentication schemes are designed over recent years.
Zhang et al. [16] introduced an efﬁcient identity-based batch
signature veriﬁcation scheme for VANETs. In their designed
scheme, it can support batch veriﬁcation and an RSU can
verify multiple received signatures simultaneously, which can
reduce the total veriﬁcation time. Chim et al. indicated that
many traditional schemes highly depended on a unhackable
hardware device, which is unrealistic. Thus, they designed
a software-based solution [17] which established two shared
secrets with RSU and TA, and used the techniques of binary
search and bloom ﬁlter to enhance the effectiveness of the
veriﬁcation phase. Liu et al. [18] introduced the concept of
proxy vehicles to the VANETs. In their scheme, the proxy
vehicles can authenticate multiple messages simultaneously,
which can enhance authentication efﬁciency. Bagga et al. [2]
proposed a bilinear pairing-based access control and key agree-
ment scheme for smart transportation, it can ensure the secure
communication among vehicles.
However, these related schemes are mostly pairing-based,
which leads to high computational overhead. Therefore, some
schemes are proposed without using bilinear pairing. In 2015,
He et al. [19] ﬁrstly introduced an effective identity-based
CPPA scheme, which is constructed on ECC rather than
bilinear pairing. It has a better advantage in both communi-
cation cost and computation cost over other related schemes.
Cui et al. [20] introduced a protocol on the basis of edge
computing that used ECC cryptography, it supported batch
veriﬁcation with low low redundancy authentication rate.
Zhang et al. [21] proposed a CPPA scheme that is on the
basis of ECC and Chinese remainder theorem in VANETs,
their scheme settles the key leakage issue and the TPDs do
not need to store system secret, which ensures the security of
the whole system. Han et al. [22] designed an effective pairing-
free aggregate signature scheme that is based on certiﬁcateless
in VANETs, which supports batch veriﬁcation and aggregate
signature technique so that it can reduce the communication
overhead.
B. Blockchain-Based Authentication Schemes
During recent years, lots of authentication schemes that
are based on blockchain in VANETs have been proposed. To
protect the privacy of vehicles, Lu et al. [23] designed an efﬁ-
cient blockchain-based scheme to achieve authentication for
vehicular communication. They utilize blockchain to record all
certiﬁcates and transactions, and construct a new data struc-
ture named Merkle Patricia Tree to expand the traditional
blockchain structure. However, the generation of anonymous
certiﬁcates requires frequent interactions between vehicles and
certiﬁcation authorities. Lin et al. [24] designed a CPPA
scheme that integrated blockchain technology and key deriva-
tion algorithm to manage certiﬁcates. But it required CA to
update the public key of vehicles frequently, which lead to
signiﬁcant communication overhead and delay. Yao et al. [25]
proposed a blockchain-assisted authentication scheme for
vehicular fog environment. In their scheme, a vehicle can
determine whether to be authenticated again or not when it
enters a new space. Meanwhile, the scheme can eliminate
the communication between service managers by adopting
blockchain.
In 2020, Ma et al. [26] introduced an effective mechanism
with blockchain technology to address key management issues
for vehicular communications, which can achieve the vehicle
public key’s update, registration, and revocation automatically
through smart contact. The cost of public key management
of this scheme is much better than the traditional PKI-based
management. Gabay et al. [27] proposed a authentication
scheme to preserve the privacy of connected electric vehicles,
which combined blockchain technology and zero-knowledge
proofs. It eliminated the need for central authority and real-
ized anonymous authentication, but they do not consider the
traceability of malicious vehicles. In 2021, Yang et al. [28]
designed a multi-domain CPPA authentication protocol that
is based on blockchain to build distributed trust in VANETs.
In this scheme, RSUs act as a proxy to assist in distributing
pseudonyms, blockchain is regarded as a trust bridge to store
cross-domain information, which can enhance the authentica-
tion efﬁciency. Later, Son et al. [29] designed a V2I handover
authentication scheme that is based on blockchain for vehicu-
lar communication, which could utilize blockchain to reduce
communication overhead during the second authentication and
it supports revoking vehicles without the help of TA.
C. Fog-Based Authentication Schemes
In 2019, Cui et al. [30] proposed an efﬁcient and safe
road condition monitoring authentication scheme based on
fog computing, the scheme is proposed by using a fog com-
puting framework that supports mobility, low latency, and
location awareness. Liu et al. [31] proposed a secure and
efﬁcient outsourcing computing scheme in vehicular fog com-
puting, which performs outsourcing computing through fog
vehicles with computing resources, and combines lightweight
Boneh-Lynn-Shacham (BLS) signature and group signature
to achieve batch anonymous authentication of fog vehicles
while protecting their privacy in multiple outsourcing tasks.
Cui et al. [30] proposed a privacy-preserving aggregation-
authentication scheme for safety warning system in fog-
cloud based VANETs. The scheme is realized using a novel
efﬁcient anonymous certiﬁcateless aggregation signcryption
scheme, and allows a fog node to aggregate signcrypted
trafﬁc-related messages from surrounding vehicles into an
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:53 UTC from IEEE Xplore.  Restrictions apply. 



# Page 4

ZHANG et al.: BLOCKCHAIN-ASSISTED PRIVACY-PRESERVING TRAFFIC ROUTE MANAGEMENT SCHEME
2857
aggregated ciphertext and unsigncrypt them in a batch.
Zhong et al. [32] proposed a secure and lightweight condi-
tional privacy-preserving authentication scheme for fog-based
vehicular ad-hoc networks, the scheme is proposed using a
fog computing model that supports mobility, low latency, and
location awareness.
III. PRELIMINARIES AND BACKGROUND
A. Elliptic Curve Cryptography
Let Fp be a ﬁnite ﬁeld, which is determined by a prime
number p. Let a set of elliptic curve points E over be deﬁned
by the equation: y2 = x 3 + ax + b mod p, where a, b ∈Fp.
Let the point at inﬁnity be O, then O and other points on E
compose an additive elliptic curve group G with the order q
and other generator P [33]. The elliptic curve group G has
some attributes as follows:
• Additive: Let P and Q be two points of group G. If P
differs from Q, then we can get R = P + Q where R is
the intersection of E and the straight line connecting P
and Q. If P = Q, then R = P + Q. If P = −Q, then
P + Q = O.
• Scalar point multiplication: Let P ∈G and m ∈Z ∗q , the
scalar multiplication of E is deﬁned as m ·P = P +P +
· · · + P.
• Elliptic curve discrete logarithm problem (ECDLP):
Given two points P and Q, where Q = xP ∈G,
x ∈Z ∗q , it is computational difﬁcult for a probabilistic
polynomial-time (PPT) adversary to calculate x.
• Elliptic Curve Computational Difﬁe Hellman Problem
(ECCDHP): Given one tuple (P, xP ∈G, yP ∈G)
where x, y ∈Z ∗q , it is highly hard for any PPT adversary
to compute xyP.
B. Homomorphic Encryption
Homomorphic encryption is a cryptography technology
based on the computational complexity theory of mathematical
problems. An output is obtained by processing the homomor-
phic encrypted data, then decrypting the output, the result is
identical as that obtained by processing the unencrypted orig-
inal data in the same way. In fact, homomorphic encryption is
such an encryption function, which encrypts the plaintext by
adding and multiplying on the ring, and the result is equivalent
to the corresponding operation on the ciphertext after encryp-
tion. Because of this good feature, people can entrust a third
party to process the data without disclosing the information.
The main processes of homomorphic encryption include keys
generation, encryption, and decryption [34]. There are some
brief descriptions about it as follows:
• Public/private keys generation: Select two large prime
numbers p and q randomly and gain their product n =
p · q. The least common multiple of p −1 and q −1 is
denoted by λ. In addition, the function L(x) is deﬁned as
(x −1)/n. Then, L(gλ mod n2) is equal to gλ(n) ≡1
mod n, g ∈Z ∗
n2 and it is reversible modulo n. Then, the
public key for homomorphic encryption is (n, g) and the
corresponding private key is (λ, μ).
Fig. 2.
Block structure of blockchain.
• Encryption: Given a message M, the ciphertext C =
E(M ) = gM · rn where r ∈Z ∗
n2.
• Decryption: Given the ciphertext C, the plaintext M is
obtained by computing M = D(C) = L(C λ mod n2) ·
μ mod n.
C. Blockchain
As the basic technology of most existing cryptocurrencies,
blockchain has attracted worldwide interest. Blockchain is
actually equivalent to a disintermediated database, which is
comprised of lots of data blocks [35], [36]. Each data block
contains the information of a bitcoin network transaction,
which is used to check the effectiveness of its information
and generate the next block. Compared with the traditional
network, blockchain has two core characteristics: one is dif-
ﬁcult to tamper with the data, and the other is decentralized.
Based on these two characteristics, the information recorded
by blockchain is more reliable and can help solve the problem
of people’s distrust. Due to its characteristics, blockchain is
becoming increasingly extensive, not just in the economic
ﬁeld [37]. The following is the block structure recorded on
the blockchain.
A block in blockchain consists of a block header and a
block body, where in the block header includes a hash of the
previous block and a root of a Merkle tree. A large amount
of complex data is recorded in the Merkle tree [38].
D. Smart Contracts and Ethereum platform
In the 1990s, Nick ﬁrst proposed the concept of smart
contract. It is a computer protocol with the characteristics
of self-verifying, self-executing, and tamper-resistant. Each
smart contract can be considered as a database with a unique
address. Once the smart contract is afﬁrmed by the consensus
agreement and submitted to the blockchain, it will operate in
a predetermined manner without interference from any third
party. Complex interactions between different entities can be
programmed into smart contracts, it can execute automati-
cally immediately as soon as the conditions trigger the smart
contract. It does not require human intervention and has the
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:53 UTC from IEEE Xplore.  Restrictions apply. 



# Page 5

2858
IEEE TRANSACTIONS ON NETWORK AND SERVICE MANAGEMENT, VOL. 20, NO. 3, SEPTEMBER 2023
Algorithm 1 Smart Contract: Update Function
Input: address user, uint256 txid
Output: bool result
1: require (SC.status is True);
3: if msg.sender is not TA then
4:
throw;
5: end
6: if Exist(VPKT[i].VPK==VPK) then;
7:
VPKT[i].VPK=newVPK;
8:
return True;
9: else
10:
return false;
11: end
Algorithm 2 Smart Contract: Query Function
Input: address user
Output: bool result
1: require (SC.status is True);
2: if Exist(VPKT[i].VPK==VPK) then;
3:
return True;
4: else
5:
return false;
6: end
Algorithm 3 Smart Contract: VoteUser Function
Input: address user
Output: bool result
1: require (SC.status is True);
3: if msg.sender is not fog node then
4:
throw;
5: end
6: if user is null then;
7:
return false;
8: else
9:
VoteCount+ = 1;
10:
return True;
11: end
advantage of ﬂexibility [39], [40], [41], [42]. Ethereum is a
platform that provides various modules for users to build appli-
cations, as a blockchain network, Ethereum is a decentralized
public ledger used to verify and record transactions [43]. When
a smart contract goes into effect, it cannot be interrupted or
modiﬁed by any entity.
In our proposed scheme, we mainly utilize smart contract
which can provide application binary interfaces(ABIs) to man-
age the vehicle public key table (VPKT). Namely, vehicles’
public key is mapped to the transaction identities employ-
ing smart contract. Algorithms 1–4 demonstrate the smart
contracts that provide different functions including updatePK,
queryPK, VoteUser, and deletePK to manage the public key
of vehicle.
Fig. 3.
System model.
Algorithm 4 Smart Contract: DeletePK Function
Input: address target
Output: bool result
1: require (SC.status is True);
3: if msg.sender is not TA then
4:
throw;
5: end
6: if target is null then;
7:
return false;
8: else if (VoteCount ≥Thre) then
9:
delete VPKT[i].VPK;
10:
return True;
11: end
E. System Model
The involved communication entities in our scheme are
illustrated in Figure 3, the corresponding responsibilities of
each entity are deﬁned as below.
• TA: The TA has a high ruling ability in the whole vehic-
ular communication system. It possesses sufﬁcient calcu-
lating, storage, and communication capability. Besides,
it is in charge of the initialization of the whole system,
as well as providing registration services for vehicles and
fog nodes. Additionally, only the TA is capable of tracing
the true identity of malicious vehicles. We suppose that
the TA is a completely credible and uncompromisable
entity.
• Fog Node (FN): Compared with the cloud, the fog node is
distributed on the roadside with high calculating and stor-
age power and is closer to the vehicle [44]. It is in charge
of broadcasting route request messages, verifying vehi-
cles’ identities, and aggregating vehicles’ driving routes.
In addition, it can receive and analyze the messages and
execute some decisions, such as real-time trafﬁc warn-
ings and trafﬁc data aggregation. Moreover, we assume
that FNs are honest and unwilling to leak any useful
information in the scheme [14], [45].
• Vehicle: Vehicle acts as an extremely critical role in
the intelligent transportation system. To improve trafﬁc
efﬁciency and driving safety, vehicles require to broad-
cast safety-related information including present velocity
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:53 UTC from IEEE Xplore.  Restrictions apply. 



# Page 6

ZHANG et al.: BLOCKCHAIN-ASSISTED PRIVACY-PRESERVING TRAFFIC ROUTE MANAGEMENT SCHEME
2859
and location to other vehicles or FNs periodically. Each
vehicle is installed with an on-board unit (OBU) and a
tamper-proof device (TPD). The OBU can make con-
tact with other vehicles or infrastructures whereas the
TPD can store security materials and perform the encryp-
tion and decryption operations [46]. Meanwhile, we
assume that TPD is unhackable. Most of the vehicles
are considered untrustworthy, so the identity of vehi-
cles and information transmitted from vehicles require to
be authenticated. Moreover, we assume that the vehicles
have limited computing power.
• TMC: Each TMC is in charge of managing trafﬁc con-
ditions in its management area. In addition, it can guide
the vehicles in time in case of trafﬁc jams or trafﬁc acci-
dents. In our scheme, the TMC can decrypt the route
aggregation content transmitted from the fog node and
give timely route guidance to vehicles.
F. Security and Privacy Objectives
In VANETs, security and privacy concerns can not be
ignored. The scheme should satisfy some security objectives
as follows.
1) Unlinkability: The passive adversary does not have the
ability to link the messages from the same vehicle
successfully.
2) Mutual authentication: For ensuring the credibility of
the communication process, the communication enti-
ties such as the vehicle, fog node, and TMC are
able to authenticate each other for verifying the legit-
imacy of the identity and the integrity of the received
message.
3) Identity privacy-preserving: To protect identity privacy,
the vehicles use their pseudonym to communicate with
other entities during the authentication process. Hence,
the adversaries are unable to trace the true identity of
vehicles through the received messages.
4) Traceability: When malicious vehicles send wrong traf-
ﬁc information to deceive others or deliberately trans-
mit a false driving route so as to cause trafﬁc jam,
only the TA is capable of tracing the true iden-
tities of the malicious vehicles and performs some
punishments.
5) Resistance to replay attack: It refers to that malicious
adversaries send the same messages to the receiver
repeatedly. Each message contains a timestamp, the
receiver checks the validity of the received message. If
the timestamp has terminated, the receiver will reject the
message.
6) Resistance to man-in-the-middle attack: It means that
the active attackers are unable to fabricate and modify
the intercepted messages successfully.
7) Resistance to common attacks: The proposal is capable
of withstanding some ordinary forms of attacks, e.g.,
ofﬂine password guessing attacks, modiﬁcation attacks
and impersonation attacks to guarantee the security of
VANETs.
TABLE I
NOTATIONS
IV. OUR PROPOSED SCHEME
In this part, we show a speciﬁc representation of the
proposed scheme which comprises several steps. First of all,
the TA initializes the entire system. Secondly, vehicles and fog
nodes send their registration request to the TA, respectively.
After completing this step, vehicle users need to pass the login
phase successfully. Then, vehicles send their routes to the fog
nodes, the fog nodes authenticate the legality of the vehicles,
and then aggregate all routes received from vehicles. Next,
the fog node transmits the aggregated ciphertext to the TMC,
TMC decrypts it and conducts trafﬁc management according to
the decrypted ciphertext. At last, we provide a user-friendly
password change step and revocation of malicious vehicles.
The main notations and corresponding deﬁnitions are listed in
Table I.
A. System Setup
At this stage, the TA prepares the essential system param-
eters, the speciﬁc descriptions are shown as follows.
1) The security parameter λ is selected as the input, the
TA generates an elliptic curve E : y2 = x 3 + ax + b
mod p, where p is a random large prime number for the
ﬁnite ﬁeld Fp and a, b ∈Fp. Then, the TA chooses a
generator P to generate an additive elliptic curve group
G with the order q.
2) The TA randomly chooses s
∈Z ∗q
and calculates
Ppub = s · P, where s and Ppub are the system private
key and system public key, respectively.
3) The TA chooses the following secure one-way hash
functions: h1 : {0, 1}∗× {0, 1}∗→Z ∗q , h2 : {0, 1}∗×
{0, 1}∗× {0, 1}∗→Z ∗q , h3 : G × {0, 1}∗→Z ∗q ,
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:53 UTC from IEEE Xplore.  Restrictions apply. 



# Page 7

2860
IEEE TRANSACTIONS ON NETWORK AND SERVICE MANAGEMENT, VOL. 20, NO. 3, SEPTEMBER 2023
h4 : {0, 1}∗→Z ∗q , h5 : {0, 1}∗× G × {0, 1}∗×
{0, 1}∗→Z ∗q .
4) The TMC generates the public key (n, g) and private
key (λ, μ) based on homomorphic encryption. It stores
(λ, μ) secretly and transmits the public key (n, g) to the
TA.
5) The TA broadcasts all public parameters and func-
tions {p, q, a, b, P, G, Ppub, h1, h2, h3, h4, h5} via pub-
lic channels.
B. Vehicle Registration
Before leaving the factory, each vehicle has to be regis-
tered with the TA through secure communication channels.
After performing these steps, the vehicle obtains the private
key and pseudo-identity from the TA. The detailed interaction
processes are shown in the next description.
1) The vehicle user Ui chooses a password PWi and
his/her
identity
UIDi,
then
computes
UPWi
=
h1(UIDi∥PWi). After that, the user sends registration
request {IDi, UPWi} to the TA via the reliable and
private channel. To strengthen the safety of the scheme,
the user encrypts the login password and its identity.
Consequently, the attackers are unable to initiate internal
attacks even though the TA is destroyed.
2) Once receiving the request message sent by the vehicle
Vi, the TA ﬁrst inspects whether Vi has already been
registered or existed in the blacklist. If that is so, the
TA refuses the request of Vi. Instead, the TA keeps
executing the subsequent steps.
3) The TA randomly chooses ki ∈Z ∗q , and calculates ski =
h2(IDi∥s∥ki) as Vi’s private key, the pseudonym of Vi
is computed as PIDi = IDi ⊕h3(ski · Ppub∥ti), where
ti is the latest timestamp. Then, the TA further computes
VPK = ski · P, Ai = kiP, Bi = Ai ⊕h4(IDi) and
Ci = h3(Ai∥UPWi).
4) The TA transmits {Bi, Ci, ski, PIDi, (n, g)} to Vi and
Vi stores them into its OBU secretly. In addition, the
TA uploads {PIDi, VPK} to the smart contract.
C. Fog Node Registration
This stage is executed in ofﬂine mode via reliable and
private channels. After performing these steps, the fog node
obtains a private key from the TA for the subsequent signature
operation. The detailed interaction processes are shown in the
next description.
1) The fog node Fj selects its identity IDj and sends a
registration request IDj to the TA.
2) Once obtaining the registration request, the TA ﬁrst
checks whether the IDj is available, if not, the regis-
tration request is refused by the TA. Instead, the TA
randomly selects skj ∈Z ∗q and computes PKj = skj ·P,
where skj is the private key of Fj , PKj is the public
key of Fj .
3) Afterwards, the TA delivers {skj , pkj } to the fog node
and publishes pkj .
4) Lastly, the fog nodeFj keeps skj secretly and ﬁnish the
registration phase.
D. Login Phase
In this step, we aim to inspect the legality of the vehicle
user.
1) The vehicle user Ui enters {IDi, PWi, UIDi} into the
OBU of vehicle Vi.
2) The Vi calculates UPWi = h1(UIDi∥PWi), Ai =
Bi ⊕h4(IDi), then checks if the equation Ci
=
h3(Ai∥UPWi) holds or not. If it holds, this login
request is permitted, then the vehicle Vi continues to
the next phase. Otherwise, the login request is rejected
by the Vi immediately.
E. Route Request From Fog Node
1) The fog node Fj chooses a number xj randomly, and
computes Xj = xj · P. Then, Fj generates the signature
σF1 = skj + xj · h2(IDj ∥RS∥Tj1) mod q, where Tj1
is the latest timestamp, IDj is the identity of Fj , RS is
route request list that Fj want to query. After that, Fj
broadcasts the message M1 = {IDj , Xj , σF1, RS, Tj1}
to all passing vehicles within its communication range.
2) Upon obtaining the message M1 from Fj , Vi inspects
the validity of timestamp Tj1 ﬁrstly, If Tj1 has termi-
nated, Vi rejects the message M1. Instead, if Tj1 is
valid, Vi checks if the equation (1) holds.
σF1 · P = pkj + Xj h2

IDj ∥RS∥Tj1

(1)
If it holds, Vi accepts the message and continues to the
next step.
F. Route Reporting to Fog Node
After the vehicle Vi has determined the future driving
routes, it requires to transmit the routes to the fog node. Owing
to the personal driving routes are concerned with users’ pri-
vacy, we need to encrypt their driving routes. Because the
driving routes sent to the fog node are only used to get the
aggregate package and the fog node cannot get the routes of
each vehicle, homomorphic encryption is considered to be an
appropriate method to encrypt the route that transmits to the
fog node.
1) Firstly, Vi transforms the index of the route content
that it intends to report into the binary format. The
format of the driving route is denoted as the binary
set {F1(V ), F2(V ), . . . , Fm(V )}, where the last bit
of Fi(V ) indicates that Vi intends to drive on NO.i
route and the bit length of Fi(V ) equals to the base-2
logarithm of the max number of vehicles that one
fog node can provide access services. For instance,
{001, 000 ,001 ,000} means that Vi will drive on NO.1
and NO.3 route.
2) Secondly, Vi randomly chooses ri ∈Z ∗q and encrypts
its route ϕi = gF0(i)∥F1(i)∥···Fm(i)·rn
i
mod n2. Then,
Vi randomly selects di ∈Z ∗q and computes Di = di ·
P, βi = h5(PIDi∥Di∥ϕi∥Ti1). Next, Vi generates a
signature σVi = ski + di · βi mod q, where Ti1 is the
latest timestamp.
3) Last but not least, Vi transmits the message Mvi =
{σVi, ϕi, Di, PIDi, Ti1} to Fj .
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:53 UTC from IEEE Xplore.  Restrictions apply. 



# Page 8

ZHANG et al.: BLOCKCHAIN-ASSISTED PRIVACY-PRESERVING TRAFFIC ROUTE MANAGEMENT SCHEME
2861
G. Veriﬁcation and Route Aggregation Phase
Once obtaining the message Mvi, Fj ﬁrst inspects the
validity of Ti1 immediately. Only if Ti1 is valid, a trans-
action is sent by the Fj to the blockchain for querying
the public key. Upon querying the public key, the Fj com-
putes βi = h5(PIDi∥Di∥ϕi∥Ti1) for checking whether the
equation (2) holds. Otherwise, the message is rejected by
the Fj .
σVi · P = VPK + Di · h5(PIDi∥Di∥ϕi∥Ti1)
(2)
Due
to
VPK
=
ski · P,
Di
=
di · P,
βi
=
h5(PIDi∥Di∥ϕi∥Ti1), σVi = ski + di · βi mod q. Thus,
we can gain that
σVi · P = (ski + di · βi) · P
= VPK + di · P · βi
= VPK + Di · h5(PIDi∥Di∥ϕi∥Ti1)
Batch Veriﬁcation: Especially noteworthy is that our pro-
posal can support batch veriﬁcation. Namely, a fog node is
able to verify multiple messages transmitted from others at
the same time. To be speciﬁc, when it receives multiple mes-
sages Mvi = {σVi, ϕi, Di, PIDi, Ti1} from other vehicles,
where i = 1, 2, . . . , n, it executes the subsequent operations.
Firstly, the fog node inspects the freshness of timestamp Ti1
in each message, if the timestamp has terminated, then it dis-
cards the corresponding messages. To guarantee the integrity
of signatures using batch veriﬁcation, the small exponent
test technology is introduced to the batch veriﬁcation pro-
cess [47]. Speciﬁcally, the fog node selects a vector u =
{u1, u2, . . . , un} randomly, where ui ∈[1, 2t] and t is a small
integer. Then, the fog node queries the public key from the
blockchain and computes βi = h5(PIDi∥Di∥ϕi∥Ti1) respec-
tively. At last, the fog node checks if equation (3) holds, if
holds, it accepts the message tuples and continues to the next
step. Otherwise, the message tuples are rejected by the fog
node.
 n

n=1
ui · σVi

· P =
 n

n=1
ui · (ski + di · βi)

=
n

n=1
(ui · (ski · P + βi · di · P))
=
n

n=1
(ui · VPK + ui · βi · Di)
=
n

n=1
(ui · VPK) +
n

n=1
(ui · Di · βi)
(3)
After verifying the messages from vehicles, the fog node
Fj aggregates the vehicles’ routes and transmits the aggre-
gated data to the TMC. In order to protect drivers’ privacy,
the TMC only knows the total number of vehicles to be driven
in each section but cannot know the speciﬁc routes of each
vehicle. The encrypted routes ϕsum are aggregated by the fog
node as equation (4). Then, fog node Fj selects a number yj
randomly, computes Yj = yj · P and generates a signature
TABLE II
ROUTE AGGREGATION RESULT OF THE EXAMPLE
σF2 = skj + yj · h2(IDj ∥ϕsum∥Tj2). After that Fj sends
M3 = {IDj , ϕsum, σF2, Yj , Tj2} to the TMC.
ϕsum =
k

i=0
ϕi
mod n2
=
k

i=0
gF0(i)∥F1(i)∥···Fm(i) · rn
i
mod n2
= g
k
i=0(F0(i)∥F1(i)∥···Fm(i))
 k

i=0
ri
n
mod n2
= g(
k
i=0 F0(i)∥k
i=0 F1(i)∥···k
i=0 Fm(i))
 k

i=0
ri
n
mod n2
(4)
H. Trafﬁc Route Management Phase
Upon receiving M3 = {IDj , ϕsum, σF2, Yj , Tj2} from Fj ,
the TMC checks the timestamp Tj1 ﬁrstly, and then veriﬁes
if the equation (5) holds. If not, TMC rejects the message.
Instead, it performs the next steps.
σF2 · P = pkj + Yj · h2

IDj ∥ϕsum∥Tj2

(5)
After that, the TMC utilizes the private (λ, μ) to decrypt the
aggregated routes ϕsum by calculating L(ϕλsum mod n2) · μ
mod n, where μ = (L(gλ mod n2))−1 mod n, L(x) =
(x −1)/n, and recovers the route information RI
=
k
i=0 F0(i)∥k
i=0 F1(i)∥· · · k
i=0 Fm(i).
To have a good understanding of our scheme, we take an
instance to interpret the detailed process of the ultimate aggre-
gated results and are ignorant of the detailed driving route of
each vehicle. As shown in Table II assuming that six vehi-
cles provide their future driving route, each route exists ﬁve
sections and each section is indicated by three bits. The route
provided by V3 is 000 001 000 001 000, the TMC can get
the total number 5
i=0 F1(V ) = 2, . . . , 5
i=0 F5(V ) = 6.
Supposing that each section is assigned nbits and the limi-
tation of the total number of vehicles to provide route is no
more than 2n −1. After obtaining the route aggregation results,
the TMC knows which segment is crowding and which seg-
ment has less vehicles, so as to has a correct and timely trafﬁc
guidance. To relieve trafﬁc pressure, the TMC transmits trafﬁc
guidance informations to the fog node then broadcasts them
to the vehicles. vehicles can decide whether to continue driv-
ing or change the another route through the trafﬁc guidance
message.
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:53 UTC from IEEE Xplore.  Restrictions apply. 



# Page 9

2862
IEEE TRANSACTIONS ON NETWORK AND SERVICE MANAGEMENT, VOL. 20, NO. 3, SEPTEMBER 2023
I. Vehicle Revoke
When the fog node discovers that vehicle Vi misbehaves, it
encapsulates a voting transaction and transmits it to blockchain
to trigger the smart contract. If vehicle Vi continues to carry
out malicious behavior, the fog node adds a tag to VoteCount,
once the value of VoteCount exceeds the set threshold Thre,
i.e., VoteCount ≥Thre, a revocation transaction is sent by
the TA to trigger smart contract DeletePK to remove the public
key of the vehicle. Besides, TA checks the validity of the
vehicle’s public key periodically, if it has expired, TA also
sends a transaction to trigger DeletePK to remove the vehicle’s
public key.
J. Password Change
A convenient password change procedure is provided by
this scheme. The users are able to alter the login password at
the vehicle side whenever they like. The speciﬁc descriptions
are as follows.
1) The vehicle user Ui enters {UIDi, IDi, PWi} and a new
password PW new
i
into Vi.
2) Vi calculates UPWi = h1(UIDi∥PWi), Ai = Bi ⊕
h4(IDi), and then checks if the equation Ci
=
h1(UIDi∥PWi) holds. If the password input by the user
is incorrect, this step is ended. Otherwise, Vi computes
UPW ∗
i
= h1(UIDi∥PW new
i
), C ∗
i = h3(Ai∥UPW ∗
i )
for changing PWi into the new password PW new
i
.
3) Finally, Vi stores {Bi, C ∗
i , UPW ∗
i } secretly.
V. SECURITY PROOF AND ANALYSIS
In this section, we ﬁrstly prove that the ECC-based signature
in this scheme is existential unforgeability in the random ora-
cle model. After that, a speciﬁc security analysis is conducted
by us.
A. Formal Proof in the Random Oracle Model
Let A represent the adversary who is running against the
scheme in polynomial time in the random oracle model. A
is able to regulate the whole communication in vehicular
networks. Speciﬁcally, A could modify, intercept and even
forge informations. Let C represent the challenger who can set-
tle the problems with a non-negligible probability by running
A as a subroutine.
Theorem: If ECDLP problem is (τ′, ϵ′)-hard in G, then
the signature scheme is (τ, ϵ)-existential unforgeable against
adaptively choosen message attacks in the random oracle
model [48], such that
ϵ′ ≥ϵ1 ·

ϵ1
qh2 + qh5
+ 1
q
	
τ′ ≤2τ + (4ts + 2ta)
(6)
where ϵ1 = ϵ−qs(qh2+qh5+qs)
q
, ts and ta indicate the time for
scalar multiplication operation and point addition operation,
respectively. In addition, qh2, qh5, qs indicate the numbers of
queries to h2 oracle, h5 oracle and sign oracle, respectively.
Proof: It is assumed that the success probability that adver-
sary A against unforgeability of this scheme is denoted by ϵ.
C can solve the ECDLP with success probability ϵ′. Given a
example {P, X = xP|P ∈G, X ∈G, x ∈Z ∗q }, the target of
C is output x. C maintains empty table LH 2 and LH 5 to simu-
late random oracles H2 and H5. The following is C′s answers
to A′s oracle queries.
Setup-query: The security parameter λ is selected as the
input. Once receiving this query, C randomly chooses s ∈Z ∗q
as its private key, then calculates the public key as Ppub =
s ·P. After that, C transmits set {p, q, a, b, G, Ppub, P} to A.
h2-query: C generates a empty list LH 2. If A calls the query
that uses set ⟨IDi, s, ki⟩, C inspects if the set has already
existed in list LH2. If exists, C will directly return the cor-
responding value to A. If not, C randomly chooses h2 ∈Z ∗q ,
sets h2 = ⟨IDi, s, ki⟩and sends h2 to A.
h5-query: C produces a empty list LH 5. If A calls the query
that uses the set ⟨PIDi, Di, ϕi, Ti1⟩, C checks if the set has
already existed in list LH 5. If exists, C will directly return the
corresponding value to A. If not, C randomly chooses h5 ∈
Z ∗q , sets h5 = ⟨PIDi, Di, ϕi, Ti1⟩, and returns h5 to A.
Sign-query: The adversy A executes sign query in this
step. After receiving the query with message Mvi
=
{PIDi, Di, ϕi, Ti1} from A, C ﬁrst selects number s ∈Z ∗q ,
di ∈Z ∗q , and σVi ∈Z ∗q randomly, then computes Di =
[σVi · P −h2 · P] · β−1
i
. If h2(IDi, s, ki) has already been
deﬁned, if so, C halts, returns ⊥and sets bad ←true. If
h5(PIDi, Di, ϕi, Ti1) also has been deﬁned, C halts, returns
⊥and sets bad ←true. Otherwise, C returns ⟨σVi, Di⟩to A.
It is distinct that these simulations is indistinguish from the
real scene.
After performing the above queries, we supposed that
A outputs a forged signature ⟨σVi, Di⟩on the message
⟨PIDi, Di, ϕi, Ti1⟩. The forgery is no-trivial if A do not make
a Sign-query on the ⟨PIDi, Di, ϕi, Ti1⟩.
Let E1 represent the event that C does not abort due
to the signature simulation, E2 represent the event that A
returns a non-trivial forgery. The probability of A forg-
ing a signature ⟨σVi, Di⟩on message ⟨PIDi, Di, ϕi, Ti1⟩is
ϵ1 = Pr[E1]Pr[E2|E1], The following are the calculation
processes.
Claim 1: Pr[E1] = Pr[¬bad] ≥1 −qs(qh2+qh5+qs)
q
Proof: We have bad ←true if the pair ⟨IDi, s, ki⟩gener-
ated in a Sign simunation has been occurred by coincidence
in a former query to the h2 query, and if ⟨PIDi, Di, ϕi, Ti1⟩
generated in a Sign simunation has been occurred in a former
query to h5 oracle. Because there are qh2 +qh5 +qs entries at
most, the probability of this event is qs(qh2+qh5+qs)
q
at most
for one Sign-query. Consequently, the probability of this event
for qs queries is qs(qh2+qh5+qs)
q
at most.
Claim 2: Pr[E2|E1] ≥ϵ
Proof: The value of Pr[E2|E1] is the probability that adver-
sary A sends a valid forgery supposing that C does not abort
due to C′s Sign queries. If C did not abort due to A′s queries,
all its replies to these queries are valid. Hence, according
to the hypothesis, A will generate a non-trivial forgery with
probability ϵ at least.
Thus, the probability that A sends a valid forgery is
ϵ −qs(qh2+qh5+qs)
q
at least. Afterwards, C performs Forking
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:53 UTC from IEEE Xplore.  Restrictions apply. 



# Page 10

ZHANG et al.: BLOCKCHAIN-ASSISTED PRIVACY-PRESERVING TRAFFIC ROUTE MANAGEMENT SCHEME
2863
lemma algorithm of Bellare and Neven [49] to get two valid
forgeries σVi and σ′
Vi as shown in equation (7).
σVi = ski + di · h5 mod q
σ′
Vi = ski + di · h′
5 mod q
(7)
where σVi ̸= σ′
Vi, h5 ̸= h′
5. Therefore, the solution to ECDLP,
ski, is calculated as presented in equation (8).
ski = h′
5σVi −h5σ′
Vi
h′
5 −h5
mod q
(8)
On the basis of Forking lemma of Bellare and Neven [49] that
frk ≥acc · ( acc
q + 1
h ), the C′s probability of success is:
ϵ′ ≥

ϵ −qs(qh2 + qh5 + qs)
q

·
⎛
⎝ϵ −qs(qh2+qh5+qs)
q
qh2 + qh5
+ 1
q
⎞
⎠
(9)
In order to compute the ECDLP issue, provided that a scalar
multiplication operation in G takes time ts, point addition
operation in G takes time ta, while the time of all other oper-
ations is not taken into account. The running time of C is
twice that of A, plus the time which is demanded to respond
to hash queries and sign queries. Thus, the running time of C
is τ′ ≤2τ + qs(4ts + 2ta). Hence, we complete the security
proof.
B. Informal Security Analysis
1) Unlinkability: Each pseudo-identity PIDi of vehicle Vi
and messages transmitted over the vehicular network are
encrypted by timestamp and random number, due to the
random number and the timestamp are random, so the
pseudonym will be updated dynamically and each mes-
sage is different. Therefore, the adversary cannot link
various messages to the identical vehicle successfully.
2) Mutual authentication: In this scheme, vehicle and the
fog node can authenticate the received messages M1 and
Mvi by verifying whether their obtained messages are
valid or not respectively. Besides, the TMC can authen-
ticate the message M3 transmitted from the fog node.
Because hash function and the ECDLP are able to resist
collision, any adversary cannot produce a valid message
in polynomial time. Therefore, mutual authentication can
be realized in this proposal.
3) Identity privacy-preserving: In this proposed scheme, the
pseudonym is used by Vi to transmit messages instead
of using the real identity, and the TA updates pseudonym
PIDi of Vi dynamically for each communication, where
PIDi = IDi ⊕h3(ski · Ppub∥ti), ski = h2(IDi∥s∥di).
Consequently, the attackers are unable to disclose the
true identity of Vi because of the ECDLP.
4) Traceability: When the vehicle misbehaves, the TA is
capable of retrieving the real identity of the malicious
vehicle by calculating IDi = PIDi ⊕h3(ski ·s ·P∥ti) =
PIDi ⊕h3(VPKi · s∥ti), where s is the system private
key. Therefore, this scheme could support traceability.
5) Resistance to replay attack: To withstand replay attacks,
the freshness of the message is required to inspect by the
message receiver ﬁrstly. Each message sent from Vi and
Fj contains a timestamp tii. For the sake of inspecting
the timestamp of message M, a receiver computes and
veriﬁes whether the equation |tii −tcur| ≤Δt is true.
If the timestamp has expired, the receiver will reject the
message.
6) Resistance to common attacks: In addition to the above-
mentioned attacks, the proposal is capable of withstand-
ing the following attacks.
• Ofﬂine password guessing attack: During the reg-
istration, the password PWi is encrypted, where
UPWi = h1(UIDi∥PWi), Ci = h3(Ai∥UPWi).
In addition, the password PWi can be altered by
legal users frequently. Thus, attackers cannot infer
the login password successfully.
• Modiﬁcation attack: Resistance to modiﬁcation
attack means that the active adversary can not
modify a message to cheat the message receiver.
In our proposed scheme, the interacted messages
mainly involve M1 = {IDj , Xj , σF1, RS, Tj1},
Mvi = {σVi, ϕi, Di, PIDi, Ti1} to Fj and M3 =
{IDj , ϕsum, σF2, Yj , Tj2}. The active adversary
can not modify these messages successfully because
the modiﬁed messages cannot be successfully ver-
iﬁed. Thus, the scheme can resist modiﬁcation
attacks.
• Impersonation attack: Our proposed scheme could
withstand impersonation attacks as follows:
Case 1 (Vehicle Impersonation Attack): We assume
that the legitimate message Mvi transmitted by the
vehicle Vi is seized by the adversary A, the adver-
sary A attempts to get beneﬁcial information from
the Mvi and to produce a valid message to cheat
the authentication of Fj . However, the A does not
know the ski, s, di and Ti1 which exists in the M1.
Thus, A does not have the ability to generate valid
message Mvi in polynomial time.
Case 2 (Fog Node Impersonation Attack): We
assume that the valid message M3 sent by the fog
node Fj is seized by the adversary A, the adver-
sary A attempts to obtain beneﬁcial information
from the M3 and to produce a valid message to
cheat the authentication of TMC. However, the A
does not know the IDj , skj , yj , Tj2 contained in M3.
Therefore, the adversary A does not have the ability
to generate valid message M3 in polynomial time.
VI. PERFORMANCE ANALYSIS
In this section, we analyze the performance of our proposal
during the authentication process in terms of communication
and calculation cost. Then we give comparisons against exist-
ing scheme [50], [51] and [52], where Shen et al.’s [50] and
Rabieh et al.’s [51] are based on bilinear pairing operations,
Cui et al.’s [52] and our scheme are based on ECC.
In order to evaluate computation and communication over-
head as well as realize an 80-bit security level, we construct
a bilinear pairing e : G1 × G1 →GT , where G1 with the
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:53 UTC from IEEE Xplore.  Restrictions apply. 



# Page 11

2864
IEEE TRANSACTIONS ON NETWORK AND SERVICE MANAGEMENT, VOL. 20, NO. 3, SEPTEMBER 2023
TABLE III
THE EXECUTION TIME OF BASIC CRYPTOGRAPHIC OPERATIONS (MS)
order q is a additive group generated by P over the super sin-
gular elliptic curve E : y2 = x 3 + x mod p with embedding
degree 2. p and q are a 512-bit prime number and a 160-
bit prime number,respectively. Simultaneously, we construct
an additive group G with order q that generated by P over
a non-singular elliptic curve E : y2 = x 3 + ax + b mod p,
where a, b ∈Z ∗q , p, q are 160-bit prime numbers.
A. Computational Overhead Analysis
MIRACL library [53] is used to measure the execution
times of involved cryptographic operations. The experiment
is tested on a personal computer under Windows 10 environ-
ment, which is equipped with Ubuntu 16.04, i5-MX350 CPU,
and 4G RAM. Table III reveals the execution time of related
cryptography operations. Owing to the time of XOR operation
can be ignored, we do not take this operation time into consid-
eration. For convenience, some symbols about execution time
are deﬁned as shown below.
• Tecc−sm: The time for executing a scale multiplication
operation x · P that associated with the ECC, where x ∈
Z ∗q and P ∈G.
• Tecc−pa: The time for executing a point addition oper-
ation P + Q that associated with the ECC, where
P, Q ∈G.
• Th: The time for executing a one-way hash function
operation.
• Tbp: The time for performing a bilinear pairing operation
e(P, Q), where P, Q ∈G1.
• Tmtp: The time for executing a MapToPoint hash oper-
ation associated with the bilinear pairing.
• Tbp−sm: The time for executing a scale multiplication
operation x · P that associated with the bilinear pairing,
where x ∈Z ∗q , P ∈G1.
• Tbp−pa: The time for executing a point addition opera-
tion P+Q that associated with the bilinear pairing, where
P, Q ∈G1.
• Te: The time for executing an exponentiation operation
over G.
• Ts: The time for executing an symmetric encryp-
tion/decryption operation.
Next, we analyze the computational overhead generated in
related operations performed in the authentication processes of
our scheme and schemes [50], [51], and [52]. In scheme [50],
a vehicle requires to execute one modular exponentiation
operation, one multiplication operation, one point addition
operation, one bilinear pairing operation, and three hash oper-
ations during the authentication process. Consequently, the
computational overhead on the vehicle terminal is Te +
Tbp−sm + Tbp + Tbp−pa + 3Th ≈7.9108ms. During the
authentication process, the RSU is required to perform two
modular exponentiation operations, three multiplication oper-
ations, two bilinear pairing operations, two point addition
operations, and three hash operations. Therefore, the over-
head needed on the RSU is 2Te + 3Tbp−sm + 2Tbp +
2Tbp−pa + 3Th ≈16.5126ms. So the total time of [50] is
3Te + 4Tbp−sm + 3Tbp + 3Tbp−pa + 6Th ≈24.42ms.
In Rabieh et al.’s scheme [51], a vehicle requires to execute
one exponentiation operation, one multiplication operation,
two bilinear pairing operations, and two hash operations.
Hence, the computational overhead on the vehicle terminal is
Te +Tbp−sm +2Tbp +2Tmtp ≈13.19ms. The computational
overhead needed on RSU side includes one exponentiation
operation, two multiplication operations, two bilinear pairing
operations, and three hash operations. Thus, the execution time
is Te + Tbp−sm + 2Tbp + 3Tmtp ≈13.29 ms. TMC needs
to execute one exponentiation operation, two bilinear pairing
operations, and one hash operation. Namely, the computa-
tional overhead is Te + 2Tbp + Tmtp ≈12.40ms. Thus, the
total computational overhead of [51] is 3Te + 2Tbp−sm +
5Tbp + 6Tmtp ≈38.88 ms. In [52], the computational over-
head on the vehicle side is Te + 5Tecc−sm + 7Th + Ts ≈
4.02 ms. On the RSU side, the computational overhead is
Te +3Tecc−sm +2Th +Tecc−ap ≈3.096 ms. The computa-
tional overhead on the CSP is 6Tecc−sm + 2Tecc−pa + Ts +
6Th ≈2.218 ms. Hence, the total computational overhead is
2Te + 14Tecc−sm + 15Th + 2Ts + 3Tecc−pa ≈9.334 ms.
In this proposal, a vehicle needs to execute one exponen-
tiation operation, three multiplication operations, one point
addition operation, two hash operations. Thus, the execution
time on the vehicle side is Te +3Tecc−sm +Tecc−pa +2Th ≈
3.096ms. On the fog node side, it requires one exponen-
tiation operation, ﬁve multiplication operations, one point
addition operation, and three hash operations, so the time is
Te + 4Tecc−sm + Tecc−pa + 3Th ≈3.42 ms. The TMC
needs to execute one exponentiation operation, two multi-
plication operations, one point addition operation, and one
hash operation. So the execution time on the TMC side is
Te + 2Tecc−sm + Tecc−pa + Th ≈2.773ms. Consequently,
the total cost of this scheme is 3Te +9Tecc−sm +3Tecc−pa +
6Th ≈9.29 ms.
B. Communication Overhead Analysis
Owing to p is 20 bytes and p is 64 bytes, the elements in
G and G1 are 20 × 2 = 40 bytes and 64 × 2 = 128 bytes,
respectively. Besides, let the timestamp and identity be 4 bytes
as well as the output of general hash function be 20 bytes. We
take the size of messages in the course of the authentication
phase into account only.
In our scheme, there are three rounds during the authen-
tication process, the transmitted messages including M1 =
{IDj , Xj , σF1, RS, Tj1}, Mvi = {σVi, ϕi, Di, PIDi, Ti1},
and M3 = {IDj , ϕsum, σF2, Yj , Tj2}. Due to Xi, Di, and
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:53 UTC from IEEE Xplore.  Restrictions apply. 



# Page 12

ZHANG et al.: BLOCKCHAIN-ASSISTED PRIVACY-PRESERVING TRAFFIC ROUTE MANAGEMENT SCHEME
2865
TABLE IV
COMPUTATION OVERHEAD (MS)
Fig. 4.
Computation overhead comparison.
Yj belong to G, IDj belongs to identity database, Tj1, Ti1,
and Tj2 are the timestamps, PIDi, σF1, σVi, σF2 are the
result of regular hash operation, ϕi and ϕsum are the result
of modular exponential operation. Thus, the communication
overhead of the scheme is |M1| = 4 + 40 + 20 + 4 + 4 = 72
bytes, |MVi| = 20 + 128 + 40 + 20 + 4 = 212 bytes,
|M3| = 4 + 128 + 20 + 40 + 4 = 196 bytes, respec-
tively. Consequently, the total communication overhead is
72 + 212 + 196 = 380 bytes.
In Shen’s scheme [50], a vehicle requires to send M1 =
{IDi, Ti, σi = (e(g, g)r1, r2, η)}, becauese IDi belongs to
identity databases, Ti is timestamp, η ∈G1, e(g, g)r1 ∈GT ,
r2 is the result of general hash operation. So the length of M1
is |M1| = 4 + 4 + 20 + 128 + 256 = 412 bytes. A RSU
also needs to send M1 to the TCS, so the total communication
overhead is 412 + 412 = 824 bytes. The detailed communi-
cation overhead analysis of Rabieh’s scheme [51] and Cui’s
scheme [52] are similar to the above. The total communica-
tion overhead of [52] and [51] are 592 bytes and 340 bytes,
respectively.
C. Blockchian Practical Feasibility Analysis
For discussing the practicability of the proposal, we imple-
ment it on Rinkeby ( which is an Ethereum test network) to
Fig. 5.
Communication overhead comparison.
deploy and invoke the designed smart contract. When the writ-
ten solidity smart contact code has been compiled, we deploy
it on Rinkeby to test the gas cost of all operations. The cost
of gas is one of the relevant factors measured in Ethereum,
which is a reﬂection of the cost that uses blockchain [54].
The detailed descriptions of this implementation are shown as
follows.
First of all, to test the cost, we employ MetaMask to pro-
duce two accounts (TA and fog node), which the addresses are
0xB151ff018fC32fAb28E85E521BC071fb1c896bA8
and
0x
95A10EBC57D0A183bea52d7DBD692A3edF7E5303, respec-
tively. Then, we switch to the TA’s account to request two
Ethers from the Rinkeby test network, so that the TA can pub-
lish related transactions to update, revoke the public key of
vehicle. When the transaction is recorded into the Rinkeby,
others can retrieve it from the blockchain.
Next,
we
use
Remix
as
fog
node
to
deploy
the
smart
contract
into
Rinkeby
and
get
its
address
(i.e.,
0x95A10EBC57D0A183bea52d7DBD692A3edF7E5303). We
also invoke the query algorithm to query the public key of
vehicle from blockchain.
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:53 UTC from IEEE Xplore.  Restrictions apply. 



# Page 13

2866
IEEE TRANSACTIONS ON NETWORK AND SERVICE MANAGEMENT, VOL. 20, NO. 3, SEPTEMBER 2023
Fig. 6.
Deploy smart contract.
Fig. 7.
Execute the update function.
Fig. 8.
Execute the delete function.
What’s more, for testing the transaction cost, we evaluate
the gas cost of these operations, and the results are presented
in Table V. The price on June 17, 2022 is 1 ETHER= 1075
USD, the GAS PRICE is set to 2 Gwei (1Gwei = 10−9ether).
From TABLE V, we can see that deploying smart contract
is the maximum cost, which is about USD 0.9284, it is just
TABLE V
GAS COST OF SMART CONTRACT (GAS PRICE=2 GWEI, 1
ETHER=1075 USD)
implemented once. While all other related operations are called
frequently, the cost of them is not more than USD 0.13 which
is within acceptable range.
VII. CONCLUSION
In this study, to reduce trafﬁc jams and ensure secure com-
munication in VANETs, we designed a lightweight privacy-
preserving trafﬁc route management scheme that incorporates
blockchain technology and a fog computing model. In the
proposed scheme, the TMC only knows the total number of
vehicles in each segment, not the individual routes of a vehi-
cle. In order to realize efﬁcient vehicular communication, fog
computing was introduced to support mobility, low latency,
and location awareness. Furthermore, our scheme can revoke
illegal vehicles dynamically through smart contracts and it
can assist the fog nodes to batch verify multiple messages
from vehicles. Finally, the formal security proof and speciﬁc
security analysis demonstrate that the proposal can satisfy
fundamental security and privacy objectives of VANETs, and
is able to resist common types of attacks. Meanwhile, our
performance analysis indicates that the scheme has a certain
advantage over other related representative schemes, and is
suitable for fog-based VANETs, especially for applications
that are sensitive to time delay.
ACKNOWLEDGMENT
The authors are very grateful to the anonymous referees for
their detailed comments and suggestions regarding this paper.
REFERENCES
[1] J. Cheng, J. Cheng, M. Zhou, F. Liu, S. Gao, and C. Liu, “Routing in
Internet of Vehicles: A review,” IEEE Trans. Intell. Transp. Syst., vol. 16,
no. 5, pp. 2339–2352, Oct. 2015.
[2] P. Bagga, A. K. Das, and J. J. Rodrigues, “Bilinear pairing-based access
control and key agreement scheme for smart transportation,” Cyber
Secur. Appl., vol. 1, Dec. 2023, Art. no. 100001.
[3] Z. H. Mir and F. Filali, “LTE and IEEE 802.11p for vehicular
networking: A performance evaluation,” EURASIP J. Wireless Commun.
Netw., vol. 2014, no. 1, pp. 1–15, 2014.
[4] C. Lai, R. Lu, D. Zheng, and X. Shen, “Security and privacy chal-
lenges in 5G-enabled vehicular networks,” IEEE Netw., vol. 34, no. 2,
pp. 37–45, Mar./Apr. 2020.
[5] J. Cui, X. Zhang, H. Zhong, J. Zhang, and L. Liu, “Extensible con-
ditional privacy protection authentication scheme for secure vehicular
networks in a multi-cloud environment,” IEEE Trans. Inf. Forensics
Security, vol. 15, pp. 1654–1667, 2019.
[6] R. Hussain, J. Son, H. Eun, S. Kim, and H. Oh, “Rethinking vehicular
communications: Merging VANET with cloud computing,” in Proc. 4th
IEEE Int. Conf. Cloud Comput. Technol. Sci. Proc., 2012, pp. 606–609.
[7] S. Bitam, A. Mellouk, and S. Zeadally, “VANET-cloud: A generic
cloud computing model for vehicular ad hoc networks,” IEEE Wireless
Commun., vol. 22, no. 1, pp. 96–102, Feb. 2015.
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:53 UTC from IEEE Xplore.  Restrictions apply. 



# Page 14

ZHANG et al.: BLOCKCHAIN-ASSISTED PRIVACY-PRESERVING TRAFFIC ROUTE MANAGEMENT SCHEME
2867
[8] F. Bonomi, R. Milito, J. Zhu, and S. Addepalli, “Fog computing and its
role in the Internet of Things,” in Proc. 1st ed. MCC Workshop Mobile
Cloud Comput., 2012, pp. 13–16.
[9] N. B. Truong, G. M. Lee, and Y. Ghamri-Doudane, “Software
deﬁned networking-based vehicular adhoc network with fog comput-
ing,” in Proc. IFIP/IEEE Int. Symp. Integr. Netw. Manage. (IM), 2015,
pp. 1202–1207.
[10] L. Song, G. Sun, H. Yu, X. Du, and M. Guizani, “FBIA: A fog-based
identity authentication scheme for privacy preservation in Internet of
Vehicles,” IEEE Trans. Veh. Technol., vol. 69, no. 5, pp. 5403–5415,
May 2020.
[11] B. Liu, X. L. Yu, S. Chen, X. Xu, and L. Zhu, “Blockchain based data
integrity service framework for IoT data,” in Proc. IEEE Int. Conf. Web
Services (ICWS), 2017, pp. 468–475.
[12] J. Cui, F. Ouyang, Z. Ying, L. Wei, and H. Zhong, “Secure and efﬁcient
data sharing among vehicles based on consortium blockchain,” IEEE
Trans. Intell. Transp. Syst., vol. 23, no. 7, pp. 8857–8867, Jul. 2022.
[13] M. Raya and J.-P. Hubaux, “Securing vehicular ad hoc networks,” J.
Comput. Secur., vol. 15, no. 1, pp. 39–68, 2007.
[14] R. Lu, X. Lin, H. Zhu, P.-H. Ho, and X. Shen, “ECPP: Efﬁcient
conditional privacy preservation protocol for secure vehicular communi-
cations,” in Proc. IEEE INFOCOM 27th Conf. Comput. Commun., 2008,
pp. 1229–1237.
[15] M. Khodaei and P. Papadimitratos, “Efﬁcient, scalable, and resilient
vehicle-centric certiﬁcate revocation list distribution in VANETs,” in
Proc. 11th ACM Conf. Secur. Privacy Wireless Mobile Netw., 2018,
pp. 172–183.
[16] C. Zhang, R. Lu, X. Lin, P.-H. Ho, and X. Shen, “An efﬁcient identity-
based batch veriﬁcation scheme for vehicular sensor networks,” in Proc.
IEEE INFOCOM 27th Conf. Comput. Commun., 2008, pp. 246–250.
[17] T. W. Chim, S.-M. Yiu, L. C. Hui, and V. O. Li, “SPECS: Secure and pri-
vacy enhancing communications schemes for VANETs,” Ad Hoc Netw.,
vol. 9, no. 2, pp. 189–203, 2011.
[18] Y. Liu, L. Wang, and H.-H. Chen, “Message authentication using proxy
vehicles in vehicular ad hoc networks,” IEEE Trans. Veh. Technol.,
vol. 64, no. 8, pp. 3697–3710, Aug. 2015.
[19] D. He, S. Zeadally, B. Xu, and X. Huang, “An efﬁcient identity-based
conditional privacy-preserving authentication scheme for vehicular ad
hoc networks,” IEEE Trans. Inf. Forensics Security, vol. 10, no. 12,
pp. 2681–2691, Dec. 2015.
[20] J. Cui, L. Wei, J. Zhang, Y. Xu, and H. Zhong, “An efﬁcient
message-authentication scheme based on edge computing for vehicu-
lar ad hoc networks,” IEEE Trans. Intell. Transp. Syst., vol. 20, no. 5,
pp. 1621–1632, May 2019.
[21] J. Zhang, J. Cui, H. Zhong, Z. Chen, and L. Liu, “PA-CRT: Chinese
remainder theorem based conditional privacy-preserving authentication
scheme in vehicular ad-hoc networks,” IEEE Trans. Dependable Secure
Comput., vol. 18, no. 2, pp. 722–735, Mar./Apr. 2021.
[22] Y. Han, W. Song, Z. Zhou, H. Wang, and B. Yuan, “eCLAS:
An efﬁcient pairing-free certiﬁcateless aggregate signature for secure
VANET communication,” IEEE Syst. J., vol. 16, no. 1, pp. 1637–1648,
Mar. 2022.
[23] Z. Lu, Q. Wang, G. Qu, H. Zhang, and Z. Liu, “A blockchain-based
privacy-preserving authentication scheme for VANETs,” IEEE Trans.
Very Large Scale Integr. (VLSI) Syst., vol. 27, no. 12, pp. 2792–2801,
Dec. 2019.
[24] C. Lin, D. He, X. Huang, N. Kumar, and K.-K. R. Choo, “BCPPA: A
blockchain-based conditional privacy-preserving authentication protocol
for vehicular ad hoc networks,” IEEE Trans. Intell. Transp. Syst., vol. 22,
no. 12, pp. 7408–7420, Dec. 2021.
[25] Y. Yao, X. Chang, J. Miši´c, V. B. Miši´c, and L. Li, “BLA: Blockchain-
assisted lightweight anonymous authentication for distributed vehicular
fog services,” IEEE Internet Things J., vol. 6, no. 2, pp. 3775–3784,
Apr. 2019.
[26] Z. Ma, J. Zhang, Y. Guo, Y. Liu, X. Liu, and W. He, “An efﬁ-
cient decentralized key management mechanism for VANET with
blockchain,” IEEE Trans. Veh. Technol., vol. 69, no. 6, pp. 5836–5849,
Jun. 2020.
[27] D. Gabay, K. Akkaya, and M. Cebe, “Privacy-preserving authentication
scheme for connected electric vehicles using blockchain and zero knowl-
edge proofs,” IEEE Trans. Veh. Technol., vol. 69, no. 6, pp. 5760–5772,
Jun. 2020.
[28] Y. Yang, L. Wei, J. Wu, C. Long, and B. Li, “A blockchain-based
multidomain authentication scheme for conditional privacy preserving
in vehicular ad-hoc network,” IEEE Internet Things J., vol. 9, no. 11,
pp. 8078–8090, Jun. 2022.
[29] S. Son, J. Lee, Y. Park, Y. Park, and A. K. Das, “Design of
blockchain-based lightweight V2I handover authentication protocol for
VANET,” IEEE Trans. Netw. Sci. Eng., vol. 9, no. 3, pp. 1346–1358,
May/Jun. 2022.
[30] M. Cui, D. Han, and J. Wang, “An efﬁcient and safe road condition mon-
itoring authentication scheme based on fog computing,” IEEE Internet
Things J., vol. 6, no. 5, pp. 9076–9084, Oct. 2019.
[31] X. Liu, W. Chen, Y. Xia, and C. Yang, “SE-VFC: Secure and efﬁcient
outsourcing computing in vehicular fog computing,” IEEE Trans. Netw.
Service Manag., vol. 18, no. 3, pp. 3389–3399, Sep. 2021.
[32] H. Zhong, L. Chen, J. Cui, J. Zhang, I. Bolodurina, and L. Liu, “Secure
and lightweight conditional privacy-preserving authentication for fog-
based vehicular ad hoc networks,” IEEE Internet Things J., vol. 9, no. 11,
pp. 8485–8497, Jun. 2022.
[33] S. Rajkumar, L. J. Deborah, P. Vijayakumar, and K. Karthick, “Secure
session key pairing and a lightweight key authentication scheme
for liable drone services,” Cyber Secur. Appl., vol. 1, Dec. 2023,
Art. no. 100012.
[34] P. Paillier, “Public-key cryptosystems based on composite degree resid-
uosity classes,” in Proc. Int. Conf. Theory Appl. Cryptograph. Techn.,
1999, pp. 223–238.
[35] Y. Yuan and F.-Y. Wang, “Blockchain: The state of the art and future
trends,” Acta Automatica Sinica, vol. 42, no. 4, pp. 481–494, 2016.
[36] N. Zhang, Y. Wang, C. Kang, J. Cheng, and D. He, “Blockchain
technique in the energy Internet: Preliminary research framework and
typical applications,” in Proc. Chin. Soc. Elect. Eng., vol. 36, no. 15,
pp. 4011–4022, 2016.
[37] J. Ma, T. Li, J. Cui, Z. Ying, and J. Cheng, “Attribute-based secure
announcement sharing among vehicles using blockchain,” IEEE Internet
Things J., vol. 8, no. 13, pp. 10873–10883, Jul. 2021.
[38] M. R. I. Sattar et al., “An advanced and secure framework for conduct-
ing Online examination using blockchain method,” Cyber Secur. Appl.,
vol. 1, Dec. 2023, Art. no. 100005.
[39] B. D. S. Sai, R. Nikhil, S. Prasad, and N. S. Naik, “A decentralised KYC
based approach for microﬁnance using blockchain technology,” Cyber
Secur. Appl., vol. 1, Dec. 2023, Art. no. 100009.
[40] Y. Zhang, S. Kasahara, Y. Shen, X. Jiang, and J. Wan, “Smart contract-
based access control for the Internet of Things,” IEEE Internet Things
J., vol. 6, no. 2, pp. 1594–1605, Apr. 2019.
[41] A. Kosba, A. Miller, E. Shi, Z. Wen, and C. Papamanthou, “Hawk:
The blockchain model of cryptography and privacy-preserving smart
contracts,” in Proc. IEEE Symp. Secur. Privacy (SP), 2016, pp. 839–858.
[42] S. Ma, Y. Deng, D. He, J. Zhang, and X. Xie, “An efﬁcient NIZK scheme
for privacy-preserving transactions over account-model blockchain,”
IEEE Trans. Dependable Secure Comput., vol. 18, no. 2, pp. 641–651,
Mar./Apr. 2021.
[43] S.
Tikhomirov,
E.
Voskresenskaya,
I.
Ivanitskiy,
R.
Takhaviev,
E. Marchenko, and Y. Alexandrov, “Smartcheck: Static analysis of
ethereum smart contracts,” in Proc. 1st Int. Workshop Emerg. Trends
Softw. Eng. Blockchain, 2018, pp. 9–16.
[44] C. H. Tseng, S.-H. Wang, and W.-J. Tsaur, “Hierarchical and dynamic
elliptic curve cryptosystem based self-certiﬁed public key scheme
for medical data protection,” IEEE Trans. Rel., vol. 64, no. 3,
pp. 1078–1085, Sep. 2015.
[45] A. J. Kadhim and S. A. H. Seno, “Energy-efﬁcient multicast routing
protocol based on SDN and fog computing for vehicular networks,” Ad
Hoc Netw., vol. 84, pp. 68–81, Mar. 2019.
[46] Y. Liu, Y. Wang, and G. Chang, “Efﬁcient privacy-preserving dual
authentication and key agreement scheme for secure V2V communi-
cations in an IoV paradigm,” IEEE Trans. Intell. Transp. Syst., vol. 18,
no. 10, pp. 2740–2749, Oct. 2017.
[47] S.-J. Horng et al., “b-SPECS+: Batch veriﬁcation for secure pseudony-
mous authentication in VANET,” IEEE Trans. Inf. Forensics Security,
vol. 8, no. 11, pp. 1860–1875, Nov. 2013.
[48] M. Bellare and P. Rogaway, “Random oracles are practical: A paradigm
for designing efﬁcient protocols,” in Proc. 1st ACM Conf. Comput.
Commun. Secur., 1993, pp. 62–73.
[49] M. Bellare and G. Neven, “Multi-signatures in the plain public-key
model and a general forking lemma,” in Proc. 13th ACM Conf. Comput.
Commun. Secur., 2006, pp. 390–399.
[50] J. Shen, D. Liu, X. Chen, J. Li, N. Kumar, and P. Vijayakumar, “Secure
real-time trafﬁc data aggregation with batch veriﬁcation for vehicu-
lar cloud in VANETs,” IEEE Trans. Veh. Technol., vol. 69, no. 1,
pp. 807–817, Jan. 2020.
[51] K. Rabieh, M. M. Mahmoud, and M. Younis, “Privacy-preserving route
reporting schemes for trafﬁc management systems,” IEEE Trans. Veh.
Technol., vol. 66, no. 3, pp. 2703–2713, Mar. 2017.
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:53 UTC from IEEE Xplore.  Restrictions apply. 



# Page 15

2868
IEEE TRANSACTIONS ON NETWORK AND SERVICE MANAGEMENT, VOL. 20, NO. 3, SEPTEMBER 2023
[52] J. Cui, L. Wei, H. Zhong, J. Zhang, Y. Xu, and L. Liu, “Edge computing
in VANETs-an efﬁcient and privacy-preserving cooperative downloading
scheme,” IEEE J. Sel. Areas Commun., vol. 38, no. 6, pp. 1191–1204,
Jun. 2020.
[53] S. Miracl, “Cryptographic,” Accessed: Nov. 29, 2019. [Online].
Available: https://github.com/miracl/MIRACL/
[54] G. Wood, “Ethereum: A secure decentralised generalised transaction
ledger,” Ethereum Project Yellow Paper, vol. 151, no. 2014, pp. 1–32,
2014.
Jing
Zhang
is
currently
pursuing
the
Ph.D.
degree
with
the
School
of
Computer
Science
and Technology, Anhui University, Hefei, China.
She
has
nearly
20
scientiﬁc
publications
in
reputable journals, such as IEEE TRANSACTIONS
ON
DEPENDABLE
AND
SECURE
COMPUTING,
IEEE
TRANSACTIONS
ON
INFORMATION
FORENSICS AND SECURITY, IEEE JOURNAL ON
SELECTED AREAS IN COMMUNICATIONS, IEEE
TRANSACTIONS ON VEHICULAR TECHNOLOGY,
IEEE
TRANSACTIONS
ON
INTELLIGENT
TRANSPORTATION
SYSTEMS,
Information
Sciences,
Science
China
Information Sciences, and Vehicular Communications and international
conferences. Her research interests include vehicular ad hoc network, IoT
security, and applied cryptography.
Huixia Fang is currently a research student with the
School of Computer Science and Technology, Anhui
University. Her research focuses on the security of
the Vehicular Ad Hoc Networks.
Hong Zhong (Member, IEEE) was born in Anhui
Province, China, in 1965. She received the Ph.D.
degree in computer science from the University of
Science and Technology of China in 2005. She is
currently a Professor and a Ph.D. Supervisor with the
School of Computer Science and Technology, Anhui
University. She has over 200 scientiﬁc publications
in reputable journals, such as IEEE JOURNAL
ON
SELECTED
AREAS
IN
COMMUNICATIONS,
IEEE
TRANSACTIONS
ON
PARALLEL
AND
DISTRIBUTED SYSTEMS, IEEE TRANSACTIONS
ON
MOBILE
COMPUTING,
IEEE
TRANSACTIONS
ON
DEPENDABLE
AND SECURE COMPUTING, IEEE TRANSACTIONS
ON INFORMATION
FORENSICS
AND SECURITY, IEEE TRANSACTIONS
ON INTELLIGENT
TRANSPORTATION SYSTEMS, IEEE TRANSACTIONS ON MULTIMEDIA,
IEEE
TRANSACTIONS
ON
VEHICULAR
TECHNOLOGY,
IEEE
TRANSACTIONS
ON NETWORK
AND SERVICE MANAGEMENT,
IEEE
TRANSACTIONS
ON CLOUD COMPUTING,
IEEE TRANSACTIONS
ON
INDUSTRIAL
INFORMATICS,
IEEE
TRANSACTIONS
ON
INDUSTRIAL
ELECTRONICS,
and
IEEE TRANSACTIONS
ON BIG DATA,
academic
books, and international conferences. Her research interests include applied
cryptography, IoT security, vehicular ad hoc network, cloud computing
security, and software-deﬁned networking.
Jie
Cui
(Senior Member, IEEE) was born in
Henan Province, China, in 1980. He received the
Ph.D. degree from the University of Science and
Technology of China in 2012. He is currently
a Professor and a Ph.D. Supervisor with the
School
of
Computer
Science
and
Technology,
Anhui
University.
He
has
over
150
scientiﬁc
publications
in
reputable
journals,
such
as
IEEE
TRANSACTIONS
ON
DEPENDABLE
AND
SECURE
COMPUTING,
IEEE
TRANSACTIONS
ON INFORMATION FORENSICS
AND SECURITY,
IEEE JOURNAL
ON SELECTED AREAS
IN COMMUNICATIONS, IEEE
TRANSACTIONS
ON MOBILE COMPUTING, IEEE TRANSACTIONS
ON
PARALLEL
AND DISTRIBUTED SYSTEMS,
IEEE TRANSACTIONS
ON
COMPUTERS,
IEEE
TRANSACTIONS
ON
VEHICULAR
TECHNOLOGY,
IEEE TRANSACTIONS
ON INTELLIGENT TRANSPORTATION SYSTEMS,
IEEE TRANSACTIONS ON NETWORK AND SERVICE MANAGEMENT, IEEE
TRANSACTIONS ON INDUSTRIAL INFORMATICS, IEEE TRANSACTIONS
ON
INDUSTRIAL
ELECTRONICS,
IEEE
TRANSACTIONS
ON
CLOUD
COMPUTING, and IEEE TRANSACTIONS
ON MULTIMEDIA, academic
books, and international conferences. His current research interests include
applied
cryptography,
IoT
security,
vehicular
ad
hoc
network,
cloud
computing security, and software-deﬁned networking.
Debiao He (Member, IEEE) received the Ph.D.
degree in applied mathematics from the School
of Mathematics and Statistics, Wuhan University,
Wuhan, China in 2009, where he is currently
a Professor with the School of Cyber Science
and Engineering. His work has been cited more
than 10000 times at Google Scholar. He has
published
over
100
research
papers
in
refer-
eed international journals and conferences, such
as IEEE TRANSACTIONS ON DEPENDABLE AND
SECURE COMPUTING, IEEE TRANSACTIONS ON
INFORMATION SECURITY AND FORENSIC, and Usenix Security Symposium.
He is the recipient of the 2018 IEEE Sysems Journal Best Paper Award and the
2019 IET Information Security Best Paper Award. He is in the editorial board
of several international journals, such as Journal of Information Security and
Applications, Frontiers of Computer Science, and Human-Centric Computing
and Information Sciences. His main research interests include cryptography
and information security, in particular, cryptographic protocols.
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:53 UTC from IEEE Xplore.  Restrictions apply. 
