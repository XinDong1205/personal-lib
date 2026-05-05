

# Page 1

5100
IEEE TRANSACTIONS ON VEHICULAR TECHNOLOGY, VOL. 73, NO. 4, APRIL 2024
LPDB: Lightweight Policy-Driven Blockchain With
Batch Veriﬁcation for Rail Transit Systems
Mengjie Zhou
, Xiaotong Zhou
, Wei Wu
, and Debiao He
, Member, IEEE
Abstract—Rail transit is a commonly used mode of transporta-
tion for daily commuting, but traditional Rail Transit Systems
(RTS) typically face signiﬁcant challenges such as high mobility
and low latency. Furthermore, the RTS generates a substantial
volume of real-time interactive data, posing difﬁculties in ensur-
ing user privacy while maintaining practicality. To address these
concerns, blockchain as a promising technology, has been lever-
aged to safeguard data transmission and access. However, public
blockchains such as Bitcoin and Ethereum may not be suitable for
real-time interactive RTS scenarios due to their lack of ﬂexibility
and control. To overcome this, the notion of the Policy-Driven
Blockchain (PDB) was introduced, which is a private blockchain
with ﬂexible policy control and management mechanisms. PDB can
be quickly customized and deployed according to speciﬁc business
requirements and rules, making it a valuable feature for RTS
scenarios. However, their scheme relies on bilinear pairings, which
incurs high computational overhead and does not support batch
validation. In this article, we propose a Lightweight Policy-Driven
Blockchain (LPDB) scheme to overcome these challenges, the core
of which is the design of a Pairing-free Policy-Driven Signature
(PFPDS) scheme better tailored to meet the speciﬁc requirements in
RTS. In addition, considering the large number of communication
messages in RTS, we analyze the advantages of batch veriﬁcation of
signatures. In conclusion, the security of our proposal is validated
under the random oracle model, and we evaluate the computational
expenses associated with the algorithms via simulations on a laptop.
The implementation outcomes demonstrate the practicality and
viability of our scheme.
Index Terms—Batch veriﬁcation, blockchain, no bilinear pairs,
rail transit.
Manuscript received 26 May 2023; revised 18 September 2023 and 21 October
2023; accepted 4 November 2023. Date of publication 8 November 2023; date of
current version 22 April 2024. This work was supported in part by the National
Natural Science Foundation of China under Grants U21A20466, 61972294,
61932016, and 62372108, in part by the Science Foundation of Fujian Provincial
Science and Technology Agency under Grant 2020J02016, in part by the New 20
Project of Higher Education of Jinan, China under Grant 202228017, in part by
the Natural Science Foundation of Jiangsu Province under Grant BK20220935,
and in part by the Fundamental Research Funds for the Central Universitiesunder
Grant 30922010917. The review of this article was coordinated by Prof. Luca
D’Acierno. (Corresponding author: Xiaotong Zhou.)
Mengjie Zhou is with the College of Computer and Cyber Security, Fujian
Normal University, Fuzhou 350117, China (e-mail: zhoumengjie00@163.com).
Xiaotong Zhou is with the School of Cyber Science and Engineering, Wuhan
University, Wuhan 430072, China (e-mail: xtzhou163@163.com).
Wei Wu is with the School of Mathematics and Statistics, Fujian Normal
University, Fuzhou 350117, China (e-mail: weiwu@fjnu.edu.cn.).
Debiao He is with the Shandong Provincial Key Laboratory of Computer
Networks, Qilu University of Technology (Shandong Academy of Sciences),
Jinan250014,China,andalsowiththeSchoolofCyberScienceandEngineering,
Wuhan University, Wuhan 430072, China (e-mail: hedebiao@163.com).
Digital Object Identiﬁer 10.1109/TVT.2023.3330889
I. INTRODUCTION
T
HE advancement of the Internet of Things (IoT), vehicle
technology, satellite communication [1], [2], and Cyber-
Physical Systems (CPS) has led to trains becoming more intel-
ligent and autonomous than they have ever been before [3], [4],
[5]. The concept of Intelligent Transportation Systems (ITS) [6]
has emerged to enhance trafﬁc network security, minimize trafﬁc
congestion, and improve user experience [7].
The Rail Transit System (RTS) is an important branch of the
ITS, which aims to improve transportation efﬁciency, security,
and reliability [8]. As shown in Fig. 1, the RTS is composed
of different components, which consist of the Network Control
System (NCS), On-Board System (OBS), Trackside System
(TS), and Communication System (CS) [9]. The Train Control
System (TCS) and Authorization Management System (AMS)
are incorporated in the RTS and are highly advanced. The TCS
is managed by the train dispatcher, who assumes responsibility
for all train operation-related duties within the station. The
dispatcher’s request is sent to the authorization management
system, which checks the request message, and then sends a
command to the OBS to execute the rule. The OBS is responsible
for determining the train’s position and speed. The TS reports
the train’s status to the AMS regularly via the CS. To realize the
timely updating and sharing of train status information, which
brings great convenience to people’s transportation [9].
RTS is one of the most popular passenger and freight trans-
portation systems [10], which not only brings convenience to
drivers, it can also monitor trafﬁc ﬂow in real-time, make statis-
tics on the running conditions of trains, and help trains better
cope with some emergencies on the tracks. At the same time,
it also faced some problems. For example, A growing number
of sensor devices are producing and sharing vast quantities of
data, which will result in enormous network trafﬁc being man-
aged [11]. Simultaneously, the RTS will encounter substantial
obstacles in achieving high mobility, low latency, and effective
data storage and management. Moreover, ensuring user privacy
and achieving anonymity remains a challenge. In addition, The
traditional RTS is completely centralized and mainly depends
on the AMS. The practicability is very limited and only users
who are registered by the system and become train dispatchers
can access the data to verify the train speed, location, etc.
To address the challenges faced by RTS, various technolo-
gies can be utilized, one of which is blockchain. Blockchain
has several characteristics that make it a suitable technology
for use in RTS applications. For instance, it is decentralized,
open, secure, and anonymous [7]. However, traditional public
0018-9545 © 2023 IEEE. Personal use is permitted, but republication/redistribution requires IEEE permission.
See https://www.ieee.org/publications/rights/index.html for more information.
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:46 UTC from IEEE Xplore.  Restrictions apply. 



# Page 2

ZHOU et al.: LPDB: LIGHTWEIGHT POLICY-DRIVEN BLOCKCHAIN WITH BATCH VERIFICATION FOR RAIL TRANSIT SYSTEMS
5101
Fig. 1.
Traditional rail transit system.
blockchains like Bitcoin and Ethereum [12] may not be suitable
for all RTS scenarios, as they may not provide the necessary
ﬂexibility and control required by certain applications. This
limitation becomes especially apparent in the context of RTS.
Therefore, private or consortium blockchains are better suited to
fulﬁll this crucial role. These types of blockchains provide more
control and ﬂexibility and can be tailored to meet the speciﬁc
needs of an RTS application.
Building upon this foundation, Mu et al. [9] explore the con-
cept of the Policy-Driven Blockchain (PDB), which is a private
blockchain that features ﬂexible policy control and management
mechanisms. Policy sets are utilized for access control, where
users are only granted access to resources if they meet the
policy set requirements, thereby limiting participation in speciﬁc
transactions to signatories who satisfy the policy set criteria.
Consequently, PDB can be quickly customized and deployed
based on different business needs and rules. We are trying to use
PDB to solve the problems faced in RTS, whereas, currently,
the core scheme Policy-Driven Signature (PDS) in this type
of blockchain incurs high computational costs and may not
meet the lightweight computing requirements in RTS scenarios.
Wherein, the main reason for the insufﬁcient practicality of
existing PDB is that the efﬁciency of the PDS involved in this
technology can be further improved. Firstly, it is based on bilin-
ear pairings, which incurs high computational costs. Secondly,
the signature scheme is difﬁcult to support batch veriﬁcation.
It is challenging to satisfy the high-efﬁciency batch veriﬁcation
requirements of blockchain due to its typically large transaction
volume.
To differentiate our scheme from this, we proposed a
Lightweight Policy-Driven Blockchain (LPDB), which primar-
ily focuses on devising an appropriate signature scheme that
satisﬁes the unique demands of the RTS, called the Pairing-free
Policy-Driven Signature (PFPDS) scheme. Our PFPDS scheme
exhibits the following favorable characteristics:
1) Our PFPDS scheme avoids the high-cost bilinear pairing
operation, performs off-chain signature veriﬁcation, and
only stores the results of veriﬁcation in the blockchain.
Moreover, our scheme can also facilitate batch veriﬁcation
of signatures.
2) Based on the Elliptic Curve Discrete Logarithm Problem
(ECDLP) assumption, our signature scheme has been
demonstrated to be secure against two types of adversar-
ial attacks under the Random Oracle Model (ROM). As
demonstrated by experiments, it can effectively improve
computational efﬁciency and reduce communication com-
plexity.
3) We have constructed LPDB and applied it to RTS, where
our focus was solely on demonstrating the legitimacy and
completeness of transactions. We did not take into account
the development of underlying consensus mechanisms.
A. Related Work
Currently, most of the research on RTS is focused on energy-
saving solutions for collaborative control of trains, optimizing
routes, or enhancing the user experience. However, for a secure
RTS, the privacy and security of data information involved in
this system must be taken into account.
Attribute-Based Signatures (ABS) are digital signature tech-
nologies that enable a signer to select attributes that meet authen-
tication policies to generate valid signatures without disclosing
user identities or attributes. Maji et al. [13] ﬁrst proposed it in
2008. Then, Shahandashti and Safavi Naini provided a signature
design based on threshold attributes [14]. The author’s pro-
posed methodology is centered around demonstrating the own-
ership of a signature by disclosing only the necessary attributes,
thereby preserving the conﬁdentiality of each signer’s attributes.
The proposal by Huang et al. [15] involved an attribute-based
signature scheme that was utilized in vehicular ad hoc net-
works (VANETs). However, the challenge for this scheme is
the anonymity in VANETs and how to achieve more efﬁcient
authentication.
With the recent application of blockchain technology in com-
puting environments, the multi-authority attribute-based signa-
ture (MA-ABS) scheme proposed by Guo et al. [16] in 2018
aimed to achieve anonymous authentication of electronic health
records (EHRs) within blockchains. Sun et al. [17] suggested
a decentralized ABS for medical blockchains and established
a secure storage and veriﬁcation system that employs both on-
chain and off-chain collaborative storage models to enable the
secure share of EHR data among various attribute permissions.
In addition, in wang et al.’s scheme [18], ABS and IBS have
found applications in healthcare blockchains as well. Recently,
more and more progress has been made in the study of ABS
solutions for resource-constrained devices [19], [20], [21], [22],
[23], [24], [25], [26]. In a separate study by Lin et al. [27],
a blockchain system was employed for mutual authentication,
wherein an ABS scheme was utilized to achieve anonymous
authentication. Datta et al. [28] proposed an ABS that features
adaptive unforgeability and complete privacy for signers.
In contrast, traditional ABS schemes need a large number
of parameter sets, so the key and signature are usually long.
Meanwhile, as Key Generation Center (KGC) generates private
signature keys for users, users can be fully controlled. Al-Riami
et al. [29] ﬁrst introduced the concept of certiﬁcateless signa-
tures in 2003, aiming to address the key escrow issue. That
is, a certiﬁcateless signature does not necessitate a completely
reliable KGC. Combined with the above, Mu et al. [9] proposed
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:46 UTC from IEEE Xplore.  Restrictions apply. 



# Page 3

5102
IEEE TRANSACTIONS ON VEHICULAR TECHNOLOGY, VOL. 73, NO. 4, APRIL 2024
a PDS algorithm, in which the author grants users access to
resources by setting a policy set, and the user’s authority is
controlled by a speciﬁc policy set. However, the challenge they
face is that involving bilinear pairs, it is difﬁcult to ﬁt lightweight
computing requirements into RTS scenarios, at the same time,
their proposed scheme did not realize batch veriﬁcation.
In the Internet of Vehicles (IoV), where current schemes can
support batch veriﬁcation [30], [31], [32], [33], typically, the
Authoritygeneratesapseudonymfortheuser/vehicletopreserve
the anonymity of the user/vehicle and safeguard their privacy.
Nevertheless, the generation of pseudonyms often relies on a
trusted third-party and can be a complex procedure.
With the development of ITS, the technological advancements
involved in RTS have become an urgent issue that needs to be
addressed. However, most of the aforementioned research has
been applied to the IoV or VANETs. Therefore, our research
plays a positive role in the development of ITS. Additionally,
RTS typically faces stringent resource limitations in terms of
computation, storage, and communication. To adapt to these
constraints, we have proposed a new scheme that aims to reduce
the system’s resource requirements.
B. Organization
The subsequent sections of this paper are structured as fol-
lows. Section II provides a summary of the symbol notation and
cryptographic primitives employed in the proposed scheme. In
Section III, we introduce our system deﬁnition, which includes
system architecture, adversarial model, and scheme deﬁnition.
Section IV outlines the implementation of the proposed scheme
within the transportation system, encompassing the PFPDS and
its accompanying correctness analysis. In Section V, we provide
a security proof and probability analysis of the scheme under the
ROM. To validate the feasibility of our scheme in practical appli-
cations, Sections VI and VII present that the speciﬁc application
and performance analysis of the scheme in RTS, respectively. To
summarize, we conclude this paper in Section VIII.
II. PRELIMINARY KNOWLEDGE
In this section, we will describe the involved symbols, Schnorr
signature scheme, and the ECDLP assumptions are as follows.
A. Involved Symbols
Table I illustrates the primary symbols utilized in our scheme.
B. Schnorr Signature Scheme
In cryptography, a Schnorr signature is a digital signature
scheme described by C. P. Schnorr [34], whose security is based
on the ECDLP [35]. It mainly includes three algorithms:
Key Generation: Choose an elliptic curve E : y2 = x3 +
ax + b(mod p), where 4a3 + 27b2 ̸= 0, and a base point G.
Select dA randomly as the user’s secret key (dA < n, n is the
order of G). Calculate QA = dA · G as the user’s public key.
Signing: Denote m as a message chosen from the message
space M that is to be signed. The following steps are required to
generate the signature on m. To begin with, select a random
TABLE I
SYMBOL DESCRIPTION
number k and calculate R = k · G, where k < n; after that,
calculate S = k + hash(m||R) · dA(mod n); whereupon, the
signature of message m is returned as (R, S).
Veriﬁcation: To determine whether (R, S) constitutes the
signature of message m, this algorithm veriﬁes the equation
S · G = hash(m||R) · QA + R, and if the equation holds, the
signature is deemed valid and accepted.
C. ECDLP
In 1987, Koblitz [36] constructed ECDLP using Abelian
additive groups formed by points on elliptic curves [37], [38].
Given the prime number p and elliptic curve G, where G, P
belong to G, the adversary’s goal is to ﬁnd the positive integer
s ∈Z∗
p such that P = s · G.
Deﬁnition 1 (ECDLP assumption): If there is no polynomial
time t algorithm with a non-negligible ξ advantage to solve
ECDLP in G, then (Q, t, ξ)-ECDLP assumption holds in G.
III. SYSTEM DEFINITION
In this section, a concise introduction is presented regard-
ing the system model, scheme deﬁnition, and countermeasure
model, which pave the way for the following core work.
A. System Architecture
Our scheme, depicted in Fig. 2, relies on a novel LPDB, whose
system structure is chieﬂy composed of three types of entities,
namely, System Administrator (SA), BlockChain (BC), and
BCUser. BCUsers are divided into several groups according to
their respective policies, where BCUsers include trains, drivers,
sensors, etc. Despite sharing the same set of policies, BCUsers
within each group possess distinct private keys.
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:46 UTC from IEEE Xplore.  Restrictions apply. 



# Page 4

ZHOU et al.: LPDB: LIGHTWEIGHT POLICY-DRIVEN BLOCKCHAIN WITH BATCH VERIFICATION FOR RAIL TRANSIT SYSTEMS
5103
Fig. 2.
Architecture diagram of system model and policy scheme.
System Administrator: The SA includes the Authority and
KGC to maintain the entire RTS. The SA is considered com-
pletely trustworthy with no opponent to compromise with and
has the following features:
1) The Authority is tasked with deﬁning regulations, initial-
izing the system, and creating policy sets where the policy
set limits the power of the user.
2) For each user in the system, the KGC generates partial pri-
vate keys (PartialPrivKey) via the master key skKGC
and the corresponding policy. It’s worth noting that our
system maintains the conﬁdentiality of user signature
keys, preventing their disclosure to the system adminis-
trator.
BlockChain: It is a decentralized and disintermediated tech-
nology with immutable, open, and transparent information. The
database is maintained collectively and is reliable. In our paper,
BC is designated to store both the policy set Poli and the
results of signature veriﬁcation. The user can read the policy
set information and the signature veriﬁcation result from the BC
to authenticate the signature’s validity.
BCUser: Blockchain users are divided into several groups
based on different policies, including trains, drivers, sensors,
and others. Among them, sensors are an important component
of BCUsers. This role indicates a BC user and implements the
following functions:
– Receive partial private key ParialPrivKey from KGC.
– By utilizing the user’s randomly selected secret value in
combination with the partial key, the private key, ski, and
its corresponding public key, pki are generated.
– The main role of the Sensor is to collect trafﬁc information
and provide signature veriﬁcation. Transactions are executed
by generating a PFPDS by utilizing the ski of the user and
verifying it off-chain.
Policy Scheme: Regarding the grouping method for BCUser,
there is a policy-driven scheme implemented in our LPDB.
Now, let us provide a brief description of the policy scheme.
Firstly, the SA assigns a policy (pol1, pol2, . . ., poln) to each
BCUser as their unique identiﬁer. Secondly, the SA classiﬁes
BCUsers based on rules, meaning that users belonging to the
same rules will be grouped together in the same policy set Poli.
Subsequently, users will communicate using their respective
policy sets.
B. Formal Deﬁnition of PFPDS
The framework of PFPDS is deﬁned as follows.
r (pol1, pol2, . . ., poln) ←PolicyGen: This algorithm pro-
duces a set of policy attributes (pol1, pol2, . . ., poln) ∈
{0, 1}∗based on the rules established by the Authority.
r (params) ←Setup: The KGC produces the system public
parameters, params, and master private key, skKGC, by
utilizing a security parameter, λ.
r (xi) ←
SetSecretValue:
After
receiving
the
{params, Poli}, the signer chooses and outputs the
secret value, xi.
r (si, Ai) ←
SetPartialPrivKey:
On
input
{params, skKGC},
and
user’s
policy
sets
Poli =
polj||. . .||polk for {polj, . . ., polk} ∈{0, 1}∗, where ||
denotes a bitwise concatenation. KGC outputs Ai, Bi, and
partial private key si, and checks if si is valid.
r (pki, ski) ←SetUserKey: By inputting {params, Poli},
the signer generates a public-private key pair, (pki, ski).
r (σi) ←Sign: The signer outputs the signature σi, by uti-
lizing the message {params, ski, mi}, where mi ∈Z∗
p.
r (0/1) ←
Verify:
After
receiving
the
message
{params, σi, mi, poli||. . .||polk, pki},
the
algorithm
veriﬁes the signature’s validity. For a valid signature, the
output of the algorithm is 1; otherwise, it is 0.
r (0/1) ←BatchVerify: Given public parameters params,
policy set Poli, public key pki, mass messages mi (i =
1, 2, . . ., n), and their corresponding signatures σi (i =
1, 2, . . ., n). If the signatures are successfully veriﬁed in
batches, the algorithm outputs 1; otherwise outputs 0.
C. Adversarial Model
Our construction considers two distinct types of adversaries,
which are deﬁned as follows:
1) Type I adversary (A1): The ﬁrst type of attacker can either
query the user’s public key or substitute it with a fraudulent
one, but lacks knowledge of the system’s master key;
Malicious User.
2) Type II adversary (A2): The second type of attacker can
acquire the system’s master key but is unable to substitute
the legitimate user’s public key or make queries about the
user’s public key; Malicious KGC.
The existential unforgeability of the PFPDS scheme is delin-
eated by the depiction of two games, Game-I and Game-II,
as follows:
Game-I: In this game, the challenger C and the adversary A1
engage in an interaction.
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:46 UTC from IEEE Xplore.  Restrictions apply. 



# Page 5

5104
IEEE TRANSACTIONS ON VEHICULAR TECHNOLOGY, VOL. 73, NO. 4, APRIL 2024
Fig. 3.
Process of setup and generating User’s public-private key pairs.
r Initialization: At this stage, C executes the setup algorithm
to generate the system public parameters, pms, the sys-
tem master key, msk, and the master public key, mpk.
Subsequently, C transmits the pms and mpk to A1, while
maintaining msk secret.
r Queries: At this time, A1 asks the following oracle:
SetPartialPrivKey: The user’s partial private key, psk, is
generated by C and then send to A1.
SetUserKey: C sends the user’s public-private key pair
(pk, sk) to A1.
PubKeyReplace: A1 sets pk∗as the user’s new public key
and sends it to C.
Sign: A1 wants to query signature on (Poli, mi), C sends
a signature σi to A1.
r Forgery: A1 outputs a message-signature pair, (m∗
i, σ∗
i ),
over the policy set, Pol∗
i, and subject to the following
conditions:
r A1
has
made
no
queries
regarding
the
SetPartialPrivKey and Sign algorithm under (Pol∗
i,
pk∗, m∗
i).
r The signature σ∗
i generated by A1 can be veriﬁed, where
pk∗is selected by A1.
Game-II: In this game, the challenger C and the adversary
A2 engage in an interaction.
r Initialization: This stage is similar to Game-I. How-
ever, C also needs to send the msk to A2 at the same
time.
r Queries: The oracle query is similar to Game-I.
r Forgery: A2 outputs a message-signature pair, (m∗
i, σ∗
i ),
on the policy set, Pol∗
i, and subject to the following
conditions:
– A2 has not inquired about the SetSecretValue and
Sign algorithm under (Pol∗
i, pk∗, m∗
i).
– The signature σ∗
i generated by A2 can be veriﬁed.
IV. PROPOSED ARCHITECTURE
To better meet the speciﬁc requirements of RTS, we present
the complete construction of the PFPDS in this section, which
includes the following steps:
Fig. 4.
Signing and verifying stage.
Setup: As shown in Fig. 3, with input system security param-
eter λ ∈Z∗
p, the Authority and the KGC sets the system in the
following manner.
1) Authority sets the rules and outputs a set of pol-
icy attributes (pol1, pol2, . . ., poln) ∈{0, 1}∗, and upload
the relevant information of different users’ policy sets
Poli to the blockchain, where Poli = polj||. . .||polk for
polj, . . ., polk ∈{0, 1}∗, || denotes a bitwise concatena-
tion.
2) KGC chooses an elliptic curves group G and a base point
G, then it selects skKGC ∈Z∗
p and calculates pkKGC =
skKGC · G as its public key.
3) The Authority picks a hash function H : {0, 1}∗→Z∗
p.
4) Finally, KGC maintains skKGC in secret and discloses the
system parameters, params = {G, G, pkKGC, H}.
SetSecretValue: To generate Xi, the User chooses a number
xi ∈R Z∗
p as its secret value and performs the scalar multiplica-
tion Xi = xi · G.
SetPartialPrivKey: As shown in Fig. 3, when the User for-
wards its policy attributes, Poli, to the KGC, the KGC follows
the ensuing steps to produce the User’s partial private key.
1) When provided with system parameters, params, KGC’s
master private key, skKGC, and the User’s policy at-
tributes, Poli, KGC selects ai ∈Z∗
p at random and cal-
culates Ai = ai · G.
2) KGC computes h1,i = H(Poli||Bi||counter), where
Bi = Xi + Ai, si = ai + h1,i · skKGC as its partial pri-
vate key.
3) Upon receiving (si, Ai), the User veriﬁes if si · G = Ai +
h1,i · pkKGC holds true. The partial private key is deemed
valid if the equation is satisﬁed and invalid otherwise.
SetUserKey: To generate their public-private key pair, the
User performs the subsequent steps. Speciﬁcally, the User sets
ski = xi + si as its private key and calculates pki = (xi + si) ·
G as public key.
Sign: This stage is shown in Fig. 4, by taking a message mi ∈
Z∗
p, the following steps outline the procedure for generating the
signature.
1) To generate the signature, the User ﬁrst chooses a num-
ber ri ∈R Z∗
p, and then calculates Ri = ri · G, h2,i =
H(mi||Ri).
2) Compute Si = ri + h2,i · ski, and set σ′
i = (Ri, Si).
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:46 UTC from IEEE Xplore.  Restrictions apply. 



# Page 6

ZHOU et al.: LPDB: LIGHTWEIGHT POLICY-DRIVEN BLOCKCHAIN WITH BATCH VERIFICATION FOR RAIL TRANSIT SYSTEMS
5105
3) Output the signature σi = (σ′
i, Bi).
Subsequently, the User sends the signature σi to a Sensor.
Verify: The veriﬁcation process is shown in Fig. 4. After
receiving the message {params, Poli, pki, mi, σi}, the Sensor
ﬁrst veriﬁes the User’s policy permissions. Speciﬁcally, the
Sensor queries the policy set information Pol′
i from blockchain.
The signatures can only be veriﬁed after the User’s policy
permissions are veriﬁed where Pol′
i = Poli. Then, the Sensor
veriﬁes the signature off-chain after receiving the signature
σi. If the equation Si · G = Ri + h2,i · pki is established, the
veriﬁcation result will be sent to the blockchain.
BatchVerify: Upon receipt of numerous sets of mes-
sages {params, Poli, pki, mi, σi} from various Useri (i =
1, 2, . . ., n), the Sensor proceeds to compute R = n
i=1 Ri,
S = n
i=1 Si, σ′ = (R, S), and outputs aggregated signa-
ture σ = (σ′, Bi). In the meantime, the Sensor sends σ and
{params, Poli, pki, mi} (i = 1, 2, . . ., n) to other Sensors, and
the other Sensors verify it off-chain. Accept σ if the equation
S · G = R + n
i=1 h2,i · pki holds, then the veriﬁcation result
will be sent to the blockchain; if not, will reject the message.
V. SECURITY ANALYSIS
This section aims to demonstrate the security of the proposed
scheme under the ROM by leveraging the ECDLP assumption
discussed in Section II and the adversarial model presented in
Section III.
A. Formal Security Analysis
Theorem 1: The proposed PFPDS scheme is Existentially
Unforgeable under the adaptive Chosen Message Attacks (EUF-
CMA) against two types of adversaries A1 and A2 deﬁned
previously.
To provide proof of security for the proposed scheme, the
proof utilizes Lemmas 1 and 2.
Lemma 1: Suppose that there is a Probabilistic Polynomial
Time (PPT) adversary A1 that can break (t, Qpsk, Qsk, Qsig, ε)-
security against EUF-CMA with a non-negligible advantage ε,
then there exists a PPT challenger C1 that can solve the ECDLP
problem with time t′ and non-negligible advantages ε′, where
ε′ ⩾

1 −Qpsk + Qsk + Qsig
n

· ε5,
t′ ⩾t + (Qpsk + Qsk + Qsig) · T.
Proof: Assuming that the adversary A1 can break the PFPDS
scheme with a random ECDLP instance: given G, Q = s · G,
the challenger C1’s goal is to obtain a solution s of ECDLP
through interactions with A1. For this purpose, C1 picks Pol∗
i as
the challenge policy.
1) Initialization:C1 executestheSetupalgorithmtoinitialize
system parameters params = {G, G, pkKGC, H}, sets
pkKGC = Q = s · G, where Q is a random ECDLP in-
stance, and then sends params to A1.
2) Queries: C1 generates an initially empty list L =
(Poli, βi, Ai, xi, pki, ski) and provides A1 with query to
the following oracles.
a) H queries: At the beginning, C1 maintains two lists,
LH1: (Poli, Bi, h1,i), LH2: (Poli, mi, Ri, h2,i), and
sets both to be empty.
Upon receiving a query for (Poli, Bi), C1 checks if it
existsintheLH1 list.Ifitdoes,C1 returnsh1,i toA1.Ifit
isnonexistent,C1 producesarandomnumberh1,i ∈Z∗
p
and sets h1,i = H(Poli||Bi||counter). Subsequently,
C1 returns h1,i to A1.
When C1 receives a query for (Poli, mi, Ri), it checks
if it exists in the LH2 list. If it does, C1 returns h2,i to
A1. If it is nonexistent, C1 generates a random number
h2,i ∈Z∗
p and sets h2,i = H(mi||Ri). C1 then returns
h2,i to A1.
Finally, C1 adds the tuple (Poli, Bi, h1,i) to the list
LH1 and (Poli, mi, Ri, h2,i) to the list LH2.
b) Partial private key queries: A1 makes Qpsk par-
tial private key queries to C1. If Poli = Pol∗
i, this
simulation is aborted, and C1 returns “⊥”. Else if
Poli ̸= Pol∗
i, C1 checks the list L, if Poli exists,
returns the tuple (Poli, βi, Ai) to A1. Otherwise,
C1 picks two numbers αi, βi ∈R Z∗
p and sets si =
βi, H(Poli||Bi||counter) = h1,i = αi. Then it com-
putes Ai = βi · G −αi · pkKGC, where (βi, Ai) is the
partial private key. C1 then sends (βi, Ai) to A1 and
appends the tuple (Poli, βi, Ai, ∗, ∗, ∗) to the list L.
The correctness of partial private key (βi, Ai) as
si · G = βi · G
= Ai + αi · pkKGC
= Ai + h1,i · pkKGC
c) Public key queries: When A1 requests the public
key Qpk for the policy set Poli, C1 checks whether
Poli exists in the list L. If it does, C1 sends the corre-
sponding pki to A1. Otherwise, C1 retrieves the tuple
(Poli, Bi, h1,i) from LH1, then selects a random value
xi ∈R Z∗
p and computes Xi = xi · G, Bi = Xi + Ai.
Finally, C1 sets pki = Bi + h1,i · pkKGC as the public
key and transmits it to A1. Additionally, C1 updates
(Poli, βi, Ai, xi, pki, ∗) in the L list.
d) Private key queries: A1 makes Qsk queries to
C1. If Poli = Pol∗
i, C1 terminates the simulation
and returns “⊥” to A1. If Poli ̸= Pol∗
i, C1 com-
putes ski = xi + βi, then updates the list L =
(Poli, βi, Ai, xi, pki, ski).
e) Public key replace queries: A1 replaces the public
key pki with pk′
i, and sends pk′
i to C1.
f) Signing queries: If A1 requests the Qsig sig-
nature for (Poli, mi) and Poli ̸= Pol∗
i, running
the Sign algorithm, C1 produces the signature σi
and transmits it to A1. If Poli = Pol∗
i, C1 recov-
ers the list L = (Poli, βi, Ai, xi, pki, ski) and com-
putes Bi = xi · G + Ai, subsequently, chooses ran-
dom numbers ri, θi, ϕi ∈Z∗
p. C1 sets Ri = ri · G,
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:46 UTC from IEEE Xplore.  Restrictions apply. 



# Page 7

5106
IEEE TRANSACTIONS ON VEHICULAR TECHNOLOGY, VOL. 73, NO. 4, APRIL 2024
h2,i = H(mi||Ri) = ϕi, and computes ski = xi +
βi, Si = ri + ϕi · ski. Finally, C1 sets σ′
i = (Ri, Si)
and outputs the signature σi = (σ′
i, Bi).
The correctness of σi as
Si · G = (ri + ϕi · ski) · G
= (ri + ϕi · (xi + βi)) · G
= Ri + ϕi · (Xi + Ai + αi · pkKGC)
= ϕi · (Bi + αi · pkKGC) + Ri
= ϕi · pki + Ri
3) Forgery: At the end of the process, A1 terminates the
query and produces a forged signature σ∗
i = (σ
′∗
i , B∗
i )
as the output. While aggregating the signatures, it
is not mandatory for all the signatures to be forged.
However,theforgedaggregatedsignaturemustinclude
the signature of the target identity Pol∗
i. In case the
signature of Pol∗
i is not forged, A1 will terminate
the simulation and report an “ERROR”. Based on the
Forking Lemma [39], using the same random tape but
distinct hash values h1,i, A1 can create two legitimate
signatures σ∗I
i and σ∗II
i
. For the sake of simpliﬁcation,
let us assume that Pol∗
i = Pol∗
1. After that we have
σ∗I =
n

i=2
σ∗I
i + σ∗I
1 , σ∗II =
n

i=2
σ∗II
i
+ σ∗II
1
More speciﬁcally,
a) In the execution of C1, A1 outputs a valid forgery

σ∗I
1 = ((R∗I
1 , 
S∗I
1 ), B∗
i ), we have

S∗I
1 · G = 
hI
2,i · pkI
i + R∗I
1 .
(1)
b) In the execution of C1, A1 outputs a valid forgery

σ∗I
1 = ((R∗I
1 , 	
S∗I
1 ), B∗
i ), we have
	
S∗I
1 · G = 	
hI
2,i · pkI
i + R∗I
1 .
(2)
c) In the execution of C1, A1 outputs a valid forgery

σ∗II
1
= ((R∗II
1
, 
S∗II
1
), B∗
i ), we have

S∗II
1
· G = 
hII
2,i · pkII
i
+ R∗II
1
.
(3)
d) In the execution of C1, A1 outputs a valid forgery

σ∗II
1
= ((R∗II
1
, 
S∗II
1
), B∗
i ), we have

S∗II
1
· G = 	
hII
2,i · pkII
i
+ R∗II
1
.
(4)
From (1) and (2), we have pkI
i = B∗
i + hI
1,i ·
pkKGC, then we can calculate


S∗I
1 −	
S∗I
1

· G ·


hI
2,i −	
hI
2,i
−1
= B∗
i + hI
1,i · pkKGC.
(5)
Similarly, from (3) and (4), we have


S∗II
1
−
S∗II
1

· G ·


hII
2,i −	
hII
2,i
−1
= B∗
i + hII
1,i · pkKGC.
(6)
Solving for pkKGC in (5) and (6), we eventually
have


S∗I
1 −	
S∗I
1

·


hI
2,i−	
hI
2,i
−1
−


S∗II
1
−
S∗II
1

·


hII
2,i−	
hII
2,i
−1
·

hI
1,i−hII
1,i
−1 · G = pkKGC.
(7)
Because pkKGC = s · G, we ﬁnally get the solu-
tion of the ECDLP problem as s.
□
After that, we examine the three events required for the
success of C1:
E1 : C1 does not terminate during A1’s inquiries.
E2 : A1 has the ability to generate a valid forged signature.
E3 : The forged signature of A1 is valid.
C1 successfully breaks the ECDLP problem if all of these
events occur. The probability Pr[E1 ∧E2 ∧E3] is
Pr[E1 ∧E2 ∧E3] = Pr[E1] · Pr[E2] · Pr[E3].
Regarding E1, we have divided it into three parts, where
1
n
represents the probability that A1’s query is the target user.
For the SetPartialPrivKey algorithm, the probability that
C1 does not terminate is
(1 −1
n)Qpsk ⩾(1 −Qpsk
n
).
Similarly, as to SetUserKey algorithm, we have

1 −1
n
Qsk
⩾

1 −Qsk
n

.
With regard to Sign algorithm, we can get

1 −1
n
Qsig
⩾

1 −Qsig
n

.
To sum up, the total probability of E1 is
Pr[E1] ⩾

1 −Qpsk + Qsk + Qsig
n

.
In the matter of E2, assuming that A1’s advantage in success-
fully forging a signature is ε, then Pr[E2] ⩾ε; for E3, A1 returns
a valid signature. If it is possible to authenticate the signature C1
can use it to solve the ECDLP problem, the probability is Pr[E3]
⩾ε4.
C1 can break the ECDLP problem with advantages of ε′ is
ε′ ⩾

1 −Qpsk + Qsk + Qsig
n

· ε5.
The time complexity of C1 is equivalent to that of A1 plus
the duration needed to answer (Qpsk + Qsk) public/private key
queries along with Qsig signature queries. Set T as the time
cost for calculating the indexation. Consequently, the overall
time required by C1 to solve the ECDLP problem is
t′ ⩾t + (Qpsk + Qsk + Qsig) · T.
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:46 UTC from IEEE Xplore.  Restrictions apply. 



# Page 8

ZHOU et al.: LPDB: LIGHTWEIGHT POLICY-DRIVEN BLOCKCHAIN WITH BATCH VERIFICATION FOR RAIL TRANSIT SYSTEMS
5107
Lemma 2: Suppose that there is a PPT adversary A2 that can
break (t, Qpsk, Qsk, Qsig, ε)-security against EUF-CMA with
a non-negligible advantage ε, then there exists a PPT challenger
C2 that can solve the ECDLP problem with time t′ and non-
negligible advantages ε′, where
ε′ ⩾

1 −Qpsk + Qsk + Qsig
n

· ε5,
t′ ⩾t + (Qpsk + Qsk + Qsig) · T.
Proof: Assuming that the adversary A2 can break the PFPDS
scheme with a random ECDLP instance: given G, Xi = xi · G,
the challenger C2’s goal is to obtain a solution xi of ECDLP
through interactions with A2. For this purpose, C2 picks Pol∗
i as
the challenge policy.
1) Initialization: C2 executes the Setup algorithm to initial-
izes system parameters params = {G, G, pkKGC, H},
sets pkKGC = Q = s · G, wherein, s ∈Z∗
p is a random
number, and then transmits both params and s to A2.
2) Queries: C2 generates an initially empty list L =
(Poli, si, Ai, xi, pki, ski) and provides A2 with query to
the following oracles.
a) H queries: At the beginning, C2 maintains two lists,
LH1: (Poli, Bi, h1,i), LH2: (Poli, mi, Ri, h2,i), and
sets both to be empty.
When C2 receives a query for (Poli, Bi), it veriﬁes if
it exists in the list LH1. If it is present, C2 returns h1, i
to A2. If it is not present,C2 generates a random num-
ber h1,i ∈Z∗
p and sets h1,i = H(Poli||Bi||counter).
Subsequently, C2 returns h1,i to A2.
When C2 receives the query for (Poli, mi, Ri), it
checks if it exist in the LH2 list. If it does, C2 returns
h2,i to A2. If it is nonexistent, C2 generates a random
number h2,i ∈Z∗
p and sets h2,i = H(mi||Ri). C2 then
returns h2,i to A2.
Finally, C2 adds the tuple (Poli, Bi, h1,i) to the list LH1
and (Poli, mi, Ri, h2,i) to the list LH2.
b) Partial private key queries: A2 makes Qpsk
partial private key queries to C2. If Poli = Pol∗
i,
this simulation is aborted, and C2 returns “⊥”.
Else if Poli ̸= Pol∗
i, C2
checks the list L, if
Poli
exists, returns the tuple (Poli, βi, Ai) to
A2. Otherwise, C2 picks ai, αi ∈R Z∗
p, sets Ai =
ai · G, H(Poli||Bi||counter) = h1,i = αi, and then
computes si = ai + αi · s, where (si, Ai) is the partial
private key. At the end, C2 sends (si, Ai) to A2 and
appends the tuple (Poli, si, Ai, ∗, ∗, ∗) to L.
The correctness of partial private key (si, Ai) as
si · G = (ai + αi · s) · G
= Ai + αi · s · G
= Ai + h1,i · pkKGC
c) Public key queries: When A2 requests the public
key Qpk for the policy set Poli, C2 checks whether
Poli exists in the list L. If it does, C2 returns the
corresponding pki to A2. Otherwise, if Poli = Pol∗
i,
C2 recovers the tuple (Poli, Bi, h1,i) from LH1 then
calculates Bi = Xi + Ai, xi = ⊥, sets the public
key pki = Bi + h1,i · pkKGC, sends pki to A2 and
then updates (Poli, si, Ai, ⊥, pki, ∗) to L. If Poli ̸=
Pol∗
i, C2 randomly selects a number xi ∈Z∗
p, sets
pki = (xi + si) · G, and inserts into the list L =
(Poli, si, Ai, xi, pki, ∗).
d) Private key queries: A2 makes Qsk queries to
C2. C2 aborts this simulation and returns “⊥” to
A2 as if Poli = Pol∗
i. If Poli ̸= Pol∗
i, C2 com-
putes ski = xi + si, then updates the list L =
(Poli, si, Ai, xi, pki, ski).
e) Signing queries: If A2 requests the Qsig sig-
nature for (Poli, mi) and Poli ̸= Pol∗
i, C2 exe-
cutes the Sign algorithm to produce the signature
σi and sends it to A2. If Poli = Pol∗
i, C2 recov-
ers the list L = (Poli, si, Ai, xi, pki, ski) and com-
putes Bi = Xi + Ai, subsequently, chooses random
numbers ri, θi, ϕi ∈Z∗
p. C2 sets Ri = ri · G, h2,i =
H(mi||Ri) = ϕi, and computes Si = ri + ϕi · ski.
Finally, C2 sets σ′
i = (Ri, Si) and outputs the signature
σi = (σ′
i, Bi).
The correctness of σi as
Si · G = (ri + ϕi · ski) · G
= (ri + ϕi · (xi + si)) · G
= Ri + ϕi · (Xi + Ai + αi · pkKGC)
= ϕi · (Bi + αi · pkKGC) + Ri
= ϕi · pki + Ri
3) Forgery: At the end of the process, A2 terminates the
query and produces a forged signature σ∗
i = (σ
′∗
i , B∗
i ) as
the output. While aggregating the signatures, it is not
mandatory for all the signatures to be forged. However, the
forged aggregated signature must include the signature of
the target identity Pol∗
i. In the case the signature of Pol∗
i
is not forged, A2 will terminate the simulation and outputs
an “ERROR”. Based on the Forking Lemma [39], using
the same random tape but distinct hash values h1,i, A2 can
create two legitimate signatures σ∗I
i and σ∗II
i
. For the sake
of simpliﬁcation, we assume that Pol∗
i = Pol∗
1. After that
we have
σ∗I =
n

i=2
σ∗I
i + σ∗I
1 , σ∗II =
n

i=2
σ∗II
i
+ σ∗II
1
More speciﬁcally, we have
S∗I
1 · G = hI
2,i · pk∗
i + R∗
1.
(8)
S∗II
1
· G = hII
2,i · pk∗
i + R∗
1.
(9)
From
(8)
and
(9),
we
have
pk∗
i = B∗
i + h1,i ·
pkKGC, Bi = Xi + Ai, then we can calculate
Xi = (hII
2,i −hI
2,i)−1 · (S∗II
1
−S∗I
1 )
· G −Ai −h1,i · s · G
(10)
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:46 UTC from IEEE Xplore.  Restrictions apply. 



# Page 9

5108
IEEE TRANSACTIONS ON VEHICULAR TECHNOLOGY, VOL. 73, NO. 4, APRIL 2024
Because Xi = xi · G, we ﬁnally get the solution of the
ECDLP problem as xi.
□
The probability that A2 can successfully solve the ECDLP
problem and the total time cost are the same as in the proof of
Lemma 1.
B. Other Security Requirements
The proposed PFPDS scheme also implements other security
requirements in the communication process.
1) Unforgeability: Based on Lemmas 1 and 2 in the security
proof mentioned above, we have proven the existential
unforgeability of our PFPDS scheme under chosen mes-
sage attacks. These adversaries are unable to forge valid
signatures that satisfy Si · G = Ri + h2,i · pki.
2) Message Authentication and Integrity: In our scheme,
every message generated by the train needs to be signed
before being sent to nearby sensors. Sensors can verify
the integrity and validity of the message by checking if
the condition Si · G = Ri + h2,i · pki holds. This ensures
that the message has not been tampered with or forged by
attackers or unauthorized trains. Therefore, the proposed
scheme meets the security requirements for message au-
thentication and integrity.
3) Anonymity: According to our proposal, the true identity
of the train is completely anonymous. Except for the SA,
other trains and sensors have no knowledge of the train’s
real identity. During the communication process, the true
identity of BCUser is concealed within the policy and
BCUsers communicate with each other using the policies
generated by the SA. Except for the SA, no adversary can
obtain the real identity of BCUser from the policy set.
4) Unlinkability: As per our scheme, the train signs and
broadcasts messages. Due to the random nature of the ri
value in the signature, adversaries cannot link two mes-
sages to the same user. Therefore, the proposed PFPDS
scheme is unlinkable.
5) Attack Resistance:This scheme also meets some other anti
attack requirements.
Man-in-the-Middle Attacks: In our proposed scheme, if a
malicious user intercepts a message {params, Poli, pki,
mi, σi}, it is not possible to modify it, because through
the check condition Si · G = Ri + h2,i · pki, which can
be easily detected by sensors.
Impersonation Attacks: Within our framework, upload
policy set information to blockchain. Before communi-
cation, users query the blockchain to verify the legitimacy
of the policy set information. If a malicious user tries to
impersonate a legitimate BCUser using policy informa-
tion, it is infeasible on the blockchain.
VI. APPLICATION FOR RAIL TRANSIT SYSTEMS
We have deﬁned our system structure in Section III, and in this
Section, we will delve deeper into the system architecture and
present our suggested security protocol, along with its practical
implementation in RTS scenarios.
Fig. 5.
Security protocol for Rail Transit Systems.
A. Protocol
This section will cover the introduction of a security protocol
that showcases the functioning of our system. To simplify the
representation, we divide the system into four entities, namely
SA, BC, BCUser, and CS. Each entity consists of a set of
components with speciﬁc functions. In our proposed PFPDS
system, there are the following entities: NC, Authority, and
KGC, to simplify matters, we shall henceforth refer to these
entities as SA. The NC is responsible for deﬁning rules, while
the Authority generates a set of policies based on these rules.
Simultaneously, the SA initializes the system, generates the
master key, and deﬁnes the public parameters of the system. In
addition, the BCUser comprises onboard units, sensors on both
sides of the track, track workers, and train drivers who received
public-private pair keys from the KGC. All communication
requirements of our protocol are completed by CS.
The steps involved in the protocol are depicted in Fig. 5 and
will be expounded upon in the following sections.
r Initially, the SA is required to establish the system by
producing the system parameters, denoted as params.
r Users are required to register with the Authority, which
then assigns distinct policies according to their respective
permissions and archives them in their databases.
r Partial private key ParticalPrivKey is generated by
KGC with corresponding policies and unique counters.
Then, KGC sends ParticalPrivKey and params to the
User. The User chooses a conﬁdential value and merges
it with ParticalPrivKey to generate the User’s private
key, then calculates its public key using the private key and
public parameters.
r During the communication phase, the user generates PF-
PDS and sends it to other Sensors for veriﬁcation.
r Only after the signature is veriﬁed will the Sensor transmit
the veriﬁcation results to the blockchain and store them.
r The system will coordinate PFPDS.
B. Application
Traditional RTS, completely dependent on AMS, other users
cannot verify the signature data, so there is only one trust point,
which means that the only data veriﬁcation is done by NC. But
in our system, any other Sensors can verify the signature. The
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:46 UTC from IEEE Xplore.  Restrictions apply. 



# Page 10

ZHOU et al.: LPDB: LIGHTWEIGHT POLICY-DRIVEN BLOCKCHAIN WITH BATCH VERIFICATION FOR RAIL TRANSIT SYSTEMS
5109
following describes the practical application based on the secure
communication protocol.
Our scheme differs from traditional blockchain applications
by providing policy-based regulation of users, with each user
possessing permissions allocated by an Authority. This feature is
usefulinRTS,wheretaskscanbesafelyperformedbyauthorized
users, and in fact, is useful in many possible scenarios, two
scenarios of which we will consider in this article. The ﬁrst
scenario is the authentication of the driver before operating the
train, and the second scenario is the batch veriﬁcation of the
large amount of trafﬁc information received by the sensors.
For example, train abc is in charge of a group of drivers for
which the authority assigns the policy set Polabc, which means
that both train abc and drivers (d1, d2, . . ., dn) belong to the
policy set Polabc. In our scheme, the KGC is only required to
produce the partial private key once for the policy set Polabc.
It is worth noting that in the policy set Polabc, each driver
selects a different secret value and counter, so a different driver
based on the partial private key generates different public-private
key pairs. In speciﬁc terms, when the driver d2 starts duty, the
veriﬁcation results of σd1 should already exist in the blockchain.
d2 ﬁrst queries the veriﬁcation result of σd1 in the blockchain,
if it exists, d2 sends the signature of the on-duty request mes-
sage, σd2 = ((Rd2, Sd2), Bi), and then the Sensor veriﬁes σd2.
If the veriﬁcation is successful, driver d2 allows the train to be
driven while the veriﬁcation results are sent to the blockchain.
Similarly, when d3 is on duty, the blockchain needs to have the
veriﬁcation result of σd2, and σd1 should also be reconciled by
the miner. Above all, the LPDB can be coordinated for all users.
Correspondingly, the process of the TS sending messages and
verifying the messages is similar to that of a driver driving a train.
Let us take a brief look at the application of the TS. Each sensor
in the TS is placed in sequence, therefore PFPDS signature is to
comply with the provisions of the given sequence.
During the blockchain coordination process, miners are re-
sponsible for verifying whether the driver has the necessary
authorization to operate the train by examining whether the
PFPDS signature execution process falls under the policy set
Polabc. Thus, our system guarantees that only authorized drivers
are permitted to operate trains.
Similarly, let us now take a look at the application of the
proposed scheme in the second scenario. In the RTS, there is
an increasing number of Sensor devices generating and sharing
a large amount of data. This results in a signiﬁcant volume of
trafﬁc information that needs to be transmitted. If each Sensor
individually veriﬁes every piece of information, it would incur
an overwhelming computational cost and fail to meet the low-
latency requirements of real-time systems. Therefore, the batch
veriﬁcation algorithm proposed in this article can be effectively
applied to RTS.
VII. PERFORMANCE EVALUATION
We have implemented our approach using C language and
MIRACL libraries on a personal computer with the follow-
ing speciﬁcations: Lenovo Intel (R) Core (TM) i7-10700 CPU
@ 2.90 GHz 2.90 GHz, 16.0 GB RAM, Windows 10 21H2.
TABLE II
NOTATION AND UPTIME
TABLE III
COMPARISONS OF SIGN-LENGTH AND ASSUMPTION
This implementation serves as a testament to the practicality
and efﬁcacy of our scheme. For operations based on bilin-
ear pairings and elliptic curves, we set the security strength
to 128 bits, and choose Type-I pairings for bilinear pairings
e : G1 × G1 −→GT . Group G1 is an additive cyclic group,
while GT is a multiplicative cyclic group. As shown in Table II,
we tested 1000 rounds of different operations in the MIRACL
library and used their average as the ﬁnal result. We conducted
a comparative analysis between our PFPDS scheme, the ABS
schemes proposed by Wang et al. [18], Sun et al. [17], and
Lin et al. [27], as well as the PDS scheme introduced by Mu
et al. [9]. Our comparison focused on various aspects such as
signature length, signature generation cost, veriﬁcation cost, and
complexity assumptions for each scheme.
A. Sign-Length and Assumption Analysis
As depicted in Table III, Type-I pairing is formed on a super-
singular elliptic curve on Fp, with further elaboration provided
therein. Wang et al. [18] scheme’s signature length is |G| + |Zp|.
The signature length of Sun et al. [17] is 3|G|. In addition,
Lin et al. [27] demonstrated their scheme based on CDHP,
with a signature length of n|G| + |Zp|. Mu et al. [9] proposed
a scheme wherein the signature length is |G| + |Zp|, and the
security assumption is q-BSDH. Our proposed PFPDS scheme
is established on the ECDLP assumption and is accompanied by
a security proof, with the signature length of 2|Zp|.
It is evident that our scheme has shorter signature lengths
and incurs lower communication costs when compared to the
alternative.
B. Computation Cost Analysis
Wanget al. [18]’s schemerequires 2 hashfunctions, 6modular
exponentiation operations, 2 point multiplication operations on
elliptic curves, and one point addition for signature generation,
with a total cost of approximately 2TH + 6Te + 2Tm + Ta ≈
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:46 UTC from IEEE Xplore.  Restrictions apply. 



# Page 11

5110
IEEE TRANSACTIONS ON VEHICULAR TECHNOLOGY, VOL. 73, NO. 4, APRIL 2024
TABLE IV
COMPARISONS OF SIGNATURE AND VERIFICATION
Fig. 6.
Comparison of computational costs for signature and veriﬁcation in a
single operation.
88.402 ms, and for the convenience of uniﬁed calculation, we
take the value of l in the linear relationship as 5. The signature
veriﬁcation requires 5 bilinear pairing operations, 3 modular
exponentiation operations, 2 modular inverse operations, 2 hash
functions, and 2 point multiplication operations on elliptic
curves, with a total cost of 5Tp + 3Te + 2Ti + 2TH + 2Tm ≈
160.293 ms. Similarly, as shown in Table IV, we computed
the computational expenses of the signature generation and
veriﬁcation process for the scheme proposed in [9], [17], [27].
As shown in Fig. 6, it is apparent that our scheme incurs
less computational overhead in comparison to other schemes.
Compared with Wang et al. [18], Sun et al. [17], Lin et al. [27],
and Mu et al. [9], our scheme reduces signature generation costs
by 92.51%, 96.64%, 93.08%, and 47.15%, respectively. In the
same way, our scheme also demonstrates signiﬁcant advantages
in terms of veriﬁcation costs compared to Wang et al. [18],
Sun et al. [17], Lin et al. [27], and Mu et al. [9]. Speciﬁcally,
our scheme has reduced veriﬁcation costs by 91.75%, 84.97%,
91.80%, and 69.80% compared to theirs. According to the above
analysis, our PFPDS scheme presents notable beneﬁts in terms
of both signature generation and veriﬁcation.
In addition, our scheme is based on Schnorr signatures and
can be veriﬁed in batches. As shown in Fig. 7, We examine the
scenario wherein the Sensor receives a considerable volume of
messages (with n = 100, 200, . . ., 500), it is clear that the com-
putational overhead of batch veriﬁcation is approximately 49%
higher than that of single veriﬁcation. Furthermore, it is worth
mentioning that the veriﬁcation duration is directly correlated
Fig. 7.
Comparative analysis of computational expenses for single signature
veriﬁcation and batch veriﬁcation.
Fig. 8.
Comparison of computational costs for batch veriﬁcation.
with the number of received messages. Therefore, in real-time
RTS scenarios, the advantages of our scheme become more
evident as the number of communication messages exchanged
increases.
On the other hand, in order to better demonstrate the advan-
tages of our scheme, we assume that when n = 100, indicating
that the sensors receive 100 trafﬁc messages simultaneously. We
proceed to calculate the computational overhead required for
verifying the aforementioned comparative schemes, and subse-
quently compare it with our proposed approach. As evidenced by
Fig. 8, our scheme provides the capability of batch veriﬁcation,
resulting in signiﬁcantly reduced computational costs.
VIII. CONCLUSION
The Rail Transit Systems (RTS) is already closely related
to our daily lives and work and is one of our most popular
transportation systems. As the RTS becomes more popular,
there will be higher requirements for its system in terms of
high mobility, low latency, data exchange, and data storage.
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:46 UTC from IEEE Xplore.  Restrictions apply. 



# Page 12

ZHOU et al.: LPDB: LIGHTWEIGHT POLICY-DRIVEN BLOCKCHAIN WITH BATCH VERIFICATION FOR RAIL TRANSIT SYSTEMS
5111
At the same time, its data security and privacy also face sig-
niﬁcant challenges. To achieve our vision, we have considered
the new Lightweight Policy-Driven Blockchain (LPDB) based
on traditional blockchain that can solve most of the problems
faced by RTS. What sets this apart from existing schemes is that
we provide the Pairing-free Policy-Driven Signature (PFPDS)
scheme, which is based on an elliptic curve addition group,
avoiding the high computational cost of bilinear pairing, and
implementing off-chain signature veriﬁcation, which can reduce
the on-chain overhead of the blockchain. Furthermore, we also
take into account the situation where the real-time interactive
data volume of the RTS is very large. To address this, we have
analyzed the batch veriﬁcation of the signatures when a Sensor
receives a large number of messages. Batch veriﬁcation can
meet the efﬁcient transaction veriﬁcation needs in blockchain
scenarios. In conclusion, we have demonstrated the validity and
security of our signature scheme under the ROM and presented
experimental ﬁndings to corroborate its feasibility.
REFERENCES
[1] F. Li, K.-Y. Lam, H.-H. Chen, and N. Zhao, “Spectral efﬁciency enhance-
ment in satellite mobile communications: A game-theoretical approach,”
IEEE Wireless Commun., vol. 27, no. 1, pp. 200–205, Feb. 2020.
[2] F. Li, K.-Y. Lam, X. Liu, J. Wang, K. Zhao, and L. Wang, “Joint pric-
ing and power allocation for multibeam satellite systems with dynamic
game model,” IEEE Trans. Veh. Technol., vol. 67, no. 3, pp. 2398–2408,
Mar. 2018.
[3] R. Hussain and S. Zeadally, “Autonomous cars: Research results, issues,
and future challenges,” IEEE Commun. Surveys Tuts., vol. 21, no. 2,
pp. 1275–1313, Secondquarter 2019.
[4] S. M. Ahsan Kazmi et al., “Infotainment enabled smart cars: A joint
communication, caching, and computation approach,” IEEE Trans. Veh.
Technol., vol. 68, no. 9, pp. 8408–8420, Sep. 2019.
[5] X. Cui and J. Li, “Tools and practices,” in Secure and Trust-
worthy Transportation Cyber-Physical Systems. Sun Y. and Song
H., Eds. Springer, Singapore: Springer Briefs Comput. Sci., 2017,
doi: 10.1007/978-981-10-3892-1_7.
[6] J. Kolodziej, C. Hopmann, G. Coppa, D. Grzonka, and A. Widlak, “In-
telligent transportation systems - Models, challenges, security aspects,” in
Cybersecurity of Digital Service Chains - Challenges, Methodologies, and
Tools. Berlin, Germany: Springer, 2022, pp. 56–82.
[7] M. B. Mollah et al., “Blockchain for the Internet of Vehicles towards
intelligent transportation systems: A survey,” IEEE Internet Things J.,
vol. 8, no. 6, pp. 4157–4185, Mar. 2021.
[8] D. Pulido, G. Darido, R. Munozraskin, and J. Moody, The Urban Rail
Development Handbook. Washington, DC, USA: World Bank Pub., 2018.
[9] Y. Mu, F. Rezaeibagha, and K. Huang, “Policy-driven blockchain and its
applications for transport systems,” IEEE Trans. Serv. Comput., vol. 13,
no. 2, pp. 230–240, Mar./Apr. 2020.
[10] J.-P. Chang et al., “Assessing spatial synergy between integrated urban rail
transit system and urban form: A buli-based MCLSGA model with the
wisdom of crowds,” IEEE Trans. Fuzzy Syst., vol. 31, no. 2, pp. 434–448,
Feb. 2023.
[11] G. Costantino, M. De Vincenzi, F. Martinelli, and I. Matteucci, “A privacy-
preserving solution for intelligent transportation systems: Private driver
DNA,” IEEE Trans. Intell. Transp. Syst., vol. 24, no. 1, pp. 258–273,
Jan. 2023.
[12] S. Nakamoto, “Bitcoin: A peer-to-peer electronic cash system,” Aug.
21, 2008, doi: 10.2139/ssrn.3440802.
[13] H. Maji, M. Prabhakaran, and M. Rosulek, “Attribute-based signa-
tures: Achieving attribute-privacy and collusion-resistance,” IACR Cryp-
tol. ePrint Arch., p. 328, 2008. [Online]. Available: https://ia.cr/2008/328
[14] S. F. Shahandashti and R. Safavi-Naini, “Threshold attribute-based signa-
tures and their application to anonymous credential systems,” in Proc. 2nd
Int. Conf. Cryptol. Afr., 2009, pp. 198–216.
[15] D. Huang and M. Verma, “ASPE: Attribute-based secure policy en-
forcement in vehicular ad hoc networks,” Ad Hoc Netw., vol. 7, no. 8,
pp. 1526–1535, 2009.
[16] R. Guo, H. Shi, Q. Zhao, and D. Zheng, “Secure attribute-based signa-
ture scheme with multiple authorities for blockchain in electronic health
records systems,” IEEE Access, vol. 6, pp. 11676–11686, 2018.
[17] Y. Sun, R. Zhang, X. Wang, K. Gao, and L. Liu, “A decentralizing attribute-
based signature for healthcare blockchain,” in Proc. IEEE 27th Int. Conf.
Comput. Commun. Netw., 2018, pp. 1–9.
[18] H. Wang and Y. Song, “Secure cloud-based EHR system using attribute-
based cryptosystem and blockchain,” J. Med. Syst., vol. 42, no. 8,
pp. 152:1–152:9, 2018.
[19] J. Sun, Y. Su, J. Qin, J. Hu, and J. Ma, “Outsourced decentral-
ized multi-authority attribute based signature and its application in
IoT,” IEEE Trans. Cloud Comput., vol. 9, no. 3, pp. 1195–1209,
Jul.–Sep. 2021.
[20] Y. Wang, C. Chen, Z. Chen, and J. He, “Attribute-based user revocable
data integrity audit for Internet-of-Things devices in cloud storage,” Secur.
Commun. Netw., vol. 2020, pp. 8837456:1–8837456:10, 2020.
[21] C. Huang et al., “Toward security as a service: A trusted cloud service
architecture with policy customization,” J. Parallel Distrib. Comput.,
vol. 149, pp. 76–88, 2021.
[22] F. Luo, S. Al-Kuwari, W. Susilo, and D. H. Duong, “Attribute-based proxy
re-signature from standard lattices and its applications,” Comput. Stand.
Interfaces, vol. 75, 2021, Art. no. 103499.
[23] Q.
Tao,
Q.
Chen,
H.
Ding,
A.
Iftekhar,
X.
Huang,
and
X.
Cui, “Cross-department secures data sharing in food industry via
blockchain-cloud fusion scheme,” Secur. Commun. Netw., vol. 2021,
pp. 6668339:1–6668339:18, 2021.
[24] Y. Bao, W. Qiu, and X. Cheng, “Efﬁcient and ﬁne-grained signature for
IIoT with resistance to key exposure,” IEEE Internet Things J., vol. 8,
no. 11, pp. 9189–9205, Jun. 2021.
[25] Y. Chen, J. Li, C. Liu, J. Han, Y. Zhang, and P. Yi, “Efﬁcient attribute based
server-aided veriﬁcation signature,” IEEE Trans. Serv. Comput., vol. 15,
no. 6, pp. 3224–3232, Nov./Dec. 2022.
[26] J. Li, Y. Chen, J. Han, C. Liu, Y. Zhang, and H. Wang, “Decentralized
attribute-based server-aid signature in the Internet of Things,” IEEE Inter-
net Things J., vol. 9, no. 6, pp. 4573–4583, Mar. 2022.
[27] C. Lin, D. He, X. Huang, K.-K. R. Choo, and A. V. Vasilakos, “BSeIn:
A blockchain-based secure mutual authentication with ﬁne-grained ac-
cess control system for industry 4.0,” J. Netw. Comput. Appl., vol. 116,
pp. 42–52, 2018.
[28] P. Datta, T. Okamoto, and K. Takashima, “Efﬁcient attribute-based sig-
natures for unbounded arithmetic branching programs,” IEICE Trans.
Fundam. Electron. Commun. Comput. Sci., vol. 104-A, no. 1, pp. 25–57,
2021.
[29] S. S. Al-Riyami and K. G. Paterson, “Certiﬁcateless public key cryptog-
raphy,” in Proc. 9th Int. Conf. Theory Appl. Cryptol. Inf. Secur., 2003,
pp. 452–473.
[30] J. Cui, J. Zhang, H. Zhong, R. Shi, and Y. Xu, “An efﬁcient certiﬁcateless
aggregate signature without pairings for vehicular ad hoc networks,” Inf.
Sci., vol. 451/452, pp. 1–15, 2018.
[31] G. Thumbur, G. S. Rao, P. V. Reddy, N. B. Gayathri, D. V. R. K.
Reddy, and M. Padmavathamma, “Efﬁcient and secure certiﬁcateless
aggregate signature-based authentication scheme for vehicular ad hoc
networks,” IEEE Internet Things J., vol. 8, no. 3, pp. 1908–1920,
Feb. 2021.
[32] J. Liu, H. Cao, Q. Li, F. Cai, X. Du, and M. Guizani, “A large-scale con-
current data anonymous batch veriﬁcation scheme for mobile healthcare
crowd sensing,” IEEE Internet Things J., vol. 6, no. 2, pp. 1321–1330,
Apr. 2019.
[33] X. Zhou, D. He, M. K. Khan, W. Wu, and K.-K. R. Choo, “An efﬁcient
blockchain-based conditional privacy-preserving authentication protocol
for VANETs,” IEEE Trans. Veh. Technol., vol. 72, no. 1, pp. 81–92,
Jan. 2023.
[34] C. P. Schnorr, “Efﬁcient identiﬁcation and signatures for smart cards,” in
Proc. Conf. Theory Appl. Cryptol., 1990, pp. 239–252.
[35] Y. Seurin, “On the exact security of schnorr-type signatures in the random
oracle model,” in Proc. 31st Annu. Int. Conf. Theory Appl. Cryptographic
Techn., 2012, pp. 554–571.
[36] N. Koblitz, “A family of jacobians suitable for discrete log cryptosystems,”
in Proc. 8th Annu. Int. Cryptol. Conf., 1988, pp. 94–99.
[37] H. P. F. Swinnerton-Dyer and B. J. Birch, “Notes on elliptic curves. I,” J.
für die reine und angewandte Mathematik, vol. 1963, no. 212, pp. 7–25,
1963. [Online]. Available: http://eudml.org/doc/150565
[38] B. J. Birch and H. Swinnerton-Dyer, “Notes on elliptic curves. II,” J. Für
Die Rne Und Angewandte Mathematik, vol. 1963, no. 212, pp. 7–25, 1963.
[39] D. Pointcheval and J. Stern, “Security arguments for digital signatures and
blind signatures,” J. Cryptol., vol. 13, no. 3, pp. 361–396, 2000.
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:46 UTC from IEEE Xplore.  Restrictions apply. 



# Page 13

5112
IEEE TRANSACTIONS ON VEHICULAR TECHNOLOGY, VOL. 73, NO. 4, APRIL 2024
Mengjie Zhou received the B.Eng. degree in In-
ternet of Things engineering from Fujian Normal
University, Fuzhou, China, in 2021. She is currently
workingtowardtheM.S.degreeincybersecuritywith
the College of Computer and Cyber Security, Fujian
Normal University. Her research interests linclude
blockchain-based authentication technology and its
applications.
Xiaotong Zhou received the bachelor’s and master’s
degrees in information security from Wuhan Univer-
sity, Wuhan, China, in 2012 and 2019 respectively.
She is currently working toward the Ph.D. degree with
the School of Cyber Science and Engineering, Wuhan
University. Her research interests include the area of
security and privacy, including privacy protection and
blockchain security.
Wei wu received the Ph.D. degree from the School
of Computer Science and Software Engineering, Uni-
versity of Wollongong, Wollongong, NSW, Australia,
in 2011. She is currently a Professor with the Col-
lege of Mathematics and Informatics, Fujian Normal
University, Fuzhou, China. Her research interests in-
clude cryptography and information security. She has
published more than 20 research papers in refereed
international conferences and journals.
Debiao He (Member, IEEE) received the Ph.D. de-
gree in applied mathematics from the School of Math-
ematics and Statistics, Wuhan University, Wuhan,
China in 2009. He is currently a Professor with the
School of Cyber Science and Engineering, Wuhan
University. He has authored or coauthored more than
100 research papers in refereed international jour-
nals and conferences, such as IEEE TRANSACTIONS
ON DEPENDABLE AND SECURE COMPUTING, IEEE
TRANSACTIONS ON INFORMATION FORENSICS AND
SECURITY, and Usenix Security Symposium. His re-
search interests include cryptography and information security, in particular,
cryptographic protocols. He was the recipient of the 2018 IEEE Sysems Journal
Best Paper Award and the 2019 IET Information Security Best Paper Award.
His work has been cited more than 10000 times at Google Scholar. He is in
the Editorial Board of several international journals, such as ACM Distributed
Ledger Technologies: Research & Practice, Frontiers of Computer Science, and
IEEE TRANSACTIONS ON COMPUTERS.
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:46 UTC from IEEE Xplore.  Restrictions apply. 
