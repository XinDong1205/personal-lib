

# Page 1

IEEE TRANSACTIONS ON MOBILE COMPUTING, VOL. 23, NO. 12, DECEMBER 2024
12505
A Threshold-Based Full-Decentralized
Authentication and Key Agreement Scheme for
VANETs Powered by Consortium Blockchain
Lu Wei
, Yongjuan Zhang, Jie Cui
, Senior Member, IEEE, Hong Zhong
, Irina Bolodurina
, and Debiao He
Abstract—The authentication and key agreement (AKA) scheme
for VANETs can produce a series of short-term session keys,
which can be used to secure the vehicular communications across
open and insecure wireless channels. Traditional VANETs AKA
schemes tend to employ the centralized trust architecture as the
core authentication backend, which raises concerns about system
security and reliability. Recently, several VANETs AKA schemes
that are constructed on decentralized trust architecture have been
proposed. However, these schemes do not achieve full decentral-
ization and tend to suffer from key exposure issues, insufﬁcient
performance, and lack of optimization for on-chain storage costs.
To address these shortcomings, we propose a threshold-based full-
decentralized VANETs AKA scheme that is powered by consortium
blockchain. In our proposed scheme, the threshold-based voting
concept is employed to mitigate the key exposure issue inherent to
the network infrastructure. Furthermore, we leverage lightweight
cryptography in conjunction with the Cuckoo ﬁlter to reduce com-
putational, communication, and on-chain operation costs brought
by cryptographic operations and smart contracts. The security
proof together with the cryptographic protocol validation tool
prove the security of our proposed scheme, whereas the simulation
experiment demonstrates the efﬁciency of our proposed scheme.
Index Terms—VANETs, authentication and key agreement,
threshold, consortium blockchain, full decentralization.
Manuscript received 30 November 2023; revised 6 March 2024; accepted
5 June 2024. Date of publication 11 June 2024; date of current version
5 November 2024. This work was supported in part by the National Natural
Science Foundation of China under Grant 62302008, Grant U23A20308, Grant
62202008, and Grant 62325209, in part by the Fundamental Research Funds
for the Central Universities under Grant 2042023KF0203, in part by the Natural
Science Foundation of Anhui Province, China under Grant 2208085QF196,
and in part by the University Synergy Innovation Program of Anhui Province
under Grant GXXT-2022-049. Recommended for acceptance by J.S. Sun. (Cor-
responding author: Jie Cui.)
Lu Wei, Yongjuan Zhang, Jie Cui, and Hong Zhong are with the Key
Laboratory of Intelligent Computing and Signal Processing of Ministry of
Education, School of Computer Science and Technology, Anhui University,
Hefei 230601, China, also with the Anhui Engineering Laboratory of IoT
Security Technologies, Anhui University, Hefei 230039, China, and also with
the Institute of Physical Science and Information Technology, Anhui University,
Hefei 230601, China (e-mail: cuijie@mail.ustc.edu.cn).
Irina Bolodurina is with the Faculty of Mathematics and Information Tech-
nologies, Orenburg State University, 460018 Orenburg, Russia (e-mail: prmat@
mail.osu.ru).
Debiao He is with the School of Cyber Science and Engineering, Wuhan
University, Wuhan 430072, China, and also with the Shanghai Key Laboratory
of Privacy Preserving Computation, MatrixElements Technologies, Shanghai
201204, China (e-mail: hedebiao@163.com).
Digital Object Identiﬁer 10.1109/TMC.2024.3412106
I. INTRODUCTION
T
HE vehicular ad-hoc networks (VANETs) represent a criti-
cal subsystem within the broader intelligent transportation
system (ITS). Empowered by the recent advancements in wire-
less communication technology, VANETs provide drivers with
access to enriched information and services, thereby enhancing
both driving comfort and safety. For example, vehicles send
beacons or basic safety messages (BSMs) periodically to nearby
vehicles or infrastructures, so that the real state of vehicles can
be perceived beyond the line of sight.
In VANETs, a majority of entities, primarily vehicles and
roadside units (RSUs), interact via public channels. The inherent
openness of these channels leaves them insecure, increasing
their susceptibility to a diverse range of security attacks and
threats. To ensure the security of vehicular communications, the
crafting of an authentication and key agreement (AKA) scheme
speciﬁcally for VANETs becomes a paramount concern. The
AKA scheme for VANETs would generate session keys, which
when combined with off-the-shelf encryption and authentication
techniques, could facilitate the establishment of secure commu-
nication channels.
Various centralized AKA schemes have been proposed for
securing vehicular communications, in which the centralized
trusted authority is always required to provide the global authen-
tication service for the communication entities within VANETs.
Vijayakumar et al. [1] proposed a batch authentication-based
key agreement scheme, which employs a batch authentication
algorithm executed by an RSU. However, the incorporation
of bilinear pairs results in substantial computational and com-
munication costs for the scheme. Dua et al. [2] proposed a
two-tier certiﬁable key agreement scheme in which the cluster
head vehicle is directly responsible for AKA with surrounding
vehicles after completing the authentication with the trusted
center. Nevertheless, the scheme’s effectiveness hinges on the
assumption of the cluster head vehicle’s honesty and trustworthi-
ness. Saleemetal.[3]proposedalightweightandsecureprivacy-
preserving AKA scheme. This scheme delivers an efﬁcient and
secure data transfer mechanism over a public communication
channel. However, the scheme’s use of hash functions results in
a computational cost that remains undesirably high.
The conﬁguration of a centralized trusted authority is vulner-
able to attacks from malicious adversaries, which could render
authentication services inaccessible to vehicles. In the most
1536-1233 © 2024 IEEE. Personal use is permitted, but republication/redistribution requires IEEE permission.
See https://www.ieee.org/publications/rights/index.html for more information.
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:39 UTC from IEEE Xplore.  Restrictions apply. 



# Page 2

12506
IEEE TRANSACTIONS ON MOBILE COMPUTING, VOL. 23, NO. 12, DECEMBER 2024
severe scenarios, secret key information pertaining to vehicles
may also be compromised. In light of these advantages, multiple
VANETs AKA schemes based on a decentralized trust archi-
tecture have been recently proposed. Wei et al. [4] put forth
an AKA scheme predicated on a multi-trusted entity model.
However, while this scheme takes into account the robustness
of the trusted central end from a distributed perspective, it
neglects the inner corporation or consensus of the proposed
multi-trusted entity system. Li et al. [5] proposed an unlink-
able AKA scheme for vehicle-to-vehicle (V2V) communica-
tion, based on blockchain technology. This scheme achieves
authentication without the need to query vehicle information
and assures unlinkability during the V2V phase. However, its
heavy reliance on anonymous authentication credentials stored
in the blockchain results in reduced authentication efﬁciency.
Vangala et al. [6] proposed an efﬁcient AKA scheme, built
on both blockchain technology and the elliptic curve method.
While this scheme exhibits lower computational costs and
enhanced security, it necessitates comparable communication
costs to achieve an increased level of security and functional
features.
While state-of-the-art AKA schemes based on the decentral-
ized trust architecture exhibit superior performance in terms
of system security, reliability, and privacy compared to those
based on the centralized trust architecture, they also exhibit
certain deﬁciencies. The ﬁrst shortcoming is that these schemes
do not fully achieve decentralization. Despite employing a
decentralized trust architecture, the authentication service of
the AKA process still necessitates the participation of the
speciﬁc trusted authority. The second issue pertains to key
exposure, a common problem encountered in these schemes.
Speciﬁcally, these schemes utilize identity-based cryptography,
which involves a master secret key (held by trusted author-
ities) to implement the authentication algorithm. This setup
results in a situation where the leakage of the master se-
cret key compromises the secret keys of the users. Lastly,
the performance of these blockchain-based schemes is often
not efﬁcient enough, particularly with regard to the on-chain-
related gas costs associated with storing public keys or vehicle
credentials.
To address these aforementioned issues, we propose a
threshold-based full-decentralized AKA scheme for VANETs
powered by consortium blockchain. Speciﬁcally, a certain num-
ber of edge servers (ESs), which are semi-trusted entities within
VANETs and have the completely equal and independent rela-
tionship, are connected to construct an authentication network
via the consortium blockchain. We design a threshold-based
AKA scheme that is compatible with the authentication net-
work, so the AKA message between the vehicle and RSU can
be trusted, provided that the number of tokens issued by ESs
for validating the trustworthiness of the AKA message meets
the predeﬁned threshold. Additionally, we designed the smart
contract function based on the Cuckoo ﬁlter, which is a typical
probabilistic data structure, to greatly reduce the on-chain stor-
age costs, thus improving the system performance and reducing
the execution costs. The main contributions of our proposed
scheme are as shown follows:
1) A threshold-based AKA scheme has been designed for
securing vehicular communications. In this scheme, semi-
trusted ESs are the only trust infrastructure for providing
the authentication service, whereas the traditional cen-
tralized or decentralized AKA schemes always require
the setup of full-trusted infrastructure. Furthermore, our
design leverages the concept of threshold-based voting
in the AKA scheme, eliminating the need for the master
secret key. As a result, the system’s security remains
unaffected even in the event of a compromise or ofﬂine
status of some ESs.
2) An optimized smart-contract-based distributed authenti-
cation mechanism has been designed to guarantee the
authenticity of the AKA message based on the Cuckoo
ﬁlter, where the public key registration, validation, and
revocation functions have been implemented with low
on-chain storage costs. Compared with the state-of-the-art
blockchain-based VANETs AKA schemes that neglect
the on-chain storage costs, our proposed scheme delivers
superior economic efﬁciency and availability.
3) We use lightweight cryptography to design our proposed
scheme for decreasing the computation and communica-
tion costs. The experiment results demonstrate that our
proposed has the certain performance advantage over the
state-of-the-art VANETs AKA schemes.
II. RELATED WORK
The AKA scheme, which is essential for securing vehicular
communications, mainly solves two core problems. One is to
guarantee the identity of the participants and the authentication
of the interactive messages used for key agreement. The other is
to ensure the correctness and security of key agreement process.
Since the communication channels for VANETs are open and
insecure, it is necessary to construct an AKA mechanism to
endorse the legitimacy of the participants. The existing VANETs
AKA schemes often set up a TA as the legitimacy endorse-
ment mechanism, ensuring the legitimacy of the identity of the
communication entity endorsed by the TA. According to the
difference in the trusted architectures, the existing VANETs
AKA schemes can be separated into two types: the schemes
based on the centralized trusted architecture and the schemes
based on the decentralized trusted architecture. The relevant
research status is summarized as follows.
A. The VANETs AKA Schemes Based on Centralized Trusted
Architecture
Most of the existing AKA schemes for VANETs are based
on the centralized trusted architecture, which relies on a fully
trustworthy center to implement the registration, authentication,
revocation, and other functions for the VANETs communication
entities.
To achieve secure communication in VANETs, Liu et al. [7]
proposed an efﬁcient anonymous two-way AKA scheme, in
which vehicles can generate their own anonymous identity and
temporary encryption keys. Vijayakumar et al. [1] proposed
an AKA scheme based on batch authentication, in which the
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:39 UTC from IEEE Xplore.  Restrictions apply. 



# Page 3

WEI et al.: THRESHOLD-BASED FULL-DECENTRALIZED AUTHENTICATION AND KEY AGREEMENT SCHEME
12507
usage of the batch authentication algorithm effectively reduces
the computational costs of the vehicle. However, these schemes
require computationally costly bilinear pairing operations and
frequent interactions, resulting in signiﬁcant storage and com-
munication costs.
To improve the efﬁciency of secured communication in ve-
hicular networks, Huang et al. [8] proposed an AKA scheme
using ECDSA and Difﬁe-Hellman key exchange algorithms.
Wang et al. [9] proposed an anonymous AKA scheme supporting
self-authentication, in which the usage of the self-authenticated
public key allows for secure and efﬁcient V2I communication.
To reduce the load of the TA, Dua et al. [2] proposed a two-layer
AKA scheme, in which the cluster head vehicle is directly
responsible for the authentication with the surrounding vehicles
after completing the authentication with the TA. However, the
scheme relies on the assumption that the cluster head vehicle is
honest and reliable.
To solve the problem of secure communication between ve-
hicles and cloud servers, Jiang et al. [10] designed a three-factor
AKA scheme, taking into account password and biometric
changes, as well as vehicle revocation and re-registration, and
also solved the problem of vehicle switching when communi-
cating across cloud servers. However, the dependence of the
partial interaction steps on the secure channel results in reduced
practicality. In order to improve the computational efﬁciency of
the key agreement process, Cui et al. [11] proposed an AKA
scheme based on chaotic map. The usage of hash function and
chaotic map may make the key agreement process have lower
computational costs. These schemes mentioned above use ellip-
tic curve cryptography or chaotic cryptography to design AKA
protocols, which avoid the usage of bilinear pairing operations
with high costs but still have the problem that the computational
and communication costs are not low enough.
To effectively control the computational costs of the key
agreement process, Islam et al. [12] proposed a cryptography-
based authenticated group key agreement scheme, which con-
structs a lightweight authentication scheme based on a secure
hash function and a long-term session cipher. Cui et al. [13] de-
signed a lightweight authenticated group key agreement scheme
based on hash function, which constructs an authentication
algorithm based on hash function and a group key distribution
algorithm based on the Chinese Remainder Theorem. These
schemes mentioned above use hash function to design AKA
protocols, which effectively control the computational costs of
the schemes, but there are some defects such as insufﬁcient
security, impractical security assumptions, high communication
costs, and so on.
B. The VANETs AKA Schemes Based on Decentralized
Trusted Architecture
Compared with the centralized trusted architecture, the AKA
schemes based on the decentralized trusted architecture can
effectively improve the robustness and reliability of the system,
and make the system has higher security strength to resist
distributed denial-of-service attacks, key-stealing attacks, and
other security attacks.
To improve the robustness of the system and reduce the
dependence on idealized security hardware devices, Zhang et al.
[14] proposed a distributed aggregate authentication scheme, in
whichahierarchicaltrustedarchitecturewitharoottrustedentity
and a lower-level trusted entity as the main body is used. Wei et
al. [4] proposed an AKA scheme based on the multi-trusted
entity model, in which the root TA is only responsible for
the entity registration function and the sub-TA is responsible
for directly providing the authentication function for vehicles
and fog nodes, providing the reliability and concurrency of
the system effectively. However, these schemes only consider
the system robustness of the TA from the decentralized per-
spective, whereas lack consideration for internal cooperation.
Since the characteristics of non-tampering, decentralization, and
auditability of the blockchain technology, it can be used to
realize authentication [15], [16], trust management [17], [18]
and other functions in the communication process of VANETs.
In recent years, various blockchain-based AKA schemes have
been proposed. Ma et al. [19] proposed an efﬁcient decentralized
AKA scheme, which can realize the legitimacy authentication of
vehicleusersinadecentralizedenvironmentbyusingblockchain
to construct functions such as registration, update, and revo-
cation of vehicle public keys. However, this scheme can only
achieve local decentralization.
Zhang et al. [20] proposed an asymmetric AKA scheme based
on blockchain, in which the secure exchange and transmission
of information among group members are realized. However,
due to the use of bilinear pairings and the delay in the key agree-
ment process, the scheme is difﬁcult to meet the requirements
of practical V2X communication scenarios. Meng et al. [21]
proposed a mutual AKA scheme based on private chain. In this
scheme, the shared keys are recorded in the private chain, so that
the vehicle can securely communicate with all edge computing
servers by using the same shared key. However, the blockchain
that is used to store the shared keys is managed by RSUs,
which are vulnerable to security attacks. Li et al. [5] proposed
an AKA scheme based on blockchain, which can effectively
resist collusion attacks and achieve unlinkability. However, their
scheme relies on frequent homomorphic encryption, implying
signiﬁcant computational and communication costs. Chattaraj
et al. [22] proposed a certiﬁcateless AKA scheme based on
blockchain. In this scheme, the key escrow problem is solved,
and the computation and communication costs of the key agree-
ment operation are guaranteed to be low. However, the scheme
does not achieve decentralization in a real sense. Xu et al. [23]
proposed an efﬁcient AKA scheme based on blockchain, which
uses only some lightweight computation with the assistance
of blockchain to complete authentication and key agreement,
reducing the computational costs of the whole authentication
process. However, this scheme assumes that the TA is honest and
trustworthy, resulting in the security assumption of this scheme
being too high.
Insummary,theschemesbasedondecentralizedtrustedarchi-
tecture largely solve the problems of robustness, concurrency,
security, and other aspects of the schemes based on central-
ized trusted architecture. However, the existing related research
schemes have not considered how to construct efﬁcient AKA
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:39 UTC from IEEE Xplore.  Restrictions apply. 



# Page 4

12508
IEEE TRANSACTIONS ON MOBILE COMPUTING, VOL. 23, NO. 12, DECEMBER 2024
schemes using blockchain technology for VANETs semi-trusted
environments, respectively, and they suffer from high compu-
tational and communication costs, low-security strengths, and
high-security assumptions. Therefore, it is necessary to design
a secure and efﬁcient AKA scheme for non-fully trusted envi-
ronments.
III. PRELIMINARIES AND BACKGROUND
A. Secret Sharing Schemes
A (t, n) secret sharing scheme over Zq is a pair of efﬁcient
algorithms (G, C) that meet the following requirements [24].
1) G is a probabilistic algorithm that is invoked as
(α1, . . . , αs)
R←G(s, t, α), where 0 < t ≤s and α ∈Zq,
to generate a t-out-of-s sharing of α. It outputs s shares
SK := {α1, . . . , αs}
2) C is a deterministic algorithm that is invoked as α ←
C(α′
1, . . . , α′
t), to recover α.
3) Correctness: we require that for every α ∈Zq, every set of
s shares SK output by G(s, t, α), and every t-size subset
{α′
1, . . . , α′
t} of SK, we have that C(α′
1, . . . , α′
t) = α.
B. Elliptic Curve Cryptosystem
Let Fp be a ﬁnite ﬁeld, which is determined by a prime number
p. We choose an elliptic curve E : y2 = x3 + ax2 + b mod p
overtheﬁniteFp,wherea, b ∈Fp.LetGdenoteacyclicadditive
group of an elliptic curve over a ﬁnite ﬁeld, P ∈G denote a
generatorofgroup,andq istheprimeorderofthegroup.Thenwe
have the following computational or decisional hard problems.
r Elliptic curve discrete logarithm problem (ECDLP): Given
two points P, Q on an elliptic curve E, which have the rela-
tion Q = sP, the probability of ﬁnding s for probabilistic
polynomial-time (PPT) adversary is negligible.
r Elliptic curve computational Difﬁe-Hellman problem (EC-
CDHP): Given three points P, xP, yP on an elliptic curve
E, the probability of ﬁnding xyP for PPT adversary is
negligible.
r Elliptic
curve
decisional
Difﬁe-Hellman
problem
(ECDDHP): Given two tuples {P, xP, yP, xyP} and
{P, xP, yP, zP} on an elliptic curve E, the probability of
distinguishing two tuples for PPT adversary is negligible.
C. Cuckoo Filter
The Cuckoo ﬁlter [25] is a probabilistic data structure that
employs ﬁngerprint information (a short bit string derived from
a hash function) for efﬁcient storage and retrieval and supports
deletion operation. Typically, a basic Cuckoo ﬁlter comprises a
series of buckets, where each item has two candidate buckets
determined by hash functions h1 and h2.
Fig. 1 illustrates the insertion of a new item x into a Cuckoo
ﬁlter with m buckets, where x’s ﬁngerprint can be placed in the
bucket [i], where i ∈[0, m −1]. If either of the two buckets for
x is empty, the executor chooses one empty location to insert
the ﬁngerprint of x. However, if both buckets are occupied, the
algorithm selects a candidate bucket and triggers a replacement
operation. This replacement operation may involve recursion
Fig. 1.
The structure of cuckoo ﬁlter.
untilitﬁndsanemptylocationorreachesaspeciﬁedreplacement
limit.
D. Blockchain Technology and Smart Contract
Blockchain technology is a distributed ledger technology that
enables secure and transparent transactions between two or more
parties. It is characterized by its decentralized and distributed
ledger characteristics, which render the transaction process more
secure, transparent, and free from interference from third parties.
A smart contract is a self-executing digital contract that is built
on blockchain technology. It contains the terms and conditions
of an agreement, written in code, and automatically executes
actions when predeﬁned conditions are met. Smart contracts
eliminate the need for intermediaries, providing transparency,
security, and efﬁciency in various transactions, such as ﬁnancial
transfers, asset exchanges, and more. They are tamper-proof and
immutable, which makes transactions and contract execution
more efﬁcient, and reliable, and reduces costs and the risk of
human error.
E. System Model
In our proposed scheme, the system model mainly includes
four types of entities including the system initiator, edge server
(ES), roadside unit (RSU), and vehicle, which are deﬁned as
follows and shown in Fig. 2.
r System initiator: The system initiator is mainly responsible
for the generation of system and security parameters, the
selection of edge servers that have the privilege of authen-
ticating vehicles, and the management of the blockchain
network. Note that once the system initiator is not involved
in the AKA process.
r ES: The ES is considered as the semi-trusted network
entity. In our proposed scheme, the ES is responsible for
authenticating vehicles according to the credit of a speciﬁc
vehicle. Additionally, the ES provides a registration service
for vehicles in proximity.
r RSU: The RSU is mainly responsible for providing the
network access service for vehicles. We assume that the
RSU is equipped with an anomaly detection mechanism
(such as the machine-learning-based anomaly detection
mechanism) so that it can determine whether the commu-
nication behavior of a vehicle is malicious or not according
to the historical communication behavior of the vehicle.
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:39 UTC from IEEE Xplore.  Restrictions apply. 



# Page 5

WEI et al.: THRESHOLD-BASED FULL-DECENTRALIZED AUTHENTICATION AND KEY AGREEMENT SCHEME
12509
Fig. 2.
System model.
r Vehicle: Vehicles are the most common communication
entities in VANETs. Since vehicles are untrusted and the
messages sent by vehicles are easy to be attacked, the
legality of the vehicle and its messages that are involved in
the AKA process need to be authenticated.
F. Security and Privacy Requirements
Given the reality that entities in VANETs communicate over
insecure channels, a myriad of security challenges arise. There-
fore, it becomes imperative to address the security and privacy
requirements that the proposed scheme should satisfactorily
fulﬁll.
r Mutual authentication: The entities involved in the key
agreement process must achieve mutual authentication.
r Conﬁdentiality: Only the vehicle and RSU that engage in
the same AKA session have the capability to compute
the session key correctly, which will be used for their
subsequent communication.
r Resistance to replay attacks: An expired message cannot
be exploited for launching a replay attack since it will not
pass the authentication process.
r Resistance to man-in-the-middle attacks: If an adversary
intercepts the message and attempts to replace or modify
it, the message must not be successfully authenticated.
r Resistance to DDoS attacks: DDoS attacks launched
against the network infrastructure do not affect the security
of the entire system.
r Resistance to collusion attacks: The system must exhibit
robustness capable of withstanding collusion attacks that
are launched by the inner adversaries.
r Resistance to key exposure attacks: If the secret key held
by the trust infrastructure is compromised or leaked, the
system security should not be affected.
Fig. 3.
The main process of the proposed scheme.
r Forward and backward security: Even if the session key
for the current session is compromised, it poses no threat
to the security of other session key agreement processes.
r Perfect forward security: Even if the long-term secret key
is leaked or compromised, the session keys that were estab-
lished in the older AKA sessions still cannot be recovered.
r Conditional privacy-preserving: The scheme will ensure
the conﬁdentiality of the vehicle’s identity. However, if the
vehicle behaves maliciously, then its real identity can be
revealed by the ofﬁcial authority.
G. Threat Model
In this scheme, the entities in the consortium blockchain
are considered to be semi-trusted, which jointly maintain the
security of the blockchain network. The attackers in the scheme
may be vehicles, RSUs, ESs, or other external attackers, and it
is assumed that the number of ESs compromised by malicious
adversaries does not exceed t. The type of attackers can be
divided into internal and external attacks. Internal attacks may
be initiated by registered nodes in the consortium blockchain to
obtain secret information through conspiracy. An external attack
is initiated by an external adversary, who may detect the channel
in an attempt to obtain, modify, or fabricate the communication
content.
IV. THE PROPOSED SCHEME
Our proposed scheme mainly contains four phases, i.e., setup
phase, registration phase, request phase, and response phase,
where the main interaction logic is as shown in Fig. 3.
A. Setup Phase
1) Blockchain Construction: The consortium blockchain is
a speciﬁc blockchain with multiple management nodes to es-
tablish the distributed shared database with low conﬁrmation
delay. In our proposed scheme, RSUs and ESs, which are the
most common semi-trusted entities of VANETs, are used to
act as the management nodes of the consortium blockchain. In
terms of speciﬁc management responsibilities, RSUs are mainly
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:39 UTC from IEEE Xplore.  Restrictions apply. 



# Page 6

12510
IEEE TRANSACTIONS ON MOBILE COMPUTING, VOL. 23, NO. 12, DECEMBER 2024
responsible for evaluating the communication behavior of the
vehicle, whereas ESs are mainly responsible for providing the
registration and authentication service for vehicles.
2) Parameter Initialization: In this phase, the system initia-
tor prepares all the necessary algorithms and parameters, such as
ECDSA and hash functions. The RSUs in peer-to-peer mode use
the consortium blockchain in a collaborative manner to complete
the initialization in the absence of a trusted entity. In addition,
the blockchain will also create a smart contract that manages the
registered addresses.
1) The system initiator chooses a secure elliptic curve E :
y2 = x3 + ax + b mod p. A point (or generator) P can
be chosen from E to generate an additive elliptic curve
group G with order q. Additionally, the system initiator
chooses the system threshold t (the speciﬁc values depend
on the balance between the system robustness and per-
formance) that is used for the subsequent authentication
process.
2) Assume that the number of ESs that can have the priv-
ilege to provide the registration and authentication ser-
vices for vehicles is n, i.e., the authorized ES set will be
ESj(1 ≤j ≤n). First, each ESj applies to the system
initiator to get the unique index j(1 ≤j ≤n), generates
two random secret values uj, ej ∈Z∗
q, and computes its
public keys Uj = ujP and Ej = ejP for achieving dis-
tributed authentication and secure transmission, respec-
tively. Second, each ESj generates a (t −1)-order poly-
nomial as shown in (1), where the coefﬁcient aj,1 . . . aj,t
are random numbers. Finally, each ESj obtains its own
secret sharing set ssj according to (2).
3) Each ESj in the authorized ES set uses the encrypt-then-
signparadigm(sayECIESwithECDSA)togettheauthen-
ticated encryption of ssj,k = (k, pj(k)) to other ESs, i.e.,
ESk(k ∈[1, n]&k ̸= j), meaning that each ESj can get
secret sharing sets from other ESs securely.
4) All the public information that includes {E, G, q, P, n,
Uj(1 ≤j ≤n), Ej(1 ≤j ≤n)}willbestoredinthegen-
esis block of the consortium blockchain.
After the above operations are completed, each ESj can cal-
culate the cooperation private key skj by using the (3) according
to the information on the chain; meanwhile, the system public
key PK = n
j=1 Uj can be obtained.
pj(x) = uj + aj,1x + aj,2x2 + · · · + aj,txt−1 mod q
(1)
ssj = {(idx, pj(idx)) | idx ∈[1, n] &idx ̸= j}
(2)
skj = p1(j) + p2(j) + · · · + pj(j) + · · · + pn(j) mod q
(3)
B. Registration Phase
1) ES and RSU Registration: At ﬁrst, each ESj and RSUk
needs to generate the blockchain address addrj and addrk us-
ing the randomly generated numbers sj, sk ∈Z∗
q, respectively,
which will be written into the smart contract by the system ini-
tiator before the smart contract gets deployed, so that the sender
address of the subsequent transaction used for authentication
Algorithm 1: Vehicle Registration Function.
Input: addri
Output: bool
1: ▷check the validity of the function caller
2: ▷esa is an address array
3: if msg.sender not in esa then
4:
return false
5: else
6:
▷va is a mapping type
7:
va[msg.sender][addri] ←true
8:
return true
9: end if
should be equal to one of the valid addresses recorded in the
blockchain.
2) Vehicle Registration: Since vehicles are considered un-
trusted communication authorities, the validity of the identities
of vehicles needs to be checked, resulting in all vehicles needing
to register with some ESs. To launch the registration request,
the vehicle Vi chooses a random key ei ∈Z∗
q to generate its
blockchain address addri and sends the corresponding cipher-
text EAi = Enc(Ej, addri, idi) to ESj, where Enc(pk, ·) and
idi denote the asymmetric encryption algorithm (say ECIES)
and the real identity (say the license plate number) of Vi, respec-
tively. Upon receiving the registration request from Vi, ESj calls
the smart contract function deﬁned in Algorithm 1 by sending
the signed transaction TX1
j = {addri}ej, so that the address
addri of Vi would be considered valid. Note that in Algorithm 1,
the vehicle registration function can only be executed by ES,
since this function would check the sender address (denoted by
msg.sender) whether equal to one of address array (denoted by
esa) that stores the blockchain addresses of all ESs.
3) Public Key Registration: Before sending the AKA re-
quest, the vehicle must register its public keys, which will be
used in the authentication process. To register the public keys,
Vi chooses a random number xi and calculates Xi = xiP. By
repeating this procedure, Vi can generate a list of public keys
denoted as pksi. Then it will call the smart contract func-
tion deﬁned in Algorithm 2 by sending the signed transaction
TX1
i = {addrj, pksi}ei to the blockchain network. Note that in
Algorithm 2, the public keys of the vehicle would be registered
with blockchain, so that the source credibility of the public keys
can be guaranteed. Herein we use the Cuckoo ﬁlter to store the
ﬁngerprint of the public keys, thus greatly decreasing the storage
costs of public keys since the size of the ﬁngerprint is much lower
than that of the public keys.
C. Request Phase
In this phase, the vehicle Vi ﬁrst initiates an AKA request
and sends the request to the roadside unit RSUk for processing.
Speciﬁcally, the phase contains the following steps.
1) Vehicle Side: First, Vi chooses a random number qi ∈Z∗
q
and calculates the corresponding public key Qi = qiP for the
subsequent key agreement. Then, Vi gets the current timestamp
ti and gets the corresponding signature ϵi as shown in (4), where
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:39 UTC from IEEE Xplore.  Restrictions apply. 



# Page 7

WEI et al.: THRESHOLD-BASED FULL-DECENTRALIZED AUTHENTICATION AND KEY AGREEMENT SCHEME
12511
Algorithm 2: Public Key Registration Function.
Input: addrj, pksi
Output: bool
1: if vf==NULL then
2:
▷init an empty Cuckoo ﬁlter with speciﬁc table size
and maximum kick counts
3:
vf ←new(Size, MaxKicks)
4: end if
5: if va[addrj][msg.sender]==True then
6:
for each pki ∈pksi do
7:
▷call the insert function of the Cuckoo ﬁlter
8:
vf.insert(pki)
9:
end for
10:
return true
11:
else
12:
return false
13: end if
Xi has been generated and registered in the registration phase.
At last, Vi sends the message Mi = {addri, ti, Qi, Xi, ϵi} to
RSUk which is to be connected.
ϵi = qi + xi · h(addri, Qi, ti, Xi)
(4)
2) RSU Side: Upon receiving Mi, RSUk checks the message
freshness by determining whether the equation |ti −tcur| ≤
ΔT holds, where tcur denotes the current timestamp and
ΔT denotes the max legal time interval. If not, RSUk re-
jects this message and aborts the request. Otherwise, RSUk
chooses a random number qk ∈Z∗
q, calculates the correspond-
ing public key Qk = qkP, gets the current timestamp tk,
generates the ECDSA-signed blockchain transaction TXk =
{addri, ti, Qi, Xi, ϵi, Qk, tk}sk, and sends it to the consortium
blockchain.
D. Response Phase
In this phase, the AKA request launched by Vi will be pro-
cessed by ESs, who will generate signatures as the distributed
authentication tokens for this request. If the number of these
tokens reaches the threshold, the AKA request would be con-
sideredvalid,whichmeansthattheparticipantswhoareinvolved
in the AKA session can perform the key agreement process and
establish the session key securely.
1) Message Authentication: Upon receiving TXk, ESj that
is an active ES ﬁrst checks the freshness of the timestamps tk
and ti and aborts the process if either tk or ti fails to pass the
freshness check. Second, ESj checks the validity of transaction
TXk (by verifying the corresponding ECDSA signature of the
transaction).Third,ESj callsthesmartcontractfunctiondeﬁned
in Algorithm 3 to check the validity of Xi. If the function returns
false, ESj rejects this message and aborts the request since the
publickeyortheESidentityofthemessageisconsideredinvalid.
Otherwise, ESj checks the validity of the signature according
to (5). If the equation does not hold, ESj rejects this message
and aborts the request since the message authentication does not
Algorithm 3: Public Key Veriﬁcation Function.
Input: h(pki)
Output: bool
1: ▷check whether pki exists in the ﬁlter
2: if vf.lookup(h(pki)) == true then
3:
return true
4: else
5:
return false
6: end if
Algorithm 4: Token Aggregation Function.
Input: h(TXk), σj, Rj
Output: bool
1: ▷check whether the sender is an ES
2: if msg.sender not in esa then
3:
return false
4: else
5:
▷count is used to store the token count.
6:
▷token is used to store tokens.
7:
ctr = count[h(TXk)]
8:
tokens[h(TXk)][ctr] ←(σj, Rj)
9:
count[h(TXk)] ←ctr + 1
10:
return false
11: end if
pass. Otherwise, the authentication process for the AKA request
is done.
ϵi · P
?= Qi + h(addri, Qi, ti, Xi) · Xi
(5)
2) Token Generation: Once the authentication process for
the AKA request has passed, ESj can get one main conclusion,
i.e., the AKA request message has not been modiﬁed or fab-
ricated during the transmission process. However, the vehicle
that launches the AKA request may be the malicious inside
adversary, who may produce messages that can be authenticated
but the content or behavior is malicious. To avoid this, ESj can
analyze the communication behavior of Vi according to the his-
torical communication data or log with the assistance of nearby
RSUs (we assume that ESs have been deployed with the anomaly
detection platform). If Vi is considered as a legal vehicle from the
view of ESj, then ESj can generate the token for Vi using (6),
where xk denotes the index k of ESk (i.e., xk = k based on the
index conﬁgure process in the Setup Phase). Finally, ESj calls
thesmartcontractfunctiondeﬁnedinAlgorithm4bysendingthe
signed transaction TX2
j = {h(TXk), σj, Rj = rjP}sj to the
blockchain.
σj = rj +
⎛
⎝skj
1≤k≤t

k̸=j
0 −xk
xj −xk
⎞
⎠· h (addri, addrk, PK,
h(TXk))
(6)
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:39 UTC from IEEE Xplore.  Restrictions apply. 



# Page 8

12512
IEEE TRANSACTIONS ON MOBILE COMPUTING, VOL. 23, NO. 12, DECEMBER 2024
Algorithm 5: Token Validation Function.
Input: h(TXk)
Output: (token[])
1: ctr = count[h(TXk)]
2: if ctr < t then
3:
return NULL
4: else
5:
▷return all of tokens related h(TXk).
6:
return tokens[h(TXk)]
7: end if
3) Key Agreement: Only if the number of tokens for TXk
generated by different ESs reaches the threshold t, the cor-
responding AKA request message will be considered authen-
ticated. To authenticate the AKA request message, the AKA
participants that include Vi and RSUk can call the smart contract
function deﬁned in Algorithm 5, which will return a null ﬂag
if the threshold t has not been reached or return all tokens
otherwise. If the number of the returned tokens is not null, i.e.,
the threshold t has been reached, then Vi or RSUk can use (7)
to verify the legality of TXk. If the equation does not hold, the
AKA request will be terminated. Otherwise, Vi or RSUk can use
(8) to establish the session key skik securely, which can be used
as the input of the key derivation function to generate a series of
short-term session keys for achieve secure channel together the
off-the-shelf encryption (say AES) and authentication functions
(say MAC).
t

j=1
σj · P =
t

j=1
Rj +
t

j=1
⎛
⎝skj
1≤k≤t

k̸=j
0 −xk
xj −xk
⎞
⎠· h (addri,
addrk, PK, h(TXk)) · P
=
t

j=1
Rj + h (addri, addrk, PK, h(TXk)) · PK
(7)
skik = h (qi · Qk, h(TXk)) = h (qk · Qi, h(TXk))
(8)
4) Key Revocation: To protect the privacy of the vehicles
and to avoid the full load of the on-chain ﬁlter (causing some
public keys to get kicked out), a key revocation operation will be
performed after the end of each key agreement session. ESs will
publish the public key information pks of the revoked vehicles
invoking the smart contract to perform the delete(pk) operation
for each public key (as shown in Algorithm 6), and the updated
Cuckoo ﬁlter will not contain the ﬁngerprint of the revoked
vehicle’s public key (thus the revoked vehicle will not be able
to pass the identity check).
V. SECURITY ANALYSIS
In this section, we’ll prove the correctness of the authenti-
cation equation, outline the protocol’s security model, prove its
security within this framework, and analyze security and privacy
Algorithm 6: Public Key Revocation Function.
Input: pks
Output: bool
1: if msg.sender not in esa then
2:
return false
3: else
4:
for each pk ∈pks do
5:
vf.delete(pk)
6:
end for
7: end if
requirements and the results from formal protocol veriﬁcation
tools.
A. Correctness
As described above, ESs needs to generate tokens for the
AKA request transaction TXk if the message and the cor-
responding sender both have been authenticated. The AKA
participants, including Vi and RSUk, can use (7) to check
whether the requirement is satisﬁed or not. Herein we prove
the correctness of (7) by employing the Lagrange interpolation
theorem. The proof process is as shown in (9). Note that we
use h(M) to represent h(addri, addrk, PK, h(TXk)) in the
following proof.
t

j=1
σj · P
=
t

j=1
rj · P +
t

j=1
⎛
⎝skj
1≤k≤t

k̸=j
0 −xk
xj −xk
⎞
⎠· h(M) · P
=
t

j=1
Rj +
⎧
⎨
⎩(p1(x1) + p2(x1) + · · · + pn(x1) mod q)·
1≤k≤t

k̸=1
0 −xk
x1 −xk
+ (p1(x2) + p2(x2) + · · · + pn(x2)
mod q)
1≤k≤t

k̸=2
0 −xk
x2 −xk
+ · · · + (p1(xt) + p2(xt)
+ · · · + pn(xt) mod q)
1≤k≤t

k̸=t
0 −xk
xt −xk
⎞
⎠
⎫
⎬
⎭· h(M) · P
=
⎧
⎨
⎩
⎛
⎝p1(x1)
1≤k≤t

k̸=1
0 −xk
x1 −xk
+ p1 (x2)
1≤k≤t

k̸=2
0 −xk
x2 −xk
+ · · ·
+p1(xt)
1≤k≤t

k̸=t
0 −xk
xt −xk
⎞
⎠+
⎛
⎝p2(x1)
1≤k≤t

k̸=1
0 −xk
x1 −xk
+ p2(x2)
1≤k≤t

k̸=2
0 −xk
x2 −xk
+ · · · + p2 (xt)
1≤k≤t

k̸=t
0 −xk
xt −xk
⎞
⎠
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:39 UTC from IEEE Xplore.  Restrictions apply. 



# Page 9

WEI et al.: THRESHOLD-BASED FULL-DECENTRALIZED AUTHENTICATION AND KEY AGREEMENT SCHEME
12513
+ · · · +
⎛
⎝pn(x1)
1≤k≤t

k̸=1
0 −xk
x1 −xk
+ pn (x2)
1≤k≤t

k̸=2
0 −xk
x2 −xk
+ · · · + pn(xt)
1≤k≤t

k̸=t
0 −xk
xt −xk
⎞
⎠
⎫
⎬
⎭· h(M) · P +
t

j=1
Rj
=
⎧
⎨
⎩
t

i=1
p1 (xi)
1≤k≤t

k̸=i
0 −xk
xi −xk
+
t

i=1
p2 (xi)
1≤k≤t

k̸=i
0 −xk
xi −xk
+ · · · +
t

i=1
pn (xi)
1≤k≤t

k̸=i
0 −xk
xi −xk
⎫
⎬
⎭· h(M) · P +
t

j=1
Rj
= (u1 + u2 + · · · + un) · h(M) · P +
t

j=1
Rj
=
t

j=1
Rj + h (addri, addrk, PK, h(TXk)) · PK
(9)
B. Security Model
First, we deﬁne a security model in which we use a series of
gamestoshowthebehaviorsoftheadversaryandtheinteractions
between the adversary and the challenger. The participants are
divided into three types, i.e., the vehicle Vi, roadside unit RSUk,
and edge server ESj. We use Πt
Λ to denote the t-th instance of
participant Λ ∈{Vi, RSUk, ESj}. In these games, adversary
A can send queries to multiple oracles and will receive the
corresponding response from challenger C. The detailed oracles
are deﬁned as follows.
1) Execute(Πi
V , Πk
RSU): In this oracle, the challenger C will
respond with the interaction message among instances
Πi
V and Πk
RSU after receiving the query, meaning that
the passive attacks can be simulated.
2) Send(Πt
Λ, mt): In this oracle, the challenger C will re-
spond with the corresponding message according to the
simulated protocol after receiving the request message mt
for the instance Πt
Λ, meaning that the active attacks via
modifying or fabricating messages can be simulated.
3) Reveal(Πi
V , Πk
RSU): In this oracle, the challenger C will
respond with the session key that is established between
Πi
V and Πk
RSU, meaning that the forward security can be
simulated.
4) Corrupt(Πt
Λ): In this oracle, the challenger C will respond
with the long-term secret key of the instance Πt
Λ (i.e., the
secret key of the blockchain address), meaning that the
forward security can be simulated.
5) Test(Πi
V , Πk
RSU): In this oracle, the challenger C will
check whether the instances Πi
V and Πk
RSU have been
requested in the last queries. If so, C will abort the request.
Otherwise, C will toss a random coin b ∈{0, 1}. If b ==
0, C will choose a random key skik ∈Z∗
q. Otherwise, C
will send the session key that was established by Πi
V and
Πk
RSU to A.
Deﬁnition 1 (Participants): If two instances Πt
Λ and Πt∗
Λ are
involved in the same AKA session, then Πt
Λ and Πt∗
Λ can be
considered as participants.
Deﬁnition 2 (Freshness): If neither the instance Πt
Λ nor its
participant Πt∗
Λ has requested Reveal(·) query, then we can
consider that the freshness characteristic is satisﬁed for Πt
Λ and
Πt∗
Λ.
Deﬁnition 3 (Correctness): If two instances Πt
Λ and Πt∗
Λ that
are involved in the same AKA session can calculate the common
session key correctly, i.e., the independent calculation results
are equal, then we can say that the correctness characteristic is
satisﬁed.
Deﬁnition 4 (Session Key Semantic Security): To ﬁnish the
game deﬁned above, the adversary A is required to launch
the Test(·) query and send the guess bit ˆb. If ˆb equals b that
is the actual choice of the challenger C, then we say that A
wins the game. The advantage that A wins the game is deﬁned
as the traditional semantic security deﬁnition, i.e., AdvA =
2|Pr(W) −1/2|whereW denotesthewinningevent.TheAKA
protocol satisﬁes semantic security if AdvA is negligible for any
polynomial-time bounded probabilistic adversary.
C. Proven Security
Theorem 1: If any polynomial-time bounded probabilistic ad-
versarycannotbreakECDDHP,thentheproposedAKAprotocol
satisﬁes session key semantic security under the above security
model.
Proof: In this proof, we use the well-known game-hopping
technique to construct a series of games, where the challenger
interacts with the adversary according to the speciﬁc rules. We
denote the event that A wins i-th game as Wi. And the detailed
deﬁnition of Game i is deﬁned as follows.
Game 1: In Game 1, the challenger C and adversary A follow
the original protocol without modiﬁcation. The challenger C is
provided with a ECDDHP tuple {A = aP, B = bP, C = abP}
and{A = aP, B = bP, C = cP}wherea, b, c arerandomnum-
bers in Z∗
q and uses A as a subroutine to break the ECDDHP tu-
ple. Speciﬁcally, A can request the oracles deﬁned as follows. It
is worth noting that herein the interactions related to blockchain
are simpliﬁed to the core cryptographic operations.
1) Send(Πi
V , Πk
RSU, reg): Before processing all Send(·)
queries, C initiates parameters according to the real
scheme and key-value maps at ﬁrst. Upon receiving
this query, C checks whether KV1[Πi
V ] is null or not.
If not null, C returns KV1[Πi
V , Πk
RSU] to A. Other-
wise, C generates ti, ei, addri, Xi, and TX1
i for Πi
V
and tk, Qk, TXk for Πk
RSU using the protocol method,
stores {ti, ei, addri, Xi, TX1
i , tk, Qk, TXk} as the value
of KV1[Πi
V , Πk
RSU], and sends the value tuple to A.
2) Send(Πi
V , Πk
RSU, {Xi}): Upon receiving this query, C
checks whether KV1[Πi
V , Πk
RSU] is empty or not. If so, C
terminates this query. Otherwise, C extracts the value tuple
from KV1[Πi
V , Πk
RSU], chooses qi, qk ∈Z∗
q, calculates
Qi, Qk, and ϵi using Xi, generates TXk, and sends TXk
to A.
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:39 UTC from IEEE Xplore.  Restrictions apply. 



# Page 10

12514
IEEE TRANSACTIONS ON MOBILE COMPUTING, VOL. 23, NO. 12, DECEMBER 2024
3) Send(Πi
V , Πk
RSU, {TXk}): Upon receiving this query, C
veriﬁes the validity of TXk using the veriﬁcation algo-
rithm of ECDSA and veriﬁcation equation as shown in
(5). If any of the veriﬁcation fails, C terminates the check.
Otherwise, C generates the tokens σj(1 ≤j ≤t) using
(6), stores KV2[Πi
V , Πk
RSU] = σj(1 ≤j ≤t) sends these
tokens to A. Note that the number of engaged ESs is t for
simplicity.
4) Send(Πi
V , Πk
RSU, {TXk, σj(1 ≤j ≤t)}): Upon receiv-
ing this query, C checks the validity of tokens using (7). If
not valid, C terminates this query. Otherwise, C calculates
the session key skik using (8), stores KV3[Πi
V , Πk
RSU] =
skik, and sets the instances Πi
V and Πk
RSU as unfreshed
instances.
5) Execute(Πi
V , Πk
RSU): Upon receiving this query, C ex-
tracts the corresponding values of KV1[Πi
V , Πk
RSU] and
KV2[Πi
V , Πk
RSU]. If one of the two values is empty, C
terminates this query. Otherwise, C sends the two values
to A.
6) Corrupt(Πi
V , Πk
RSU): Upon receiving this query, C checks
if KV3[Πi
V , Πk
RSU] is exmpty or not. If so, C terminates
this query. Otherwise, C sends the value that is the estab-
lished session key for Πi
V and Πk
RSU to A.
7) Test(Πi
V , Πk
RSU): Upon receiving this query, C checks in-
stances Πi
V and Πk
RSU are fresh or not. If not, C terminates
this query. Otherwise, C tosses a random coin b ∈{0, 1}.
If b == 1, C extracts skik = KV3[Πi
V , Πk
RSU] and sends
skik to A. Otherwise, C chooses a random key that has the
same length of skik and sends it to A.
It is obvious the above process is the same as the original
protocol, resulting in (10) being satisﬁed.
AdvA = 2|Pr(W1) −1/2|
(10)
Game 2: In this game, all interactions are the same with Game
1 except that all hash functions are simulated as random oracles.
Speciﬁcally, upon receiving the request mi for the hash function
h(·), C checks whether h(mi) is empty or not. If so, C chooses
a random number ri, sets h(mi) = ri, and sends h(mi) to A.
Otherwise, C returns h(mi) to A directly. It is obvious that Game
2 is indistinguishable from the view of A, resulting in (11) being
satisﬁed.
Pr(W2) = Pr(W1)
(11)
Game 3: In this game, all interactions are identical to Game
2 except that existential unforgeability under adaptive chosen
message attacks (EU-CMA) are resisted. Before analyzing the
winning advantage, we ﬁrst prove that the authentication part
of our proposed AKA scheme can be reduced to the hardness
that breaks Schnorr signature. To prove it, we can construct the
simulation where the number of involved ESs equals to t, i.e., the
involved ESs are ES1, ES2, . . ., ESt. Among these ESs, we
assume that the adversary A controls ES1, . . ., ESt−1 whereas
the forger F controls the honest participant ESt (thus generality
will not be lost). Based on the input of public key PK = uP
for the Schnorr signature algorithm, F interacts with A using
the following simulations.
1) Initialization: a) F chooses a random u1 ∈Z∗
q, calcu-
lates U1 = u1P and p1(x), and sends public material
{(U1, p1(j))|2 ≤j ≤t} to A. b) A is required to send
{(pj(1), Uj)|2 ≤j ≤t} to F. c) Based on the public
key PK = uP, F rewinds A to step a) for replacing U1
with ˆ
U1 = PK −t
j=2 Ui, so that the public material
received by A is { ˆ
U1, p1(j)|2 ≤j ≤t}.
2) Token Generation: a) For the token generation query for
the AKA request message m, F chooses two random
elements R1 ∈G and σ1 ∈Z∗
q and sends them to A.
b) A is required to send (Rj, σj)|2 ≤j ≤t to C. c) C
sends m to the Schnorr signature oracle to get (σ, R),
calculates ˆ
R1 = R −t
j=2 Rj and ˆσ1 = σ −t
j=2 σj,
and rewinds A to step a) for replacing (R1, σ1) with
( ˆ
R1, ˆσ1).
In the above simulation, we can see that the produced tokens
are valid since (12) holds, satisfying the veriﬁcation method
according to (7). Additionally, the difference between the real
view and the simulated view is that we use ˆ
U1 and ˆ
R1 to replace
U1 and R1, respectively. It is obvious that these two generation
methods are computationally indistinguishable from the view
of A. Therefore, we can construct a distinguisher that distin-
guishes Game 2 and Game 3 with the probability identical to
breaking Schnorr and ECDSA (used for providing the integrity
of the transaction message in the protocol) signature algorithms.
According to the proofs in [26], [27], the advantages of breaking
ECDSA and Schnorr signature algorithms for the PPT-advesary
under the random oracle satisfy (13) and (14) where qs denotes
the request number of Send(·) oracle and ϵ denotes the proba-
bility of breaking ECDLP, respectively, resulting that (15) can
be deduced.
t

j=1
σj · P =
⎛
⎝ˆσ1 +
t

j=2
σj
⎞
⎠· P
=
⎛
⎝σ −
t

j=2
σj +
t

j=2
σj
⎞
⎠· P
= σ · P
= R + h(PK, m) · uP
= ˆ
R1 +
t

j=2
Rj + h(PK, m) · PK
(12)
ϵ1 ≤
3qs(qs + qh)
(q −1)/2 −qs −qh
+ (qs + qh)2/2q + qhϵ
(13)
ϵ2 ≤

q + 2qs(qs + qh) + q(qs + qh)ϵ
q
(14)
|Pr(W3) −Pr(W2)| ≤ϵ1 + ϵ2
(15)
Game 4: In this game, C chooses the random index idx ∈qs
and replaces Qi, Qk, and Qik with A, B, and C in the idx-th
Send(·) oracle, respectively, resulting that We can construct a
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:39 UTC from IEEE Xplore.  Restrictions apply. 



# Page 11

WEI et al.: THRESHOLD-BASED FULL-DECENTRALIZED AUTHENTICATION AND KEY AGREEMENT SCHEME
12515
distinguisher that can distinguish Game 3 and Game 4. If this
distinguisher can distinguish Game 4 and Game 3, then C can
use A to act as a subroutine to break ECDDHP. According to
the analysis, it is obvious that (16) holds, where ϵ∗denotes the
probability of breaking ECDDHP.
|Pr(W4) −Pr(W3)| ≤qs · ϵ∗
(16)
In Game 4, A cannot distinguish a random key and skik that
is established using (8) with non-negligible probability unless
A happens to guess h(qi · Qk, h(TXk)) successfully, and the
probability of which reaches up to qh/q. Therefore, we can
deduce that (17) holds. By combining (10)–(17), we can get
(18).
|Pr(W4)| ≤1
2 + qh/q
(17)
AdvA = 2|Pr(W1) −1/2|
= 2|Pr(W2) −1/2|
= 2|Pr[W2] −Pr[W3] + Pr[W3] −Pr[W4]
+ Pr[W4] −1
2|
≤2(|Pr[W3] −Pr[W2]| + |Pr[W4] −Pr[W3]|
+ |Pr[W4] −1
2|)
≤2(ϵ1 + ϵ2 + qs · ϵ∗+ qh/q)
≤
6qs(qs + qh)
(q −1)/2 −qs −qh
+ 2(qs + qh)2/2q + 2qhϵ
+ 2

q + 2qs(qs + qh) + q(qs + qh)ϵ
q
+ 2qs
· ϵ∗+ 2qh/q
(18)
D. Security and Privacy Requirements
1) Mutual authentication: In the response phase, the ES
authenticates the validity of transaction TXk, Xi, and the
signatures ϵi through the signature veriﬁcation algorithm
and (5), respectively. Simultaneously, to prevent AKA
requests from vehicles vulnerable to internal attacks,
ES analyzes the historical communication data or logs
of Vi with the assistance of nearby RSUs for vehicle
authentication. Upon successful vehicle authentication,
ESj generates an authentication token for TXk using
(6). When transaction TXk acquires signature authenti-
cation tokens from t nodes originating from various ESs,
both Vi and RSUk can independently authenticate TXk
using (7). This authentication process guarantees the
legitimacy and integrity of the AKA message, which has
been proved in Theorem 1. Thus, the protocol achieves
authentication for the transmitted message and its corre-
sponding sender.
2) Conﬁdentiality: The protocol generates the session keys
h(qi · Qk, h(TXk)) and h(qk · Qi, h(TXk)), which can
only be computed by Vi and RSUk. As the private keys,
qi and qk, are required for session key generation and are
exclusively held by the user, no other entity can calculate
the session key except for Vi and RSUk. Consequently,
the protocol ensures conﬁdentiality.
3) Resistance to replay attacks: In the scheme, timestamps
ti and tk are added to the transaction for authentication,
and the message receiver ﬁrst checks the freshness of the
timestamp and refuses to perform subsequent agreement
requests upon receiving an expired message. Thus, the
check of timestamps is able to resist replay attacks.
4) Resistance to man-in-the-middle attacks: Within this
scheme,itisunfeasibleforanadversarytoexecuteaman-
in-the-middle attack through the forgery of a signature
transaction. Any alterations by an adversary to the reg-
istered account address, public or private key, or times-
tamp within the signature transaction would obstruct the
authentication process and hinder the generation of the
correct session key.
5) Resistance to DDoS attacks: In the event of an adversary
initiating a DDoS attack to inject a substantial volume of
messages into the VANETs, it can lead to delays in ful-
ﬁlling legitimate requests. To counteract this, the scheme
adds timestamps, enabling users to efﬁciently ﬁlter out
a signiﬁcant number of expired messages by assessing
their freshness. In addition, the consortium blockchain
in the scheme consists of multiple semi-trusted entities,
which greatly improves the robustness of the system.
6) Resistance to collusion attacks: The adversary can col-
lude with semi-trusted ESs for authentication, and ac-
cording to the deﬁnition of the polynomial, it must con-
trol at least t semi-trusted ESs to make a fabricated AKA
message pass the authentication, which is an infeasible
scenario in the real VANETs provided that a suitable
value t is set up.
7) Resistance to key exposure attacks: All ESs have the
corresponding private key to generate the token. Even if
the private key is compromised or leaked, the established
session keys would not be affected since the private key
is not involved in the key agreement process.
8) Forward and backward secrecy: The private keys used
for key agreement in Vi and RSUk, respectively, are ran-
domly generated, so the private keys in different sessions
are not correlated. It also means that the session keys
generated in different sessions are not correlated, so the
protocol has forward and backward secrecy.
9) Perfect forward security: In our proposed AKA scheme,
thelong-termsessionkeysownedbythevehiclesareonly
for generating messages that can be authenticated by the
receivers. In other words, the long-term session keys are
separated from the key agreement process. Therefore, the
perfect forward security can be achieved.
10) Conditional privacy-preserving: The identity informa-
tion of the vehicle is securely stored in the ciphertext
EAi, which cannot be decrypted even if the adversary
steals the message sent by the vehicle. However, when
the vehicle sends a malicious behavior, ESj can decrypt
EAi to obtain the address information addri and the
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:39 UTC from IEEE Xplore.  Restrictions apply. 



# Page 12

12516
IEEE TRANSACTIONS ON MOBILE COMPUTING, VOL. 23, NO. 12, DECEMBER 2024
TABLE I
SECURITY AND PRIVACY COMPARISONS
information idi of the vehicle. Therefore, our proposed
scheme achieves conditional privacy protection.
E. Security and Privacy Comparisons
In this section, we conduct a comparative analysis between
our proposed scheme and several related schemes, including
Yang et al.’s scheme [28], Vangala et al.’s scheme [6], and Ma
et al.’s scheme [19] in terms of the satisﬁed security and privacy
requirements. Let R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, and
R11 denote mutual authentication, conﬁdentiality, resistance to
replay attacks, resistance to man-in-the-middle attacks, forward
and backward secrecy, resistance to DDoS attacks, conditional
privacy-preserving, resistance to collusion attacks, perfect for-
ward security, resistance to key exposure attacks, required trust
level of servers. Table I presents a comprehensive comparison
of security and privacy aspects. Our proposed scheme exhibits
a higher degree of satisfaction for a greater number of security
and privacy requirements.
F. Analysis With Verifpal
Verifpal is a cryptographic protocol validation tool for veri-
fying the correctness of security protocols. It helps developers
and security experts to check communication protocols such
as authentication protocols, key exchange protocols, etc. To
ensure their effectiveness and security in protecting user data
and privacy. It is based on formal veriﬁcation techniques and
uses a methodology called Veriﬁable Security Protocol Analysis
to automatically verify that a protocol meets certain security
properties. These security properties can include authentication,
conﬁdentiality, integrity, and more.
We employed the Verifpal tool to verify the security and
correctness of our proposed scheme. The information interaction
in our scheme takes place mainly in the entities RSU, Vehicle,
ES, and the blockchain network consisting of ESs. We use the
Verifpal tool to verify the conﬁdentiality and authenticity of
the information interacting between the entities in our scheme.
Speciﬁcally, we veriﬁed the encrypted message EAi, the signed
transactions TX1
j , TX1
i , ϵi, TXk, TX2
j . As for the secret
sharing scheme, we harnessed Verifpal-Shamir’s SSS function
to verify its reliability. This entailed the node ESG generating
three secret shares of the secret value s, which were securely dis-
tributed to the nodes ESA and ESB. In the authentication phase,
the secret value s can be reconstructed based on information
fromanytwoES nodes.Finally,weconﬁrmedthatboththeRSU
and the vehicle have successfully computed the session key for
Fig. 4.
Verifpal veriﬁcation.
their subsequent communication. The results of our simulations
using Verifpal are shown in Fig. 4
VI. PERFORMANCE ANALYSIS
In this section, we analyze the performance of our proposed
scheme, where several tools were used for building the simula-
tion environment. Speciﬁcally, the testbed is a PC that equips
Intel i7-11700 K CPU together with 16 GB RAM. We use Veins
framework that is based on the network simulation platform
OMNeT++ [29] and trafﬁc simulation software SUMO [30]
for measuring the communication performance in VANETs
environment, Miracl cryptography library[31] for measuring the
execution time of cryptographic operations, and Ganache [32]
together with Trufﬂe framework that is a development environ-
ment, testing framework, and asset pipeline of Ethereum for
measuring the blockchain-related performance.
A. Computational Costs Analysis
This section focuses on analyzing the computational costs of
our proposed scheme and some other AKA schemes in VANETs
including Yang et al.’s scheme [28], Vangala et al.’s scheme [6],
and Ma et al.’s scheme [19]. We ﬁrst introduce the representation
and meaning of the computation time of each operation in the
proposedschemeandotherrelatedschemes.WedenoteTh,Taes,
Tmtp, Tp, Tsm−bp, Tpa, Tsm−ecc, Teca, Tbp as hash function
operation, AES encryption/decryption operation, map-to-point
function operation, bilinear pairing operation, scalar multiplica-
tion operation related to bilinear pairing, point addition opera-
tion related to bilinear pairing, scalar multiplication operation
related to elliptic curve, point addition operation related to
ellipticcurve,bivariatet-polynomialoperation(t = 10).TableII
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:39 UTC from IEEE Xplore.  Restrictions apply. 



# Page 13

WEI et al.: THRESHOLD-BASED FULL-DECENTRALIZED AUTHENTICATION AND KEY AGREEMENT SCHEME
12517
TABLE II
THE EXECUTION TIME OF INVOLVED CRYPTOGRAPHIC OPERATIONS
lists out the execution time. It is worth noting that we ignored
some operations with negligible computational costs, such as
Exclusive-OR operation.
In the Auth-I phase of Yang et al.’s scheme [28], to es-
tablish an authenticated session key, the vehicle must acquire
the shares of at least t edge nodes to achieve authentication.
After accomplishing the authentication, the vehicle and leader
EN can get the session key computed by the hash function
operation. The vehicle needs to perform (t + 2) bilinear pairing
operations, 3 scalar multiplication operations related to ellip-
tic curve, 2 hash function operations, (2t −2) point addition
operations related to elliptic curve, and (t + 3) map-to-point
function operations, so the computational cost of the vehi-
cle is (t + 2)Tp + 3Tsm−ecc + (t + 3)Tmtp + (2t −2)Teca +
2Th ≈(7.454 + 3.111t) ms, while an edge node needs to per-
form 4 bilinear pairing operations, 2 scalar multiplication oper-
ations related to elliptic curve, 1 hash function operation, and 4
map-to-point function operations, so the computational cost of
an edge node is 4Tp + 2Tsm−ecc + 4Tmtp + 1Th ≈13.261 ms.
In the AKA phase of Vangala et al.’s scheme [6], both the
vehicle and fog server need to perform 24 hash function op-
erations, 10 scalar multiplication operations related to elliptic
curve, and 4 point addition operations related to elliptic curve.
So, the AKA-related computational cost of the vehicle or fog
server is 24Th + 10Tsm−ecc + 4Teca ≈3.986 ms.
In the AKA phase of Ma et al.’s scheme [19], the vehicle
needs to perform 2 bivariate polynomial calculation operations,
5 scalar multiplication operations related to elliptic curve and
1 point addition operation related to elliptic curve, and 1 AES
encryption operation, so the computational cost of the vehicle is
2Tbp + 5Tsm−ecc + Teca + Taes ≈2.86 ms. The RSU needs to
perform 2 bivariate polynomial calculation operations, 4 scalar
multiplication operations related to elliptic curve and one point
addition operation, and 1 AES decryption operation, so the
computational cost of the RSU is 2Tbp + 4Tsm−ecc + Teca +
Taes ≈2.467 ms.
In the AKA phase of our proposed scheme, the vehicle
needs to perform 6 scalar multiplication operations related
to elliptic curve, (t + 1) point addition operations related to
elliptic curve, and 4 hash function operations, so the com-
putational cost of the vehicle is 6Tsm−ecc + (t + 1)Teca +
4Th ≈(2.368 + 0.002t) ms. The RSU needs to perform 7
scalar multiplication operations related to elliptic curve, (t + 1)
Fig. 5.
The comparison of computational costs.
point addition operations related to elliptic curve, and 6 hash
operations, so the computational cost of the RSU is 7Tsm−ecc +
(t + 1)Teca + 5Th ≈(2.763 + 0.002t) ms. Each ES needs to
perform 4 scalar multiplication operations related to elliptic
curve, 1 point addition operation related to elliptic curve, and 4
hash function operations, so the computational cost of an ES is
4Tsm−ecc + Teca + 4Th ≈1.582 ms.
Based on the analysis presented above, the comparison of
computational cost is as shown in Fig. 5. From Fig. 5, we can
ﬁnd that our proposed scheme outperforms all other compared
schemes in terms of vehicle computational cost; Additionally,
the computational cost incurred by RSU/EN is comparable to
the Vangala et al.’s scheme [6] and Ma et al.’s scheme [19],
which is obviously better than Yang et al.’s scheme [28], which
indicates that our proposed scheme occupies less computational
resources.
B. Communication Costs Analysis
This section focuses on analyzing the communication costs of
our proposed scheme and some other AKA schemes in VANETs
including Yang et al.’s scheme [28], Vangala et al.’s scheme [6],
and Ma et al.’s scheme [19]. We set the 128-bit security level,
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:39 UTC from IEEE Xplore.  Restrictions apply. 



# Page 14

12518
IEEE TRANSACTIONS ON MOBILE COMPUTING, VOL. 23, NO. 12, DECEMBER 2024
and we construct bilinear pairings on an elliptic curve E : y2 =
x3 + x, where G is an additive group with order q and q is a
256-bit prime. At the same time, we choose an elliptic curve
E : y2 = x3 + ax + b mod p, where p and the order q are two
256-bit primes and a, b ∈Zq. Note that for the reasonableness
of the comparison, we only consider the costs of the AKA phase.
In the AKA phase of Yang et al.’s scheme [28], in order
to establish a session key between the vehicle and the leader
EN. First, the vehicle needs send req = {IDV, Y, R1, R2, Ts}
to the leader EN Fi, where IDv is the vehicle id, Y , R1,
R2 are elements of G1, and Ts is a timestamp. Therefore,
the communication cost related to AKA for the vehicle is
(512 ∗3 + 256 + 32)/8 = 228 bytes. Then the leader EN Fi
needs to send the req with EXP to the other ENs for authentica-
tion, where the EXP ∈Zq. After receiving the messages from
Fi, a set of at least (t −1) ENs are ready to collaboratively
authenticate the vehicle and return their Vj and Wj to Fi after
determining the legality of the vehicle, where the Vj and Wj
are elements of G1. Finally, The leader EN Fi will send all
the pairs of (Vk, Wk) and C to the vehicle, where C ∈Zq.
Therefore, the communication cost related to AKA for a leader
EN Fi or EN j are (512 ∗3 + 256 ∗3 + 32 + 512 ∗2t)/8 =
(292 + 128t) bytes and (512+512)/8 = 128 bytes.
In the MVFS AKA phase of Vangala et al.’s scheme [6],
in order to establish a session key between the vehicle and
the fog node. The vehicle needs to send the temporary iden-
tity TIDM, {UM, TIDM, RID∗
M, SigM, Kh
M, TSmf1}, and
{SKVmf, TSmf3, TID∗
F } to fog node FS, where TIDM,
SKVmf, SigM, Kh
M, TID∗
F , RID∗
M
are hash values,
TSmf1, TSmf3 are timestamps, and UM ∈G Therefore, the
communication cost of the vehicle for AKA is (256 ∗7 +
32 ∗2 + 512)/8 = 296 bytes. The fog node needs to send
{TIDM,
K∗
M,
EP ubM (IDM, KMVi,F Sj, RIDM, TSmc)}
and {VF , SigF , TID∗
M, TIDF , RID∗
F , Kh
F , TSmf2} to vehi-
cle, where VF ∈G, TIDF , K∗
M, SigF , TID∗
M, RID∗
F , Kh
F
are hash values, and TSmf2 is a timestamp. Therefore, the
communication cost of the fog node for AKA is (256 ∗10 +
32 ∗2 + 512 ∗2)/8 = 392 bytes.
In the AKA phase of Ma et al.’s scheme [19], in order
to establish a session key between the vehicle and the RSU.
The vehicle needs to send {IDv, KVv, Mreq, Tv, HC1, S1}
to RSU for authentication, and {IDv, HC2, C1, Tv} for key
agreement, where the IDv is the vehicle id, KVv is an
element of GFq, Mreq is the request message, Tv is a
timstamp, HC1, HC2 are hash values, C1 is an ECIES en-
cryption ciphertext of a hash value, and S1 is an ECDSA
signature. Therefore, the communication cost related to AKA for
the vehicle is (32 + 256 + 32 + 256 + 256 ∗2 + 32 + 256 +
256 + 32)/8 = 208 bytes. The RSU needs to send the message
{IDRSU, Mres, TRSU, S2} and {IDrsu, IDv, HC3, TRSU} to
vehicle, where the Mres is the response message. Therefore,
the communication cost related to AKA for RSU is (32 + 32 +
256 ∗2 + 32 + 256 + 32)/8 = 112 bytes.
In the AKA phase of our proposed scheme, in order to
establish a session key between the vehicle and the RSU. The
vehicle needs to send {addri, ti, Qi, Xi, ϵi} to RSU for key
Fig. 6.
The comparison of communication costs.
agreement, where the addri is the vehicle address, ti is a
timestamp, Qi and Xi ∈G, and ϵi is the signature. There-
fore, the communication cost related to AKA for the vehicle
is (256 ∗2 + 512 ∗2 + 32)/8 = 196 bytes. The RSU needs to
send {addri, ti, Qi, Xi, ϵi, Qk, tk, } that is an ECDSA-signed
transaction TXk to blockchain for authentication, where tk is
also a timestamp. Additionally, the vehicle needs to extract
the tokens via Algorithm 5, resulting in the RSU needing to
send the requested t tokens {h(TXk), σj} together with the
corresponding ECDSA signature to the vehicle. Therefore, the
communication cost related to AKA for the RSU is (256 ∗2 +
32 ∗2 + 512 ∗4 + (256 + 512)t)/8 = 328 + 96t bytes.
Based on the analysis presented above, the comparison of
communication cost is as shown in Fig. 6. From Fig. 6, we can
ﬁnd that our proposed scheme outperforms all other compared
schemes in terms of vehicle communication costs; Additionally,
the communication costs incurred by RSU/EN are comparable
to that of the other compared schemes, suggesting that our pro-
posed scheme holds certain advantages in terms of transmission
bandwidth.
C. Network Simulation Analysis
To analyze the real performance of our proposed scheme,
we use Veins 5.2 framework that is a middleware between
OMNeT++ and SUMO to simulate our proposed scheme. In our
simulation, we set up an environment based on a real-world map
with 2.5 square kilometers. One hundred vehicles communicate
with two RSUs using IEEE 802.11p. Speciﬁcally, every vehicle
sends the AKA request message to RSU in a random interval
that is slightly higher than one second (so frequent but random
AKArequestscanbesimulated)andRSUwouldsendtheunicast
communication.
We conduct an analysis of the AKA delay for these schemes.
The AKA delay, in this context, is deﬁned as the cumulative sum
of the transmission delay and computational delay associated
with AKA operations. It can be computed using (19), where M
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:39 UTC from IEEE Xplore.  Restrictions apply. 



# Page 15

WEI et al.: THRESHOLD-BASED FULL-DECENTRALIZED AUTHENTICATION AND KEY AGREEMENT SCHEME
12519
Fig. 7.
The average AKA delays of our proposed and comparison schemes.
Fig. 8.
The processing delays for state-changing blockchain operations.
represents the number of vehicles participating in AKA sessions,
mj signiﬁes the number of AKA sessions for vehicle Vj, tk
end
denotes the message receiving time for session k, tk
beg indicates
the request initiation time for session k, and taka accounts
for the computational time required for AKA-related operations.
The simulation results portraying the average AKA delays are
visually presented in Fig. 7. This depiction showcases a notable
advantage of our proposed scheme signiﬁcantly lower AKA
delays in comparison to other AKA schemes.
AKADelay = 1
M
M

j=1

1
mj
mj

k=1

tk
beg −tk
end + taka


(19)
D. Blockchain-Related Costs Analysis
Since our proposed AKA scheme relies on blockchain,
we used Ganache to build a consortium blockchain network,
implemented the smart contract using Solidity programming
language, and used Trufﬂe framework to measure the real per-
formance. Our evaluation includes two types, i.e., gas costs and
processing delays, where gas costs refer to the gas used for
the state-changing blockchain operations, and processing delay
refers to the distance between the request launching time and
responding time.
As for the gas costs, we use the Web3 callback function of the
transaction receipt to measure the gas costs, where the collection
results are as shown in Table III. The gas cost for ﬁlter initiation
operation in Table III is represented with a bivariate linear equa-
tion in which i and b denote the bucket number of the ﬁlter and
the slot number of one bucket, respectively. The ﬁlter initiation
operationisexecutedsubsequentlyafterthecontractdeployment
TABLE III
THE GAS COSTS OF STATE-CHANGING OPERATIONS
for building the initial ﬁlter or adjusting the capacity during the
contract running process. Note that the bivariate linear equation
isgeneratedusingthemultiplelinearregressionmethodbasedon
our experiment, which sets up multiple combinations of different
i and b.
As for the processing delays, we built an experiment that
simulates 100 vehicles sending different transactions to trig-
ger the executions of state-changing blockchain operations,
where the results can be shown in Fig. 8. From Fig. 8, we can
see that the processing delay has certain ﬂuctuations because
of the task scheduling mechanism for operating systems and
the transaction processing variety of the blockchain network.
Additionally, the average processing delays for vehicle registra-
tion, public key registration, token registration, and public key
revocation operations are 212.270 ms, 238.317 ms, 298.843 ms,
and 238.592 ms, respectively.
According to the simulation experiments, the processing de-
lay in our proposed scheme adheres to the speciﬁed maximum
delay standard (500 ms) for V2X communication within the
high latency, low-frequency category of applications outlined in
T/CSAE 53-2020 [33]. Additionally, considering the infrequent
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:39 UTC from IEEE Xplore.  Restrictions apply. 



# Page 16

12520
IEEE TRANSACTIONS ON MOBILE COMPUTING, VOL. 23, NO. 12, DECEMBER 2024
utilization of AKA in real-world scenarios, the natural gas costs
in our scheme are deemed reasonable. Therefore, it can be
concluded that our scheme can meet the requirements of most
applications in the VANETs.
VII. CONCLUSION
Herein we have proposed a threshold-based full-decentralized
AKA scheme for VANETs powered by consortium blockchain.
In this scheme, semi-trusted ESs are used as the trust infrastruc-
ture to provide the authentication service, freeing the reliance
on the ideal full-trust environment. The design leverages the
concept of threshold-based voting, ensuring that the security of
the system is not affected by certain violated ESs, thus enhancing
the overall security. Additionally, we have designed a distributed
authentication mechanism based on the Cuckoo ﬁlter and smart
contract. This mechanism ensures the authenticity of AKA mes-
sages while implementing public key registration, validation,
and revocation functions with low on-chain operation costs.
Furthermore, our scheme includes rigorous proof of correctness,
security, and adherence to fundamental security and privacy
requirements. We also validate the interaction security within
the protocol using the formal veriﬁcation tool Verifpal. Finally,
a performance analysis demonstrates the advantages of our
proposed scheme in terms of computation costs, communication
costs, and simulation performance.
ACKNOWLEDGMENT
The authors are very grateful to the anonymous referees for
their detailed comments and suggestions regarding this paper.
REFERENCES
[1] P. Vijayakumar, M. Azees, S. A. Kozlov, and J. J. Rodrigues, “An anony-
mous batch authentication and key exchange protocols for 6G enabled
VANETs,” IEEE Trans. Intell. Transp. Syst., vol. 23, no. 2, pp. 1630–1638,
Feb. 2022.
[2] A. Dua, N. Kumar, A. K. Das, and W. Susilo, “Secure message communi-
cation protocol among vehicles in smart city,” IEEE Trans. Veh. Technol,
vol. 67, no. 5, pp. 4359–4373, May 2018.
[3] M. A. Saleem, X. Li, M. F. Ayub, S. Shamshad, F. Wu, and H. Abbas, “An
efﬁcient and physically secure privacy-preserving key-agreement protocol
for vehicular ad-hoc network,” IEEE Trans. Intell. Transp. Syst., vol. 24,
no. 9, pp. 9940–9951, Sep. 2023.
[4] L. Wei, J. Cui, H. Zhong, I. Bolodurina, and L. Liu, “A lightweight and
conditional privacy-preserving authenticated key agreement scheme with
multi-TA model for fog-based VANETs,” IEEE Trans. Dependable Secure
Comput., vol. 20, no. 1, pp. 422–436, Jan./Feb. 2023.
[5] X. Li, J. Liu, M. S. Obaidat, P. Vijayakumar, Q. Jiang, and R. Amin,
“An unlinkable authenticated key agreement with collusion resistant for
VANETs,” IEEE Trans. Veh. Technol, vol. 70, no. 8, pp. 7992–8006,
Aug. 2021.
[6] A. Vangala, A. K. Das, A. Mitra, S. K. Das, and Y. Park, “Blockchain-
enabled authenticated key agreement scheme for mobile vehicles-assisted
precision agricultural IoT networks,” IEEE Trans. Inf. Forensics Security,
vol. 18, pp. 904–919, Dec. 2023.
[7] Y. Liu, Y. Wang, and G. Chang, “Efﬁcient privacy-preserving dual au-
thentication and key agreement scheme for secure V2V communications
in an IoV paradigm,” IEEE Trans. Intell. Transp. Syst., vol. 18, no. 10,
pp. 2740–2749, Oct. 2017.
[8] J.-L. Huang, L.-Y. Yeh, and H.-Y. Chien, “ABAKA: An anonymous batch
authenticated and key agreement scheme for value-added services in
vehicular ad hoc networks,” IEEE Trans. Veh. Technol, vol. 60, no. 1,
pp. 248–262, Jan. 2011.
[9] X. Wang, Z. Huang, Q. Wen, and H. Zhang, “An efﬁcient anonymous batch
authenticated and key agreement scheme using self-certiﬁed public keys
in VANETs,” in Proc. IEEE Int. Conf. IEEE Region 10, 2013, pp. 1–4.
[10] Q. Jiang, J. Ni, J. Ma, L. Yang, and X. Shen, “Integrated authentication and
key agreement framework for vehicular cloud computing,” IEEE Netw.,
vol. 32, no. 3, pp. 28–35, May/Jun. 2018.
[11] J. Cui, Y. Wang, J. Zhang, Y. Xu, and H. Zhong, “Full session key
agreement scheme based on chaotic map in vehicular ad hoc networks,”
IEEE Trans. Veh. Technol, vol. 69, no. 8, pp. 8914–8924, Aug. 2020.
[12] S. H. Islam, M. S. Obaidat, P. Vijayakumar, E. Abdulhay, F. Li, and
M. K. C. Reddy, “A robust and efﬁcient password-based conditional
privacy preserving authentication and group-key agreement protocol for
VANETs,” Future Gener. Comput. Syst., vol. 84, pp. 216–227, 2018.
[13] J. Cui, X. Tao, J. Zhang, Y. Xu, and H. Zhong, “HCPA-GKA: A hash
function-based conditional privacy-preserving authentication and group-
key agreement scheme for VANETs,” Veh. Commun., vol. 14, pp. 15–25,
2018.
[14] L. Zhang, Q. Wu, J. Domingo-Ferrer, B. Qin, and C. Hu, “Distributed
aggregate privacy-preserving authentication in VANETs,” IEEE Trans.
Intell. Transp. Syst., vol. 18, no. 3, pp. 516–526, Mar. 2017.
[15] S.Son,J.Lee,Y.Park,Y.Park,andA.K.Das,“Designofblockchain-based
lightweight V2I handover authentication protocol for VANET,” IEEE
Trans. Netw. Sci. Eng., vol. 9, no. 3, pp. 1346–1358, May/Jun. 2022.
[16] C. Lin, X. Huang, and D. He, “EBCPA: Efﬁcient blockchain-based condi-
tional privacy-preserving authentication for VANETs,” IEEE Trans. De-
pendable Secure Comput., vol. 20, no. 3, pp. 1818–1832, May/Jun. 2023.
[17] F. Li, Z. Guo, C. Zhang, W. Li, and Y. Wang, “ATM: An active-detection
trust mechanism for VANETs based on blockchain,” IEEE Trans. Veh.
Technol, vol. 70, no. 5, pp. 4011–4021, May 2021.
[18] H. Feng, D. Chen, and Z. Lv, “Blockchain in digital twins-based vehicle
managementinVANETs,”IEEETrans.Intell.Transp.Syst.,vol.23,no.10,
pp. 19 613–19 623, Oct. 2022.
[19] Z. Ma, J. Zhang, Y. Guo, Y. Liu, X. Liu, and W. He, “An efﬁcient
decentralized key management mechanism for VANET with blockchain,”
IEEE Trans. Veh. Technol, vol. 69, no. 6, pp. 5836–5849, Jun. 2020.
[20] Q. Zhang et al., “Blockchain-based asymmetric group key agreement
protocol for Internet of Vehicles,” Comput. Elect. Eng., vol. 86, 2020,
Art. no. 106713.
[21] C.Meng,H.Zhang,H.Ji,andX.Li,“Mutualauthenticationanddistributed
key management with permissioned blockchain in MEC-enabled vehicular
networks,” in Proc. 7th IEEE Int. Conf. Netw. Intell. Digit. Content, 2021,
pp. 393–397.
[22] D. Chattaraj, B. Bera, A. K. Das, S. Saha, P. Lorenz, and Y. Park,
“Block-CLAP: Blockchain-assisted certiﬁcateless key agreement protocol
for Internet of Vehicles in smart transportation,” IEEE Trans. Veh. Technol,
vol. 70, no. 8, pp. 8092–8107, Aug. 2021.
[23] Z. Xu, W. Liang, K.-C. Li, J. Xu, and H. Jin, “A blockchain-based roadside
unit-assisted authentication and key agreement protocol for Internet of
Vehicles,” J. Parallel Distrib. Comput., vol. 149, pp. 29–39, 2021.
[24] D. Boneh and V. Shoup, “A graduate course in applied cryptography,”
2020. [Online]. Available: http://toc.cryptobook.us
[25] B. Fan, D. G. Andersen, M. Kaminsky, and M. D. Mitzenmacher, “Cuckoo
ﬁlter: Practically better than bloom,” in Proc. 10th ACM Int. Conf. Emerg.
Netw. Experiments Technol., 2014, pp. 75–88.
[26] M. Fersch, E. Kiltz, and B. Poettering, “On the provable security of (EC)
DSA signatures,” in Proc. ACM SIGSAC Conf. Comput. Commun. Secur.,
2016, pp. 1651–1662.
[27] D. Pointcheval and J. Stern, “Security arguments for digital signatures and
blind signatures,” J. Cryptol., vol. 13, pp. 361–396, 2000.
[28] A. Yang, J. Weng, K. Yang, C. Huang, and X. Shen, “Delegating authen-
tication to edge: A decentralized authentication architecture for vehicular
networks,” IEEE Trans. Intell. Transp. Syst., vol. 23, no. 2, pp. 1284–1298,
Feb. 2022.
[29] OMNeT++ discrete event simulator, 2023. Accessed: Jul. 29, 2023. [On-
line]. Available: https://omnetpp.org/
[30] Simulation of urban mobility, 2023. Accessed: Jul. 29, 2023. [Online].
Available: https://sumo.dlr.de/docs/index.html
[31] MIRACL cryptographic SDK, 2023. Accessed: Jul. 29, 2023. [Online].
Available: https://github.com/miracl/MIRACL/
[32] Ganache v2.6.0: A personal ethereum blockchain, 2023. Accessed: Jul.
29, 2023. [Online]. Available: https://trufﬂesuite.com/ganache/
[33] T. Society of Automotive Engineers of China, “Cooperative intelli-
gent transportation system — vehicle communication application layer
speciﬁcation and data exchange standard (phase I),” Cooperative Intell.
Transp. Syst., Dec. 2020. [Online]. Available: https://www.codeofchina.
com/standard/TCSAE53-2020.html
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:39 UTC from IEEE Xplore.  Restrictions apply. 



# Page 17

WEI et al.: THRESHOLD-BASED FULL-DECENTRALIZED AUTHENTICATION AND KEY AGREEMENT SCHEME
12521
LuWeiiscurrentlyalecturerwiththeSchoolofCom-
puter Science and Technology, Anhui University. His
research interests include security and privacy issues
in vehicular ad hoc networks, applied cryptography,
and blockchain. He has more than 10 scientiﬁc pub-
lications in reputable journals (e.g., IEEE Transac-
tions on Dependable and Secure Computing, IEEE
Transactions on Information Forensics and Security,
IEEE Journal on Selected Areas in Communications,
IEEE Transactions on Mobile Computing, and IEEE
Transactions on Intelligent Transportation Systems).
Yongjuan Zhang is currently a research student with
the School of Computer Science and Technology, An-
hui University. Her research focuses on the security
of the vehicular ad hoc networks.
Jie Cui (Senior Member, IEEE) received the PhD de-
gree from the University of Science and Technology
of China, in 2012. He is currently a professor and
PhD supervisor with the School of Computer Sci-
ence and Technology, Anhui University. His current
research interests include applied cryptography, IoT
security, vehicular ad hoc network, cloud computing
security, and software-deﬁned networking (SDN). He
has more than 150 scientiﬁc publications in reputable
journals (e.g., IEEE Transactions on Dependable and
Secure Computing, IEEE Transactions on Informa-
tionForensicsandSecurity,IEEEJournalonSelectedAreasinCommunications,
IEEE Transactions on Mobile Computing, IEEE Transactions on Parallel and
Distributed Systems, IEEE Transactions on Computers, IEEE Transactions on
Intelligent Transportation Systems, IEEE Transactions on Network and Service
Management, IEEE Transactions on Industrial Informatics, IEEE Transactions
on Industrial Electronics, IEEE Transactions on Cloud Computing and IEEE
Transactions on Multimedia), academic books and international conferences.
He is in the Editorial Board of several international journals, such as the IET
Communications, Security and Communication Networks, and Sensors.
Hong Zhong received the PhD degree in computer
science from the University of Science and Technol-
ogy of China, in 2005. She is currently a professor
and PhD supervisor with the School of Computer Sci-
ence and Technology, Anhui University. Her research
interests include applied cryptography, IoT security,
vehicular ad hoc network, cloud computing security,
and software-deﬁned networking (SDN). She has
more than 200 scientiﬁc publications in reputable
journals (e.g., the IEEE Journal on Selected Areas in
Communications, IEEE Transactions on Parallel and
Distributed Systems, IEEE Transactions on Mobile Computing, IEEE Transac-
tions on Dependable and Secure Computing, IEEE Transactions on Informa-
tion Forensics and Security, IEEE Transactions on Intelligent Transportation
Systems, IEEE Transactions on Multimedia, IEEE Transactions on Vehicular
Technology, IEEE Transactions on Network and Service Management, IEEE
Transactions on Cloud Computing, IEEE Transactions on Industrial Informat-
ics, IEEE Transactions on Industrial Electronics and IEEE Transactions on Big
Data), academic books and international conferences.
Irina Bolodurina received the PhD degree from
South Ural State University. She is currently a profes-
sor and head with the Department of Applied Math-
ematics, Orenburg State University. She has more
than 60 scientiﬁc publications in academic journals
and international conferences indexed in Scopus and
WoS. She has participated in more than 20 scientiﬁc
projects supported by the RFBR and other Russian
scientiﬁc programs. Her current research interests
include theory of optimal control, mathematical mod-
eling, information analysis software, control of social
and economic systems, decision support systems, data integration, and process-
ing.
Debiao He received the PhD degree in applied mathe-
matics from the School of Mathematics and Statistics,
Wuhan University, Wuhan, China, in 2009. He is cur-
rently a professor with the School of Cyber Science
and Engineering, Wuhan University, and the Shang-
hai Key Laboratory of Privacy Preserving Computa-
tion,MatrixElementsTechnologies,Shanghai,China.
His main research interests include cryptography and
information security, in particular, cryptographic pro-
tocols. He has published more than 100 research
papers in refereed international journals and con-
ferences, such as IEEE Transactions on Dependable and Secure Computing,
IEEE Transactions on Information Security and Forensic, and Usenix Security
Symposium. He is the recipient of the 2018 IEEE Sysems Journal Best Paper
Award and the 2019 IET Information Security Best Paper Award. His work has
been cited more than 10,000 times with Google Scholar. He is in the editorial
board of several international journals, such as the Journal of Information
Security and Applications, Frontiers of Computer Science, and Human-centric
Computing and Information Sciences.
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:39 UTC from IEEE Xplore.  Restrictions apply. 
