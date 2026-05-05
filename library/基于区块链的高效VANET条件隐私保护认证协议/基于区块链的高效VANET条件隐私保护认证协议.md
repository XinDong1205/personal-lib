

# Page 1

IEEE TRANSACTIONS ON VEHICULAR TECHNOLOGY, VOL. 72, NO. 1, JANUARY 2023
81
An Efﬁcient Blockchain-Based Conditional
Privacy-Preserving Authentication
Protocol for VANETs
Xiaotong Zhou, Debiao He
, Member, IEEE, Muhammad Khurram Khan
, Senior Member, IEEE, Wei Wu
,
and Kim-Kwang Raymond Choo
, Senior Member, IEEE
Abstract—Vehicular Ad-hoc Networks (VANETs) have potential
applications in improving the efﬁciency and safety for intelligent
transportation systems. The openness of VANETs, however, also
introduces privacy and security implications. Despite a number
of conditional privacy-preserving authentication (CPPA) schemes
with anonymity and conditional traceability have been designed for
VANETs, a majority of these schemes cannot be directly applied to
a real-world setting (e.g., due to the need for a certiﬁcate manager
for issuing keys in PKI-based solutions, or the inherent key escrow
problem in ID-based solutions). There have also been attempts to
designblockchain-basedCPPAschemes,buttheseschemesmaynot
support key revocation or are inefﬁcient (e.g., due to on-chain op-
erations). This paper proposes an efﬁcient blockchain-based CPPA
(EBCPPA) scheme, which is designed to mitigate the above limi-
tations. Our proposal consists of two key building blocks, namely:
signature of knowledge and smart contract. To evaluate the feasibil-
ity, we present the security and performance analyses of EBCPPA.
Speciﬁcally, the performance evaluations show that EBCPPA is
Manuscriptreceived9May2022;revised28August2022;accepted2Septem-
ber 2022. Date of publication 6 September 2022; date of current version 16
January 2023. The work of Muhammad Khurram Khan is supported by the King
Saud University, Riyadh, Saudi Arabia under Project RSP-2022/12. The work
of Kim-Kwang Raymond Choo was supported only by the Cloud Technology
Endowed Professorship. This work was supported in part by the National Key
Research and Development Program of China under Grant 2021YFA1000600,
in part by the National Natural Science Foundation of China under Grants
U21A20466, 61972294, and 61932016, in part by the Special Project on Science
and Technology Program of Hubei Provience under Grant 2020AEA013, in part
by the Natural Science Foundation of Hubei Province under Grant 2020CFA052,
and in part by the Wuhan Municipal Science and Technology Project under
Grant 2020010601012187. The review of this article was coordinated by Prof.
A. Nayak. (Corresponding author: Debiao He.)
Xiaotong Zhou is with the Key Laboratory of Aerospace Information Security
and Trusted Computing Ministry of Education, School of Cyber Science and
Engineering, Wuhan University, Wuhan 430072, China, and also with the
Guangxi Key Laboratory of Trusted Software, Guilin University of Electronic
Technology, Guilin 541004, China (e-mail: xtzhou163@163.com).
Debiao He is with the School of Cyber Science and Engineering, Wuhan
University, Wuhan 430072, China, also with the Shandong Provincial Key
Laboratory of Computer Networks, Qilu University of Technology (Shandong
Academy of Sciences), Jinan 250014, China, and also with the Shanghai Key
Laboratory of Privacy-Preserving Computation, MatrixElements Technologies,
Shanghai 201204, China (e-mail: hedebiao@163.com).
Muhammad Khurram Khan is with the Center of Excellence in Information
Assurance, College of Computer & Information Sciences, King Saud University,
Riyadh 11564, Saudi Arabia (e-mail: mkhurram@ksu.edu.sa).
Wei Wu is with the School of Mathematics and Statistics, Fujian Normal
University, Fuzhou 350117, China (e-mail: weiwu81@gmail.com).
Kim-Kwang Raymond Choo is with the Department of Information Systems
and Cyber Security and the Department of Electrical and Computer Engineering,
University of Texas at San Antonio, San Antonio, TX 78249 USA (e-mail:
raymond.choo@fulbrightmail.org).
Digital Object Identiﬁer 10.1109/TVT.2022.3204582
moreefﬁcientthanotherexistingstate-of-the-artsolutions,interms
of signing (improving at least 49.71%), the veriﬁcation (improving
at least 32.84%) and bandwidth requirement (reducing at least
27.59%).
Index
Terms—Blockchain,
VANETs,
Conditional
privacy-
preserving, Signature of knowledge, Smart contract.
I. INTRODUCTION
A
S FIFTH-generation (5G) communication and Internet of
Things (IoT) become commonplace, the role of vehicular
ad-hoc network (VANET) in intelligent transportation systems
will also become more pronounced. For example, due to its
highly mobile and rapidly changing network topology, VANETs
allow vehicles to exchange real-time trafﬁc data with nearby
vehicles, roadside units (RSUs) as well as other supporting
infrastructures. Such information sharing can enhance trafﬁc
efﬁciency and minimize the risk of trafﬁc incidents. A typical
VANET contains six entities, namely: Trafﬁc control center
(TCC), Key generation center (KGC), Internet, RSU, Vehi-
cle and On-broad unit (OBU) – see Fig. 1. In the simpliﬁed
ﬁgure, the data ﬂow consists of vehicle-to-vehicle (V2V) and
the vehicle-to-infrastructure (V2I) communications. In order
to achieve short-range wireless communication, an OBU is
installed in each vehicle to share data with other entities (e.g.,
vehicles or RSUs). The TCC collects these trafﬁc-related mes-
sages via RSUs and provides real-time trafﬁc services, such as
re-routing, monitoring and managing trafﬁc lights [1].
Security and privacy are the key issues in practical applica-
tions of VANETs. Due to the openness and mobility features,
VANETs will suffer from message interception, sniff, modiﬁ-
cation, replay, or a broad range of other attacks (e.g., advanced
persistent threats (APTs)). For example, without authentication
and privacy protection, an attacker can easily obtain private
information (e.g., location, historical route, or license plate
information) or inject fabricated trafﬁc information (e.g., status).
In extreme case, these malicious behaviors may result in fatal
trafﬁc accidents. Thus, the authenticity, anonymity and integrity
of transmitted messages should be guaranteed in VANETs.
While message anonymous authentication [2], [3] is a poten-
tial solution, absolute anonymity may lead to the spreading of
maliciouslycraftedmessages(e.g.,informationandcommands).
Thus the lack of tracing is another hindrance to the broader
0018-9545 © 2022 IEEE. Personal use is permitted, but republication/redistribution requires IEEE permission.
See https://www.ieee.org/publications/rights/index.html for more information.
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:59 UTC from IEEE Xplore.  Restrictions apply. 



# Page 2

82
IEEE TRANSACTIONS ON VEHICULAR TECHNOLOGY, VOL. 72, NO. 1, JANUARY 2023
Fig. 1.
A typical structure of VANET.
deployment of VANETs. Not surprisingly, a number of condi-
tional privacy-preserving authentication (CPPA) schemes have
been proposed to alleviate the above problem. These schemes
not only ensure the identity authentication and content integrity,
but also achieve conditional privacy protection. That is, during
information sharing, the identity of the vehicle is not revealed to
any RSUs and vehicles, but it is traceable for a trusted third-party
(referred to as the manager in the rest of this paper) if the need
arises (e.g., in an investigation or the presentation of a court
order).
Existing CPPA protocols for VAENTs can be broadly clas-
siﬁed into public key infrastructure (PKI)-based (e.g., [4], [5],
[6]) and identity (ID)-based schemes (e.g., [7], [8], [9]). The
former approaches can be deployed and maintained easily, but
generally incur high storage costs (e.g., the need to store poten-
tially number of temporary certiﬁcates in the OBUs to guarantee
anonymity, particularly as the system scales up) and complex
certiﬁcate management issues. Although ID-based solutions can
mitigate these issues associated with PKI-based solutions and
also improve efﬁciency, they still suffer from key escrow. That
is, vehicles’ secret keys will be leaked once the key generation
center (KGC) is compromised. In addition, we observe that
PKI-based and ID-based schemes either rely on a centralized
server or do not scale for large number of participants.
In recent years, there have been efforts to integrate blockchain
in the construction of CPPA protocols. Blockchain is a dis-
tributed ledger and composed by different technologies, mainly
cryptography, distributed system and database. The privacy-
preserving application can utilize the features of blockchain,
such as veriﬁability, immutability and pseudo-anonymity, to
achieveatrade-offinsecurity,privacyandefﬁciency.Inaddition,
thesmartcontractdeployedinblockchaincanalsobedesignedto
support autonomous execution with programmed logic. Hence,
it is possible to employ blockchain to automatically authenticate
message, monitor behavior and trace malicious users [10], [11].
Although existing blockchain-based CPPA (BCPPA) proto-
cols are striving to achieve both anonymity and conditional
traceability, they are generally inefﬁcient in a VANET setting.
That is, these BCPPA schemes for VANETs involve frequent
interactions
and
incur
high
computation
cost.
Hence,
Lin et al. [12] and Feng et al. [13] proposed two BCPPA schemes
with anonymity and traceability, respectively, but both schemes
are still inefﬁcient in message veriﬁcation and identity tracking.
Therefore, we are motivated to design a more efﬁcient BCPPA
scheme with enhanced security for VANETs.
Speciﬁcally, to achieve improved authentication efﬁciency
and limit tracing privilege in VANETs, we introduce an efﬁcient
blockchain-based conditional privacy-preserving authentication
protocol (EBCPPA). A summary of our approach in this paper
is as detailed:
r We ﬁrst design a new structure of the anonymous public
key, which we use as a building block for our proposed
signature of knowledge (SoK) scheme to achieve authen-
tication. Due to the traceability of anonymous public keys,
our EBCPPA ensures that participants authenticate each
other anonymously and only the trusted third party (i.e.,
TA) can extract the real identity. In addition, no expensive
secure channel is needed to distribute secret keys in our
solution.
r Then, we implement EBCPPA based on the Ethereum test
blockchain and VANETs simulator (i.e., VanetMobSim
and NS-2), as well as showing the advantages of EBCPPA
in comparison to two other recent related schemes, for
message signing, veriﬁcation and identity tracking. Ad-
ditionally, we perform a security analysis to illustrate that
our proposal meets the security and privacy requirements
in VANETs.
The remainder of this paper is organized as follows. Section II
brieﬂy introduces other existing CPPA schemes designed to op-
erate in a VANET environment, prior to explaining our proposal
in Section III. Section IV introduces our system building blocks,
including SoK protocol and smart contract. We present our
EBCPPA scheme in Section V, followed by its security analysis
and performance evaluation in Sections VI and VII, respectively.
This paper is summarized in the ﬁnal section.
II. RELATED WORK
To achieve authentication, anonymity and traceability for
VANETs, a large number of CPPA protocols have been proposed
by the research community. These schemes can be broadly clas-
siﬁed into PKI-based, ID-based and blockchain-based schemes.
In 2007, Raya et al. [14] used the modiﬁed PKI infrastructure
to satisfy secure authentication requirements for VAENTs. Their
scheme used a anonymous certiﬁcate (AC) to protect privacy.
However, there is an unsolved issue that: numerous certiﬁcates
had to be preloaded and exchanged among RSUs and vehicles.
To deal with the above issue, Lu et al. [15] introduced an RSU-
based CPPA protocol with temporary AC. In their proposal,
the vehicle’s OBU could obtain temporary AC frequently from
nearby RSU. While their scheme provides conditional privacy
protection, thedatasharingprocedurerequirestheCAtomanage
a large number of certiﬁcates. After that, other PKI-based CPPA
literature were also proposed [8], [16], [17], but most of them
suffered from similar weaknesses as mentioned above.
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:59 UTC from IEEE Xplore.  Restrictions apply. 



# Page 3

ZHOU et al.: EFFICIENT BLOCKCHAIN-BASED CONDITIONAL PRIVACY-PRESERVING AUTHENTICATION PROTOCOL FOR VANETs
83
As another orthogonal line of work, the ID-based CPPA is
proposed for ﬁguring out certiﬁcate management and exchange
problems. Zhang et al. [18] designed an ID-based CPPA scheme,
which adopted an aggregate signature function to achieve the
low veriﬁcation cost. However, Horng et al. [19] identiﬁed
that Zhang et al.’s scheme [18] cannot withstand impersonation
attack.
Subsequently, He et al. [7] and Li et al. [20] designed two se-
cure ID-based CPPA schemes, which can guarantee the validity
of messages and the conditional privacy of senders simultane-
ously. While ID-based solutions have advantages in utilization
andmanagement comparedwithPKI-basedschemes, theysuffer
from the key escrow problem and generally require a secure
channel.
Due to the features of decentralization, immutability and
anonymity [21], blockchain becomes a potential technol-
ogy to satisfy the functionality and security requirements in
VANETs [22], [23], [24], [25]. In 2017, Rowan et al. [26]
proposed a blockchain-based PKI framework for V2V secure
communication. However, their scheme is vulnerable to mali-
cious attacks. Then, Lu et al. [27] leveraged blockchain to design
a privacy-preserving authentication scheme for VANETs. Their
scheme provided efﬁcient certiﬁcate revocation, but the vehicles
need to frequently interact with a certiﬁcate authority (CA) to
obtain anonymous certiﬁcates.
In 2020, Gabay et al. [28] formulated and constructed a
blockchain-based anonymous authentication scheme, which in-
tegrated Pederson commitment and the token-based mechanism.
Although their scheme provided a strong privacy strategy, it
ignored the traceability requirement of trusted authority. Taking
conditional privacy protection into account, Fen et al. [13]
integrated blockchain with attribute-based encryption, but the
efﬁciency of authentication and traceability is still far from
application.
Recently, Lin et al. [12] introduced a key derivation function
to design the BCPPA system, which cuts down the number of
secret keys stored in vehicles. However, Lin et al. [12]’s scheme
exists a linear relation between the searching amount of public
keys and the cost of tracing. He et at. [29] proposed a hier-
archical blockchain-assisted CPPA scheme which can achieve
unlinkability, but it is inefﬁcient. Thus, we are motivated to
construct an efﬁcient BCPPA scheme in VANETs especially
further improving the veriﬁcation and tracing efﬁciency.
III. PRELIMINARY KNOWLEDGE
In this section, we ﬁrst list the relevant notations. Then, we
give the system architecture of VANETs and basic deﬁnitions of
cryptographic primitives, including ElGamal encryption, NIZK
argument, signatures of knowledge and security requirements.
A. Notations
For convenience, the notations involved in this paper are
shown in Table I.
TABLE I
INVOLVED NOTATIONS
Fig. 2.
System architecture of EBCPPA.
B. System Architecture
This section introduces the VANETs system architecture used
in this paper, involving Trusted Authority (TA), RSU, Vehicle
and Blockchain (see Fig. 2). In our system, each vehicle gener-
ates key pair independently by OBU, and thus we do not need
KGC to maintain certiﬁcate or generate key pair. In addition,
TA, whose capacity is the same as TCC, is the trusted system
manager and auditor.
Our proposed system is established with six methods of
communication, namely M2V, M2B, M2R, V2V, V2R and B2R,
where M2V is for vehicles to register their identities with the TA
manager, M2B is for TA to submit anonymous public key and
other information into blockchain, M2R is for TA to communi-
cate with RSUs, V2V is for vehicles to wirelessly exchange mes-
sages among them, V2R is the wireless communication between
vehicles and RSUs to share trafﬁc-related data and blockchain’s
transactions, and B2R is for RSUs to query information from
the blockchain.
r TA: TA is the intelligent transport service provider, also the
manager of blockchain’s smart contract. This entity is with
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:59 UTC from IEEE Xplore.  Restrictions apply. 



# Page 4

84
IEEE TRANSACTIONS ON VEHICULAR TECHNOLOGY, VOL. 72, NO. 1, JANUARY 2023
enough memory and computation capability, and trusted
to all participants in VANETs. TA accounts for generating
anonymous public keys for all users and uploading key ma-
terials via the smart contract. Moreover, It can trace users’
real identities and revoke user privilege (if necessary).
r Vehicle: The vehicle is equipped with various sensors and
can wirelessly broadcast collected data to other vehicles
and RSUs. The vehicle has limited storage space and
computationability. Besides, itusesOBU(withthetamper-
proof property) to store private keys and other sensitive
information.
r RSU: This entity, located on the roadside, acts as a gate-
way between vehicles and service infrastructures (e.g.,
TA, Blockchain). This wireless communication unit can
achieve connectivity to surrounding vehicles and verify the
validity of received messages.
r Blockchain: The Blockchain provides immutable data
storage and automated smart contract. This network used
in our scheme is responsible for storing and managing
anonymous public keys in the smart contract.
C. Blockchain
As a decentralized system, blockchain is characterized by its
decentralization, transparency, automation and tamper-resistant.
Distributed nodes jointly maintain a ledger via a consensus
mechanism and the the result can be viewed by all partici-
pants. There are two main types of blockchain, including the
permissionless blockchain (e.g., Bitcoin and Ethereum) and the
permissioned blockchain (e.g., Hyperledger). The former type
allows anyone to maintain the blockchain, while the latter one
only allows the authenticated nodes to take part in consensus.
In our work, we deploy transactions and smart contract of our
scheme in Ethereum.
r Transaction: The transaction mainly consists of the ad-
dresses of sender/receiver, the transferred value and a
signature. The block stores a number of transactions in
the Merkle tree data structure. Each block calculates the
cryptographic hash of the prior block in the blockchain,
and then links the blocks together. This structure achieves
the tamper-proof of on-chain data. To establish reliability
and trust in blockchain, consensus mechanism (e.g., PBFT)
achieves that the participators reach necessary agreement
about the present state.
r Smart Contract: Smart contracts are written in a Turing
complete programming language (e.g., Solidity, Vyper,
DAML) and stored on the blockchain. They autonomously
execute in a digital form and can achieve computerized
transaction protocols from simple to more complex func-
tions. Each smart contract with a unique public address
can be triggered internally and externally. In our scheme,
the smart contract is mainly responsible for public key
information storing, viewing, and deleting according to the
caller’s permissions.
D. ElGamal Encryption
Our proposal uses the asymmetric ElGamal encryption
scheme [30] which can be proven secure in the IND-CPA
model. This scheme involves three algorithms, including Key
generation (PKG), Encryption (Enc) and Decryption (Dec).
r (sk, PK) ←PKG(λ): This algorithm chooses a group
G with prime order q and a generator g. Then, selecting a
number sk ∈Z∗
q randomly as the private key, and calcu-
lating PK = gsk as the public key.
r (C1, C2) ←Enc(PK, m): This algorithm selects a ran-
dom number u ∈Z∗
q and calculates C1 = gu, C2 = m +
PKu. Finally, it outputs (C1, C2) as ciphertext.
r m ←Dec(sk, C1, C2): The message will be decrypted by
computing m = C2 −Csk
1 .
E. NIZK Argument
A non-interactive zero-knowledge (NIZK) argument [31] in-
cludes a prover, a veriﬁer and a message transmitted between
them. The veriﬁer can convince the prover of knowing certain
values without obtaining any other useful information.
Suppose R = {x, w} is a computable relation, where x is a
public instance and w is a witness. Here, the prover calculates a
veriﬁable proof π using x and w. When receiving a single proof
π from the prover, the veriﬁer can check it upon x.
There involved three algorithms (G, P, V ) in NIZK argument:
Common reference string (CRS) generation Gcrs(λ), Proof
P(crs, x, w)andVerifyV(crs, x, π).WithrelationR,aprotocol
is said to be an NIZK argument if it satisﬁes the following
properties:
1) Completeness: For ∀crs ←Gcrs(λ) and ∀(x, w) ←R,
where crs is a common reference string, we have
Pr
 crs ←Gcrs(λ), (x, π) ←A(crs) :
V(crs, x, π) = 1

= 1 −negl(λ).
2) Soundness: For all PPT adversaries A, we have
Pr
 crs ←Gcrs(λ), (x, π) ←A(crs) :
x /∈L ∧V(crs, x, π) = 1

= negl(λ).
3) Zero-Knowledge: There are two PPT simulators S =
(S1, S2) and a trapdoor information td such that.
Pr
⎡
⎣
crs ←Gcrs(λ)
(x, w) ←A1(crs)
π ←P(crs, x, w)
:
(x, w) ∈R∧
A2(crs, x, π) = 1
⎤
⎦
−Pr
⎡
⎣
(crs, td) ←S1(λ)
(x, w) ←A1(crs)
π ←S2(crs, x, td)
:
(x, w) ∈R∧
A2(crs, x, π) = 1
⎤
⎦
= negl(λ).
F. Signatures of Knowledge
Signatures of knowledge (SoK) [32] is a non-interactive proof
system that allows one entity to convince other parties of know-
ing certain values without revealing them. Also, the SoK owns
thefunctionalityofadigitalsignature.Therearethreealgorithms
in the SoK, including Setup, GenProof and VerfProof.
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:59 UTC from IEEE Xplore.  Restrictions apply. 



# Page 5

ZHOU et al.: EFFICIENT BLOCKCHAIN-BASED CONDITIONAL PRIVACY-PRESERVING AUTHENTICATION PROTOCOL FOR VANETs
85
r SP ←Setup(1λ): This algorithm generates system pa-
rameters with λ as input, and returns system parameters
SP.
r π ←GenProof(SP, m, x, w): This algorithm generates
SoK proof with system parameters SP, message m and
hard relation (x, w) ∈R (x is the public statement, w is
the secret witness) as inputs, and returns a proof π.
r {0, 1} ←VerfProof(SP, m, x, π): This veriﬁcation al-
gorithm takes system parameters SP, message m, state-
ment x and SoK proof π as inputs, and returns 0 if π is
invalid or 1 otherwise.
G. Security Requirements
Considering a variety of attacks in the real world, a practi-
cal BCPPA scheme for VANETs should satisfy the following
essential security requirements [7], [33].
1) Message authentication: The vehicle and the RSU could
validate received messages from a registered communica-
tor, including authenticity, integrity and freshness. More-
over, any tampering of the message will be detected.
2) Identity anonymity: During authentication, the scheme
should guarantee the user’s identity privacy, such that no
malicious adversary can extract the real identity of the
message sender.
3) Non-repudiation: No message signer can deny the au-
thenticity of signature on the system. This can prevent
attackers from denying or covering up illegal behaviors.
4) Conditional traceability: Conditional traceability stipu-
lates that only the trusted third party can trace the identity
of the malicious or misbehavior user. Other entities do not
have the qualiﬁcation to identify participants. Therefore,
the authority can take necessary regulatory actions (e.g.,
law enforcement) on the malicious users.
5) Un-linkability: To avoid attackers to trace the vehicle’s
historical path, messages sent by the same vehicle are
unable to be linked.
6) Resistant
against
other
common
attacks:
The
blockchain-based
CPPA
scheme
should
also
resist
various common attacks in VANETs (e.g., replay attack,
modiﬁcation attack, impersonation attack).
IV. PROPOSED SYSTEM BUILDING BLOCK
In this section, we design two types of system building blocks,
including the SoK scheme and the smart contract. They are the
essential parts of our proposed system.
A. Designed Signature of Knowledge
We construct a new signature of knowledge (SoK) scheme for
vehicles and RSUs to achieve authentication in communications.
In our EBCPPA, each vehicle owns private key (ski), public
key (PKi = skiP) and anonymous public keys (C1,j
i
= ujP,
C2,j
i
= ujPKi + PKi, where uj ∈Z∗
q). On basis of our SoK
scheme, the vehicle can prove to a veriﬁer (e.g., RSU or vehicle)
that it owns the private key without revealing it. In addition, our
SoK scheme also serves as a signature to ensure the authentica-
tion and legitimacy of transmitted messages.
We deﬁne the above SoK scheme as SoK{ski : C2,j
i
=
skiC1,j
i
+ skiP}(msgi, ti), where ski is the private key,
{C1,j
i , C2,j
i
} is the anonymous public key, msgi is the message
to be signed and ti is the timestamp. Our SoK scheme consists
of three algorithms: GenProof, VerifyProof and BVerifyProof.
The brief description is shown below.
r (msgi, σi, ti) ←GenProof(ski, xi, msgi, ti).
This
proof generation algorithm takes a witness ski, public
information xi = (C1,j
i , C2,j
i
), a message msgi and
a timestamp ti as an input. It ﬁrst selects ri ∈Z∗
q
randomly
and
calculates
Ri = riC1,j
i
+ riP, ei =
H(P, C1,j
i , C2,j
i
, Ri, msgi, ti).
Then,
it
computes
zi = ri −eiski (mod q). Finally, it sets σi = {zi, Ri}
and outputs message/signature pair {msgi, σi, ti}.
r {0, 1} ←VerifyProof(xi, msgi, σi, ti). This proof ver-
iﬁcation
algorithm
takes
public
information
xi =
(C1,j
i , C2,j
i
), a signature σi, a message msgi and a times-
tamp ti as an input. It ﬁrst parses σi = {zi, Ri}. Then,
it compute ei = H(P, C1,j
i , C2,j
i
, Ri, msgi, ti) and checks
whether the equation Ri = zi(C1,j
i
+ P) + eiC2,j
i
holds.
If it holds, the algorithm outputs 1 to represent the validity
of the message/signature pair, and 0 otherwise.
r {0, 1} ←BVerifyProof({xi, msgi, σi, ti}n
i=1).
The
batch
veriﬁcation
algorithm
takes
multiple
message/signature pairs {xi, msgi, σi, ti}n
i=1 as an input.
It ﬁrst parses xi = (C1,j
i , C2,j
i
) and σi = {zi, Ri}, where
i ∈{1, 2, . . ., n}, respectively. Then, it selects a vector
v = v1, v2, . . ., vn, where vj ∈[1, 2t], j ∈{1, 2, . . ., n}
and t is a small integer. After that, it calculates
ei = H(P, C1,j
i , C2,j
i
, Ri, msgi, ti). Finally, it checks
whether n
i=1 viRi = n
i=1 viziC1,j
i
+ (n
i=1 vizi)P +
n
i=1 vieiC2,j
i
holds or not. If it holds, the algorithm
outputs 1 to represent the validity of message/signature
pairs, and 0 otherwise.
We utilize the small exponent test technology to achieve
the non-repudiation of signatures in BVerifyProof. A vector
v, consisting of small random integers vi, is used to quickly
detect any modiﬁcation of a batch of message/signature pairs. If
there is no randomness, an adversary can easily generate invalid
message/signature pairs but acceptable by the veriﬁer.
B. Design of Smart Contract
We design a smart contract (see Algorithm 1) to achieve
anonymous public key management. It can be invoked by TA
(the smart contract’s manager), message senders and veriﬁers to
execute corresponding operations in the smart contract. During
the vehicle registration, the vehicle transmits its real identity
and public key to TA (the smart contract manager). Only TA can
generate and submit the corresponding anonymous public key
of the vehicle into the smart contract. During authentication, the
veriﬁer can retrieve target vehicle’s anonymous public key to
check the validity of messages. In order to avoid fake or faulty
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:59 UTC from IEEE Xplore.  Restrictions apply. 



# Page 6

86
IEEE TRANSACTIONS ON VEHICULAR TECHNOLOGY, VOL. 72, NO. 1, JANUARY 2023
Algorithm 1: Smart Contract on PKList.
Require: Function name, invoked parameters
Ensure: Setting up functions:
address manager; % Initialize the issuer (TA) as the
manager
function APKList()
% Constructor, automatically invokes when this smart
contract is deployed.
manager = msg.sender; % Deﬁne the deployer as
the TA
struct APK
{
C1; % uint256[2], ﬁst part of an APK
C2; % uint256[2], second part of an APK
C3; % uint256[2], third part of an APK
}
mapping(uint256 ⇒APK) apk % A mapping of APK
function Submit(unit256 cid, unit256[2] C1,
unit256[2] C2, unit256[2] C3) public returns (address
addr)
% Invoked by TA to add a new anonymous public key.
require(msg.sender == manager); % Only TA can
successfully execute this algorithm
apk[cid].C1 = C1;
apk[cid].C2 = C2;
apk[cid].C3 = C3;
return msg.sender;
function Get(cid) view returns (unit256[2]
C1,unit256[2] C2)
% Invoked by any to retrieve the anonymous public key.
return apk[cid].C1, apk[cid].C2;
function Trace(cid) view returns (unit256[2]
C1,unit256[2] C3)
require(msg.sender == manager); % Only TA can
successfully execute this function
return apk[cid].C1, apk[cid].C3;
function Revoke(unit256 cid) public returns (bool)
% Invoked by the manager to revoke an APK.
require(msg.sender == manager); % Only TA can
successfully execute the revocation
apk[cid].C1 = NULL;
apk[cid].C2 = NULL;
apk[cid].C3 = NULL;
return 1;
return 0;
message spreading, TA can trace real identity of malicious users
and revoke their privileges.
V. PROPOSED ARCHITECTURE
We will present the construction of our proposed scheme
based on our designed system building block. The scheme
mainly includes six phases: System Setup, Smart Contract
Deployment, Registration, Message Signing, Message Veri-
ﬁcation and Track and Revocation.
A. System Setup
TA initializes the smart contract as the manager. Then, vehicle
can interact with TA to register and generate anonymous public
keys. TA and the vehicle carried out the following steps.
1) Basic initialization: TA selects a cyclic additive group
(G, q, P) and chooses a one-way hash function H :
{0, 1}∗→{0, 1}∗. Then, TA generates a random number
msk ∈Z∗
q as its private key and calculates the public key
MPK = mskP. Finally, TA publishes system parame-
ters {G, q, P, H, MPK}.
2) Blockchain initialization: TA maintains a conﬁguration
ﬁle to establish a blockchain. For simplicity, TA can also
directly join an existing blockchain system and uses its
capacity.
B. Smart Contract Deployment
In this phase, TA deploys the smart contract PKList (see
Algorithm 1) into the blockchain. The identity of this smart
contract scid is published for all participants to invoke it. By
utilizing smart contract’s functions, the system can provide
anonymous public key management for vehicles and RSUs. In
addition, it supports key revocation when TA detects malicious
users or users unsubscribe proactively.
C. Registration
Before participating in data interaction, every vehicle and
RSU need to register real identity in the controlled way. Detailed
steps of registration are shown as follows.
1) The vehicle Vi selects a random number ski ∈Z∗
q as its
private key and calculates its corresponding public key
PKi = skiP. Then, Vi sends its real identity RIDi and
the public key PKi to TA via a secure channel.
2) On basis of the ElGamal encryption, TA uses PKi
and MPK to encrypt Vi’s public key, respectively.
That is, TA selects a random number uj ∈Z∗
q to com-
pute C1,j
i
= ujP, C2,j
i
= ujPKi + PKi. TA computes
C3,j
i
= ujMPK + PKi. Then, TA computes the index
cidj
i = H(C1,j
i ||C2,j
i
).
3) TA keeps the vehicle’s real identity, the public key and the
key index secretly. Then, it sends cidj
i to Vi.
4) Finally,
TA
invokes
Algorithm
1
(i.e.,
Submit(cidj
i, C1,j
i , C2,j
i
, C3,j
i )) to issue the index,
anonymous public key (C1,j
i , C2,j
i
) and traceability
information (C3,j
i ) into the smart contract scid.
In our scheme, a batch of the tuple (cidj
i, C1,j
i , C2,j
i
) should be
generatedandsubmittedbyTA.ThevehicleVi canuseagroupof
the tuple to produce message/signature pair in the authentication
period. If Vi runs out of all the anonymous public keys, it will
request TA to replenish the new tuple.
D. Message Signing
The vehicle generates message/signature pairs in this phase.
Assuming that the vehicle (e.g., Vk) wants to share the informa-
tion to surrounding entities, it executes the following steps:
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:59 UTC from IEEE Xplore.  Restrictions apply. 



# Page 7

ZHOU et al.: EFFICIENT BLOCKCHAIN-BASED CONDITIONAL PRIVACY-PRESERVING AUTHENTICATION PROTOCOL FOR VANETs
87
1) Vk
triggers
the
smart
contract
sid
and
invokes
Get(cidj
k) algorithm to obtain the anonymous public key
(C1,j
k , C2,j
k ).
2) Vk
invokes
the
proof
generation
algorithm
of
SoK
(in
section
IV-A)
to
compute
the
signature
of
the
message
msgk,
that
is,
(msgk, σk, tk) ←
GenProof(skk, xk, msgk, tk),
where
xk =
(C1,j
k , C2,j
k ), tk is a timestamp.
3) Finally, the message/signature pair (cidj
k, msgk, σk, tk)
will be sent to nearby vehicles or RSUs.
E. Message Veriﬁcation
In this phase, the veriﬁer (a vehicle or an RSU) can check
the validity of the received message. If the signature is valid,
the veriﬁer accepts the message and performs further actions
(e.g., changing route). The veriﬁcation process of the message
(cidj
k, msgk, σk, tk) is executed below.
1) The veriﬁer checks the freshness of the timestamp tk. If it
is not fresh, the veriﬁer rejects the message.
2) The veriﬁer triggers the smart contract sid via invoking
Get(cidj
k) to retrieve (C1,j
k , C2,j
k ).
3) The veriﬁer invokes the single proof veriﬁcation algorithm
of SoK (in section IV-A) VerifyProof to check the
validity of (xk, msgk, σk, tk), where xk = (C1,j
k , C2,j
k ).
If it is invalid, the veriﬁer rejects the message; otherwise,
it accepts the trafﬁc-related information from Vk.
In addition, our proposed scheme can also achieve batch proof
veriﬁcation of multiple messages to improve efﬁciency. When
receiving n message/signature pairs (msgi, σi, ti, cidj
i)n
i=1 from
different vehicles, the veriﬁer ﬁrst triggers Get(cidj
i) from scid
to obtain (C1,j
k , C2,j
k )n
i=1. Then, it invokes the batch veriﬁcation
algorithm BVerifyProof({xi, msgi, σi, ti}n
i=1) to check the va-
lidity of messages. If they are valid, the veriﬁer accepts these
message; otherwise, the veriﬁer rejects them.
F. Track and Revocation
In our scheme, only TA can trace the malicious attacker’s real
identity (i.e., long-term public key). TA will proceed with the
following steps.
1) TA ﬁrst triggers Trace(cidj
k) to obtain traceable infor-
mation C1,j
k
and C3,j
k .
2) Usingitsprivatekey,TAcandecrypt Vk’slong-termpublic
key PKk = C3,j
k
−mskC1,j
k .
3) TA can retrieve Vk’s identity related to its public key.
Moreover, the anonymous public key can be revoked by TA
in the following two cases.
1) Upon detecting the malicious behavior, TA ﬁrst traces the
real identity of vehicle (via Trace algorithm). Then, TA
retrieves the corresponding index cidj and revokes them
via triggering Revoke(cidj
k)
2) If the vehicle Vk decides to unsubscribe and leave the
system, it can send a revocation request with a signature
to TA. Then, TA checks the signature. If it is valid, TA
retrieves the corresponding cidj
k and revokes them (via
Revoke algorithm).
VI. SECURITY ANALYSIS
In this section, we demonstrate that our proposed scheme can
meet the aforementioned security requirements. Specially, our
EBCPPA mainly uses the SoK scheme to prevent any unautho-
rized trafﬁc-related data exchange. Therefore, we ﬁrst prove that
our proposed SoK scheme can satisfy the security properties of
the NIZK argument, including completeness, soundness, and
zero-knowledge. After that, we analyze other security feathers
of EBCPPA.
Theorem 1: If the ECDLP assumption holds, the proposed
SoKscheme(seesectionIV-A)isaNIZKaugmentintherandom
oracle model.
Proof: We proof the security of the proposed SoK scheme
in terms of Completeness, Soundness and Zero-knowledge.
Completeness: The completeness follows by single message
veriﬁcation and multiple message veriﬁcation. The ﬁrst case
is between GenProof and VerifyProof referring a single mes-
sage/signature pair generation and veriﬁcation. The second case
is that a batch of message/signature pairs can be checked by
BVerifyProof simultaneously. The completeness property of the
scheme can be proven as follows.
For
a
valid
single
message/signature
pair
	
cidj
i, C1,j
i , C2,j
i
, msgi, σi, ti

where
σi = {zi, Ri},
we
ﬁrst calculate ei = H
	
P, C1,j
i , C2,j
i
, Ri, msgi, ti

and then
the following equation always holds.
Ri = zi
	
C1,j
i
+ P

+ eiC2,j
i
= (ri −eiski)
	
C1,j
i
+ P

+ ei(ujPKi + PKi)
= riC1,j
i
−eiujskiP + riP −eiskiP
+ eiujskiP + eiskiP
= riC1,j
i
+ riP
= Ri
Towards
multiple
message/signature
pairs
	
msgi, C1,j
i , C2,j
i
, σi, ti, cidj
i

n
i=1, we compute ei, where
i ∈[1, . . ., n], respectively. With results of ei, the following
equation always holds:
n

i=1
viRi =
n

i=1
viziC1,j
i
+
 n

i=1
vizi

P +
n

i=1
vieiC2,j
i
=
n

i=1
viriC1,j
i
−
 n

i=1
vieiuiski

P
+
 n

i=1
viri

P −
 n

i=1
vieiski

P
+
 n

i=1
vieiuiski

P +
 n

i=1
vieiski

P
=
n

i=1
vi
	
riC1,j
i
+ riP

Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:59 UTC from IEEE Xplore.  Restrictions apply. 



# Page 8

88
IEEE TRANSACTIONS ON VEHICULAR TECHNOLOGY, VOL. 72, NO. 1, JANUARY 2023
Algorithm 2: Simulator SIM.
Require: a security parameter λi and a generator P.
Ensure: the message/signature pair (msgi, σi) and
timestamp ti
1:
Given an instance xi = (C1,j
i , C2,j
i
) to be proved.
2:
Randomly select e∗
i, z∗
i ∈Z∗
q.
3:
Compute R∗
i = z∗
i (C1,j
i
+ P) + e∗
iC2,j
i
.
4:
Set OH = (P, C1,j
i , C2,j
i
, R∗
i, msgi, ti) = e∗
i.
return (msgi, σi = (z∗
i , R∗
i), ti);
=
n

i=1
viRi
Soundness: On the basis of ECDLP assumption, we prove
that the proposed scheme satisﬁes soundness under the random
oracle model.
Assuming a PPT prover P ∗can generate a valid instance
and a massage/signature pair (xi, msgi, σi, ti), where xi =
(C1,j
i , C2,j
i
), σi = {zi, Ri}. There exists a knowledge extrac-
tor M. M rewinds the prover P ∗to the oracle query ei =
H(P, C1,j
i , C2,j
i
, Ri, msgi, ti). M regenerates the random oracle
H such that e′
i = H(P, C1,j
i , C2,j
i
, Ri, msgi, ti) and continues
the signing steps. After that, P ∗obtains another accepted mes-
sage signature pairs (xi, msgi, σ′
i, ti), where σ′
i = {z′
i, Ri} in
expected polynomial time. By combining independent equations
zi = ri −eiski (mod q), z′
i = ri −e′
iski (mod q), we could
get:
ski = (zi −z′
i)(e′
i −ei)−1
(mod q)
Regarding P ∗as a subroutine, we can break the ECDL in-
stance with a non-negligible probability. Therefore, our pro-
posed scheme satisﬁes the requirement of soundness.
Zero-knowledge: With the Fiat-Shamir heuristic method, we
prove the zero-knowledge by constructing a simulator SIM
which can simulate the interaction with any veriﬁers (see Al-
gorithm 2).
Moreover, our scheme can also satisfy the aforementioned
necessary security requirements in VANETs.
1) Message Authentication/Integrity: Since our proposed
SoK scheme provides completeness and soundness,
any attacker cannot forge a valid signature meet-
ing Ri = zi(C1,j
i
+ P) + eiC2,j
i
without long-term pri-
vate key. Therefore, the receiver ensures the au-
thenticity of message sender by checking whether
VerifyProof(xi, msgi, σi, ti) holds or not.
2) Identity Anonymity: In our scheme, while the real iden-
tity is cryptographically hidden from the public view,
any attackers cannot extract it. The real identities of the
vehicles are not transmitted during the public interaction.
We use the blinded public key to achieve authentication.
3) Unlinkability: In the resignation phase, TA generates
random numbers uj to compute a batch of indexes cidj
i
of a vehicle Vi. Since each cidj
i is used within a period
time, no attacker can trace the behavior of Vi. Thus, our
proposal can provide unlinkability.
4) Non-Repudiation: In our proposal, the sender cannot
deny a message/signature pair that has been generated
previously. The private key ski is a witness in the proposed
SoK scheme, so only the witness owner can generate a
valid signature. Supporting that the sender attempts to
deny a valid message, TA could trace the real identity
RIDi through C1,j
i
and C3,j
i . Therefore, no entity can
deny the validity of the signature.
5) Conditional Traceability: Since the proposed scheme
provides anonymity and unlinkability, no attacker can
trace the identity of Vi. TA can obtain the ciphertext of the
long-term public key via triggering Trace. In addition,
only TA can decrypt the ciphertext with its private key
msk, and then retrieve the real identity.
6) Resistant against other common attacks: Our proposal
can also resist against the following common attacks.
r Impersonation attack: To launch an impersonation at-
tack, the attacker should obtain (C1,j
i , C2,j
i
) from the smart
contract and forge (Ri, zi) satisfying the following equa-
tions: Ri = zi(C1,j
i
+ P) + eiC2,j
i
. However, according
to Theorem 1, PPT attackers cannot generate the valid
pair without private key, because none of them can solve
the ECDLP. Thus, our scheme can successfully resist im-
personation attacks.
r Modiﬁcation attack: According to the above complete-
ness and soundness analysis about our proposal, the at-
tacker cannot forge a valid signature without the knowl-
edge of entity’s private key. Moreover, any modiﬁcation
of the message/signature pair could be found by checking
whether the equation Ri = zi(C1,j
i
+ P) + eiC2,j
i
holds.
Therefore, our proposed scheme can withstand modiﬁca-
tion attack.
r Man-in-the-middle attack: Due to the analysis of mes-
sage authentication, no attacker can forge valid signatures
without the knowledge of private key. Also, our EBCPPA
can achieve mutual authentication among participants.
Hence, our proposal owns the ability to withstand man-
in-the-middle attack.
r Replay attack: We use a timestamp ti and random num-
bers in our scheme. Upon receiving the message/signature
pair, the veriﬁer can detect the playback of messages by
checking the freshness.
r Key escrow problem: ID-based solutions exist key esrow
problem, that is, vehicles’ secret keys will be leaked once
the authority (KGC) is compromised. In our scheme, the
vehicle generates its key pair independently and only sends
anonymous public key to authority (TA). Even if TA is
compromised, TA cannot recover the secret key of vehicle
from the public key. Therefore, vehicles’ secret keys cannot
be leaked.
r Stolen veriﬁer table attacks: There is no veriﬁer ta-
ble in our scheme. The privacy-preserving authentica-
tion only requires the vehicle to generate long-term key
pair that is saved securely, and then submit anonymous
public keys to blockchain. No veriﬁer table maintained
by TA, because any veriﬁer can retrieve them from
blockchain.
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:59 UTC from IEEE Xplore.  Restrictions apply. 



# Page 9

ZHOU et al.: EFFICIENT BLOCKCHAIN-BASED CONDITIONAL PRIVACY-PRESERVING AUTHENTICATION PROTOCOL FOR VANETs
89
TABLE II
SMART CONTRACT GAS COST IN OUR PROPOSAL
r Birthday collision resilience: In our design, we utilize
Ethereum or other blockchain which support smart con-
tract. These blockchain networks employ secure hash func-
tions (e.g., SHA256) to generate the block hash. Due to the
collision-resistant of secure hash functions, our scheme can
avoid birthday collision attack.
VII. PERFORMANCE EVALUATION
To instantiate our proposed protocol, we implement EBCPPA
schemeviatheprototypeofblockchainandVANETssimulation.
In this section, we provide the details of the environment setting
and compare our proposal with other recent approaches. The
experimental performance validates its reliability and effective-
ness.
A. Transaction Cost
We used the Ethereum test network (Rinkeby) to deploy our
designed smart contract, where Rinkeby allows developer to
test the system before deployment. Speciﬁcally, our employed
conﬁgurations were a compiler (0.4.23+commit.124ca40 d),
language (Solidity), EVM version (compiler default) and Envi-
ronment (JavaScript VMLondon). After compiling our designed
smart contract code (Algorithm 1), we deployed it into the
selected Remix to evaluate the gas cost of each function.
On Ethereum, transaction (e.g., Submit, Revoke) requires
gas which is an infrastructure cost. The external view function
(e.g., Get and Trace) in our proposal is gas free. To represent
gas into the monetary cost, we consider an exchange rate of 1
Ether = 1630 USD. In our conﬁguration, the Gas Limit is set
as 10,00,00 gas and each gas is worth 2 GWei (1 GWei = 10−9
Ether). On the basis of these baselines, we evaluate the gas cost
in our system (i.e. Submit, Get, Trace, Revoke).
From the gas cost record shown in Table II, the maximum
gas cost is the deployment of smart contract with 1.7849 USD.
Fortunately, the smart contract deployment is executed only
once, and the Get, Trace operation are gas free. Although
other operations will be triggered repeatedly, the gas consump-
tion of Submit and Revoke is about 0.5303 USD and 0.1447
USD respectively. Therefore, the gas cost of our proposal can
be accepted in practical applications.
B. Authentication Efﬁciency
We further analyze the communication and computation costs
of our proposal and those of other recent related BCPPA schemes
([12], [13], [29]) for VANETs. We conducted our experiment
TABLE III
NOTATIONS, EXECUTION TIME AND DATA SIZE
Fig. 3.
Computation cost comparison (ms).
on a laptop with the Miracle V7.0 (a cryptographic library).
Our timing benchmarks were on Inter (R) Core (TM) i5-4210 U
4 GB RAM at 1.7 GHz. We ﬁrst evaluated the time cost of
time-consuming cryptographic operations. Each operation was
run 1000 times to calculate the average time. Here, we list the
time cost of operations and the size of transmitted messages
(see Table III). Then, we obtained the runtime of our proposed
scheme and other related solutions [12], [13], [29], in terms
of signature generation, single message veriﬁcation and batch
veriﬁcation.
From the comparative results showed in Table IV and Fig. 3,
we can discover that EBCPPA has superior performance than
other recent solutions [12], [13], [29]. It should be noted that the
proposal in [13] can achieve addition properties (such as access
control), although the performance is not practical enough. The
computationtimeofsigning,veriﬁcationandtracinginEBCPPA
iswith8.9334ms,17.8662msand8.9328ms.Comparedtothese
in [12], [13], [29], while HBCPA [29] has the best performance
in real identity tracing, our scheme can save about at least
49.71%, 32.84%, in terms of signing and veriﬁcation. EBCPPA
avoids the use of bilinear pair operations and reduces the number
of time-consuming operations. In addition, the comparison of
communication overhead is shown in Table IV, which demon-
strates that our scheme requires the least bandwidth (168 bytes)
than that of other schemes. Therefore, our proposal is more
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:59 UTC from IEEE Xplore.  Restrictions apply. 



# Page 10

90
IEEE TRANSACTIONS ON VEHICULAR TECHNOLOGY, VOL. 72, NO. 1, JANUARY 2023
TABLE IV
COMPARISON OF COMPUTATION COST (MS) AND COMMUNICATION OVERHEAD (BYTES)
Fig. 4.
APD and PLR with different trafﬁc densities.
suitable than [12], [13], [29] in terms of computation cost and
communication overhead.
C. Delay and Loss Rate
To further demonstrate the feasibility, this section evaluates
the average message transmission delay and loss rate in the
VANETs environment (via VanetMobSim1 and NS-22 virtual
machine). Our experiential simulations were performed on a
PC running Windows 10 with 11th Gen Inter (R) Core (TM)
i7-1165G7 CPU and 16 GB RAM 2.8 GHz. In the simulator
scenario, we used a 1.0 ∗1.0 km2 virtual map with 4 RSUs
equipped. The vehicles are set to communicate with each other
in the range of 300 m with 6 Mbps and their speeds were ranging
from 5 m/s to 70 m/s. The length of a transmitted message was
168 bytes.
We conducted two types of simulation in VanetMobSim and
NS-2. In the ﬁrst simulation, the speed of vehicles was controlled
in a ﬁxed range (30 m/s to 40 m/s) and the number of vehicles
(density) changed from 5 to 100. The result of this experiment
is shown in Fig. 4, from which we can discover that the APD
changes a little before the density is added to 75, but with the
growth of density the APD increases fast. Similarly, there is no
data loss if the density is less than 40. When the density is more
than 40, the PLR keeps increasing as the density rises.
On the basis of the former simulation, the latter experiment
is for analyzing the impact of vehicles’ speed on APD and PLR.
1http://vanet.eurecom.fr/
2https://www.isi.edu/nsnam/ns/
Fig. 5.
APD and PLR with different average speeds.
In Fig. 5, with the increase of average speed, the APD and PLR
change a little (less than 0.02 ms and 0.03%). We can conclude
that the speed of vehicle has slight inﬂuence on the APD and
PLR.
VIII. CONCLUSION
In this work, we proposed a more efﬁcient blockchain-based
conditional privacy-preserving authentication (EBCPPA) proto-
col for VANETs. We analyzed the current security requirements
of practical applications and designed two building blocks,
namely: SoK scheme and smart contract. In addition, we proved
the security of our SoK scheme and informally discussed other
security features of EBCPPA. Finally, we conducted experi-
mental evaluations in the Rinkeby and VAENTs simulator. The
results demonstrated that our scheme achieves a reduction of
computation cost at least 49.71% and 32.84% in terms of sign-
ing and veriﬁcation. The communication cost reduces at least
27.59% than other related schemes. Moreover, the analyses of
gas cost, message delay and loss ratio also support the feasibility
of our scheme. Therefore, due to its signiﬁcantly improved
performance, the EBCPPA scheme is more suitable to be applied
in VANETs.
While we experimentally evaluate our EBCPPA in simulation
environment, it is still indeterminacy in the real-world system.
Further studies can be focused on implementation and optimiza-
tioninpracticalVANETs.Inaddition,wewillcontinueoureffort
to improve the efﬁciency of the CPPA and the size of the SoK
proof.
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:59 UTC from IEEE Xplore.  Restrictions apply. 



# Page 11

ZHOU et al.: EFFICIENT BLOCKCHAIN-BASED CONDITIONAL PRIVACY-PRESERVING AUTHENTICATION PROTOCOL FOR VANETs
91
REFERENCES
[1] A. Boukerche, H. A. B. F. de Oliveira, E. F. Nakamura, and A. A. F.
Loureiro, “Vehicular ad hoc networks: A new challenge for localization-
based systems,” Comput. Commun., vol. 31, no. 12, pp. 2838–2849,
Jul. 2008.
[2] J. Shao, X. Lin, R. Lu, and C. Zuo, “A threshold anonymous authen-
tication protocol for vanets,” IEEE Trans. Veh. Technol., vol. 65, no. 3,
pp. 1711–1720, Mar. 2016.
[3] D. He, Y. Zhang, and J. Chen, “Cryptanalysis and improvement of an
anonymous authentication protocol for wireless access networks,” Wirel.
Pers. Commun., vol. 74, no. 2, pp. 229–243, 2014.
[4] M. Raya and J.-P. Hubaux, “The security of vehicular ad hoc networks,”
in Proc. 3 rd ACM workshop Secur. ad hoc sensor Netw., 2005, pp. 11–21.
[5] Y. Sun, R. Lu, X. Lin, X. Shen, and J. Su, “An efﬁcient pseudonymous
authentication scheme with strong privacy preservation for vehicular com-
munications,” IEEE Trans. Veh. Technol., vol. 59, no. 7, pp. 3589–3603,
Sep. 2010.
[6] R. Lu, X. Lin, H. Zhu, P.-H. Ho, and X. Shen, “ECPP: Efﬁcient conditional
privacy preservation protocol for secure vehicular communications,” in
Proc. IEEE 27th Conf. Comput. Commun., 2008, pp. 1229–1237.
[7] D. He, S. Zeadally, B. Xu, and X. Huang, “An efﬁcient identity-based con-
ditionalprivacy-preservingauthenticationschemeforvehicularadhocnet-
works,” IEEE Trans. Inf. Forensics Secur., vol. 10, no. 12, pp. 2681–2691,
Dec. 2015.
[8] M. Azees, P. Vijayakumar, and L. J. Deborah, “EAAP: Efﬁcient anony-
mous authentication with conditional privacy-preserving scheme for ve-
hicular ad hoc networks,” IEEE Trans. Intell. Transp. Syst., vol. 18, no. 9,
pp. 2467–2476, Sep. 2017.
[9] I. Ali, Y. Chen, N. Ullah, R. Kumar, and W. He, “An efﬁcient and
provably secure ECC-based conditional privacy-preserving authentication
for vehicle-to-vehicle communication in VANETs,” IEEE Trans. Veh.
Technol., vol. 70, no. 2, pp. 1278–1291, Feb. 2021.
[10] X. Zheng, M. Li, Y. Chen, J. Guo, M. Alam, and W. Hu, “Blockchain-based
secure computation ofﬂoading in vehicular networks,” IEEE Trans. Intell.
Transp. Syst., vol. 22, no. 7, pp. 4073–4087, Jul. 2021.
[11] F. Ayaz, Z. Sheng, D. Tian, Y. L. Guan, and V. C. M. Leung, “A voting
blockchain based message dissemination in vehicular ad-hoc networks
(VANETs),” in Proc. IEEE Int. Conf. Commun., 2020, pp. 1–6.
[12] C. Lin, D. He, X. Huang, N. Kumar, and K.-K. R. Choo, “BCPPA: A
blockchain-based conditional privacy-preserving authentication protocol
for vehicular ad hoc networks,” IEEE Trans. Intell. Transp. Syst., vol. 22,
no. 12, pp. 7408–7420, Dec. 2021.
[13] Q. Feng, D. He, S. Zeadally, and K. Liang, “BPAS: Blockchain-assisted
privacy-preserving authentication system for vehicular ad hoc networks,”
IEEE Trans. Ind. Informat., vol. 16, no. 6, pp. 4146–4155, Jun. 2020.
[14] M. Raya and J. Hubaux, “Securing vehicular ad hoc networks,” J. Comput.
Secur., vol. 15, no. 1, pp. 39–68, Jan. 2007.
[15] R. Lu, X. Lin, H. Zhu, P. Ho, and X. Shen, “ECPP: Efﬁcient conditional
privacy preservation protocol for secure vehicular communications,” in
Proc. 27th IEEE Int. Conf. Comput. Commun., Joint Conf. IEEE Comput.
Commun. Societies, 2008, pp. 1229–1237.
[16] A. Wasef and X. S. Shen, “EMAP: Expedite message authentication
protocol for vehicular ad hoc networks,” IEEE Trans. Mob. Comput.,
vol. 12, no. 1, pp. 78–89, Jan. 2013.
[17] M. Asghar, R. R. M. Doss, and L. Pan, “A scalable and efﬁcient PKI based
authentication protocol for vanets,” in Proc. IEEE 28th Int. Telecommun.
Netw. Appl. Conf., 2018, pp. 1–3 .
[18] C.Zhang,R.Lu,X.Lin,P.-H.Ho,andX.Shen,“Anefﬁcientidentity-based
batch veriﬁcation scheme for vehicular sensor networks,” in Proc. IEEE
27th Conf. Comput. Commun., 2008, pp. 246–250.
[19] S. Horng et al., “b-SPECS : Batch veriﬁcation for secure pseudonymous
authenticationinVANET,”IEEETrans.Inf.ForensicsSecur.,vol.8,no.11,
pp. 1860–1875, Nov. 2013.
[20] J. Li, Y. Liu, Z. Zhang, B. Li, H. Liu, and J. Cheng, “Efﬁcient id-based mes-
sage authentication with enhanced privacy in wireless ad-hoc networks,”
in Proc. Int. Conf. Comput., Netw. Commun., 2018, pp. 322–326.
[21] H. Dai, Z. Zheng, and Y. Zhang, “Blockchain for Internet of Things: A
survey,” IEEE Internet Things J., vol. 6, no. 5, pp. 8076–8094, Oct. 2019.
[22] L. Li et al., “Creditcoin: A privacy-preserving blockchain-based incentive
announcement network for communications of smart vehicles,” IEEE
Trans. Intell. Transp. Syst., vol. 19, no. 7, pp. 2204–2220, Jul. 2018.
[23] M. Gonzalez-Martin, M. Sepulcre, R. Molina-Masegosa, and J. Gozálvez,
“Analytical models of the performance of C-V2X mode 4 vehicular com-
munications,” IEEE Trans. Veh. Technol., vol. 68, no. 2, pp. 1155–1166,
Feb. 2019.
[24] B. Luo, X. Li, J. Weng, J. Guo, and J. Ma, “Blockchain enabled trust-based
location privacy protection scheme in VANET,”IEEE Trans.Veh.Technol.,
vol. 69, no. 2, pp. 2034–2048, Feb. 2020.
[25] C. Wang, J. Shen, J. Lai, and J. Liu, “B-TSCA: Blockchain assisted trust-
worthiness scalable computation for V2I authentication in vanets,” IEEE
Trans. Emerg. Top. Comput., vol. 9, no. 3, pp. 1386–1396, Jul.–Sep. 2021.
[26] S. Rowan, M. Clear, M. Gerla, M. Huggard, and C. M. Goldrick, “Securing
vehicle to vehicle communications using blockchain through visible light
and acoustic side-channels,” Apr. 2017, arXiv:1704.02553.
[27] Z.Lu,Q.Wang,G.Qu,H.Zhang,andZ.Liu,“Ablockchain-basedprivacy-
preserving authentication scheme for vanets,” IEEE Trans. Very Large
Scale Integr. Syst., vol. 27, no. 12, pp. 2792–2801, Dec. 2019.
[28] D. Gabay, K. Akkaya, and M. Cebe, “Privacy-preserving authentication
scheme for connected electric vehicles using blockchain and zero knowl-
edge proofs,” IEEE Trans. Veh. Technol., vol. 69, no. 6, pp. 5760–5772,
Jun. 2020.
[29] X. He, X. Niu, Y. Wang, L. Xiong, Z. Jiang, and C. Gong, “A hierarchical
blockchain-assisted conditional privacy-preserving authentication scheme
for vehicular ad hoc networks,” Sensors, vol. 22, no. 6, 2022, Art. no. 2299.
[30] Y. Tsiounis and M. Yung, “On the security of elgamal based encryption,”
in Int. Workshop Public Key Cryptography, 1998, pp. 117–134.
[31] M. Blum, P. Feldman, and S. Micali, “Non-interactive zero-knowledge
and its applications (extended abstract),” in Proc. 20th Annu. ACM Symp.
Theory Comput., (J. Simon, ed.), 1988, pp. 103–112.
[32] M. Chase and A. Lysyanskaya, “On signatures of knowledge,” in Proc.
Annu. Int. Cryptology Conf., 2006, pp. 78–96.
[33] A. Dorri, M. Steger, S. S. Kanhere, and R. Jurdak, “Blockchain: A
distributed solution to automotive security and privacy,” IEEE Commun.
Mag., vol. 55, no. 12, pp. 119–125, Dec. 2017.
Xiaotong Zhou received the bachelor’s and master’s
degrees in information security from Wuhan Univer-
sity, Wuhan, China, in 2012 and 2019 respectively.
She is currently working toward the Ph.D. degree with
the School of Cyber Science and Engineering, Wuhan
University. Her research interests include security and
privacy, including privacy protection, and blockchain
security.
Debiao He (Member, IEEE) received the Ph.D. de-
gree in applied mathematics from the School of Math-
ematics and Statistics, Wuhan University, Wuhan,
China in 2009. He is currently a Professor of the
School of Cyber Science and Engineering, Wuhan
University. He has authored or coauthored more
than 100 research papers in refereed international
journals and conferences, such as IEEE TRANSAC-
TIONS ON DEPENDABLE AND SECURE COMPUTING,
IEEE TRANSACTIONS ON INFORMATION SECURITY
AND FORENSIC, and Usenix Security Symposium.
His main research interests include cryptography and information security, in
particular, cryptographic protocols. He was the recipient of the 2018 IEEE
Sysems Journal Best Paper Award and the 2019 IET Information Security Best
Paper Award. His work has been cited more than 10000 times at Google Scholar.
He is in the Editorial Board of several international journals, such as Journal
of Information Security and Applications, Frontiers of Computer Science, and
Human-centric Computing & Information Sciences.
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:59 UTC from IEEE Xplore.  Restrictions apply. 



# Page 12

92
IEEE TRANSACTIONS ON VEHICULAR TECHNOLOGY, VOL. 72, NO. 1, JANUARY 2023
Muhammad Khurram Khan (Senior Member,
IEEE) is currently a Professor of cybersecurity with
the Center of Excellence in Information Assurance,
King Saud University, Riyadh, Saudi Arabia. He
is founder and CEO of the Global Foundation for
Cyber Studies and Research, an independent and
non-partisan cybersecurity think-tank in Washington
D.C., USA. He is the Editor-in-Chief of Telecom-
munication Systems published by Springer-Nature
with its recent impact factor of 2.336 (JCR 2022).
He has auhtored or coauthored more than 450 papers
in the journals and conferences of international repute. In addition, he is an
inventor of ten US/PCT patents. He has edited ten books/proceedings published
by Springer-Verlag, Taylor & Francis and IEEE. His research interests include
Cybersecurity, digital authentication, IoT security, biometrics, multimedia se-
curity, cloud computing security, cyber policy, and technological innovation
management. He is also the Editor-in-Chief ofCyber Insights Magazine. He is
on the editorial board of several journals including, IEEE COMMUNICATIONS
SURVEYS & TUTORIALS, IEEE Communications Magazine, IEEE INTERNET OF
THINGS JOURNAL, IEEE TRANSACTIONS ON CONSUMER ELECTRONICS, Journal
of Network & Computer Applications (Elsevier), IEEE ACCESS, IEEE Consumer
Electronics Magazine, PLOS ONE, and Electronic Commerce Research. He is
a Fellow of the IET (U.K.), a Fellow of the BCS (U.K.), and a Fellow of the
FTRA (Korea).
Wei Wu received the Ph.D. degree from the School
of Computer Science and Software Engineering, Uni-
versity of Wollongong, Wollongong, NSW, Australia,
in 2011. She is currently a Professor with the School
of Mathematics and Statistics, Fujian Normal Univer-
sity, Fuzhou, China. She has authored or coauthored
more than 30 research papers in refereed interna-
tionalconferencesandjournals.Herresearchinterests
include cryptography and information security.
Kim-Kwang Raymond Choo (Senior Member,
IEEE) received the Ph.D. degree in information se-
curity in 2006 from Queensland University of Tech-
nology„ Brisbane City, QLD, Australia. He currently
holds the Cloud Technology Endowed Professorship
with The University of Texas at San Antonio, San
Antonio, TX, USA, and is the founding Co-Editor-
in-Chief of ACM Distributed Ledger Technologies:
Research & Practice, and the founding Chair of IEEE
Technology and Engineering Management Society
Technical Committee on Blockchain and Distributed
Ledger Technologies. He is also an ACM Distinguished Speaker and IEEE
Computer Society Distinguished Visitor (2021–2023), and a Web of Science’s
Highly Cited Researcher (Computer Science-2021, Cross-Field-2020). He was
the recipient of the IEEE Systems, Man, and Cybernetics Technical Committee
on Homeland Security Research and Innovation Award in 2022, and the 2019
IEEE Technical Committee on Scalable Computing Award for Excellence in
ScalableComputing(MiddleCareerResearcher).Hehasalsoreceivedbestpaper
awards from IEEE Systems Journal in 2021, IEEE Computer Society’s Bio-
Inspired Computing Special Technical Committee Outstanding Paper Award
for 2021, IEEE DSC 2021, IEEE Consumer Electronics Magazine for 2020,
Journal of Network and Computer Applications for 2020, EURASIP Journal on
Wireless Communications and Networking in 2019, IEEE TrustCom 2018, and
ESORICS 2015.
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:59 UTC from IEEE Xplore.  Restrictions apply. 
