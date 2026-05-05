

# Page 1

DBCPA: Dual Blockchain-Assisted Conditional
Privacy-Preserving Authentication Framework
and Protocol for Vehicular Ad Hoc Networks
Jing Zhang
, Yue Jiang, Jie Cui
, Senior Member, IEEE, Debiao He
,
Irina Bolodurina
, and Hong Zhong
Abstract—Vehicular ad hoc networks (VANETs) connect all vehicles through wireless channels. They provide extensive real-time
trafﬁc information services that improve driving safety and trafﬁc management efﬁciency. However, VANETs are vulnerable to
security attacks because of the open wireless nature of their communication channels. Most security mechanisms for traditional
VANETs are centralized and have certain limitations in satisfying security requirements, such as anti-single-point failure, distributed
security authentication of messages, and privacy preservation in VANETs. To address these issues, herein, we propose a dual
blockchain-assisted conditional privacy-preserving authentication framework and protocol for VANETs. The identity authentication
and privacy preservation of vehicles in VANETs can be realized without relying on a centralized trusted third party. The proposed
scheme also allows for the conditional tracking of illegal vehicles. The decentralized dynamic revocation of illegal vehicles can be
realized through smart contracts, rendering the scheme efﬁcient and scalable. We implement this scheme in an Ethereum test
network to demonstrate its feasibility and conduct an in-depth security analysis and comprehensive performance evaluation of the
proposed scheme. The results demonstrate that the proposed scheme is an effective solution for the development of a
decentralized authentication system for VANETs.
Index Terms—Authentication, dual blockchain, smart contract, vehicular ad hoc networks
Ç
1
INTRODUCTION
V
EHICULAR ad hoc networks (VANETs) are considered a
promising method for next-generation intelligent trans-
port systems. VANETs are distributed, self-conﬁguring
dynamic networks [1], [2]. Each vehicle in a VANET is
equipped with an on-board unit (OBU) to communicate with
other vehicles in the vehicle-to-vehicle (V2V) mode. V2V and
vehicle-to-infrastructure (V2I) communications are realized
through a dedicated short-range communication (DSRC)
protocol. Roadside units (RSUs) can also transfer communi-
cation information to the trafﬁc control center (TCC) to fur-
ther facilitate communication management and consulting
services. This is similar to a set of communication patterns in
the environment of traditional VANETs, as depicted in
Fig. 1. Real-time information in VANETs can help vehicles or
TCC take immediate action [3]. With improved perception,
computing, and communication capabilities, VANETs have
become a key architecture [4] for enhancing non-safety-
related trafﬁc experiences (e.g., entertainment) and safety-
related facilities (e.g., trafﬁc accidents, congestion, and sud-
den braking). In recent years, VANETs are receiving increas-
ing attention from academia and industry.
1.1
Motivation
According to reports, the market value of VANETs will
reach $225; 158 million in 2025 [5]. However, VANETs, as
modern intelligent transportation system technology with
promising prospects, also face severe data security and pri-
vacy challenges. First, VANETs data have signiﬁcant eco-
nomic value; as a result, data theft, attacks, and abuse have
become increasingly serious issues [6]. Hence, it is a crucial
requirement for VANETs to conduct a security authentica-
tion of transmitted information. Second, VANETs have the
characteristics of distributed operations, limited bandwidth,
node mobility, and dynamic network topology [4]. How-
ever, most security mechanisms for traditional VANETs are
centralized and have certain limitations in satisfying secu-
rity requirements, such as anti-single points of failure, dis-
tributed security authentication of messages, and privacy

Jing Zhang, Yue Jiang, Jie Cui, and Hong Zhong are with the Key Labora-
tory of Intelligent Computing and Signal Processing of Ministry of Educa-
tion, School of Computer Science and Technology, Anhui University, Hefei
230039, China, and also with the Anhui Engineering Laboratory of IoT Secu-
rity Technologies, Anhui University, Hefei 230039, China. E-mail: {root_zj,
JiangYue_0815}@163.com, cuijie@mail.ustc.edu.cn, zhongh@ahu.edu.cn.

Debiao He is with the School of Cyber Science and Engineering, Wuhan
University, Wuhan 430072, China, and also with the Shanghai Key Labo-
ratory of Privacy Preserving Computation, MatrixElements Technologies,
Shanghai 201204, China. E-mail: hedebiao@163.com.

Irina Bolodurina is with the Faculty of Mathematics and Information
Technologies, Orenburg State University, 460018 Orenburg, Russia.
E-mail: prmat@mail.osu.ru.
Manuscript received 2 May 2022; revised 10 December 2022; accepted 16
December 2022. Date of publication 20 December 2022; date of current version
8 January 2024.
The work was supported in part by the National Natural Science Foundation
of China under Grants 62202008, 62272002, 62011530046, and 61872001, in
part by the Excellent Youth Foundation of Anhui Scientiﬁc Committee under
Grant 2108085J31, in part by the Natural Science Foundation of Anhui Prov-
ince, China under Grant 2208085QF196, and in part by the Open Fund of
Key Laboratory of Embedded System and Service Computing (Tongji Univer-
sity), Ministry of Education under Grant ESSCKF 2022-04.
Recommended for acceptance by X. Costa-Perez.
(Corresponding author: Jie Cui.)
Digital Object Identiﬁer no. 10.1109/TMC.2022.3230853
IEEE TRANSACTIONS ON MOBILE COMPUTING, VOL. 23, NO. 2, FEBRUARY 2024
1127
1536-1233 © 2022 IEEE. Personal use is permitted, but republication/redistribution requires IEEE permission.
See ht_tps://www.ieee.org/publications/rights/index.html for more information.
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:48:39 UTC from IEEE Xplore.  Restrictions apply. 



# Page 2

preservation. Therefore, achieving autonomy, completely
liberating trusted third parties from cumbersome authenti-
cation processes, and being resistant to single points of fail-
ure are other important requirements of VANETs. The
motivation of this paper is to enhance the VANET security
requirements such as VANET autonomy, anti-single point
of failure, message distributed security authentication, and
privacy protection, etc.
Recently, privacy-preserving authentication protocols
have been proposed [7], [8], [9], [10], [11], [12], [13], [14].
Some protocols depend highly on centralized servers. More-
over, schemes based on public key infrastructure (PKI)
require an authentication authority, which may experience
issues with certiﬁcate management, such as certiﬁcate stor-
age, certiﬁcate renewal, etc. Furthermore, certiﬁcate man-
agement is costly. The identity-based solution depends on
the key generation center (KGC); therefore, it is easily
affected by key escrows. A hybrid solution that combines
the two types can alleviate these shortcomings, but the scal-
ability in practical applications is still lacking [12].
Blockchain identiﬁes, disseminates, and documents an
intelligent peer-to-peer (P2P) network through a distributed
database. The ﬂat topology of blockchain provides network
users with the beneﬁts of autonomy, decentralization,
immutability, and contractability. This is the underlying
technology of Bitcoin and has been proven to have many
remarkable security features [15]. Blockchain technology
has been considered a potential solution for the trust and
automatic inspection challenges of VANETs. Hence, block-
chain attracts considerable attention as a means of enhanc-
ing the security and decentralization of VANETs [16].
Based on the problems mentioned above, this paper pro-
poses
a
conditional
privacy-preserving
authentication
scheme based on dual blockchain. This framework imparts
the following advantages to VANETs. First, the dual block-
chain-assisted VANET ensures that the transmitted infor-
mation is reliable even without a centralized third party,
thereby enhancing the security and decentralization of
VANETs. Second, it generates pseudonym identities for
vehicles, updates the identities regularly, and enhances the
privacy and unlinkability of the vehicles. Finally, the dis-
tributed dynamic revocation of illegal vehicles is realized
using a smart contract, allowing for autonomous distributed
vehicle revocation.
1.2
Contribution
We summarize the main contributions of the research con-
tent in this paper as follows.
1)
First, a dual blockchain-assisted conditional privacy-
preserving authentication framework is proposed.
The proposed framework aims to enhance the decen-
tralized features of a VANET and resolve issues
related to centralized authentication and single
points of failure. The proposed framework ensures
that the transmitted information is reliable even
without a centralized third party. In addition, pri-
vacy-preserving issues under this framework are
considered.
2)
Second, the distributed dynamic revocation of illegal
vehicles is realized via a smart contract, providing
the autonomous capability of distributed vehicle rev-
ocation. Expandability and robustness can be guaran-
teed through all nodes, rather than centralized
control, which eliminates the several-for-one commu-
nication ﬂow and single-point of failure. Therefore, it
enhances the decentralized operation and improves
the security of VANETs.
3)
Finally, we conduct a security analysis, security
proof, and performance analysis of the proposed
scheme. The results verify the feasibility, security,
efﬁciency, and scalability of the proposed scheme.
1.3
Organization
The remainder of this paper is organized as follows. Sec-
tion 2 discusses related work on the privacy-preserving
authentication schemes of VANETs. Section 3 deﬁnes the
scheme model and its design security goals. Section 4 intro-
duces the basic building blocks used in this study. Section 5
presents the details of the proposed dual blockchain-
assisted privacy-preserving authentication scheme. In Sec-
tion 6, we evaluate the security of the proposed DBCPA
scheme. Section 7 presents an experimental evaluation of
the proposed DBCPA scheme. Finally, concluding remarks
are present in Section 8.
2
RELATED WORK
In recent studies, many researchers have proposed different
privacy-preserving authentication schemes for VANETs.
Here we roughly divide these studies into the following
three categories. The ﬁrst category is PKI-based. The second
category is the authentication process of identity-based
cryptography (IBC). The third category is solutions based
on blockchain technology.
In traditional PKI-based cryptosystems, a certiﬁcate
authority (CA) issues certiﬁcates to users. Reliable sources
of information are ensured by digital signatures by both
parties of the communication. Raya et al. [17] also proposed
Fig. 1. A way of communication patterns in traditional VANETs.
1128
IEEE TRANSACTIONS ON MOBILE COMPUTING, VOL. 23, NO. 2, FEBRUARY 2024
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:48:39 UTC from IEEE Xplore.  Restrictions apply. 



# Page 3

a PKI-based security and privacy protocol. Wasef et al. [18]
proposed in Raya et al. [17], that all vehicles need to load a
large amount of anonymous public and private key pairs in
advance, and the trusted authority have to also store the full
anonymous certiﬁcate of each connected vehicle, which
results in a certiﬁcate management is inefﬁcient. Cal-
andriello et al. [19] proposed a combination of baseline
pseudonyms and group signatures to generate new pseudo-
nyms, and optimized the efﬁciency and robustness of the
hybrid scheme, simplifying the certiﬁcate management pro-
cedure. Yu et al. [20] constructed an extended pseudonym-
changing region by using a pseudonym interaction strategy
and an integrated group signature mechanism. Vehicles in
this area are allowed to continuously exchange their pseu-
donyms, which better protects the location privacy of
vehicles. Furthermore, Ali et al. [21] proposed a certiﬁcate-
less encryption system and a PKI-based hybrid encryption
scheme based on conditional privacy-preserving. Neverthe-
less, almost all PKI-based schemes suffer from the following
three problems. First, to protect the vehicle’s privacy, it has
to store a considerable number of certiﬁcates and keys. Sec-
ond, trusted third parties need to store all relevant certiﬁ-
cates, which takes up a lot of storage space. Finally, the
management of all the certiﬁcates would incur high compu-
tational and communication costs [12].
In the IBC scheme, a KGC issues a private key for each
user based on the user’s identity. The user’s identity is also
the user’s public key. This IBC scheme can naturally associ-
ate public keys with identities, making entity identiﬁcation
easier [22]. Based on this, Zhang et al. [23] proposed an
identity-based batch signature authentication scheme. IBC
is used to generate the private key of the fake identity. This
scheme does not require certiﬁcates, thus signiﬁcantly
reducing the transmission overhead. Chim et al. [24] pro-
pose a software-based solution that utilizes two shared
secrets to satisfy privacy requirements. This enhances the
privacy of the scheme of Zhang et al. [23]. But Horng et al.
[8] pointed out that the SPECS method proposed by Chim
et al. [24] is still vulnerable to impersonation attacks. To
overcome the security ﬂaws of previous works, Ali et al.
[25] proposed an efﬁcient identity signature scheme with
conditional privacy protection. It uses common one-way
hash functions and elliptic curve encryption in its scheme.
The scheme provides a batch signature authentication way,
where each vehicle can simultaneously verify enormous
messages. Compared with the PKI-based scheme, the IBC
scheme has better improvements, but they suffer from key
escrow issues and the inherent drawback of requiring
secure communication channels [12].
Lately, with the advent of blockchain technology, its
decentralization and immutability have attracted the atten-
tion of researchers [26]. Some researchers have tried to
apply blockchain technology to VANETs. Use this method
to build a decentralized network security model. Raw et al.
[27] propose a blockchain-based Internet of Vehicles (IoV)
accident forensics framework, which stores data in entities
in a distributed manner. The purpose is to provide law
enforcement agencies with credible evidence about trafﬁc
accidents. Shao et al. [28] introduced a new framework of
IoV combined with blockchain, which can be applied to the
identity authentication scheme in IoV. It simpliﬁes the
distributed key management process in heterogeneous IoV
based on blockchain technology. Reduced key transfer time
over heterogeneous networks. Lu et al. [29] proposed a new
BCPPA protocol that uses a fusion approach of blockchain
and Merkle Patricia trees, enabling the protocol to have efﬁ-
cient certiﬁcate revocation and privacy protection. Zheng
et al. [30] designed an identity-based BCPPA protocol using
the pseudonym technique. However, Lin et al. [31] pointed
out that the generating an anonymous certiﬁcate process, Lu
et al. [29] requires frequent interaction between the vehicle
and the certiﬁcation authority, and Zheng et al. [30] faced
the requirement of ideal hardware and can not withstand
the leakage of the certiﬁcate authority. The VANETs scheme
based on blockchain technology in the above solution lacks
consideration of security and privacy. Simultaneously, the
use of blockchain to realize the decentralized operation of
the VANETs is still lacking, and the revocation of illegal
vehicles is not automated and distributed enough.
3
PROBLEM FORMULATION
In this part, we introduce the network model of the scheme,
the dual blockchain in DBCPA, and the associated security
requirements.
3.1
Network Model
The network model of the framework in this paper is a
three-layer model structure, as shown in Fig. 2. The upper-
layer consists of a trusted authority (TA) and a private
blockchain, the middle layer is the RSU (including the RSU
node of consortium blockchain and private blockchain), and
the under-layer is the vehicle (OBU) and consortium block-
chain. We will deﬁne the three participants in this network
model below.
1)
TA: It is a trusted third party with considerable com-
puting, communication, and storage capabilities,
and it is generally believed that TA will not collude
with other parties. TA is responsible for system ini-
tialization, entity registration, smart contract deploy-
ment, private blockchain maintenance, malicious
vehicle tracking, and vehicle revocation.
2)
Vehicle (OBU): Serve the drive and all vehicles are
equipped with an OBU, which contains a tamper-proof
processing unit and supports the DSRC protocol. The
Fig. 2. Network Model.
ZHANG ET AL.: DBCPA: DUAL BLOCKCHAIN-ASSISTED CONDITIONAL PRIVACY-PRESERVING AUTHENTICATION FRAMEWORK AND...
1129
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:48:39 UTC from IEEE Xplore.  Restrictions apply. 



# Page 4

vehicle communicates wirelessly with other parties in
the VANET through the OBU. As a validator of the
consortium blockchain, the vehicle is a lightweight
node that only needs to store the block header of the
consortium blockchain.
3)
RSU: It is the roadside infrastructure that communi-
cates with the OBU using the DSRC protocol. Initial-
ize pre-selected trusted RSUs as private blockchain
management nodes, which can query blockchain
information and periodically change pseudonyms
for vehicles. Other RSUs act as miners of the consor-
tium blockchain, aggregating communication mes-
sages between vehicles and storing all transaction
data on the blockchain. As the middle layer of the
network model, RSUs act as bridges to ensure that
the transmitted information is trusted even without
a centralized third party. And through the vehicle
request, the smart contract of the private blockchain
can be called to execute the distributed dynamic rev-
ocation process of the offending vehicle. The relevant
information of the revoked vehicle will be deleted
from the dual blockchain and broadcast on the whole
network.
Remark: With the development and application of 5G
technology by governments around the world, 5G, as a new
technology, has the characteristics of fast speed, slow delay,
wide coverage and support for communication between
devices. This technology creates huge opportunities for
mobile ad hoc networks, especially VANETs [32], [33], [34].
In this paper, we use 5G technology to support our pro-
posed DBCPA approach. Because it can integrate multiple
radio access technologies into cellular system architectures.
Reusing
available
cellular
network
infrastructure
will
reduce the cost of deploying vehicle networks. The technol-
ogy can also provide peak data rates of up to 20 Gb/s, with
average data rates greater than 100 Mb/s, to support high
data rate services [35]. The capacity of 5G has increased by a
factor of 1000, enabling more efﬁcient V2V communication
[36], and reliable connectivity and low latency (about 1 ms)
also provide sufﬁcient support for the transmission of mes-
sages [37].
3.2
Dual Blockchain in DBCPA
1)
Blockchain: The upper layer of the network model
enables a private blockchain to increase access con-
trol and security. The TA is used as a miner to store
the association relationship between the vehicle’s
“VIDi-PIDi-Vpki-ski-ti”.
Only
TAs
can
deploy,
insert, update and revoke smart contracts, and
other licensees (trusted RSU private blockchain
nodes) can access on-chain information. And TAs
can verify the new state of all transactions and
smart contracts. After blocks are veriﬁed by TAs,
they can be uploaded to a private blockchain based
on the practical byzantine fault tolerance (PBFT)
[38] consensus mechanism. The lower layer of the
network model uses the consortium blockchain as
the
decentralized
underlying
architecture
of
DBCPA. RSU acts as the miner to store all vehicle
pseudonymous identities and corresponding public
keys to automatically and timely feedback on the
public key query of vehicles. Meanwhile, V2V and
V2I transactions are aggregated, and the vehicle
participates in block authentication through the
consensus mechanism, safely handles transactions
and smart contract status between multiple consen-
sus nodes, and adds blocks to the blockchain. Per-
mitted nodes can look up these states when needed
to get the information the node needs in the consor-
tium blockchain.
2)
Smart contract: For consortium blockchains, it loads an
entity pseudonymous public key table (EPPKT). It is
used to aggregate the relationship between the cur-
rent pseudonym identity of all vehicles and the corre-
sponding public key, and to automatically and timely
feedback on the public key query of the vehicle, as
depicted in Fig. 3a. For private blockchains, it loads
an entity private information table (EPIT), as shown
in Fig. 3b. It is used as a “VIDi-PIDi-Vpki-ski-ti” asso-
ciation that aggregates all vehicles and responds to
the private blockchain node RSU. A new pseudonym
identity and corresponding public and private keys
can be obtained for the vehicle periodically, and the
EPPKT can be updated. Moreover, when the revoca-
tion application of a vehicle reaches the threshold, the
smart contract can automatically execute the dynamic
revocation of malicious vehicles. In particular, smart
contracts are on-chain code stored in the blockchain,
executed by authorized entities, and participating in
the authentication. Therefore, smart contracts guar-
antee the reliability of calculation results.
3.3
Design Goals
According to the latest research results [15][39], [40], [41],
[42], the blockchain-assisted VANETs authentication scheme
should meet the following security requirements.
Fig. 3. Block structure of private blockchains and consortium blockchains. (a) Structure of the under-layer consortium blockchain. (b) Structure of the
upper-layer private blockchain.
1130
IEEE TRANSACTIONS ON MOBILE COMPUTING, VOL. 23, NO. 2, FEBRUARY 2024
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:48:39 UTC from IEEE Xplore.  Restrictions apply. 



# Page 5


Single registration: To bring convenience to users,
VANETs’s authentication scheme should support
single registration, where each vehicle is registered
only once and then it sends information to other par-
ties on the road.

Message authentication: To ensure that the received
message can be credible, the RSU and vehicle should
be able to verify the validity of the message origi-
nator’s identity, the timeliness, and integrity of the
message, to conﬁrm the reliability of the received
message.

Privacy protection: The RSUs or other vehicles
should not be able to see the other vehicles’ real iden-
tities, and any adversary should not be able to obtain
the users’ real identities even by analyzing the inter-
cepted text.

Traceability: When malicious behavior occurs, such
as sending false information to mislead others, tam-
pering with security messages, etc., the TA should
have an efﬁcient method to track the vehicle’s real
identity.

No online registration center: To alleviate the regis-
tration center’s overhead in the certiﬁcation process,
the scheme proposed in the study should not rely on
the online registration center during the authentica-
tion stage.

Unlinkability: To prevent the vehicle’s driving route
from being tracked or attacked by malicious attack-
ers, it is impossible to link two pieces of information
from the same vehicle.

Resistant to cyber attacks: In general, VANETs
authentication systems based on blockchain technol-
ogy should be resistant to ofﬂine password guessing
attacks, replay attacks, vehicle impersonation attacks,
and distributed denial of service (DDoS) attacks.
3.4
Threat Model
In the proposed scheme, the vehicle and alliance blockchain
node RSUs are considered untrusted entities, the private
blockchain node RSUs are considered semi-trusted with a
medium security level, and the root TA is considered fully
trusted by all entities. The adversary could be a vehicle, a
consortium blockchain node RSU, or a network intruder.
According to the behavior of the opponent, the attacks
launched by the opponent can be divided into two types,
that is, passive attack and active attack. For passive attacks,
an attacker continuously monitors the VANET communica-
tion channel to track the vehicle or break the conﬁdentiality
of the message. To launch an active attack, an attacker may
attempt to modify or fabricate a message.
4
BUILDING BLOCKS
In this part, we introduce some basic methods and techni-
ques used in DBCPA.
4.1
Elliptic Curve Cryptosystem
A cryptosystem based on rational point groups of elliptic
curves over ﬁnite ﬁelds is called an elliptic curve cryptosys-
tem [43]. Because of the short key and security assumptions
of the elliptic curve discrete logarithm problem, it brings
the advantages of small storage space, high security, light-
weight, and fast processing speed to the elliptic curve. In
this study, we design an elliptic curve-based DBCPA
scheme, and its related deﬁnitions are as follows.
An elliptic curve E over a ﬁnite ﬁeld Fp is a ﬁnite cyclic
group that satisﬁes y2 ¼ x3 þ ax þ b mod p and contains an
inﬁnite point O. where a; b 2 Fp, 4a3 þ 27b2 6¼ 0 [44]. The
points of the elliptic curve E satisfy the abelian group using
the point addition ‘‘+’’ operation [45]. We describe its opera-
tional deﬁnition below: Suppose there are any two points on
the elliptic curve, P and Q, respectively, and draw a straight
line passing through P and Q. If P and Q coincide with the
same point, the line is tangent to point P. The third point
where this line intersects the elliptic curve E, denotes it as
B. This point B is symmetrical about the X-axis, repre-
sented by B, then point B must also be on this elliptic curve,
that is, EðB þ ðBÞ ¼ 0Þ. According to the deﬁnition men-
tioned above, the formula for adding points on the E can be
expressed as P þ Q ¼ B. The addition of the same k points
on E, that is, P þ P þ . . . þ P is also recorded as k  P, which
is called the dot product [46].
Cryptographic systems constructed using the elliptic
curve discrete logarithm problem (ECDLP) and the compu-
tational elliptic curve Difﬁe-Hellman problem (ECDHP) are
widely used in encryption, authentication, and other crypto-
graphic protocols [47].
4.2
Blockchain
In most common cases, blockchain is viewed as a secure,
immutable, distributed ledger of data, in which data is
recorded in blocks in chronological order [12]. When a
blockchain allows anyone to join/leave a network and any-
one within the network can maintain it, it is called a public
blockchain. Such as Bitcoin and Ethereum [48]. Common
consensus mechanisms for public blockchains are Proof-of-
Work (PoW) [49] and Proof-of-Stack (PoS) [50]. However,
when a blockchain is maintained by trusted nodes, it is
known as a private blockchain or a consortium blockchain,
e.g., Hyperledger [51]. Private blockchains use consensus
mechanisms such as PBFT [38] and RAFT [52]. In the pro-
posed scheme, we utilize the private blockchain as the core
data storage structure of the network’s upper-layer architec-
ture. Use the consortium blockchain as the core data storage
structure of the network under-layer architecture. Apply
distributed ledgers with encryption technology to P2P net-
works to store, share, manage, track and monitor data to sat-
isfy user privacy and security concerns.
4.3
Smart Contracts
A smart contract is a computerized transaction protocol that
executes the terms of the contract, referring to “a set of digi-
tally deﬁned commitments, and also includes protocols that
enable parties to a contract to enforce these digitally-deﬁned
commitments” [31]. Every smart contract has an address
needed to trigger it. Functions deﬁned in smart contracts
can be invoked by transactions or other smart contracts. The
overall objective is to meet the contractual conditions agreed
upon by the parties. In general, it combines with blockchain
technology to provide some attractive properties, namely
self-execution, immutability, self-validation, self-execution,
ZHANG ET AL.: DBCPA: DUAL BLOCKCHAIN-ASSISTED CONDITIONAL PRIVACY-PRESERVING AUTHENTICATION FRAMEWORK AND...
1131
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:48:39 UTC from IEEE Xplore.  Restrictions apply. 



# Page 6

and decentralization [12]. This is the reason why smart con-
tracts can be automatically executed and deployed in a
decentralized network.
In the proposed DBCPA scheme, we leverage smart con-
tracts to provide an application binary interface (ABI) for
EPIT management services in a private blockchain. There
are seven main algorithms for smart contracts deployed in
DBCPA. Four of these algorithms are used to declare the rel-
evant basic function methods in smart contracts, which are
summarized below.
1)
Data insertion algorithm: When a new vehicle enters
VANET and initiates a registration request to TA to
join, TA generates the security data required for
communication for the vehicle, and after passing the
consensus of the blockchain node, the algorithm of
the smart contract is called to insert the data that
needs to be updated regularly into the EPIT of the
blockchain.
2)
Data update algorithm: When the safety data stored
in the blockchain is about to be exhausted, TA gener-
ates new safety data needed for vehicle communica-
tion. After passing the consensus of the blockchain
nodes, TA invokes the algorithm of the smart con-
tract to update the new security data generated for
vehicle communication to the EPIT of the blockchain.
3)
Data query algorithm: When a vehicle is about to
update the security data required for related com-
munication, the blockchain node calls the algorithm
of the smart contract to query the new security data
required for the communication for the vehicle, and
saves it in the blockchain node for use by the vehicle.
4)
Data deletion algorithm: When a new vehicle leaves
VANET and initiates a cancellation request to TA,
TA passes the consensus of the blockchain node and
calls the algorithm of the smart contract to delete the
relevant data of the vehicle from the EPIT of the
blockchain.
The other three algorithms are used to declare the rele-
vant non-basic function methods in smart contracts, see the
algorithm 1, 2, and 3, which is introduced below.
Algorithm 1. Entity Threshold Settings
Input: address vehicleUser, uint256 txid
Output: bool result
//The threshold value changes dynamically according
to the number of vehicles, ﬂow rate and other factors.
1: require (addressID.status is true);
2: if msg.sender is not TA then
3:
throw;
4:
end if;
//This is the mapping relationship between the num-
ber of the complained vehicle and the pseudonym of
the complained vehicle.
5:
mapRespondent[vehicleUser]=txid;
6:
if Entity threshold settings is successful then
7:
return true;
8:
else
9:
return false;
10: end if;
1)
Algorithm 1 states that when a new vehicle enters
VANET, TA will invoke the smart contract algorithm
to dynamically set the automatic vehicle revocation
threshold based on the number of vehicles, trafﬁc,
and other factors.
2)
Algorithm 2 deﬁnes the ABI for TA and RSU. When
an entity complains about a malicious vehicle, the
smart contract is activated to add the vehicle’s com-
plaint record after the consensus process of block
nodes.
3)
Algorithm 3 states that TA/RSU uses smart contracts
to determine whether the complaint records of cer-
tain malicious vehicles reach the threshold. If the
threshold is reached, the revocation algorithm for
malicious vehicles is automatically executed, and the
revocation-related information is returned to the pri-
vate blockchain node.
We predeﬁne the query rights of EPIT in the private
blockchain appropriately. For DBCPA, we require that only
private blockchain nodes (TA and part of trusted RSUs) can
query EPIT. This setting can provide conditional privacy-
preserving for vehicles, and improve the traceability and
non-connectivity of the VANETs.
Algorithm 2. Complaints Against Malicious Vehicles
Input: address addressUser, uint256 complaintCounter
Output: uint256 txid
1:
require (addressID.status is true);
2:
if msg.sender is not TA/RSU then
3:
throw;
4:
end if;
5:
Counter=ExistingCounter+ComplaintCounter;
//This is the mapping relationship between the com-
plaint vehicle number and the pseudonymous identi-
ty of the complaint vehicle.
6:
mapComplainant[addressUser]=CurrentCounter;
7:
return complaint(msg.sender);
Algorithm 3. Judgment Threshold Automatically Exe-
cutes Vehicle Revocation
Input: address target, uint256 CurrentCounter
Output: uint256 txid
1:
require (addressID.status is true);
2:
if Counter  mapRespondent[target].Threshold then
3:
removeEPIT(target);
4:
return judgment(msg.sender);
5:
end if;
4.4
Consensus Mechanism
In the proposed scheme, we adopt the PBFT [38] consensus
mechanism for block consensus. As shown in Fig. 4, in the
private blockchain, the TA is the miner node, and the
trusted RSU is the consensus node. In the alliance block-
chain, the RSU is the miner and the vehicle is the consensus
node, the consensus process is as follows. First, other nodes
verify the validity of the block after receiving the data block
broadcast by the miner and broadcast its authentication
1132
IEEE TRANSACTIONS ON MOBILE COMPUTING, VOL. 23, NO. 2, FEBRUARY 2024
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:48:39 UTC from IEEE Xplore.  Restrictions apply. 



# Page 7

results and signatures to each other in a distributed manner.
Second, after each node receives the authentication result, it
compares the result with other nodes and feeds the result
back to the miners. Finally, the block is stored on the block-
chain if 2/3 of the nodes agree to the block. In the proposed
scheme, in the consensus process of the private blockchain,
TA and RSU act as full nodes to store the complete informa-
tion of the block. In the consensus process of the consortium
blockchain, the miner RSU acts as a full node to store the
complete information of the block. The vehicle acts as a
lightweight node to store block header information for data
query and authentication.
5
SCHEME DESIGN
In this section, we detail the information on the designed
DBCPA scheme. The program makes up of seven parts: sys-
tem initialization, smart contract deployment, vehicle regis-
tration,
login
and authentication,
pseudonym
identity
update, vehicle revocation, and password change. Common
symbols and annotations in this paper are depicted in
Table 1.
5.1
System Initialization
In system initialization phase, TA generates system parame-
ters and initializes a private blockchain and a consortium
blockchain. TA selects a large prime number q1, a random
number x 2 Z
q as the key, and selects a secure hash function
H0 : f0; 1g ! f0; 1gl. TA shares G ¼ fq1; Z
q; H0g with the
vehicle during the registration phase.
ECC Initialization: TA generates the system parameter
ECCparams ¼ fq; a; b; n; P; Ppub; H1; H2g, where the ﬁnite
ﬁeld Fp, ðq; a; bÞ 2 Fp, deﬁnes a non-singular elliptic curve E
for the equation y2 ¼ x3 þ ax þ b mod p satisfying 4a3 þ
27b2 6¼ 0. P is the generator of the n-order additive group G,
which makes up of all points on E and points at inﬁnity O;
there are system public key Ppub ¼ s  P and system key s 2
Z
n; H1 : f0; 1g ! f0; 1g, H2 : f0; 1g ! Zn, are two crypto-
graphic hash functions that have ﬁxed output ranges.
Blockchain Initialization: The upper layer of the network
model enables a private blockchain to increase security,
store EPIT, and manage the private blockchain by TA as a
miner. The block is veriﬁed through the consensus process
of the private blockchain nodes, and then the smart contract
is called to deploy the transaction into the private block-
chain. We presume that TA and part of trusted RSUs work
together as private blockchain nodes, and give this party of
trusted RSUs private blockchain nodes the authority to
query the private blockchain. The under-layer of the net-
work model enables a consortium blockchain, with RSUs as
the miner. Manage EPPKT and aggregate V2V and V2I
transactions, vehicles participate in block authentication,
and add blocks to the consortium blockchain through a con-
sensus mechanism.
5.2
Smart Contract Deployment
The TA compiles and deploys the smart contract’s inputs
into the private blockchain. The blockchain node is veriﬁed,
after which the smart contract gets its unique address and
can be invoked with a transaction with the appropriate
permissions.
5.3
Vehicle Registration
For all vehicles and their owners to obtain the secret authen-
tication factors they need to communicate, they need to reg-
ister with the TA during the vehicle registration phase to
obtain the required information. This stage is performed
within a secure channel and the TA is registered ofﬂine.
First, the vehicle user selects a physical real identity VIDi,
a password pw, the vehicle Vi selects a random number bi,
and calculates Bi ¼ H0ðpw j j biÞ. Then submit the VIDi
together with Bi to the TA.
Second, TA calculates a pseudonym identity set PIDi ¼
VIDi  H1ðski  PpubÞ for each vehicle, where ski ¼ H2ðVIDi k
s k tiÞ is the vehicle’s key, ti is the effective period of the cur-
rent pseudonym, and the public key Vpki ¼ ski  P. TA selects
random number ei 2 Z
q, and calculates Ai ¼ H0ðx k eiÞ, Ci ¼
Ai  Bi, Di ¼ ðVIDi k Bi k AiÞ.
Finally, TA loads fCi, Di, ei, H0, q, Z
q, ECCparams, VIDi,
PIDi, tig into the OBU of the vehicle, with PID1 as the ﬁrst
pseudonym.
In addition, TA uploads fVIDi, PIDi, Vpki, skig to the
smart contract through the consensus process of private
blockchain members and add it to the private blockchain.
Through the consensus process of RSUs, TA uploads the
fPIDi; Vpkig of the vehicle to the consortium blockchain.
Fig. 4. Consensus process on blockchain.
TABLE 1
Symbol Deﬁnition and Notes Table
Symbol
Deﬁnition
V2V
Vehicle-to-vehicle
V2I
Vehicle-to-infrastructure
OBU
On-board unit
RSU
Road side unit
TA
Trusted authority
ECC
Elliptic curve cryptosystem
E
Elliptic curve
G, q, P
An additive elliptic curve group G with or-
der q generated by P
s
System secret key
Ppub
System public key
x
System secret key for vehicle registration
Hiði ¼ 0; 1; 2Þ
Hash functions
VIDi
The real identity of the vehicle Vi
PIDi
Pseudo identity of the vehicle Vi
EPIT
Entity private information table
EPPKT
Entity pseudonym public key table
PROCPIDgenerate Pseudonymous identity generation
processes
PROCMsign
Message signing processes
PROCMverify
Message veriﬁcation processes
ZHANG ET AL.: DBCPA: DUAL BLOCKCHAIN-ASSISTED CONDITIONAL PRIVACY-PRESERVING AUTHENTICATION FRAMEWORK AND...
1133
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:48:39 UTC from IEEE Xplore.  Restrictions apply. 



# Page 8

5.4
Login and Authentication
When a vehicle wants to broadcast trafﬁc information to
neighboring RSUs and vehicles, it takes the processes below.
1)
User inputs VIDi and pw to OBU, OBU calculates
B
i ¼ H0ðpw k biÞ,
A
i ¼ Ci  B
i ,
D
i ¼ H0ðVIDi k
B
i k A
i Þ, and judges D
i ¼
? Di. The OBU refuses the
request if the authentication fails.
2)
If this is not the case, it further generates a random
number ri 2 Zn
and computes Ri ¼ ri  P, ai ¼
H2ðPIDi k Ri k Mi k TiÞ and ui ¼ ri þ ai  ski mod n,
where Mi denotes an immediate message sent at
timestamp Ti. Finally, the OBU broadcasts the fol-
lowing messages fPIDi; Mi; Ri; Ti; uig to neighbor-
ing RSUs and vehicles.
3)
The timestamp Ti is used by the receiver to verify the
message’s freshness. If it works, the receiver queries
the consortium blockchain for the record with the
PIDi, requests the associated public key, and further
searches the EPPKT identiﬁed by the PIDi to obtain
the appropriate public key Vpki or err.
4)
After the receiver gets the Vpki, the receiver computes
a’
i ¼ H2ðPIDi k Ri k Mi k TiÞ and will only accept
the message if ui  P ¼ Ri þ a’
i  Vpki. Otherwise, it
rejects
the
message.
Since
Vpki ¼ ski  P,
ui ¼
ri þ ai  ski mod q,
we
have
ui  P ¼ ðri þ ai  skiÞ 
P ¼ Ri þ ai  Vpki. As a result, the authentication
process’
correctness is certiﬁed. The RSU or the
vehicle can detect and abort the message once it has
been modiﬁed.
5.5
Pseudonym Identity Update
1)
When the pseudonymous identity of the vehicle is
about to expire, the preset private blockchain trusted
node RSU will periodically obtain the new pseudo-
nym PID0
i of the vehicle and the corresponding pub-
lic
and
private
keys
fV 0
pki,
sk0
ig
from
private
blockchain, fPID0
i; sk0
i; V 0
pki; tig as messages Mi. RSU
further encrypts and signs the message Mi, it gener-
ates a random number ri 2 Zn and computes Ri ¼
ri  P,
ai ¼ H2ðPID0
i k Ri k Mi k TiÞ
and
ui ¼
ri þ ai  ski mod n, where Mi denotes an immediate
message sent at timestamp Ti. Finally, the message
fPID0
i; Mi; Ri; Ti; uig is sent to the corresponding
vehicle through the secure channel.
2)
The timestamp Ti is used by the recipient vehicle to
verify the message’s freshness. If the timestamp is
invalid it is discarded. If valid, the receiver will ver-
ify the correctness of the message, computing a’
i ¼
H2ðPID0
i k Ri k Mi k TiÞ
and
only
if
ui  P ¼
Ri þ a’
i  V 0
pki to accept the message and update the
OBU’s vehicle pseudonym and its corresponding
public keys and private keys. Otherwise reject the
message.
3)
At last, the RSU deletes outdated information in the
private blockchain EPIT and updates the EPIT to
facilitate conditional tracking of malicious vehicles
later. And RSU updates the EPPKT of the consor-
tium blockchain. Note that the above operations are
performed ofﬂine.
5.6
Vehicle Revocation
When a vehicle departs the region or is waiting to be
revoked, there are two different processes for performing a
vehicle revocation. First, TA will terminate the present state
documented in the smart contract. For the security of vehicle
revocation, it is necessary to reach a consensus through the
consensus process of blockchain nodes, and then the master
node calls the smart contract to revoke the vehicle. Second,
set a threshold (the threshold is dynamically changed by the
current trafﬁc ﬂow and other related factors) for smart con-
tract vehicle revocation. When the number of master nodes
calling the smart contract to request to revoke the vehicle
reaches the threshold, the smart contract executes the vehicle
revocation algorithm revokeEPIT(PIDi) to revoke the vehi-
cle. In the meantime, the relevant tuples in the dual block-
chain are deleted and fed back to the relevant master nodes.
The master node then broadcasts the relevant information of
the revoked vehicle to the whole network. More satisfy the
distributed operation characteristics of VANETs and enhance
the security of VANETs. We use the concept of mandatory
access control to prevent malicious deletion or modiﬁcation.
This ensures that the state of the blockchain can only be
changed by consensus TAs and the number of master node
requests reaching a threshold.
5.7
Password Change
User sends VIDi and pw, pw’ to OBU, OBU calculates B
i ¼
H0ðpw k biÞ, A
i ¼ Ci  B
i , D
i ¼ H0ðVIDi k B
i k A
i Þ, judges
D
i ¼
? Di, if this authentication fails, OBU rejects the request.
Otherwise, accept the new password pw’ of the vehicle,
OBU select bi’, calculate Bi’ ¼ H0ðpw’ k bi’Þ, Ci’ ¼ Ai  Bi’,
Di’ ¼ H0ðVIDi k Bi’ k AiÞ, OBU replaces the tuple fCi; Di;
ei; H0; q1; Z
qg with fCi’; Di’; ei; H0; q1; Z
qg.
6
SECURITY ANALYSIS AND SECURITY PROOF
In this part, we discuss the security requirements that the
proposed scheme can satisfy and provide security proof. It
was demonstrated that DBCPA meets all of the security
requirements mentioned in Section 3.
6.1
Security Analysis

Single registration: During the vehicle registration
stage in the DBCPA scheme, TA provides authenti-
cation information for all vehicles that join VANETs.
Then after, all vehicles can obtain authentication
information by themselves or through the RSU query
of the consortium blockchain, and conduct mutual
authentication without TA. As a result, DBCPA is
capable of satisfying the requirements of a single
registration.

Message authentication: The vehicle or RSU can use the
formula ui  P ¼ Ri þ ai  Vpki to check the validity of
the received message, where ai ¼ H2ðPIDi k Ri k
Mi k TiÞ. Due to hash function collision resistance
and ECDLP. Thence, any adversary with a probabilis-
tic polynomial-time adversary will be unable to man-
ufacture acceptable authentication text. The RSU or
other vehicles will be able to detect any changes to the
1134
IEEE TRANSACTIONS ON MOBILE COMPUTING, VOL. 23, NO. 2, FEBRUARY 2024
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:48:39 UTC from IEEE Xplore.  Restrictions apply. 



# Page 9

message. As a result, DBCPA holds up secure mes-
sage transmission authentication.

Privacy protection: During the certiﬁcation process,
DBCPA protects the real identity VIDi of the vehicle
with regularly updated pseudonymous identities.
Since the blinding factor of PIDi ¼ VIDi  H1ðski 
s  PÞ is a Difﬁe-Hellman tuple. And because of the
ECDH problem, we came to the conclusion that no
malicious entities have access to actionable informa-
tion about the real identity. Therefore, DBCPA can
effectively protect vehicles’ privacy.

Traceability: In the smart contract design, the mask
value of the identiﬁcation information contained in
the smart contract is PIDi ¼ VIDi  H1ðski  s  PÞ,
where ski is the vehicle’s key and s is the TA’s mas-
ter key. This represents that only the private block-
chain nodes and related vehicles may see the real
identity. Hence, when bad behavior occurs, private
blockchain nodes quickly determine the real identity
based on the private blockchain’s data. Moreover,
because of the data integrity given by the blockchain,
this account capability may be trusted. As a result,
DBCPA can thus give traceability.

Unlinkability: The private blockchain nodes of RSU
regularly update the pseudonymous identity of the
vehicle. Here, no message recipient can discover the
real identity of the sender or connect the two mes-
sages to a single entity. Therefore, unlinkability is
satisﬁed.

No online registry: According to the description of
DBCPA, the RSU or vehicle obtains the required
information through smart contracts deployed and
executed in the blockchain. Use the obtained infor-
mation to verify its signature and check the received
message’s validity. In this scheme, the TA is not
involved in the whole authentication process. As a
result, DBCPA can implement authentication with-
out the use of an online registration center.

Resist ofﬂine password guessing attacks: It is assumed
that
the
message
fPIDi; Mi; Ri; Ti; uig
can
be
observed by an adversary in the network by eaves-
dropping on the communication network. However,
as analyzed earlier, there is no information regarding
the password string in these intercepted messages.
To put it another way, the adversary has no means
of knowing if his or her guess for the password pw is
correct. As a result, DBCPA is immune to ofﬂine
password guessing attacks.

Resisting replay attack: The vehicle sends fPIDi;
Mi; Ri; Ti; uig for message transmission and certiﬁca-
tion during the login and authentication stage. To
ensure message freshness, timestamps must be used.
As mentioned before, PIDi are pseudonymous iden-
tities, Ri ¼ ri  P, ui ¼ ri þ ski  ai and ai ¼ HiðPIDi k
Ri k Mi k TiÞ.
By
checking
the
validity
of
the
received messages, both the RSU and the vehicle can
quickly and accurately detect any replay behavior.
This is because the pseudonym is temporary in the
communication process, the time stamp Ti is used to
ensure the message’s freshness, the random number
ri, and the security assumption of the hash function
is used.

Resisting vehicle impersonation attacks: During the
login phase, because no adversary can create a valid
login request in probabilistic polynomial time, the
OBU veriﬁes the judgment D
i ¼
? Di to identify the
owner. Moreover, the attacker cannot impersonate
other legitimate vehicles to broadcast messages in
the
network,
because
only
broadcast
messages
signed by the key ski preinstalled in the OBU are
valid messages. As a result, DBCPA is capable of
successfully defending against vehicle impersona-
tion assaults.

Resist DDoS attacks: The DBCPA inherits the ability
of blockchain to resist DDoS attacks. This means that
illegal actions by any users who want to make modi-
ﬁcations to transaction records and smart contracts
can be blocked, and each illegal transaction cannot
be written down on the blockchain. Additionally, the
ABI in the smart contract automatically performs a
lookup of the vehicle’s public key in the blockchain
even when some point in the network is blocked.
Therefore, DBCPA can defend against DDoS attacks.
6.2
Security Proof
First, we explain the deﬁnition of the ECDLP.
Deﬁnition 1. For ECDLP, a group G is generated by the gener-
ator P, which satisﬁes T ¼ t  P 2 G, and t 2 Z
q. In this case,
with a given T ¼ t  P, it is impossible to learn t.
The DBCPA security model also includes adversary A and
challenger B, with B maintaining hash sets Lh1 and Lh2. The
game between A and B deﬁnes the security model of DBCPA
in detail.
1)
Setup-Oracle: B is the one who generates the system’s
private key and parameters. The system parameters are
then sent to A by B when A invokes Setup-Oracle to
query.
2)
h1-Oracle: When A calls the h1-Oracle query, B pro-
vides a random number y to A, with B choosing the
random number y 2 Z
q. The tuple hinfo; yi is inserted
into Lh1 by B.
3)
h2-Oracle: When A calls the h2-Oracle query, B pro-
vides a random number y to A, where the random
number y 2 Z
q is selected by B. The tuple hinfo; yi is
inserted into Lh2 by B.
4)
Extract-Oracle: When A uses the PIDi about the
user’s identiﬁcation information in an Extract-Oracle
query, B be produced a message tuple hPIDi; skii and
delivers it to A.
5)
Sign-Oracle: When A uses the message Mi about the
trafﬁc situation in the Sign-Oracle query, B constructs
a message tuple hMi; Ri; uii and delivers it to A.
In the proposed scheme, A can execute existential forgery
under an adaptive chosen message attack with a probability of
% and a time limit of T. A could break the DBCPA if he/she
could construct an effective login request message. The chance
that A could violate the DBCPA is indicated by AdvAuthðAÞ.
ZHANG ET AL.: DBCPA: DUAL BLOCKCHAIN-ASSISTED CONDITIONAL PRIVACY-PRESERVING AUTHENTICATION FRAMEWORK AND...
1135
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:48:39 UTC from IEEE Xplore.  Restrictions apply. 



# Page 10

Theorem 1. If A can defeat the DBCPA scheme, then B can
defeat the ECDLP in period T, which is estimated to be less
than 120686 e
MT
%
, if %  10ðe
Nþ1Þðe
Nþ e
MÞ
q
. The probability here is
derived based on the Forking Lemma in literature [53], that is,
T 0  84480 e
MT
%
¼ 84480 e
MT
7 e
M
 2k can be deduced from Theorem 10,
7Q  7%
10  2k can be deduced from Theorem 13, and T 0 
84480 e
MT
7Q
 2k ¼ 84480 e
MT
7%
102k
 2k ¼ 84480 e
MT102k
7%2k
 2k ¼ 120686 e
MT
%
can be
deduced from the combination of Theorem 10 and Theorem 13.
And here, e
M and e
N are the number of times that A can interro-
gate the random oracle and sign the oracle, respectively.
Proof. Suppose B runs the proposed signature process
given
an
ECDLP
specimen
ðP; ski  PÞ
of
ski 2 Z
q.
Assume A is capable of defeating the DBCPA scheme.
Challenger B solves ECDLP by executing the following
query from adversary A, running adversary A as a sub-
routine with non-negligible probability.
tu
Setup: The input to the setup algorithm is a k, where k is a
security parameter. B randomly chooses a number s and sets
it as the private key, then calculates the public key Ppub, here
Ppub ¼ s  P. Later, Challenger B sends fP; Ppub; q; h1; h2g to A.
h1 Hash Query: If A calls the h1 query with hPIDi; Dii, B
checks whether the tuple hPIDi; Dii already exists in Lh1. If
the tuple already exists in Lh1, B sends A the relevant value
H1 in the tuple. Or else, B will pick a random H1 and enter a
hPIDi; Di; H1i tuple into Lh1. Following that, B gives A the
value H1 ¼ h1ðPIDi k DiÞ to A.
h2 Hash Query: If A calls the h2
query with the
hDi; Ri; PIDi; Mi; Tii, B checks whether the tuple hDi; Ri;
PIDi; Mi; Tii already exists in Lh2. If the tuple already exists
in Lh2, B sends A the relevant value H2 in the tuple. Or else, B
will pick a random H2 and enter a hDi; Ri; PIDi; Mi; Ti; H2i
tuple into Lh2. Following that, B gives A the value H2 ¼
h2ðDi k ri k PIDi k Mi k TiÞ to A.
Extract Query: If A calls an extract query on the identity
information PIDi of user, B computes and examines
whether the tuple hPIDi; Dii is already stored in Lh1. If the
corresponding pair hPIDi; Di; H1 ¼ h1ðPIDi k DiÞi cannot
be found according to hPIDi; Dii, B direction A delivers a
failure message and rejects the query. Or else, B evaluates
ski and returns hPIDi; skii to A. Note that by making extract
query, A cannot get the skj of the target user with PIDj.
Sign Query: If A makes this query on message Mi with
pseudonym identity PIDi, B ﬁrst examines whether the
tuple hPIDi; Di; H1i from Lh1. H1 is obtained by B from the
tuple hPIDi; Di; H1i. B then chooses two numbers at ran-
dom, ri and H2. Besides, B chooses two numbers at random,
mi and yi and tries again. Or else, B calculates Ri ¼
H1
2 miP  e
M and ui ¼ mi and transmits hMi; Ri; uii to A,
where h2ðDi k Ri k PIDi k Mi k TiÞ ¼ H2.
Analysis: Using the Forking Lemma [53], once A can pro-
duce two valid signatures ðRi; ui ¼ H2 	 ri þ ski mod qÞ and
ðR’
i; u’
i ¼ H’
2 	 ri þ ski mod qÞ, and H2 6¼ H’
2, Then B can cal-
culate ski from these two valid signatures.
As a result, B is capable of solving the ECDLP in a time
that is less than 120686 e
MT
%
, where %  10ðe
Nþ1Þðe
Nþ e
MÞ
q
. Because
this conclusion contradicts the Deﬁnition 1, the proposed
DBCPA scheme is secure under the adaptive chosen mes-
sage attack in the random oracle model.
7
PERFORMANCE ANALYSIS
In this part, we present the performance analysis and exper-
imental feasibility analysis of the proposed DBCPA scheme.
We compared several related protocols with the protocol
we studied [1][13][14]. Among them, the scheme of He et al.
[1] is the original scheme of ECC-based conditional privacy-
preserving authentication scheme in VANETs. The schemes
of Ali et al. [13] and Sutrala et al. [14] are an improved ECC-
based conditional privacy-preserving authenticated signa-
ture scheme.
7.1
Computational Overhead Analysis
We analyze the computational overhead of various methods
through three procedures in this section. Namely pseudony-
mous identity generation processes, message signing pro-
cesses including signature and key generation processes,
and message veriﬁcation processes. These three processes
are represented by PROCPIDgenerate, PROCMsign, and
PROCMverify respectively. To analyze the computational
overhead of cryptographic operations, we use a C/C++
cryptographic library named MIRACL [54] to measure all
involved cryptographic operations for the proposed and
compared schemes. We conducted performance evaluations
on a laptop running the Ubuntu 18.04.6 operating system
with an Intel(R) Core(TM) i5-4590 CPU(3.30 GHz) and 4GB
RAM. The results obtained are described in Table 2. We can
roughly calculate the execution time associated with crypto-
graphic operations during a successful certiﬁcation process.
It’s worth noting that TA is ofﬂine throughout the authenti-
cation process, and we calculate the computational over-
head on the vehicle side.
For the scheme of He et al. [1], the PROCPIDgenerate
requires a vehicle to execute two sm-ecc and one h. There-
fore, the computational overhead of the PROCPIDgenerate is
2Tsmecc+Th=0.74838 ms. For the PROCMsign, the vehicle
needs to execute one sm-ecc and two h. So the computational
cost of the PROCMsign is Tsmecc+2Th=0.37554 ms. For the
PROCMverify, the vehicle needs to execute three sm-ecc, two
pa-ecc, and two h. Therefore, the computational overhead of
the PROCMverify is 3Tsmecc+2Tpaecc+2Th=1.12814 ms. So
TABLE 2
Several Cryptographic Operations’ Execution Times
Opration
Deﬁnition
Operation
Time
Symbol
Average
Execution
Time (ms)
pa-ecc
Point addition
operation related to
ECC
Tpaecc
0.00256
sm-ecc
Scalar multiplication
operation related to
ECC
Tsmecc
0.37374
im-ecc
Integer multiplication
operation related to
ECC
Timecc
0.04102
h
Hash operation
Th
0.0009
1136
IEEE TRANSACTIONS ON MOBILE COMPUTING, VOL. 23, NO. 2, FEBRUARY 2024
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:48:39 UTC from IEEE Xplore.  Restrictions apply. 



# Page 11

the scheme of He et al. [1] has a total computational cost of
2:25206 ms for the three processes.
For the scheme of Ali et al. [13], the PROCPIDgenerate requires
a vehicle to execute an sm-ecc. Therefore, the computational
overhead of the PROCPIDgenerate is 0:37374 ms. For the
PROCMsign, the vehicle needs to execute three sm-ecc, one
pa-ecc, and one h. So the computational cost of the PROCMsign
is 3Tsmecc+Tpaecc+Th=1:12468 ms. For the PROCMverify, the
vehicle needs to execute two sm-ecc, one pa-ecc, and one h.
Therefore, the computational cost of the PROCMverify is
2Tsmecc+Tpaecc+Th=0:75094 ms. So the scheme of Ali et al. [13]
has a total computational cost of 2:24936 ms for the three
processes.
For the scheme of Sutrala et al. [14], the PR- OCPIDgenerate of
the vehicle needs to execute four sm-ecc and two h. Therefore,
the computational overhead of the PROCPIDgenerate of this
scheme is 4Tsmecc+ 2Th=1:49676 ms. For the PROCMsign, the
vehicle needs to execute one sm-ecc and one h. So the computa-
tional cost of the PROCMsign is Tsmecc + Th = 0:37464 ms. For
the PROCMverify, the vehicle needs to execute three sm-ecc,
two pa-ecc, and two h. Therefore, the computational cost of the
PROCMverify is 3Tsmecc+2Tpaecc+2Th=1:12814 ms. So the
scheme of Sutrala et al. [14] have a total computational cost of
2:99954 ms for the three processes.
For our proposed scheme, the ﬁrst PROCPIDgenerate is
preloaded into OBU through TA calculation and loaded into
the private blockchain, and the computational overhead on
the vehicle side is 0 ms. The subsequent PROCPIDgenerate is
sent to the vehicle by the RSU node of the private blockchain
through a message signature, and the vehicle updates the
pseudonym identity after the veriﬁcation process. For the
PROCMverify, the vehicle needs to execute an pa-ecc, two
sm-ecc, and a h. Therefore, the computational cost of the
PROCMverify is 2Tsmecc+Tpaecc+Th=0:75094 ms. Therefore,
the computational overhead of the PROCPIDgenerate is
2Tsmecc+ Tpaecc+Th=0.75094 ms. For the PROCMsign, the
vehicle needs to execute one sm-ecc and a h. So the computa-
tional cost of the PROCMsign is Tsmecc+Th=0.37464 ms. So
the total computational overhead of the three processes of
our proposed scheme is 1:87652 ms.
Fig. 5 shows a comparison of different approaches in
terms of computational overhead. The computational over-
head of our proposal is higher than that of the scheme of Ali
et al. [13] in the PROCPIDgenerate, but lower than that of the
scheme of Sutrala et al. [14], and has almost the same com-
putation as the scheme of He et al. [1] overhead. The pro-
posed DBCPA scheme has the same time overhead as the
scheme of Ali et al. [13] and Sutrala et al. [14] in the
PROCMsign and has a smaller computational overhead
than the scheme of He et al. [1]. During PROCMverify, our
scheme has the same time overhead as the scheme of Ali
et al. [13] and has the lowest computational overhead
among all schemes. To sum up the above, the total computa-
tional overhead of our proposed proposal is the lowest
among all schemes, as depicted in Fig. 6.
7.2
Communication or Storage Overhead Analysis
To analyze the communication overhead of cryptographic
operations, we have the following settings. To achieve the
80-bit security level, we use an additive group G, which is
generated by a point P of order q on the nonsingular elliptic
curve y2 ¼ x3 þ ax þ b mod p, where p and q are two prime
numbers, and ðq; a; bÞ 2 Fp. It’s worth noting that when
using the above settings, the trafﬁc emergency notiﬁcations’
size is restricted to 160 bits. If the size of the trafﬁc emer-
gency message is required to be greater than 160 bits, an
elliptic curve with a larger order can be selected. For
instance, curve P-256 can be selected, which supports 256-
bit messages, or P-384, which supports 384-bit messages. To
facilitate comparison with related schemes, we suppose that
the timestamp’s size is 32 bits and that the trafﬁc-related
messages are encoded as 160-bit strings (as previously
stated, if we need messages of a larger size, then we can
choose elliptic curves of larger order).
In the scheme of He et al. [1], the vehicle needs to broadcast
fPIDi ¼ ðPID1
i ; PID2
i Þ; mi; Ti; si; Rig, where PID1
i , Ri 2 G,
PID2
i ; si 2 Z
q. As a result, He et al.’s design [1] has a commu-
nication overhead of ð320 þ 160 þ 160 þ 32 þ 160 þ 32Þ=8 ¼
144 bytes. In the scheme of Ali et al. [13], the vehicle must
broadcast
fmi; AIDi; pki; Qi; tig,
where
AIDi,
pki 2 G,
mi; Qi 2 Z
q. As a result, Ali et al.’s design [13] has a commu-
nication
overhead
of
ð160 þ 320 þ 320 þ 160 þ 32Þ=8 ¼
124 bytes. In the scheme of Sutrala et al. [14], the vehicle must
broadcast fPIDi ¼ ðPID1
i ; PID2
i ; TiÞ; mi; di ¼ ðfi; giÞ; Bi; Ki;
Ri; Tig, where PID1
i ; Bi; Ki; Ri 2 G, PID2
i ; fi; gi 2 Z
q. As a
result, Sutrala et al.’s design [14] has a communication over-
head
of
ð320 þ 160 þ 32 þ 160 þ 160 þ 160 þ 320 þ 320 þ
320Þ=8 ¼ 244 bytes. In the proposed DBCPA scheme, the
vehicle must broadcast fPIDi; Mi; Ri; Ti; uig, where PIDi; Ri
2 G, Mi; ui 2 Z
q. As a result, our proposed DBCPA scheme
has a communication overhead of ð320 þ 160 þ 32 þ 320 þ
Fig. 5. Compares the computational overhead in PROCPIDgenerate,
PROCMsign, and PROCMverify, respectively.
Fig. 6. The comparison of total computational overhead.
ZHANG ET AL.: DBCPA: DUAL BLOCKCHAIN-ASSISTED CONDITIONAL PRIVACY-PRESERVING AUTHENTICATION FRAMEWORK AND...
1137
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:48:39 UTC from IEEE Xplore.  Restrictions apply. 



# Page 12

160Þ=8 ¼ 124 bytes. The communication overhead compari-
son of these schemes is shown in Fig. 7.
We can observe that the communication and storage
overhead of the proposed DBCPA scheme is the smallest. In
a nutshell, the communication or storage overhead of the
proposed DBCPA scheme is 86:1% of the scheme of He et al.
[1] and is 51% of the scheme of Sutrala et al. [14]. There are
two reasons for this phenomenon. First, we use elliptic
curves in combination with blockchain. Second, the pro-
posed DBCPA scheme minimizes the transmission cost of
fake identities and signatures without sacriﬁcing security
strength.
7.3
Blockchain Practical Feasibility Analysis
To verify the feasibility of DBCPA, we execute the scheme on
the Ethereum test network Rinkeby1. Herein, Rinkeby can
provide customers with free funding requests, as well as a
user-friendly online interface for browsing blocks. Further-
more, we use a MetaMask-Chrome2 plug-in for Google
Chrome to connect Remix3 and Rinkeby in Chrome, and use
them to deploy and invoke our designed smart contracts.
The following are the speciﬁcs of this implementation.
First, we use MetaMask to create two accounts (TA and
RSU) for our testing, the addresses are 0x93Aec- 38B89aa
F03A2218637ec696bA41FdD49f4C; 0x07304fC- ea7fE20608
4B5CfBBb595f6f9742f1d22. Then switch to the TA account
and ask Rinkeby for 3 Ethers. In this way, the TA can initially
load the relevant private information of the ofﬂine registra-
tion of the vehicle into the private blockchain. And can per-
form related operations such as adding, deleting, updating,
and searching for vehicle private information. To ensures
that the transmitted information is reliable even without a
centralized third party on the VANETs. Fig. 8 depicts the
results.
Second, We executed Remix as TA to deploy the smart con-
tract to Rinkeby and get its address (i.e., 0x623a2f02-16e3
BFcBf148aa2CD89E647F8AE8fB95). We also call the vehi-
cle threshold setting algorithm via Remix to set the threshold
for revoking offending vehicles, as shown in Fig. 9.
Finally, when the vehicle reports the malicious behavior
of the malicious vehicle to the RSU, it goes through the pri-
vate blockchain nodes consensus. We simulated the private
blockchain RSU nodes to add the relevant information of
the reported vehicle in Rinkeby, such as the whistleblower’s
pseudonym, the reported person, the number of reports,
etc. We switch to the RSU node account, invoke the com-
plaint algorithm, and update the consensus reported vehicle
information to the private blockchain, as depicted in Fig. 10.
Meanwhile, the smart contract calls the threshold judg-
ment algorithm. If a reported vehicle is reported a threshold
number of times, the current state recorded in the smart
contract will be terminated. And the vehicle is revoked
through the ABI of removeEPIT(PIDi), thereby deleting the
related tuples in the double blockchain, and broadcasting
the vehicle revocation message to other nodes.
In addition, to test the cost in terms of transaction
fees, we evaluated the gas cost of the relevant opera-
tions. And the results are shown in Table 3. The price on
January 22, 2022, is 1 ETHER=2412.5 USD, and the aver-
age GAS PRICE=2.5 GWEI. Smart contracts only need to
be deployed once by the TA. Table 3 shows the out-
comes, the largest cost is the deployment of the smart
contract, which costs about $6:47583, but is only executed
once. And the cost of other operations is less than $1:79,
which is an acceptable cost even if these operations are
repeatedly called frequently.
Fig. 7. The comparisons of communication overhead.
Fig. 8. TA deploys smart contracts.
Fig. 9. Execute the vehicle threshold setting algorithm.
1. https://www.rinkeby.io
2. chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/home.
html
3. http://remix.ethereum.org
1138
IEEE TRANSACTIONS ON MOBILE COMPUTING, VOL. 23, NO. 2, FEBRUARY 2024
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:48:39 UTC from IEEE Xplore.  Restrictions apply. 



# Page 13

8
CONCLUSION
In this study, we develop a dual blockchain-assisted con-
ditional
privacy-preserving
authentication
framework
and protocol for VANETs. The proposed scheme fuses
blockchain
technology
with
cryptographic
primitives.
VANETs assisted by the dual blockchain can realize efﬁ-
cient
privacy-preserving
authentication
even
if
the
trusted third party is ofﬂine. The accuracy and reliability
of
the
information
transmitted
in
VANETs
can
be
ensured while protecting vehicle privacy. The distributed
dynamic revocation of illegal vehicles is realized via
smart contracts. Expandability and robustness can be
guaranteed through all nodes, rather than centralized
control, which eliminates the several-for-one communica-
tion ﬂow and single-point failure. Detailed security anal-
ysis indicates that the scheme satisﬁes the security and
privacy requirements of VANETs. Performance analysis
reveals that this scheme has certain advantages compared
with related schemes. In future work, we will also
explore ﬂexible privacy-preserving mechanisms to con-
struct a more practical scheme that solves the different
security requirements of VANETs.
ACKNOWLEDGMENTS
The authors are very grateful to the anonymous referees for
their detailed comments and suggestions regarding this
paper.
REFERENCES
[1]
D. He, S. Zeadally, B. Xu, and X. Huang, “An efﬁcient identity-
based conditional privacy-preserving authentication scheme for
vehicular ad hoc networks,” IEEE Trans. Inf. Forensics Security,
vol. 10, no. 12, pp. 2681–2691, Dec. 2015.
[2]
J. Zhang, J. Cui, H. Zhong, Z. Chen, and L. Liu, “PA-CRT: Chinese
remainder theorem based conditional privacy-preserving authenti-
cation scheme in vehicular ad-hoc networks,” IEEE Trans. Depend-
able Secure Comput., vol. 18, no. 2, pp. 722–735, Mar./Apr. 2019.
[3]
I. Tal and G.-M. Muntean, “Clustering and 5G-enabled smart cit-
ies: A survey of clustering schemes in VANETs,” in Research
Anthology on Developing and Optimizing 5G Networks and the Impact
on Society. Hershey, PA, USA: IGI Global, 2021, pp. 1012–1050.
[4]
C. Chen, C. Wang, T. Qiu, N. Lv, and Q. Pei, “A secure content shar-
ing scheme based on blockchain in vehicular named data networks,”
IEEE Trans. Ind. Informat., vol. 16, no. 5, pp. 3278–3289, May 2020.
[5]
A. Singh and L. Katare, “Connected car market by technology (3G
4G/LTE and 5G) connectivity solution (integrated embedded and
tethered) service (driver assistance safety entertainment well-being
vehicle management and mobility management) and end use (orig-
inal equipment manufacturer (oems) and aftermarket): Global
opportunity analysis and industry forecast 2020–2027,” 2020.
[6]
H. Hartenstein and L. Laberteaux, “A tutorial survey on vehicular
ad hoc networks,” IEEE Commun. Mag., vol. 46, no. 6, pp. 164–171,
Jun. 2008.
[7]
Q. Feng, D. He, S. Zeadally, N. Kumar, and K. Liang, “Ideal lat-
tice-based
anonymous
authentication
protocol
for
mobile
devices,” IEEE Syst. J., vol. 13, no. 3, pp. 2775–2785, Sep. 2019.
[8]
S.-J. Horng et al., “b-SPECS+: Batch veriﬁcation for secure pseu-
donymous authentication in VANET,” IEEE Trans. Inf. Forensics
Security, vol. 8, no. 11, pp. 1860–1875, Nov. 2013.
[9]
D. Wang, H. Cheng, P. Wang, X. Huang, and G. Jian, “Zipf’s law
in passwords,” IEEE Trans. Inf. Forensics Security, vol. 12, no. 11,
pp. 2776–2791, Nov. 2017.
[10] D. Wang and P. Wang, “Two birds with one stone: Two-factor
authentication with security beyond conventional bound,” IEEE
Trans. Dependable Secure Comput., vol. 15, no. 4, pp. 708–722, Jul./
Aug. 2016.
[11] B. Chen, L. Wu, N. Kumar, K.-K. R. Choo, and D. He, “Lightweight
searchable public-key encryption with forward privacy over IIoT
outsourced data,” IEEE Trans. Emerg. Topics Comput., vol. 9, no. 4,
pp. 1753–1764, Fourth Quarter 2019.
[12] Q. Feng, D. He, S. Zeadally, and K. Liang, “BPAS: Blockchain-
assisted privacy-preserving authentication system for vehicular
ad hoc networks,” IEEE Trans. Ind. Informat., vol. 16, no. 6,
pp. 4146–4155, Jun. 2019.
[13] I. Ali, Y. Chen, N. Ullah, R. Kumar, and W. He, “An efﬁcient and
provably
secure
ECC-based
conditional
privacy-preserving
authentication for vehicle-to-vehicle communication in VANETs,”
IEEE Trans. Veh. Technol, vol. 70, no. 2, pp. 1278–1291, Feb. 2021.
[14] A. K. Sutrala, P. Bagga, A. K. Das, N. Kumar, J. J. Rodrigues, and
P. Lorenz, “On the design of conditional privacy preserving batch
veriﬁcation-based authentication scheme for Internet of vehicles
deployment,” IEEE Trans. Veh. Technol, vol. 69, no. 5, pp. 5535–
5548, May 2020.
[15] Q. Feng, D. He, S. Zeadally, M. K. Khan, and N. Kumar, “A survey
on privacy protection in blockchain system,” J. Netw. Comput.
Appl., vol. 126, pp. 45–58, 2019.
[16] M. Singh and S. Kim, “Blockchain based intelligent vehicle data
sharing framework,” 2017, arXiv:1708.09721.
[17] M. Raya and J.-P. Hubaux, “Securing vehicular ad hoc networks,”
J. Comput. Secur., vol. 15, no. 1, pp. 39–68, 2007.
[18] A. Wasef, Y. Jiang, and X. Shen, “ECMV: Efﬁcient certiﬁcate man-
agement scheme for vehicular networks,” in Proc. IEEE Glob. Tele-
commun. Conf., 2008, pp. 1–5.
[19] G. Calandriello, P. Papadimitratos, J.-P. Hubaux, and A. Lioy,
“Efﬁcient and robust pseudonymous authentication in VANET,”
in Proc. 4th ACM Int. Workshop Veh. ad hoc Netw., 2007, pp. 19–28.
[20] R. Yu, J. Kang, X. Huang, S. Xie, Y. Zhang, and S. Gjessing,
“MixGroup: Accumulative pseudonym exchanging for location
privacy enhancement in vehicular social networks,” IEEE Trans.
Dependable Secure Comput., vol. 13, no. 1, pp. 93–105, Jan./Feb. 2015.
[21] I. Ali, Y. Chen, N. Ullah, M. Afzal, and H. Wen, “Bilinear pairing-
based hybrid signcryption for secure heterogeneous vehicular
communications,” IEEE Trans. Veh. Technol, vol. 70, no. 6,
pp. 5974–5989, Jun. 2021.
Fig. 10. Implement malicious vehicle complaint algorithm.
TABLE 3
TA Smart Contract Gas Cost( Gas Price = 2.5 GWEI,
1 Ether = 2412.5 USD)
Operation
Gas
Used
Actual Cost
(ether)
USD
Deploy
1342141
0:002684282
6:47583
insertEPIT
3692975
0:000738595
1:78186
removeEPIT
304505
0:000060901
0:14692
updateEPIT
846055
0:000169211
0:40822
ThresholdSet
29911
0:000059822
0:14432
complaint
1724455
0:000344891
0:83205
judgeThreshold
334035
0:000066807
0:16117
ZHANG ET AL.: DBCPA: DUAL BLOCKCHAIN-ASSISTED CONDITIONAL PRIVACY-PRESERVING AUTHENTICATION FRAMEWORK AND...
1139
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:48:39 UTC from IEEE Xplore.  Restrictions apply. 



# Page 14

[22] A. Shamir, “Identity-based cryptosystems and signature schemes,”
in Proc. Workshop Theory Appl. Cryptogr. Techn., 1984, pp. 47–53.
[23] C. Zhang, P.-H. Ho, and J. Tapolcai, “On batch veriﬁcation with
group testing for vehicular communications,” Wireless Netw.,
vol. 17, no. 8, pp. 1851–1865, 2011.
[24] T. W. Chim, S.-M. Yiu, L. C. Hui, and V. O. Li, “SPECS: Secure and
privacy enhancing communications schemes for VANETs,” Ad
Hoc Netw., vol. 9, no. 2, pp. 189–203, 2011.
[25] I. Ali, T. Lawrence, and F. Li, “An efﬁcient identity-based signa-
ture scheme without bilinear pairing for vehicle-to-vehicle com-
munication in VANETs,” J. Syst. Architect., vol. 103, 2020,
Art. no. 101692.
[26] K. Zeng, “Pseudonymous PKI for ubiquitous computing,” in Proc.
Eur. Public Key Infrastructure Workshop, 2006, pp. 207–222.
[27] R. S. Raw, M. Kumar, and N. Singh, “Security challenges, issues
and their solutions for VANET,” Int. J. Netw. Secur. Appl., vol. 5,
no. 5, 2013, Art. no. 95.
[28] Q.-F. Shao, C.-Q. Jin, Z. Zhang, W. Qian, and A.-Y. Zhou,
“Blockchain: Architecture and research progress,” Chin. J. Com-
put., vol. 41, no. 5, pp. 969–988, 2018.
[29] Z. Lu, Q. Wang, G. Qu, H. Zhang, and Z. Liu, “A blockchain-
based privacy-preserving authentication scheme for VANETs,”
IEEE Trans. Very Large Scale Integr. (VLSI) Syst., vol. 27, no. 12,
pp. 2792–2801, Dec. 2019.
[30] D. Zheng, C. Jing, R. Guo, S. Gao, and L. Wang, “A traceable
blockchain-based access authentication system with privacy pres-
ervation in VANETs,” IEEE Access, vol. 7, pp. 117 716–117 726,
2019.
[31] C. Lin, D. He, X. Huang, N. Kumar, and K.-K. R. Choo, “BCPPA:
A blockchain-based conditional privacy-preserving authentica-
tion protocol for vehicular ad hoc networks,” IEEE Trans. Intell.
Transp. Syst., vol. 22, no. 12, pp. 7408–7420, Dec. 2020.
[32] X. Huang, R. Yu, J. Kang, Y. He, and Y. Zhang, “Exploring mobile
edge computing for 5G-enabled software deﬁned vehicular
networks,” IEEE Wireless Commun., vol. 24, no. 6, pp. 55–63, Dec.
2017.
[33] S. A. A. Shah, E. Ahmed, M. Imran, and S. Zeadally, “5G for vehic-
ular communications,” IEEE Commun. Mag., vol. 56, no. 1,
pp. 111–117, Jan. 2018.
[34] P. Dong, T. Zheng, S. Yu, H. Zhang, and X. Yan, “Enhancing vehicular
communication using 5G-enabled smart collaborative networking,”
IEEE Wireless Commun., vol. 24, no. 6, pp. 72–79, Dec. 2017.
[35] K. S. V. Prasad, E. Hossain, and V. K. Bhargava, “Energy efﬁciency in
massive mimo-based 5G networks: Opportunities and challenges,”
IEEE Wireless Commun., vol. 24, no. 3, pp. 86–94, Jun. 2017.
[36] Q. Wu, G. Y. Li, W. Chen, D. W. K. Ng, and R. Schober, “An over-
view of sustainable green 5G networks,” IEEE Wireless Commun.,
vol. 24, no. 4, pp. 72–80, Aug. 2017.
[37] H. Wymeersch, G. Seco-Granados, G. Destino, D. Dardari, and F.
Tufvesson, “5G mmwave positioning for vehicular networks,”
IEEE Wireless Commun., vol. 24, no. 6, pp. 80–86, Dec. 2017.
[38] M. Castro et al., “Practical byzantine fault tolerance,” in Proc. 3rd
Symp. Operating Syst. Des. Implementation, 1999, pp. 173–186.
[39] X.-j. Liu, Y.-d. Yin, W. Chen, Y.-j. Xia, J.-l. Xu, and L.-d. Han,
“Secure data sharing scheme in internet of vehicles based on
blockchain,” J. ZheJiang Univ. (Eng. Sci.), vol. 55, no. 5, pp. 957–965.
[40] M. Li, L. Zhu, and X. Lin, “Efﬁcient and privacy-preserving car-
pooling using blockchain-assisted vehicular fog computing,”
IEEE Internet Things J., vol. 6, no. 3, pp. 4573–4584, Jun. 2019.
[41] H. Liao, Y. Mu, Z. Zhou, M. Sun, Z. Wang, and C. Pan,
“Blockchain and learning-based secure and intelligent task off-
loading for vehicular fog computing,” IEEE Trans. Intell. Transp.
Syst., vol. 22, no. 7, pp. 4051–4063, Jul. 2020.
[42] X. Li, J. Liu, M. S. Obaidat, P. Vijayakumar, Q. Jiang, and R. Amin,
“An unlinkable authenticated key agreement with collusion resis-
tant for VANETs,” IEEE Trans. Veh. Technol, vol. 70, no. 8,
pp. 7992–8006, Aug. 2021.
[43] Y. Saouter, “Constructions of LDPCs from elliptic curves over
ﬁnite ﬁelds,” IEEE Commun. Lett., vol. 21, no. 12, pp. 2558–2561,
Dec. 2017.
[44] N. Koblitz, “Elliptic curve cryptosystems,” Math. Comput., vol. 48,
no. 177, pp. 203–209, 1987.
[45] F. Cedo, E. Jespers, and J. Okninski, “Every ﬁnite abelian group is
a subgroup of the additive group of a ﬁnite simple left brace,” J.
Pure Appl. Algebra, vol. 225, no. 1, 2021, Art. no. 106476.
[46] M. Zhang, J. Zhou, G. Zhang, M. Zou, and M. Chen, “EC-BAAS:
Elliptic curve-based batch anonymous authentication scheme
for internet of vehicles,” J. Syst. Architect., vol. 117, 2021,
Art. no. 102161.
[47] J. Wang, J. Li, H. Wang, L. Y. Zhang, L.-M. Cheng, and Q. Lin,
“Dynamic scalable elliptic curve cryptographic scheme and its
application to in-vehicle security,” IEEE Internet Things J., vol. 6,
no. 4, pp. 5892–5901, Aug. 2019.
[48] G. Wood et al., “Ethereum: A secure decentralised generalised
transaction ledger,” Ethereum Project Yellow Paper, vol. 151,
no. 2014, pp. 1–32, 2014.
[49] S. Nakamoto, “Bitcoin: A peer-to-peer electronic cash system,”
Decentralized Bus. Rev., 2008, Art. no. 21260.
[50] D. Larimer, “Transactions as proof-of-stake,” vol. 909, Nov. 2013.
[51] E. Androulaki et al., “Hyperledger fabric: A distributed operating
system for permissioned blockchains,” in Proc. 13th EuroSys Conf.,
2018, pp. 1–15.
[52] D. Ongaro and J. Ousterhout, “In search of an understandable
consensus algorithm,” in Proc. USENIX Annu. Tech. Conf., 2014,
pp. 305–319.
[53] D. Pointcheval and J. Stern, “Security arguments for digital signa-
tures and blind signatures,” J. Cryptol., vol. 13, no. 3, pp. 361–396,
2000.
[54] M. Scott, “Miracl-a multiprecision integer and rational arithmetic
c/c++ library,” 2003. http://www.shamus.ie
Jing Zhang received the MA Eng and PhD
degrees in computer science from Anhui Univer-
sity. She is currently an associate professor with
the School of Computer Science and Technology,
Anhui University. Her research interests include
vehicular ad hoc network, IoT security and applied
cryptography. She has nearly 20 scientiﬁc publica-
tions in reputable journals (e.g., IEEE Transac-
tions on Dependable and Secure Computing,
IEEE Transactions on Information Forensics and
Security, IEEE Journal on Selected Areas in Com-
munications, IEEE Transactions on Vehicular Technology, IEEE Transac-
tions on Intelligent
Transportation Systems,
Information Sciences,
Science China Information Sciences and Vehicular Communications) and
international conferences.
Yue Jiang is currently a research student with
the School of Computer Science and Technology,
Anhui University. Her research focuses on the
security of the vehicular Ad Hoc networks.
Jie Cui (Senior Member, IEEE) received the PhD
degree from the University of Science and Tech-
nology of China, in 2012. He is currently a profes-
sor and PhD supervisor with the School of
Computer Science and Technology, Anhui Univer-
sity. His current research interests include applied
cryptography, IoT security, vehicular ad hoc net-
work, cloud computing security and software-
deﬁned networking (SDN). He has more than 150
scientiﬁc publications in reputable journals (e.g.,
IEEE Transactions on Dependable and Secure
Computing, IEEE Transactions on Information Forensics and Security,
IEEE Journal on Selected Areas in Communications, IEEE Transactions
on Mobile Computing, IEEE Transactions on Parallel and Distributed Sys-
tems, IEEE Transactions on Computers, IEEE Transactions on Vehicular
Technology, IEEE Transactions on Intelligent Transportation Systems,
IEEE Transactions on Network and Service Management, IEEE Transac-
tions on Industrial Informatics, IEEE Transactions on Industrial Electron-
ics, IEEE Transactions on Cloud Computing and IEEE Transactions on
Multimedia), academic books and international conferences.
1140
IEEE TRANSACTIONS ON MOBILE COMPUTING, VOL. 23, NO. 2, FEBRUARY 2024
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:48:39 UTC from IEEE Xplore.  Restrictions apply. 



# Page 15

Debiao He received the PhD degree in applied
mathematics from the School of Mathematics and
Statistics, Wuhan University, Wuhan, China, in
2009. He is currently a professor with the School of
Cyber Science and Engineering, Wuhan University,
Wuhan, China. His main research interests include
cryptography and information security, in particular,
cryptographic protocols. He has published more
than 100 research papers in refereed international
journals and conferences, such as IEEE Transac-
tions on Dependable and Secure Computing, IEEE
Transactions on Information Security and Forensic, and Usenix Security
Symposium. He is the recipient of the 2018 IEEE Sysems Journal Best
Paper Award and the 2019 IET Information Security Best Paper Award. His
work has been cited more than 10000 times with Google Scholar. He is in
the Editorial Board of several international journals, such as Journal of Infor-
mation Security and Applications, Frontiers of Computer Science, and
Human-centric Computing & Information Sciences.
Irina Bolodurina received the PhD degree from
South Ural State University. She is currently a
professor and head of Department of Applied
Mathematics, Orenburg State University. She has
more than 60 scientiﬁc publications in academic
journals and international conferences which
indexing in Scopus and WoS. She has partici-
pated in more than 20 scientiﬁc projects sup-
ported by the RFBR and other Russian scientiﬁc
programs. Her current research interests include
theory of optimal control, mathematical modeling,
information analysis software, control of social and economic systems,
decision support systems, data integration, and processing.
Hong Zhong received the PhD degree in com-
puter science from the University of Science and
Technology of China, in 2005. She is currently a
professor and PhD supervisor with the School of
Computer Science and Technology, Anhui Univer-
sity. Her research interests include applied cryp-
tography, IoT security, vehicular ad hoc network,
cloud computing security and software-deﬁned
networking (SDN). She has more than 200 scien-
tiﬁc publications in reputable journals (e.g., IEEE
Journal on Selected Areas in Communications,
IEEE Transactions on Parallel and Distributed Systems, IEEE Transac-
tions on Mobile Computing, IEEE Transactions on Dependable and
Secure Computing, IEEE Transactions on Information Forensics and
Security, IEEE Transactions on Intelligent Transportation Systems, IEEE
Transactions on Multimedia, IEEE Transactions on Vehicular Technol-
ogy, IEEE Transactions on Network and Service Management, IEEE
Transactions on Cloud Computing, IEEE Transactions on Industrial Infor-
matics, IEEE Transactions on Industrial Electronics and IEEE Transac-
tions on Big Data), academic books and international conferences.
" For more information on this or any other computing topic,
please visit our Digital Library at www.computer.org/csdl.
ZHANG ET AL.: DBCPA: DUAL BLOCKCHAIN-ASSISTED CONDITIONAL PRIVACY-PRESERVING AUTHENTICATION FRAMEWORK AND...
1141
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:48:39 UTC from IEEE Xplore.  Restrictions apply. 
