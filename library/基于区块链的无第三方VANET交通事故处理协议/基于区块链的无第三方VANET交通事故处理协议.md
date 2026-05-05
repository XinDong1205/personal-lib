

# Page 1

31068
IEEE INTERNET OF THINGS JOURNAL, VOL. 11, NO. 19, 1 OCTOBER 2024
Blockchain-Based Trafﬁc Accident Handling
Protocol Without Third Party for VANETs
Qi Xie
, Zixuan Ding
, Qingyun Xie
, Xiao Tan
, Debiao He
, Member, IEEE, and Wen Tang
Abstract—In vehicular ad-hoc networks (VANETs), existing
trafﬁc accident handling schemes are adoptable only in the sce-
nario with roadside unit (RSU) deployment, and the generation
of accident reports relies on RSUs and witness vehicles. Without
the conﬁrmation from involved vehicles in the accident, it will
probably cause disputes afterward, and RSU captured attacks
may also affect authentication of vehicles and correctness of acci-
dent reports. To address the above issues, we propose a vehicle to
vehicle (V2V) and vehicle to RSU (V2R) authentication and trafﬁc
accident handling protocol, in which accident vehicles are sufﬁ-
cient to generate accident reports, thereby enhancing autonomy
of the vehicular communication system and reducing reliance on
external infrastructure. Furthermore, for ensuring integrity and
traceability of accident reports, we utilize blockchain to keep
registration information and jointly signed reports, which realizes
efﬁcient and secure mutual authentications in V2V and V2R
protocols. Finally, for preserving privacy of vehicles, we integrate
elliptic curve cryptosystem (ECC) and symmetric encryption to
design a dynamic pseudo-identity strategy, which still allows
the registration center to track malicious vehicles. The formal
security proof and comparative analysis validate that our protocol
preserves higher security and lower overhead by comparison with
related schemes.
Index Terms—Authentication protocol, privacy protection,
signature, trafﬁc accident handling, vehicle to vehicle (V2V),
vehicular ad-hoc networks (VANETs).
I. INTRODUCTION
V
EHICULAR ad-hoc networks (VANETs) refer to the
effective utilization of vehicle environment and dynamic
information through on-board unit (OBU), roadside unit
(RSU), and other equipment with the help of emerging vehicle
communication technology. Not only can VANETs realize
network connection and information exchange between V2V,
vehicle to infrastructure (V2I), vehicle to pedestrian, etc.,
but also provide users with safe, comfortable, intelligent, and
efﬁcient transportation services. Due to the inevitability of
Manuscript received 25 February 2024; revised 10 April 2024 and 16
May 2024; accepted 11 June 2024. Date of publication 14 June 2024; date
of current version 25 September 2024. This work was supported in part
by the Hangzhou Joint Fund of the Zhejiang Provincial Natural Science
Foundation of China under Grant LHZSZ24F020002, and in part by the
National Natural Science Foundation of China under Grant U21A20466.
(Corresponding authors: Qi Xie; Xiao Tan.)
Qi Xie, Zixuan Ding, Qingyun Xie, Xiao Tan, and Wen Tang are
with the Key Laboratory of Cryptography of Zhejiang Province, Hangzhou
Normal University, Hangzhou 311121, China (e-mail: qixie68@126.com;
dingzixuan8899@163.com: qingyunxie_m@163.com; xiaotan_cs@163.com;
tangwen1012@163.com).
Debiao He is with the School of Cyber Science and Engineering, Wuhan
University, Wuhan 430072, China (e-mail: hedebiao@163.com).
Digital Object Identiﬁer 10.1109/JIOT.2024.3414453
trafﬁc accidents, the wide applications of VANETs play a
positive role in generating accident reports, aftercare work,
and secondary disaster prevention.
Generally speaking, when a trafﬁc accident occurs between
vehicles, both parties need to authenticate each other, read
the accident scene from the on-board instrument, and then
jointly sign it to prevent repudiation and facilitate subsequent
processing. It is a challenging task to design an efﬁcient trafﬁc
accident handling protocol for mobile vehicles in VANETs
fulﬁlling various security requirements.
He et al. [1] proposed a V2V and V2I authentication
protocol with batch veriﬁcation. Mukherjee et al. [2] designed
an RSU-led report online and ofﬂine distribution proto-
col, the system provides subscription services for VANETs.
Azees et al. [3] proposed an anonymous authentication
scheme, which achieves misbehaving vehicle tracking and
cross-domain authentication with different RSUs. Cui et al. [4]
proposed a cuckoo ﬁlter and binary search-based authentica-
tion scheme for support of batch veriﬁcation. Liu et al. [5]
designed a conditional privacy-preserving vehicle announce-
ment protocol. the initiated vehicle generates an accident
report and broadcasts it to other vehicles for witness and
signature. Then the initiator generates an aggregation packet
and sends it to RSU. RSU judges the authenticity of the
message according to the reputation value of the vehicle.
Chen et al. [6] proposed a vehicle emergency event-sharing
protocol, the vehicle sends emergency information via RSU to
the broadcasting center, which issues an emergency certiﬁcate
to the vehicle and broadcasts the emergency message through
RSUs if the message is valid. Zhang et al. [7] proposed a group
communication authentication protocol for VANETs using the
Chinese Remainder Theorem, but Xiong et al. [8] pointed
out that their scheme suffers from impersonation attack.
Xie and Huang [9] proposed a secure V2I authentication
protocol for VANETs, which uses the physical unclonable
function (PUF) to resist RSU captured attacks, and designed
a three-factor secrecy strategy to resist side channel attacks.
Cheng et al. [10] integrated homomorphic encryption and
data aggregation technology to propose a vehicle feedback
protocol. RSU evaluates the reputation score of the feedback
sender and then veriﬁes and aggregates the feedback. The
aggregated result is transmitted to the cloud service provider,
which decrypts the result and calculates the reputation scores
of vehicles. Mei et al. [11] proposed an authentication protocol
for transportation cyber–physical system. RSU receives the
trafﬁc information sent by the vehicle and stores it in the
edge server, the adjacent RSUs form the edge service domain.
2327-4662 c⃝2024 IEEE. Personal use is permitted, but republication/redistribution requires IEEE permission.
See https://www.ieee.org/publications/rights/index.html for more information.
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:40:34 UTC from IEEE Xplore.  Restrictions apply. 



# Page 2

XIE et al.: BLOCKCHAIN-BASED TRAFFIC ACCIDENT HANDLING PROTOCOL WITHOUT THIRD PARTY FOR VANETs
31069
Chen et al. [12] proposed a vehicle emergency report protocol.
After witnessing an accident, vehicles report the message
to the RSU, the RSU broadcasts the emergency message to
seek the veriﬁcation of the accident. The vehicles generate a
multisignature and send it to the RSU. If the signature passes
the RSU’s veriﬁcation, the accident report will be uploaded
to the transportation authorities. Baee et al. [13] integrated
message authentication and beacon encryption to present a
vehicle broadcast authentication protocol, which can be used
for V2I and V2V broadcast communication. Xie et al. [14]
proposed a lightweight and anonymous authentication protocol
for VANETs, which achieves both V2I and V2V authentica-
tion.
Blockchain
originated
from
Satoshi
Nakamoto’s
Bitcoin [15] in 2008. As the underlying technology of
Bitcoin, blockchain is essentially a distributed ledger and
new application mode of computer technology, such as
distributed data storage, point-to-point transmission, consensus
mechanism, and encryption algorithm. Blockchain technology
is a technical solution that does not rely on a third party
and stores, veriﬁes, transmits, and communicates through
its decentralized nodes. As a decentralized, tamper-proof,
and
nonrepudiation
emerging
technology,
blockchain
is
also widely used in the VANETs. Li et al. [16] proposed
homomorphic encryption and blockchain-based V2R and
V2V authentication protocol, However, it requires more
computational
cost.
Zhang
and
Xu
[17]
presented
an
anonymous authentication protocol based on the certiﬁcateless
message signature and blockchain incentives, but adversaries
can seek rewards or escape punishment by collusion attacks.
Xie et al. [18] proposed a blockchain-based V2I handover
authentication, and V2V broadcasting authentication protocol,
which can realize V2V broadcast trafﬁc information. To
realize
decentralized
data
storage,
Qureshi
et
al.
[19]
proposed a blockchain-based authentication model, which
uses smart contracts and RSU to authenticate the vehicles. To
address the issue of malicious vehicles spreading erroneous
information, Zhao et al. [20] proposed a trust management
model based on blockchain, machine learning, and active
detection technologies. Roy et al. [21] proposed a blockchain-
based access control protocol with handover authentication.
Du et al. [22] proposed a trust value management method
based on consortium blockchain to establish a trustworthy
vehicle information sharing environment. Wei et al. [23]
proposed
a
conditional
privacy-preserving
authenticated
key agreement scheme with multi-TA model for fog-based
VANETs. Xie et al. [24] proposed a blockchain-based
cross-trusted authority authentication protocol for VANETs.
Alharthi et al. [25] proposed a blockchain-based method for
calculating vehicle credibility and subsequently predicting
vehicle credibility.
A. Motivations and Contributions
The previous trafﬁc accident handling schemes relied on
witness vehicles to send the accident report to RSU, which
broadcasts the report to ﬁnd other witness vehicles. RSU
judges authenticity of the report by aggregated signature or
Fig. 1.
Security vulnerabilities in existing schemes for VANETs.
reputation value of the witness vehicles. Under this situation,
there are some weaknesses: 1) because the report is not
conﬁrmed by the involved vehicles, it will probably cause
disputes after the accident; 2) in cases where there lack RSU
deployment or RSU is captured, existing schemes will no
longer work or fail to preserve correctness of the report;
3) since the aggregated signature is generated by the witness
vehicles, it may suffer from collusion attacks; and 4) it is
not scalable to the low-density trafﬁc scenario where witness
vehicles are unavailable or the high-density scenario where
RSU may become the bottleneck of performance. Fig. 1 shows
those security vulnerabilities in existing schemes for VANETs.
Therefore, we propose a novel V2V and V2I authentication
and trafﬁc accident handling protocol, namely, accident pro-
cessing authentication (APA) protocol, to address the above
issues. The contributions of this article are listed as follows.
1) We propose a novel self-sufﬁcient trafﬁc accident han-
dling mechanism, such that the generation of trafﬁc
accident reports relies solely on the vehicles involved
in accident, eliminating the dependence on RSUs or
witness vehicles. This approach enhances autonomy
of the vehicular communication system and reduces
reliance on external infrastructure.
2) Blockchain technology is adopted in our system model
to keep jointly signed accident reports, so as to enforce
integrity and traceability of reports. Besides, registration
information of vehicles and RSUs are also inscribed on
the blockchain and retrievable as credentials from the
registration center (RC), for realizing efﬁcient authenti-
cations in V2V and V2R protocols.
3) A dynamic pseudo-identity strategy is devised by
integrating symmetric encryption with elliptic curve
cryptosystem
(ECC),
for
ensuring
unlinkability
of
pseudo-identities and preserve privacy of vehicles, while
still allowing the RC to track malicious vehicles effec-
tively.
4) Formal proofs are conducted for validating the correct-
ness and security of our protocol. Through analysis and
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:40:34 UTC from IEEE Xplore.  Restrictions apply. 



# Page 3

31070
IEEE INTERNET OF THINGS JOURNAL, VOL. 11, NO. 19, 1 OCTOBER 2024
Fig. 2.
System model.
comparison with related schemes, our scheme outper-
forms them regarding both efﬁciency and many security
properties.
In Section II, we introduce the system model and design
goals. The adversary model and the assumptions are presented
in Section III. We propose a novel authentication and signature
protocol in Section IV. Section V shows the formal proof and
security analysis of the protocol. Section VI conducts a simu-
lation experiment on the proposed protocol by comparison to
related schemes. This article concludes in Section VII.
II. SYSTEM MODEL AND DESIGN GOALS
A. System Model
The system model is shown in Fig. 2, which covers the
registration phase and accident report generation phase.
In the registration phase, the driver and vehicle send
registration request (message ﬂow 1) to the RC. After the
identity veriﬁcation, RC returns the authentication parameters
(message ﬂow 2), and the driver inputs the bio-information
(message ﬂow 3) to encrypt them and store in the vehicle’s
OBU (message ﬂow 4). RSU also receives its authentica-
tion parameters from RC and stores them (message ﬂow
5). Besides, RC is authorized to write partial registration
information of vehicles and RSUs onto the blockchain (mes-
sage ﬂow 6).
In the accident report generation phase, the accident vehicles
ﬁrst retrieve their registration information from the blockchain
(message ﬂows 7 and 8) and then authenticate each other
using V2V protocol (message ﬂow 9) to generate the signed
accident report. Upon entry into the RSU domain, either
of the accident vehicles can notify RSU, which ﬁrst reads
its registration information from the blockchain (message
ﬂow 10) and then runs V2R protocol with the vehicle for
authentication (message ﬂow 11). Finally, RSU writes the
jointly signed accident report to the blockchain (message
ﬂow 12).
Notice that access control policy is enforced upon the
blockchain. In particular, the authorized RC and RSU have
written permission to the blockchain regarding registration
information and signed accident reports, respectively, while
the other relevant entities (e.g., vehicles, trafﬁc police, and
insurance companies) are only granted read permission to the
blockchain. Outsiders of the system have neither read nor write
permission to the blockchain for protection of personal data
privacy.
B. Design Goals
The design goals of our scheme are listed as follows:
1) even if a trafﬁc accident occurs in a place without trafﬁc
infrastructure, the trafﬁc accident report can only be generated
by relying on each accident vehicle, and the trafﬁc accident
report has the signature of each accident vehicle; 2) the signa-
ture of each accident vehicle in the trafﬁc accident report can
be veriﬁed by RSU and written onto the blockchain by RSU,
which is convenient for the trafﬁc police or insurance company
to handle the accident, and has nonrepudiation and public
veriﬁability; 3) the proposed protocol can protect the privacy
of vehicle, support RC’s tracking of malicious messages,
and resist all known attacks, including OBU intrusion attack,
RSU capture attack, etc.; and 4) the proposed trafﬁc accident
handling scheme can be proved to be secure and efﬁcient.
III. ASSUMPTIONS AND ADVERSARIAL MODEL
A. Assumptions
The provable security of our scheme is based on the
intractability of the elliptic curve discrete logarithm problem
(ECDLP) assumption and semantic security of symmetric
encryption scheme (chosen ciphertext attack, CCA), deﬁned
as follows.
Deﬁnition 1 (ECDLP Assumption): Given a generator P ∈
E(Fp) of order n and one point A = aP, no probabilistic
polynomial time (PPT) adversary can ﬁnd a with nonnegligible
probability.
Deﬁnition 2 (Semantic Security of Symmetric Encryption):
A symmetric encryption scheme SE(·)
=
{Ek(·), Dk(·)}
provides semantic security (or CCA security), if any PPT
adversary A playing the following game with a challenger C.
Phase 1: A adaptively queries to encryption oracle Ek(·)
and decryption oracle Dk(·).
Phase 2: A chooses two messages m0 and m1, submits to
C. C tosses a bit b ←{0, 1} and returns c∗= Ek(mb) to A.
Phase 3: A adaptively queries to Ek(·) and Dk(·), under the
restriction that c∗is not queried to Dk(·). Finally, A outputs
a bit b′.
The probability that b′ = b is no greater than 1/2, says the
advantage of A
AdvCCA(A) = 2 Pr

b′ = b

−1
is negligible.
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:40:34 UTC from IEEE Xplore.  Restrictions apply. 



# Page 4

XIE et al.: BLOCKCHAIN-BASED TRAFFIC ACCIDENT HANDLING PROTOCOL WITHOUT THIRD PARTY FOR VANETs
31071
B. Threat Model
The capabilities of an adversary we consider are listed as
follows.
C1: An adversary can eavesdrop on any message over public
channels.
C2: An adversary can insert, delete, modify, or replay any
message over public channels.
C3: An adversary can corrupt the private keys of vehicles
or RSUs.
C4: An adversary can steal the data in OBU.
C5: An adversary can fake the biometrics of drivers.
Especially, C1 models passive adversaries, C2 models
active adversaries, C3 models insider adversaries, and C4 and
C5 models two-factor authentication.
C. Adversarial Model
The adversarial model of our anonymous two-factor APA
protocol is deﬁned as follows. There are three types of
participants: 1) a trusted RC RC; 2) n vehicles V = {Vi|i =
1, n}; and 3) m RSU R = {Rt|t = 1m}. Each vehicle Vi
and each RSU Rt have unique identities VIDi and RIDt,
respectively. Let x
α denote the xth instance of the participant
α ∈V ∪R. We say that x
α and y
β are partners if they can
authenticate mutually and generate signatures on the co-related
accident record.
Deﬁnition 3 (Correctness):
The
transaction
data
{cij, PKVi,
PKVj, AC1,
AC2, Dij, T1, PIDi, T2, PIDj,
VaIi,
Vaij, RIDt, PKRt, T4, ct, Dt} uploaded to the blockchain is
said to be correct if the following conditions hold.
1) cij · P = PKVj + PKVi + h(AC1∥AC2∥Dij∥T1∥PIDi∥T2∥
PIDj∥VaIi∥VaIj) · Dij.
2) ct · P = PKRt + h(cij∥T4∥Dt) · Dt.
Deﬁnition 4 (Existential Unforgeability): We assume that
an adversary A against existential unforgeability is a PPT
algorithm that can control all public communications and
access to a set of oracles: hash, execute, send, extract, and
corrupt, deﬁned as below.
Hash(m): This oracle returns the hash output h(m) when a
message m is queried.
Execute(x
α, y
β): This oracle returns the protocol transcript
running between x
α and y
β. It is to model the adversarial
capability C1.
Send(x
α, ·): This oracle returns the response by x
α, ·
denotes the auxiliary input to specify the protocol phase and
the previous message to respond. It is to model the adversarial
capability C2.
Extract(ID, ·): This oracle returns the private key associated
with ID, · denotes the auxiliary input depending on which type
of participant (vehicle or RSU) that ID belongs to. It is to
model the adversarial capability C3.
Corrupt(Vi, ·): This oracle returns the OBU data or bio-
metric of Vi, · denotes the auxiliary input to specify the factor
of authentication. It is to model the adversarial capabilities C4
and C5.
We
say
that
an
APA
protocol
achieves
Existential
Unforgeability if A has negligible probability of producing
correct transaction data: {ci∗j∗, PKVi∗, PKVj∗, AC1, AC2, Di∗j∗,
T1, PIDi∗, T2, PIDj∗, VaIi∗, Vaij∗, RIDt∗, PKRt∗, T4, ct∗, Dt∗}.
Under the following restrictions:
1) A never made execute and send queries related to x
Vi∗,
y
Vj∗, z
Rt∗;
2) A never made extract queries related to PIDi∗, PIDj∗,
RIDt∗;
3) A never made corrupt queries related to Vi∗, Vj∗in both
OBU and biometric.
Deﬁnition 5 (Anonymity): We assume that an adversary A
against anonymity is a PPT algorithm that can control all
public communications and access to a set of oracles: hash,
execute, send, extract, and corrupt, deﬁned similarly as in
Deﬁnition 4; reveal and test, deﬁned as below.
Reveal(x
Vi∗): This oracle returns the real identity VIDi
of Vi.
Test(x
Vi∗): This oracle can be queried only once. When
queried, it tosses a bit b ←{0, 1} and returns the real identity
VIDi of Vi if b = 1, or returns a random value in the identity
space if b = 0.
We say that an APA protocol achieves anonymity if the
probability that A correctly guesses b is no greater than 1/2
under the restriction that A never queried x
Vi∗to Reveal oracle
where x
Vi∗is the query A made to Test oracle.
IV. PROPOSED SCHEME
A novel vehicle trafﬁc accident handling protocol, namely,
APA protocol, is proposed in this section. Tables I and II,
respectively, summarize the notations and acronyms used in
this article.
Fig. 3 shows the technology roadmap of our protocol. By
integrating symmetric encryption and ECC, we develop a
dynamic pseudo-identity strategy to enforce vehicle identity
privacy. Blockchain technology is utilized to achieve accident
integrity and traceability. Two-factor authentication, aggregat-
able signature, and lightweight cryptography are integrated
to realize secure and efﬁcient V2V and V2R authentication.
Based on the above components, our APA protocol is designed
delicately with solid foundation and high reliability.
A. Initialization
RC chooses an elliptic curve E(Fp) with a generator P,
a symmetric encryption scheme SE(.) = {Ek(.), Dk(.)}, a
one-way hash function h(.), the reproduction and generation
functions Gen(.),
Rep(.) of a fuzzy extractor algorithm,
a long-term secret random number KTA. RC publishes
{P, E(Fp), SE(.), h(.), Gen(.), Rep(.)}, and we assume that
those global parameters are accessible to all the entities in the
system.
B. Registration Phase
The vehicles and RSUs register with RC in the registration
phase, illustrated as follows.
Vehicle Registration:
Step VR1: The driver inputs the biometrical information
Bioi and the vehicle Vi selects a secret random number SKvi.
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:40:34 UTC from IEEE Xplore.  Restrictions apply. 



# Page 5

31072
IEEE INTERNET OF THINGS JOURNAL, VOL. 11, NO. 19, 1 OCTOBER 2024
TABLE I
NOTATIONS
Notations
Description
-th vehicle 
The trusted-authority
-th roadside unit 
The biological information of 
Unique identification (engine number) of 
The appearance characteristics of 
temporary pseudo-identity
ey 
Generator point of elliptic curve
Symmetric encryption scheme
Hash function
Concatenation
XOR operation
,
Fuzzy extractor algorithm for reproduction and 
generation
Reproduction parameter of fuzzy extractor algorithm
Driver
Physical unclonable function
The challenge and response of the 
Timestamps
The maximum transmission delay time
,
Accident record
TABLE II
ACRONYMS
Acronyms
Description
VANET
Vehicular Ad-hoc Network
V2V
Vehicle to Vehicle
V2R
Vehicle to Roadside Unit
V2I
Vehicle to Infrastructure
OBU
On-Board Unit 
RSU
Roadside Unit
RC
Registration Center
APA
Accident Processing Authentication
ECC
Elliptic Curve Cryptosystem
ECDLP
Elliptic Curve Discrete Logarithm Problem
CCA
Chosen Ciphertext Attack
Fig. 3.
Technology roadmap of proposed protocol.
Vi computes PKvi = SKvi · P and sends {VIDi, PKvi, VaIi} to
RC via the secure channel, where P is the generator point,
VIDi and VaIi are the vehicle’s engine number and appearance
characteristics, respectively.
Step VR2: On receiving {VIDi, PKvi, VaIi}, RC veriﬁes
the uniqueness and the legitimacy of VIDi and PKvi, if
Vehicle 
Vehicle 
Read
from blockchain,
Input biometric information 
If
Generate random numbers 
timestamp 
and accident record
Compute 
.
Read 
from blockchain,
Check the freshness of 
,
If
is fair and true, and
, compute
,
.
Compute
,
If
,
Authentication and signature completed.
Read 
from blockchain,
Input biometric information 
Generate random numbers 
timestamp 
and accident record
Compute 
.
Read 
from blockchain,
Check the freshness of 
,
If
is fair and true, and
, compute
,
.
Compute
,
If
,
Authentication and signature completed.
Fig. 4.
V2V authentication and accident report generation.
not, RC rejects the request, else generates random number
ri, then computes PIDi = EKTA(VIDi, VaIi, ri), and writes
{PIDi, PKVi, VaIi} onto the blockchain, and sends {PIDi, ri} to
the vehicle via the secure channel.
Step
VR3:
On
receiving
{ri},
the
driver
inputs
his/her biological information Bioi, the vehicle computes
(σi, τi) = Gen(Bioi), VEi
= h(σi∥VaIi), Si1
= SKVi ⊕
h(VEi∥σi), Si2
=
ri ⊕h(VIDi∥σi). Then the parameters
{PIDi, VIDi, VEi, Si1, Si2, τi} are stored in the vehicle’s OBU.
RSU Registration: RC selects a unique RSU identity RIDt,
a secret random number SKRt, then computes PKRt = SKRt ·
P, and uploads {RIDt, PKRt} onto the blockchain, and sends
{RIDt, SKRt} to RSUt via a secure channel. RSUt generates a
challenge Chat, computes Rest= PUF(Chat), RSKRt = Rest ⊕
SKRt, and stores {RIDt, RSKRt, PUF(), Chai}.
C. V2V Authentication and Trafﬁc Accident Report
Generation
This part describes the process of mutual authentication
between vehicles after an accident and the joint signature of
accident reports. The steps are described in Fig. 4.
Step VA1: Suppose a trafﬁc accident occurs between
the vehicles Vi and Vj, the drivers input their biometri-
cal information. Take Vi’s driver as an example: Vi ﬁrst
read the registration information {PIDi, PKVi, VaIi} from
blockchain according to PIDi; after inputting the biomet-
rical information Bio′
i, Vi computes σ ′
i
=
Rep(Bio′
i, τi)
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:40:34 UTC from IEEE Xplore.  Restrictions apply. 



# Page 6

XIE et al.: BLOCKCHAIN-BASED TRAFFIC ACCIDENT HANDLING PROTOCOL WITHOUT THIRD PARTY FOR VANETs
31073
Vehicle 
Roadside Unit
Read
from blockchain,
Generate a timestamp 
,
Compute 
Fig. 5.
V2R authentication and accident report upload.
and checks if VEi = h(σ ′
i ∥VaIi), if not, aborts it, else
computes SKVi = Si1 ⊕h(VEi∥σ ′
i ) to recover the secret
random number SKVi. Then Vi generates random numbers
di1, di2, timestamp T1, and the accident record AC1 read
from the on-board instrument, computes Di1
=
di1 · P,
Di2 = di2 · P, ci1 = SKVi + h(AC1∥Di1∥Di2∥T1∥PIDi∥VaIi) ∗
di1, and sends Mi1 : {PIDi, AC1, Di1, Di2, ci1, T1} to the
vehicle Vj. Similarly, the vehicle Vj generates and sends
Mj1 : {PIDj, AC2, Dj1, Dj2, cj1, T2} to the vehicle Vi via the
public channel.
Step VA2: On receiving Mj1, Vi ﬁrst read the registration
information {PIDj, PKVj, VaIj} from blockchain according to
PIDj, checks if |T∗
2 −T2| < T, and accident record AC2
is correct and fair, if not, Vi aborts the process, else Vi
checks the integrity of the message by verifying if cj1 · P =
PKVj + h(AC2∥Dj1∥Dj2∥T2∥PIDj∥VaIj) · Dj1, if the message
Mj1 passes the veriﬁcation, Vi computes Dij = Di2 + Dj2,
ci2 = SKVi + h(AC1∥AC2∥Dij∥T1∥PIDi∥T2∥PIDj∥VaIi∥VaIj) ∗
di2, and sends Mi2 : {PIDi, ci2} to Vj via the public channel.
Similarly, after verifying the legitimacy of Vi’s identity and
the integrity of the message Mi1, Vj generates and sends the
message Mj2 : {PIDj, cj2} to Vi publicly.
Step VA3: On receiving the message sent by the other
party, the vehicles integrate the accident report by computing
cij = cj2 + ci2, then verify if cij · P = PKVj + PKVi +
h(AC1∥AC∥Dij∥T1∥PIDi∥T2∥PIDj∥VaIi∥VaIj)·Dij, if not, abort
the process, else authentication and signature completed.
Note that the proposed solution is applicable to the handling
of trafﬁc accident reports involving multiple vehicles simulta-
neously involved in trafﬁc accidents.
D. V2R Authentication and Trafﬁc Accident Report Upload
After mutual authentication and joint signature of the
accident report, the vehicles leave the scene and upload the
accident report to the blockchain via RSU by running the V2R
authentication protocol shown in Fig. 5, where we assume
that vehicle Vi still keeps the results in the execution of V2V
authentication protocol.
Step
RA1:
The
vehicle
Vi
receives
the
broadcast
message M1 : {RIDt} from RSUt, read the registration
information
{RIDt, PKRt}
from
blockchain
according
to
RIDt,
generates
a
timestamp
T3
and
computes
VT
=
h(SKVi · PKRt∥T3). Then, Vi sends the message
M2 : {PIDi, PIDj, AC1, AC2, cij, Dij, T1, T2, VT, T3} to RSUt
via the public channel.
Step
RA2:
On
receiving
the
message
M2,
RSUt
read
the
registration
information
{PIDi, PKVi, VaIi}
and
{PIDj, PKVj, VaIj}
from
blockchain
according
to
PIDi
and PIDj, checks if T3 is fresh and veriﬁes if h(SKRt ·
PKvi∥T3)
=
VT
and
cij · P
=
PKVj + PKVi +
h(AC1∥AC2∥Dij∥T1∥PIDi∥T2∥PIDj∥VaIi∥VaIj) · Dij, if not,
RSUt aborts it, else generates a random number dt, a timestamp
T4, and computes Rest= PUF(Chat), SKRt = Rest ⊕RSKRt,
Dt = dt · P, ct = SKRt + h(cij∥T4∥Dt) ∗dt. Then, RSUt writes
{cij, PKvi,
PKvj,
AC1, AC2, Dij, T1, PIDi, T2, PIDj, VaIi,
Vaij, RIDt, PKRt, T4, ct, Dt} onto the blockchain.
In case of dispute, RSU sends PIDi and PIDj to RC, RC can
decrypt them and obtain the engine numbers and appearance
characteristics of vehicles.
E. Vehicle Temporary Identity Update
The vehicle can update the temporary identity and identity
parameters to resist tracking attacks and privacy disclosure.
Step VT1: Vi’s driver inputs the biometrical information
Bio′, Vi computes σ ′
i = Rep(Bio′
i, τi) and veriﬁes if VEi =
h(σ ′
i ∥VaIi), if not, aborts the process, else, Vi computes ri =
Si2 ⊕h(VIDi∥σ ′
i ) to recover the secret parameter ri. Then, Vi
selects a secret random number SK∗
Vi, a timestamp T5, and
computes PK∗
Vi = SK∗
Vi · P, M1 = Eri(VIDi, PK∗
Vi, PIDi, T5).
Then, Vi sends {PIDi, M1, T5} to RC via the public channel.
Step VT2:
On receiving the message {PIDi, M1, T5},
RC
ﬁrst
checks
the
freshness
of
T5,
and
computes
(VIDi, VaIi, ri)
=
DKTA(PIDi), (VID′
i, PK∗
Vi, PID′
i, T′
5)
=
Dri(M1). RC veriﬁes if VID′
i = VIDi, PID′
i = PIDi, and
T′
5 = T5, if not, RC terminates the session, else, gener-
ates random numbers r∗
i , a timestamp T6, and computes
PID∗
i = EKTA(VIDi∥VaIi∥r∗
i ), M2 = Eri(VIDi, PID∗
i , r∗
i , T6).
Then, RC deletes {PIDi, PKVi, VaIi} from the blockchain,
writes {PID∗
i , PK∗
Vi, VaIi} onto the blockchain, and sends
{PIDi, M2, T6} to Vi via the public channel.
Step VT3: On receiving {PIDi, M2, T6}, Vi ﬁrst checks
the freshness of T6, and computes (VID′
i, PID∗
i , r∗
i , T′
6) =
Dri(M2). If VID′
i
= VIDi, and T′
6
= T6, Vi computes
S∗
i1 = SK∗
Vi ⊕h(VEi∥σi), S∗
i2 = r∗
i ⊕h(VIDi∥σi), and updates
{PID∗
i , VEi, S∗
i1, S∗
i2, τi} in the OBU.
V. SECURITY ANALYSIS
In this section, we will formally prove the security of
the proposed scheme under the random oracle model, and
then provide informal cryptanalysis to show that the proposed
scheme achieves several desirable security properties.
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:40:34 UTC from IEEE Xplore.  Restrictions apply. 



# Page 7

31074
IEEE INTERNET OF THINGS JOURNAL, VOL. 11, NO. 19, 1 OCTOBER 2024
A. Security Proofs
The correctness of our proposed APA protocol is straight-
forward, therefore is omitted here.
Theorem 1: The proposed APA protocol achieves existen-
tial unforgeability under ECDLP assumption.
Proof: Suppose there exists a PPT adversary A which can
break the existential unforgeability of the proposed protocol
with nonnegligible probability ϵ, by producing a transaction
data Tx∗in which the involved participants are Vi∗, Vj∗, Rt∗.
We construct a simulator B to simulate the oracles, such that
given an ECDLP instance (P, E(Fp), A = aP), B can ﬁnd a
with nonnegligible probability.
Without
loss
of
generality,
assume
that
A
never
made
queries
corresponding
to
Vi∗,
includ-
ing
Extract(VIDi∗,
pkvi∗,
VaIi∗),
Execute(x
Vi∗, y
Vj ),
Execute(x
Vi∗, z
Rt ),
Send(x
Vi∗, 1, start),
Send(x
Vi∗, 1, <
D2, bj, PIDj, Aj,
Dj1, Dj2,
PKVj,
cj1,
VaIj,
T2
>),
Send(x
Vi∗, 2, <
cj2, PIDj, VaIj, PIDi
>), Send(x
Vi∗, 2, <
RIDt, yt, Zt, PKRt >), Corrupt(Vi∗, OBU)&Corrupt(Vi∗,
BIO) where we use 1 to denote the accident record conﬁrming
and signing phase, and 2 to denote the vehicle & RSU
authentication and signature veriﬁcation phase in send queries.
Then B follows the computations in the system initialization
phase, vehicles registration phase, and RSUs registration
phase, to generate and store the following data.
1) Public parameters Para = {P, E(Fp), SE(.), h(.), Gen(.),
Rep(.)} where P, E(Fp) are from the ECDLP instance.
2) {PIDi, SKVi, PKVi, VaIi, VIDi, Bioi, (VEi, Si1, Si2,
τi)}i=1,...,n for individual data of the n vehicles where i ̸=
i∗,
and
{PIDi∗, PKVi∗, VaIi∗, VIDi∗, Bioi∗, (VEi∗, Si∗1,
Si∗2, τi∗)}, where i = i∗. Here, we denote this list as LVi,
and set PKVi∗= A.
3) {RIDt, SKRt, PKRt}t=1,...,m for registration data of the m
RSUs. Here, we denote this list as LRt.
The oracles are simulated by B in the following way.
Hash(m): B maintains a list Lh = {(m, r)} to answer the
hash queries. Given an input m, if (m, r) is already in Lh,
return r; otherwise, pick a random r from the range of hash
function h(·) with no collision to previous queries, insert (m, r)
into Lh and return r.
Execute(x
α, y
β): There are two types of execute queries,
according to whether the protocol is running between Vi and
Vj or between Vi and Rt.
Execute(x
Vi, y
Vj):
B
returns
the
protocol
tran-
script
{<
PIDi, AC1,
Di1,
Di2, ci1, T1
>,
<
PIDj, AC2, Dj1, Dj2, cj1, T2 >, < PIDi, ci2 >, < PIDj, cj2 >
} using four send queries as:
Send(x
Vi , 1, start), Send(y
Vj , 1, start)
Send(x
Vi , 1, < PIDj, AC2, Dj1, Dj2, cj1, T2 >
Send(y
Vj , 1, < PIDi, AC1, Di1, Di2, ci1, T1 >.
Execute(x
Vi, z
Rt): B returns the protocol transcript {<
RIDt >, < PIDi, PIDj, AC1, AC2, cij, Dij, T1, T2, VT, T3 >,
using two send queries as: Send(z
Rt, 2, start), Send(x
Vi, 2, <
RIDt >).
Send(x
α, ·): There are ﬁve types of send query, according
to the message ﬂows sent during 1) accident record conﬁrming
and signing phase and 2) vehicle and RSU authentication and
signature veriﬁcation phase. Note that it is unnecessary to
simulate messages sent in the other phases that are supposed
to communicate through secure channels.
Send(x
Vi, 1, start): B computes Di1 = di1 · P, Di2 =
di2 · P where di1 and di2 are random values from Zp, and
ci1 = SKVi + h(AC1∥Di1∥Di2∥T1∥PIDi∥VaIi) ∗di1 where AC1
is the accident record and T1 is the current time stamp, then
stores < AC1, T1, di2, Di2 > as x
Vi’s state (every instance
may have a temporary state during its lifecycle), returns <
PIDi, AC1, Di1, Di2, ci1, T1 > as the ﬁrst-round message of
phase (1). Note that PIDi, PKVi, SKVi, VaIi are read from LVi.
Send(x
Vi, 1, <
PIDj, AC2,
Dj1,
Dj2, cj1, T2
>):
B
checks the freshness of T2, veriﬁes whether cj1 · P
=
PKVj + h(AC2∥Dj1∥Dj2∥T2∥PIDj∥VaIj) ∗Dj1 holds, returns
⊥if veriﬁcation failed. Otherwise, B uses x
Vi’s state
to
compute
Dij
=
Di2 + Dj2,
ci2
=
SKVi +
h(AC1∥AC2∥T1∥PIDi∥T2∥PIDj∥VaIi∥VaIj∥Dij)∗di2, refreshes
x
Vi’s state as < AC1, AC2, T1, T2, Dij, ci2 >, and returns <
PIDi, ci2 > as the second-round message of phase (1).
Send(z
Rt, 2, start): B returns < RIDt > read from LRt as
the ﬁrst-round message of phase (2).
Send(x
Vi, 2, < RIDt
>): B uses x
Vi’s state to com-
pute cij = cj2 + ci2 and verify whether cijP = PKVj +
PKVi +h(AC1∥AC2∥T1∥PIDi∥T2∥PIDj∥VaIi∥VaIj∥Dij)Dij, and
returns ⊥if veriﬁcation failed. Otherwise, B refreshes x
Vi’s
state as < AC1, AC2, T1, T2, Dij, cij >, generates a times-
tamp T3 and computes VT = h(SKVi · PKRt∥T3)and returns
< PIDi, PIDj, AC1, AC2, cij, Dij, T1, T2, VT, T3 > as the
second-round message of phase (2).
Extract(ID,
·): There are two types of extract query,
according to whether the queried ID belongs to a vehicle or
an RSU.
Extract(VIDi, PKVi, VaIi): B checks LVi to ﬁnd the record
containing VIDi, PKVi, VaIi, and returns the corresponding
SKVi as the private key.
Extract(RIDt): B checks LRt to ﬁnd the record containing
RIDt, and returns the corresponding SKRt as the private key.
Corrupt(Vi, ·): There are two types of corrupt query,
according to whether the authentication factor is OBU or
biometric.
Corrupt(Vi, OBU): B checks LVi to ﬁnd the record contain-
ing Vi and returns the corresponding (PIDi, VEi, Si1, Si2, τi)
as the OBU data.
Corrupt(Vi, BIO): B checks LVi to ﬁnd the record contain-
ing Vi and returns the corresponding Bioi as biometric.
After adaptively querying to the above oracles, if A
successfully outputs a correct transaction data Tx∗
=
{ci∗j∗, PKVi∗, PKVj∗, AC1, AC2, Di∗j∗, T1, PIDi∗, T2, PIDj∗,
VaIi∗, Vaij∗, RIDt∗, PKRt∗, ct∗, Dt∗}. Then we have: ci∗j∗P =
PKVj∗+PKVi∗+h(AC1∥AC2∥T1∥PIDi∗∥T2∥PIDj∗∥VaIi∗∥VaIj∗∥
Di∗j∗)Di∗j∗.
Denote M∗= AC1∥AC2∥T1∥PIDi∗∥T2∥PIDj∗∥VaIi∗∥VaIj∗,
H∗= h(AC1∥AC2∥T1∥PIDi∗∥T2∥PIDj∗∥VaIi∗∥VaIj∗∥Di∗j∗) =
h(M∗∥Di∗j∗), then < Di∗j∗, H∗, ci∗j∗> can be treated as a
digital signature on the message M∗co-signed by Vi∗and Vj∗,
such that: ci∗j∗P = PKVj∗+ PKVi∗+ H∗Di∗j∗. It complies with
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:40:34 UTC from IEEE Xplore.  Restrictions apply. 



# Page 8

XIE et al.: BLOCKCHAIN-BASED TRAFFIC ACCIDENT HANDLING PROTOCOL WITHOUT THIRD PARTY FOR VANETs
31075
the format deﬁned in Pointcheval and Stern’s forking lemma.
Therefore, by applying forking lemma, if A can forge such
a signature in time t with probability ϵ > 7Qh/2k where Qh
is the number queries to the hash oracle and k is the security
parameter, then within B can forge another valid signature
< Di∗j∗, H∗′, c′i∗j∗> in expected time t′ ≤84480tQh/ϵ, such
that:
c′i∗j∗P = PKVj∗+ PKVi∗+ H∗′Di∗j∗.
By the above two equations, we have:
ci∗j∗= SKVj∗+ SKVi∗+ H∗di∗j∗.
c′i∗j∗= SKVj∗+ SKVi∗+ H∗′di∗j∗,
where we denote Di∗j∗= di∗j∗P and SKVj∗can be obtained
from LVi for i = j∗. Hence:
di∗j∗= (ci∗j∗−c′
i∗j∗)(H∗−H∗′)−1.
And SKVi∗= ci∗j∗−SKVj∗−H∗di∗j∗. As PKVi∗= A = aP =
SKVi∗P, so B successfully found a = SKVi∗and solved the
ECDLP instance.
Similarly, we can prove that when Vj∗or Rt∗is not corrupted
(A never made Oracle queries corresponding to Vj∗or Rt∗),
B can still solve the ECDLP instance by setting PKVj∗= A =
aP = SKVj∗P or PKRt∗= A = aP = SKRt∗P.
Theorem 2: The
proposed
APA
protocol
achieves
anonymity assuming the semantic security of the underlying
symmetric encryption scheme.
Proof: Suppose there exists a PPT adversary A which can
break the anonymity of the proposed protocol with probability
ϵ > 1/2 by outputting a bit b′ = b from Test query. We
construct a simulator B to simulate the oracles and utilize
A to break the semantic security of the encryption scheme
SE(.) = (Ek(·), Dk(·)).
Denote x
Vi∗as the instance that A queries to test oracle,
in particular, Vi∗is the target vehicle A aims to attack for
its real identity VIDi∗. Let C be the challenger of CCA
game in Deﬁnition 2, and B plays the role of the adversary
against it. C generates KTA for RC, and kept it secret. Then
B generates the other public parameters together with the
lists LVi, LRt by following the computations in the system
initialization phase, vehicles registration phase, and RSUs
registration phase, except for the generation of PIDi (i ̸= i∗)
as below.
1) For i ̸= i∗, B queries < VIDi, VaIi, ri
> to the
encryption oracle EKTA(·), and sets PIDi as the oracle
output. This is consistent with the adaptive encryption
queries made by the adversary in CCA game.
2) For i = i∗, B picks two random identities VID0
i∗
and VID1
i∗, sets m0 =< VID0
i∗, VaIi∗, ri∗>, m1 =<
VID1
i∗, VaIi∗, ri∗>, sends m0, m1 to C. Then C returns
c∗= EKTA(mb∗) where b∗←{0, 1} is a random bit. B
sets PIDi∗= c∗. This is consistent with the interactions
between the adversary and the challenger in Phase 2 of
CCA game.
The generation of Si∗3 as a random value from Zp,
which is indistinguishable from ri∗⊕h(VIDi∗∥σi∗), because
A never queries VIDi∗∥σi∗to Hash oracle without knowl-
edge of VIDi∗. Therefore, the record for i = i∗in LVi
should be

PIDi∗= c∗, SKVi∗, PKVi∗, VaIi∗, Bioi∗, (Vi∗, Si∗1, Si∗2, τi∗)

.
The simulation for the oracles Hash, Execute, Send, Extract,
Corrupt are similar as in the proof of Theorem 1. Reveal and
Test oracles could be simulated in the following way.
Reveal(x
Vi): B returns VIDi by referring to LVi for the
record containing Vi, where i ̸= i∗.
Test(x
Vi∗): B returns VID0
i∗. Note that in this query, B does
not toss a bit b, however, the operation of returning VID0
i∗
actually implies that b = b∗. The analysis is given as follows.
1) If
b∗
=
b
=
0:
PIDi∗
=
EKTA(m0)
=
EKTA(VID0
i∗, VaIi∗, ri∗), and B should return VID0
i∗as
the real identity of PIDi∗in Test query.
2) If
b∗
=
b
=
1:
PIDi∗
=
EKTA(m1)
=
EKTA(VID1
i∗, VaIi∗, ri∗), and B should return a random
identity which is not VID1
i∗. As VID0
i∗is randomly picked
from the identity space and different from VID1
i∗, so B
can use VID0
i∗as the answer to Test query.
Finally, if A successfully outputs a bit b′ = b to break the
anonymity of APA protocol, then B uses b′ as its output
in CCA game. For that b′ = b = b∗, B correctly guesses
b∗tossed by the challenger C, and thus breaks the semantic
security of SE = (Ek(·), Dk(·)) for the key k = KTA.
B. Informal Security Analysis
1) Stolen-Veriﬁer Attack: In the proposed protocol, the
identity authentication of the vehicle is based on the authen-
tication parameters issued by RC rather than querying the
veriﬁcation table. RC, RSU, and vehicles do not store any
validation form. Therefore, our scheme can resist stolen-
veriﬁer attack.
2) Desynchronization Attack: This attack refers to the
adversary interfering with the vehicle’s parameters update so
that the vehicle cannot complete the subsequent authentication.
In the proposed protocol, the vehicle sends a request to the
RC to update the pseudo-identity after authentication. Suppose
the adversary intercepts {PIDi, M1, T5} or {PIDi, M2, T6} to
prevent pseudo-identity updating. The vehicle can still use the
previous pseudo-identity to complete authentication, signature,
and pseudo-identity update.
3) RSU Captured Attack: In our protocol, RSU stores
{RIDt, RSKRt, PUF(), Chai}, where PUF() is PUF, which is
used in RSU to protect the secret key SKRt, so even if the
adversary launches the RSU captured attack, it will not affect
the trafﬁc accident report signed by both parties involved in the
accident, and our scheme can resist the RSU captured attacks.
4) OBU
Intrusion
Attack: The
vehicle’s
OBU
stores
{PIDi, VEi, Si1, Si2, τi}, where PIDi is the vehicle’s pseudo-
identity, VEi = h(σi∥VaIi) is the login veriﬁcation parameter
where σi is the biological key and VaIi is the vehicle’s
appearance characteristics, Si1 = SKVi ⊕h(VEi∥σi) and Si2 =
ri ⊕h(VIDi∥σi) encrypt the secret number SKvi and random
number ri, respectively, τi is the reproduction parameter.
Suppose the adversary obtains the stored message in OBU,
he/she cannot recover the secret parameters SKvi, and ri
without knowing the biological key σi. Therefore, the vehicle
cannot be impersonated and privacy is protected.
5) Impersonation Attack: Suppose an adversary imperson-
ates the vehicle to authenticate or upload a report, he/she
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:40:34 UTC from IEEE Xplore.  Restrictions apply. 



# Page 9

31076
IEEE INTERNET OF THINGS JOURNAL, VOL. 11, NO. 19, 1 OCTOBER 2024
needs to forge Mi1 : {PIDi, AC1,
Di1,
Di2, ci1, T1} or
M2 : {PIDi, PIDj, AC1, AC2, cij, Dij, T1, T2, VT, T3}. In Mi1,
where ci1 = SKVi + h(AC1∥Di1∥Di2∥T1∥PIDi∥VaIi) ∗di1,
SKVi and σ ′
i are vehicle’s secret key and the user’s biological
key, respectively, they are unavailable. Similarly, in M2,
VT = h(SKVi · PKRt∥T3) is unforged and cannot be replayed.
Therefore, the vehicle cannot be impersonated.
6) Replay Attack: In our protocol, timestamps and random
numbers are combined in messages to resist replay attacks.
The replayed messages cannot pass the veriﬁcation.
7) Anonymity and Unlinkability: PIDi = EKTA(VIDi, VaIi,
ri) is vehicle’s pseudo-identity, where KTA is RC’s secret key,
ri is a random number. The updated pseudo-identity PID∗
i =
EKTA(VIDi∥VaIi∥r∗
i ) where r∗
i is independent of ri. Therefore,
the pseudo-identities are anonymous and unlinkable.
8) Malicious Message Tracking: Suppose a legitimate user
sends malicious messages Mi1 : {PIDi, AC1, Di1, Di2, ci1, T1}
or M2 : {PIDi, PIDj,
AC1,
AC2, cij, Dij, T1, T2, VT, T3},
RC can recover the real identity VIDi
by calculating
(VIDi, VaIi, ri) = DKTA(PIDi) to track malicious messages.
9) Two-Factor Secrecy: According to the deﬁnition of two-
factor authentication, an adversary can obtain either driver’s
biological information or OBU storage, but not both.
Suppose an adversary can obtain the driver’s biologi-
cal information Bioi, it is infeasible to compute σ ′
i
=
Rep(Bio′
i, τi), VEi
=
h(σ ′
i ∥VaIi), and SKVi
=
Si1 ⊕
h(VEi∥σ ′
i ) without the knowledge of τi, VaIi and Si1 stored in
OBU. On the other hand, suppose an adversary can access
{PIDi, VIDi, VEi, Si1, Si2, τi} stored in the vehicle’s OBU, it
is infeasible to compute SKVi without the knowledge of the
driver’s biological information Bioi.
Conclusively,
our
scheme
achieves
two-factor
authentication.
VI. PERFORMANCE ANALYSIS AND COMPARISON
In this section, we compare the proposed scheme with
some related works [5], [10], [12], [16], [17] in terms
of security and efﬁciency, including security properties and
robustness against various attacks, blockchain platform setting
and speciﬁcs, performance analysis on computational costs,
and communication overhead and latency.
A. Security Comparison
Table III presents comparison results of representative
VANETs protocols in this research ﬁled, regarding many
desirable security properties and robustness against various
attacks. Conclusively, our protocol is the only one among
them that properly addresses all the security issues. Detailed
analysis about some security weaknesses of the other protocols
in Table III is given below.
In [5], the protocol suffers from collusion attack of witness
vehicles which are invited to jointly conﬁrm the trafﬁc accident
report. Besides, it cannot resist replay attack for that the
receiver can neither identify the replayed messages nor verify
the real identity of the sender. In [10], the protocol does not
support identity anonymity and unlinkability because vehicles
use static pseudonyms, and it is vulnerable to OBU intrusion
TABLE III
COMPARISON OF SECURITY PROPERTIES
Attacks/Properties
[5]
[10]
[12]
[16]
[17]
Ours
Privileged-Insider Attack
Off-line Password Guessing 
Attack
-
-
-
-
-
Impersonation Attack
Replay Attack
Man-in-Middle Attack
OBU Instrusion Attack
RSU Captured Attack
Update asynchronous Attack
-
-
-
-
Identity Anonymity
Mutual Authentication
Batch Verification
Malicious Message Tracking
Unlinkability
:Resist(Attacks)/Possess(Properties)   :Suffer(Attacks)/No(Properties)
-: N/A
attacks and RSU captured attacks. In [12], replay attack may
be applied to interfere with the vehicles’ communications,
while OBU intrusion attack and impersonation attack could
be utilized to corrupt the security since OBU stores key
pair in plaintext. Furthermore, it fails to provide resistance
against RSU captured attack and malicious message tracing
attack. In [16], it also suffers from RSU captured attack since
an attacker can authorize illegal users by capturing RSUs.
In [17], the protocol is found insecure against OBU intrusion
attack and impersonation attack, while vehicle’s identities are
linkable, due to similar causes as in [10] and [12] mentioned
above.
B. Performance Comparison
We simulated the overhead of the proposed scheme in
the environment of Raspberry Pi 4B quad-core 64-bits ARM
Cortex-A72, 1.5 GHz, 2-GB LPDDR4 SDARM, and evaluated
the performance of vehicles and RSUs when processing
multiple requests. Raspberry Pi is a lightweight microcom-
puter with extraordinary scalability and development potential,
which offers compatibility with various operating systems
and supports expansion to multiple wireless communication
modes. It has been widely used in VANETs as the control core
of vehicles. Regarding the setting of blockchain platform, it is
based on Hyperledger Fabric [26] and integrated with VANETs
using the gRPC framework, which adds an extra security
layer to the network for ensuring that only authorized nodes
are aware of vehicles’ identities. Hyperledger Fabric offers
modular consensus options, including Kafka-based service,
which can be ﬁne-tuned for shorter transaction conﬁrmation
times. Since large block size may result in longer propagation
times and increase the risk of network congestion in VANET
environments, we adopt dynamic block size adjustment mech-
anism according to network conditions [27], by setting a
threshold of block sizes which can be adjusted dynamically to
accommodate ﬂuctuations in transaction volume for preventing
network congestion.
In Table IV, we analyze the overhead of our protocol in
the signature and veriﬁcation phases by comparison with
related schemes. We use Texp, Th, Tmul, Tecc, Tbp, Tead,
TECE_SV, THE_SV, THE_ED, and TSED to represent the run-
ning time required for one exponentiation, one hash, one
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:40:34 UTC from IEEE Xplore.  Restrictions apply. 



# Page 10

XIE et al.: BLOCKCHAIN-BASED TRAFFIC ACCIDENT HANDLING PROTOCOL WITHOUT THIRD PARTY FOR VANETs
31077
TABLE IV
COMPARISON OF COMPUTATIONAL COSTS
Scheme
Signature (single vehicle)
Verification
Batch Verification 
( vehicles)
Total
(sign+verify)
Time (
)
Vehicle
RSU
[5]
-
35.164
(
)
[10]
44.00
[12]
20.215
[16]
-
127.607
V2V:
[17]
102.023
ours
-
21.146
Fig. 6.
Overhead of single signature and veriﬁcation.
multiplication, one ECC point multiplication, one bilinear
pairing, one ECC point addition, one EC-Elgamal signa-
ture/veriﬁcation, one Paillier signature/veriﬁcation, one Paillier
encryption/decryption, one symmetric encryption/decryption,
respectively. According to the simulation results in the above
environment, Texp ≈5.026 ms, Th ≈0.019 ms, Tmul ≈
0.023 ms, Tecc ≈2.610 ms, Tbp ≈44.517 ms, Tead ≈
0.017 ms, TECE_SV
≈7.849 ms, THE_SV
≈11.024 ms,
THE_ED ≈10.173 ms, and TSED ≈0.56 ms.
As shown by the statistics in Table IV, our protocol
enjoys the lowest level of computational overhead except
for Chen et al.’s [12] scheme regarding single signature and
veriﬁcation (see Fig. 6 for clarity), simultaneously achieves
the minimal batch veriﬁcation cost among the related schemes
(see Fig. 7). Furthermore, our protocol eliminates the cost of
RSU besides Liu et al.’s [5] scheme in the signature generation
phase for accident reports.
In Table V, we present the comparative results of com-
munication overhead and latency. Without loss of generality,
we assume the candidates of hash function and symmetric
encryption are SHA-256 and AES-128, respectively, the sizes
of identity, password, or timestamp are 32bits, and the sizes
of other random nonces are 256 bits. The communication cost
and latency of related schemes are affected by the number of
participating vehicles and the message delay. As we can see,
our scheme outperforms others in terms of communicational
efﬁciency, even in the ideal situation that vehicles respond
messages simultaneously.
Fig. 7.
Overhead of batch veriﬁcation.
TABLE V
COMPARISON OF COMMUNICATION OVERHEAD AND LATENCY
Schemes
V2V
V2R
Cost
Latency
Cost
Latency
[5]
2208L bits
>27 ms
869M bits
>36 ms
[10]
-
-
1376M+832 bits
>44 ms
[12]
512W bits
>31 ms
512V+512W+1024 bits
>21 ms
[16]
2976 bits
71 ms
832 bits
128 ms
[17]
-
-
1152+577Mbits
>102 ms
ours
2240 bits
16 ms
704 bits
22 ms
*L denotes the cardinality of ID set. M denotes the number of received 
messages. V denotes the number of surrounding vehicles. W denotes the 
number of selected witness vehicles.
Regarding the dynamic pseudo-identity strategy applied in
our protocol, it causes the overhead of temporary identity
update (see Section IV-E). The operation of updating one
pseudo-identity involves one-round communication between
the vehicle and RC, in which the vehicle challenges RC with
a new identity and then stores the updated parameters in OBU
after receiving the response from RC. The computational cost
is 4Th + Tecc + 2TSED ≈3.806 ms on the side of vehicle
and 4TSED ≈2.24 ms on the side of RC, respectively, while
the communication overhead is 192 bits on either side. As we
can see, the additional costs of dynamic identities are almost
negligible compared to overall overhead. On the other hand,
static identities require for extra storage on the server to keep
them in a table for comparison in the authentication. From the
perspective of preserving identity privacy, dynamic identities
are also more preferable than static identities, since the
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:40:34 UTC from IEEE Xplore.  Restrictions apply. 



# Page 11

31078
IEEE INTERNET OF THINGS JOURNAL, VOL. 11, NO. 19, 1 OCTOBER 2024
security still holds even in the scenarios of server compromise
and channel exposure.
Network partitioning and latency are common in real-world
vehicle networks due to vehicle mobility, signal interference,
and different network conditions. In the proposed scheme,
RSU nodes jointly maintain the blockchain to get rid of the
issue of network partitioning. Furthermore, the latency of our
protocol is not affected by the number of vehicles and trans-
mitted messages, hence the commonly adopted asynchronous
communication methods, timeout and retry mechanisms in
network communication can be normally deployed in our
protocol without compatibility problems.
VII. CONCLUSION
In this article, we found that existing trafﬁc accident
handling schemes cannot be applied to the scenarios without
RSUs, and are prone to cause disputes or suffer from RSU
captured attacks and collusion attacks of witness vehicles.
To address the above issues, a blockchain-based V2V and
V2R authentication and trafﬁc accident handling protocol is
proposed. Especially, accident reports can be generated and
conﬁrmed solely by involved vehicles and realize nonrepu-
diation and public veriﬁability. Formal proof and analysis
are conducted to validate the correctness and security of the
proposed protocol. By simulation experiments, we compare
our protocol with related schemes and conclude that ours is
more secure while maintaining a low level of overhead.
Due to the support of batch veriﬁcation, the proposed
scheme applies to the handling of accident reports in the
scenario of concurrent trafﬁc accidents. Besides, with the
advantage of blockchain utilization, our scheme supports rele-
vant authorities (e.g., trafﬁc police, and insurance companies)
to investigate, audit, and collect evidence effectively after the
accidents. For future work, the potential of blockchain could
be further explored by designing and deploying appropriate
smart contracts to collaborate with other entities in our model,
in order to realize automatization and higher efﬁciency of the
trafﬁc accident handling procedure.
REFERENCES
[1] D. He, S. Zeadally, B. Xu, and X. Huang, “An efﬁcient identity-
based conditional privacy-preserving authentication scheme for vehicular
ad hoc networks,” IEEE Trans. Inf. Forensics Security, vol. 10,
pp. 2681–2691, 2015.
[2] J. C. Mukherjee, A. Gupta, and R. C. Sreenivas, “Event notiﬁ-
cation in VANET with capacitated roadside units,” IEEE Trans.
Intell.
Transp.
Syst.,
vol. 17,
no. 7,
pp. 1867–1879,
Jul.
2016,
doi: 10.1109/TITS.2015.2511145.
[3] M. Azees, P. Vijayakumar, and L. J. Deboarh, “EAAP: Efﬁcient
anonymous authentication with conditional privacy-preserving scheme
for vehicular ad hoc networks,” IEEE Trans. Intell. Transp. Syst., vol. 18,
no. 9, pp. 2467–2476, Sep. 2017, doi: 10.1109/TITS.2016.2634623.
[4] J. Cui, J. Zhang, H. Zhong, and Y. Xu, “SPACF: A secure privacy-
preserving authentication scheme for VANET with cuckoo ﬁlter,” IEEE
Trans. Veh. Technol., vol. 66, no. 11, pp. 10283–10295, Nov. 2017.
[5] X. Liu, H. Huang, F. Xiao, and Z. Ma, “A blockchain-based trust
management with conditional privacy-preserving announcement scheme
for VANETs,” IEEE Internet Things J., vol. 7, no. 5, pp. 4101–4112,
May 2020, doi: 10.1109/JIOT.2019.2957421.
[6] C.-L. Chen, Y.-X. Chen, C.-F. Lee, Y.-Y. Deng, and C.-H. Chen, “An
efﬁcient and secure key agreement protocol for sharing emergency
events in VANET systems,” IEEE Access, vol. 7, pp. 148472–148484,
2019, doi: 10.1109/ACCESS.2019.2946969.
[7] J. Zhang, J. Cui, H. Zhong, Z. Chen, and L. Liu, “PA-CRT: Chinese
remainder theorem based conditional privacy-preserving authentica-
tion scheme in vehicular ad-hoc networks,” IEEE Trans. Dependable
Secure
Comput.,
vol. 18,
no. 2,
pp. 722–735,
Mar./Apr.
2021,
doi: 10.1109/TDSC.2019.2904274.
[8] H. Xiong, J. Chen, Q. Mei, and Y. Zhao, “Conditional privacy-
preserving authentication protocol with dynamic membership updating
for VANETs,” IEEE Trans. Dependable Secure Comput., vol. 19, no. 3,
pp. 2089–2104, May/Jun. 2022, doi: 10.1109/TDSC.2020.3047872.
[9] Q. Xie and J. Huang, “Improvement of a conditional privacy-preserving
and desynchronization-resistant authentication protocol for IoV,” Appl.
Sci.-Basel, vol. 14, no. 6, p. 2451, 2024. doi: 10.3390/app14062451.
[10] H. Cheng, M. Shojafar, M. Alazab, R. Tafazolli, and Y. Liu,
“PPVF: Privacy-preserving protocol for vehicle feedback in cloud-
assisted VANET,” IEEE Trans. Intell. Transp. Syst., vol. 23, no. 7,
pp. 9391–9403, Jul. 2022, doi: 10.1109/TITS.2021.3117950.
[11] Q. Mei, H. Xiong, Y.-C. Chen, and C.-M. Chen, “Blockchain-enabled
privacy-preserving authentication mechanism for transportation CPS
with cloud-edge computing,” IEEE Trans. Eng. Manag., early access,
Apr. 14, 2022, doi: 10.1109/TEM.2022.3159311.
[12] X. Chen, A. Yang, Y. Tong, J. Weng, J. Weng, and T. Li, “A
multisignature-based secure and OBU-friendly emergency reporting
scheme in VANET,” IEEE Internet Things J., vol. 9, no. 22,
pp. 23130–23141, Nov. 2022, doi: 10.1109/JIOT.2022.3184991.
[13] M. A. R. Baee, L. Simpson, X. Boyen, E. Foo, and J. Pieprzyk, “ALI:
Anonymous lightweight inter-vehicle broadcast authentication with
encryption,” IEEE Trans. Dependable Secure Comput., vol. 20, no. 3,
pp. 1799–1817, May/Jun. 2022, doi: 10.1109/TDSC.2022.3164436.
[14] Q. Xie, Z. Ding, and P. Zheng, “Provably secure and anonymous
V2I and V2V authentication protocol for VANETs,” IEEE Trans.
Intell. Transp. Syst., vol. 24, no. 7, pp. 7318–7327, Jul. 2023.
doi: 10.1109/TITS.2023.3253710.
[15] S. Nakamoto, “Bitcoin: A peer-to-peer electronic cash system,” in Proc.
Decentralized Bus. Rev., 2008, Art. no. 21260. [Online]. Available:
https://bitcoin.org/bitcoin.pdf
[16] X. Li, J. Liu, M. S. Obaidat, P. Vijayakumar, Q. Jiang, and R. Amin,
“An unlinkable authenticated key agreement with collusion resistant for
VANETs,” IEEE Trans. Veh. Technol., vol. 70, no. 8, pp. 7992–8006,
Aug. 2021, doi: 10.1109/TVT.2021.3087557.
[17] L. Zhang and J. Xu, “Blockchain-based anonymous authentication
for trafﬁc reporting in VANETs,” Connect. Sci., vol. 34, no. 1,
pp. 1038–1065, 2022, doi: 10.1080/09540091.2022.2026888.
[18] Q. Xie, Z. Ding, W. Tang, D. He, and X. Tan, “Provable secure and
lightweight blockchain-based V2I handover authentication and V2V
broadcast protocol for VANETs,” IEEE Trans. Veh. Technol., vol. 72,
no. 12, pp. 15200–15212, Dec. 2023, doi: 10.1109/TVT.2023.3289175.
[19] K. N. Qureshi, G. Jeon, M. M. Hassan, M. R. Hassan, and K. Kaur,
“Blockchain-based privacy-preserving authentication model intelligent
transportation systems,” IEEE Trans. Intell. Transp. Syst., vol. 24, no. 7,
pp. 7435–7443, Jul. 2023, doi: 10.1109/TITS.2022.3158320.
[20] J. Zhao, F. Huang, L. Liao, and Q. Zhang, “Blockchain-based
trust management model for vehicular ad hoc networks,” IEEE
Internet
Things
J.,
vol. 11,
no. 5,
pp. 8118–8132,
Mar.
2024,
doi: 10.1109/JIOT.2023.3318597.
[21] S. Roy, S. Nandi, R. Maheshwari, S. Shetty, A. K. Das, and
P.
Lorenz,
“Blockchain-based
efﬁcient
access
control
with
han-
dover policy in IoV-enabled intelligent transportation system,” IEEE
Trans. Veh. Technol., vol. 73, no. 3, pp. 3009–3024, Mar. 2024,
doi: 10.1109/TVT.2023.3322637.
[22] G. Du et al., “A blockchain-based trust-value management approach
for
secure
information
sharing
in
Internet
of
Vehicles,”
IEEE
Internet
Things
J.,
vol. 11,
no. 1,
pp. 333–344,
Jan.
2024,
doi: 10.1109/JIOT.2023.3277691.
[23] L.
Wei,
J.
Cui,
H.
Zhong,
I.
Bolodurina,
and
L.
Liu,
“A
lightweight and conditional privacy-preserving authenticated key agree-
ment scheme with multi-TA model for fog-based VANETs,” IEEE
Trans. Dependable Secure Comput., vol. 20, no. 1, pp. 422–436,
Jan./Feb. 2023, doi: 10.1109/TDSC.2021.3135016.
[24] Q. Xie, Z. Sun, Q. Xie, and Z. Ding, “A cross-trusted authority
authentication
protocol
for
Internet
of
Vehicles
based
on
blockchain,”
IEEE
Access,
vol.
11,
pp.
97840–97851,
2023,
doi: 10.1109/ACCESS.2023.3308601.
[25] A. Alharthi, Q. Ni, R. Jiang, and M. A. Khan, “A computa-
tional model for reputation and ensemble-based learning model for
prediction of trustworthiness in vehicular ad hoc network,” IEEE
Internet Things J., vol. 10, no. 20, pp. 18248–18258, Oct. 2023,
doi: 10.1109/JIOT.2023.3279950.
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:40:34 UTC from IEEE Xplore.  Restrictions apply. 



# Page 12

XIE et al.: BLOCKCHAIN-BASED TRAFFIC ACCIDENT HANDLING PROTOCOL WITHOUT THIRD PARTY FOR VANETs
31079
[26] E. Androulaki et al., “Hyperledger fabric: A distributed operating system
for permissioned blockchains,” in Proc. 13th EuroSys Conf., 2018,
pp. 1–15, doi: 10.1145/3190508.3190538.
[27] J.
Wang
et
al.,
“BPR:
Blockchain-enabled
efﬁcient
and
secure
parking
reservation
framework
with
block
size
dynamic
adjust-
ment method,” IEEE Trans. Intell. Transp. Syst., vol. 24, no. 3,
pp. 3555–3570, Mar. 2023, doi: 10.1109/TITS.2022.3222960.
Qi Xie received the Ph.D. degree in applied mathe-
matics from Zhejiang University, Hangzhou, China,
in 2005.
He
is
a
Professor
with
Hangzhou
Normal
University, Hangzhou, and a Director of the Key
Laboratory of Cryptography of Zhejiang Province,
Hangzhou Normal University. He was a Visiting
Scholar from 2009 to 2010 with the Department
of Computer Science, University of Birmingham,
Birmingham, U.K., and also with the Department
of Computer Science, The City University of Hong
Kong, Hong Kong, in 2012. He has published over 100 research papers
in international journals and conferences, such as IEEE TRANSACTIONS
ON INFORMATION FORENSICS AND SECURITY, IEEE TRANSACTIONS
ON INTELLIGENT TRANSPORTATION SYSTEMS, and IEEE INTERNET OF
THINGS JOURNAL. His research area is applied cryptography, including
digital signatures, authentication, and key agreement protocols.
Prof. Xie served as a General Co-Chair for ISPEC2012 and ACM
ASIACCS2013, and a reviewer for over 40 international journals.
Zixuan Ding received the master’s degree from
Hangzhou Normal University, Hangzhou, China, in
2023. He is currently pursuing the Doctoral degree
with Nankai University, Tianjin, China. He mainly
studies authentication protocols and cryptography.
Qingyun Xie is currently pursuing the bachelor’s
degree with the School of Information Science
and
Technology,
Hangzhou
Normal
University,
Hangzhou, China.
Her research interest is mainly in authentication
protocols.
Xiao Tan received the B.S. and M.S. degrees from
Fudan University, Shanghai, China, in 2007 and
2010, respectively, and the Ph.D. degree from The
City University of Hong Kong, Hong Kong, in
2013.
He
is
a
Lecturer
with
Hangzhou
Normal
University, Hangzhou, China, and is a Researcher
with
the
Key
Laboratory
of
Cryptography
of
Zhejiang Province, Hangzhou Normal University.
His main research interests include cryptography and
information security, in particular, digital signatures,
authenticated key agreement, and encryption schemes.
Debiao He (Member, IEEE) received the Ph.D.
degree in applied mathematics from the School
of Mathematics and Statistics, Wuhan University,
Wuhan, China, in 2009.
He is currently a Professor with the School of
Cyber Science and Engineering, Wuhan University.
He has published over 100 research papers in
refereed international journals and conferences,
such as IEEE TRANSACTIONS ON INFORMATION
FORENSICS AND SECURITY and Usenix Security
Symposium. His work has been cited more than
10 000 times at Google Scholar. His main research interests include cryptog-
raphy and information security, in particular, cryptographic protocols.
Prof. He is the recipient of the 2018 IEEE Systems Journal Best Paper
Award and the 2019 IET Information Security Best Paper Award. He is in the
editorial board of several international journals, such as Journal of Information
Security and Applications, Frontiers of Computer Science, and Human-Centric
Computing and Information Sciences.
Wen
Tang
is
currently
pursuing
the
M.S.
degree with the School of Information Science
and
Technology,
Hangzhou
Normal
University,
Hangzhou, China. She mainly studies authentication
and key agreement protocols.
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:40:34 UTC from IEEE Xplore.  Restrictions apply. 
