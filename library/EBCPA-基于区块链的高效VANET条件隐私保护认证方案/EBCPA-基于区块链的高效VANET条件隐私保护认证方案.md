

# Page 1

EBCPA: Efﬁcient Blockchain-Based Conditional
Privacy-Preserving Authentication for VANETs
Chao Lin
, Xinyi Huang
, and Debiao He
Abstract—Vehicular Ad-hoc Networks (VANETs) are with great potentials to facilitate trafﬁc management and improve driver safety.
Blockchain-based conditional privacy-preserving authentication (BCPPA) is proposed to achieve an optimal tradeoff among anonymity,
traceability and key/certiﬁcate management in VANETs. Existing BCPPA protocols mitigate these security and privacy challenges by adding a
signiﬁcant cost on veriﬁcation and traceability. As a result, current solutions fail to meet high mobility, low latency, and real-time requirements of
VANETs. In this article, we design three new system building blocks namely key derivation (KeyDer), signatures of knowledge (SoK) and
smart contract, following by a more efﬁcient BCPPA protocol (named as EBCPA). To show the advantage of EBCPA, we ﬁrst demonstrate it
can satisfy the necessary requirements (e.g., message authentication, conditional privacy protection, resilience to common attacks, and so
forth). Moreover, we implement the EBCPA in the on-line Ethereum test network (Rinkeby), Hyperledger test network and VANETs simulation
environment (via VanetMobiSim and NS-2). Finally, we evaluate its communication overhead and computational cost via comparing to existing
BCPPA protocols that strive to achieve similar properties. From the implementation and comparison results, our proposal can improve
efﬁciency by reducing the time cost of traceability at least 48.95% and veriﬁcation at least 42.21%.
Index Terms—Vehicular ad-hoc networks (VANETs), conditional privacy-preserving authentication (CPPA), blockchain, signatures of
knowledge, key derivation
Ç
1
INTRODUCTION
T
HE rapid increase of vehicles and the continuous devel-
opment of information technology (e.g., automatic driv-
ing, 5G and network slicing) have drawn wide attention in
vehicular ad-hoc networks (VANETs). In VANETs, vehicles
can collect various messages including velocity, location and
weather condition via global position system (GPS), radio
frequency identiﬁcation devices (RFID), electronic sensors or
automobile data recorders [1], [2]. These messages are shared
among vehicles and roadside units (RSUs) for responding to
real-time changes such as avoiding collision, intelligent rout-
ing and trafﬁc lighting, and consequently this will greatly
enhance driving safety and convenience [3].
Typical network framework of VANETs (Fig. 1) mainly
comprises ﬁve entities, namely trafﬁc control center (TCC),
RSU, vehicle, on-board unit (OBU) and Internet, as well as
three communication types, namely wired/wireless Inter-
net, vehicle-to-vehicle (V2V), and vehicle-to-RSU (V2R).
OBUs are embedded into vehicles for communicating with
other vehicles (or RSUs), to share real-time trafﬁc informa-
tion via wireless V2V (resp. wireless V2R). TCC is responsi-
ble for taking timely actions (e.g., adjusting trafﬁc lights)
according to trafﬁc messages obtained from RSUs [4].
While the above framework can improve smart process-
ing and real-time response in modern intelligent transporta-
tion, public wireless communications of V2V and V2R make
VANETs vulnerable to various attacks [5]. Speciﬁcally,
attackers may create social chaos via intercepting, tamper-
ing, or deleting transmitting data. As an example, millions
of General Motors (GM) cars and trucks were vulnerable to
a remote exploit for nearly half a decade, which can track
vehicles, or engage their brakes at high speed, or even dis-
able brakes altogether 1.
Authentication can mitigate the above issues, but it poses
a privacy risk to vehicles and corresponding drivers. The
real identity contained in transmitting messages may be

Chao Lin is with the Fujian Provincial Key Laboratory of Network Secu-
rity and Cryptology/Center for Applied Mathematics of Fujian Province,
College of Computer and Cyber Security, Fujian Normal University, Fuz-
hou 350117, China, and also with the Key Laboratory of Aerospace Infor-
mation Security and Trusted Computing, Ministry of Education, Wuhan
University, Wuhan 430072, China.
E-mail: linchao91@fjnu.edu.cn.

Xinyi Huang is with the Fujian Provincial Key Laboratory of Network
Security and Cryptology/Center for Applied Mathematics of Fujian Prov-
ince, College of Computer and Cyber Security, Fujian Normal University,
Fuzhou 350117, China. E-mail: xyhuang81@gmail.com.

Debiao He is with the School of Cyber Science and Engineering, Wuhan
University, Wuhan 430072, China, and with the Shandong Provincial
Key Laboratory of Computer Networks, Qilu University of Technology
(Shandong Academy of Sciences), Jinan 250014, China, and also with the
Shanghai Key Laboratory of Privacy-Preserving Computation, MatrixEle-
ments Technologies, Shanghai 201204, China. E-mail: hedebiao@163.com.
Manuscript received 16 Nov. 2021; revised 10 Feb. 2022; accepted 30 Mar. 2022.
Date of publication 5 Apr. 2022; date of current version 13 May 2023.
This work was supported in part by the National Key Research and Develop-
ment Program of China under Grant 2021YFA1000600, in part by the
National Natural Science Foundation of China under Grants 62032005,
62102089, U21A20466, 61972094, 61972294 and 61932016, in part by Sci-
ence Foundation of Fujian Provincial Science and Technology Agency under
Grant 2020J02016, in part by the Fundamental Research Funds for the Central
Universities under Grant 2042021kf1030, in part by the Science Foundation of
Fujian Provincial Science and Technology Agency under Grant 2020J02016,
in part by the Special Project on Science and Technology Program of Hubei
Province under Grant 2020AEA013, in part by the Natural Science Founda-
tion of Hubei Province under Grant 2020CFA052, and in part by the Wuhan
Municipal Science and Technology Project under Grant 2020010601012187.
(Corresponding author: Xinyi Huang.)
Digital Object Identiﬁer no. 10.1109/TDSC.2022.3164740
1. https://www.synopsys.com/glossary/what-is-connected-car-
cyber-security.html
1818
IEEE TRANSACTIONS ON DEPENDABLE AND SECURE COMPUTING, VOL. 20, NO. 3, MAY/JUNE 2023
1545-5971 © 2022 IEEE. Personal use is permitted, but republication/redistribution requires IEEE permission.
See ht_tps://www.ieee.org/publications/rights/index.html for more information.
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:49 UTC from IEEE Xplore.  Restrictions apply. 



# Page 2

abused by attackers to trace more private information
including driver name, home address and company infor-
mation. For instance, according to the survey data that most
vehicles are in parked status 95% of a day average, attackers
can effectively deduce the personal activities of a targeted
vehicle via analyzing its transmitting trafﬁc data such as the
destination, parking lots and interval time [6]. This may
seriously threaten the property security or even drivers’
personal safety, and hence we should highlight the impor-
tance of anonymity protection in VANETs.
On the other hand, the absolute anonymity may lead to
malicious message issuing, namely, malicious vehicles may
share false trafﬁc status such as the number of vehicles,
vehicle speed or trafﬁc lights, to confuse other vehicles or
cause a trafﬁc jam/accident. Thus, a traceability mechanism
is indispensable to track these malicious behaviors. To deal
with these issues, conditional privacy-preserving authenti-
cation (CPPA) has been proposed [7], [8], which not only
ensures the authenticity, validity and integrity of transmit-
ting messages, but also provides the anonymity of honest
vehicles and traceability of malicious behaviors.
Existing CPPA protocols could be broadly divided into
four types, namely PKI-based [7], [8], ID-based [9], [10], cer-
tiﬁcateless [11] [12], and blockchain-based [13], [14]. The
PKI-based solutions are generally effective and simple to
realize, but most of them involve signiﬁcant storage costs
(i.e., a large number of key/certiﬁcates are pre-loaded into
OBUs for ensuring anonymity) and intractable certiﬁcate
managements (e.g., issuing, updating and revocation). In
the ID-based solutions, vehicles’ secret keys are generated
by a trusted entity (e.g., private key generator, PKG) upon
the vehicles’ identities. This can avoid the complex key/cer-
tiﬁcate storage and management issue faced by the PKI-
based solutions. Additionally, ID-based solutions like [15],
[16], [17] can further provide efﬁcient batch veriﬁcation.
Nevertheless, existing ID-based solutions suffer from the
issues of key escrow and key revocation. The key escrow
refers to that a vehicle’s secret key is generated by the PKG,
who also knows this secret key. Once the PKG is compro-
mised, it can impersonate any vehicle to share counterfeit
trafﬁc messages and hence causes serious disturbance. This
issue is then solved by the certiﬁcateless CPPA, where the
vehicle’s secret key is determined by both the PKG (also
named as Key Generation Center (KGC)) and itself.
However, in both ID-based and certiﬁcateless CPPA, the
key revocation issue is still unsolved. The vehicle’s expired
secret key cannot be revoked conveniently because the vehi-
cle’s identity is regarded as the public information in ID-based
or certiﬁcateless solutions. The certiﬁcate revocation list of
PKI-based solutions is not suitable for ID-based or certiﬁcate-
less solutions, since such a list (if for maintaining revoked
identities) will revoke the entire authority of a vehicle. How-
ever, the revocation in ID-based solutions generally refers to
that those disclosed secret keys should be revoked and
updated, but not the whole identity.
Blockchain, an emerging technology with decentraliza-
tion, immutability, and veriﬁability, can potentially solve the
above issues. That is, those public information (such as certif-
icates, anonymous identities/public keys) can be managed
via the blockchain smart contract, such that the authentica-
tion (especially veriﬁcation) and revocation (deleting public
information logically) can be efﬁciently realized. Also, it only
requires retrieving public information from blockchain dur-
ing the authentication, which is considerably efﬁcient for
involving no new data storage into blockchain.
However, most blockchain-based conditional privacy-
preserving (BCPPA) protocols such as [13], [18], [19] involve
high communication overhead, frequent interactions or
trustworthy hardware (i.e., a device whose stored data can-
not be extracted). Recently, to further ease these issues, Lin
et al. [14] and Feng et al. [20] contributed two proposals with
privacy-preserving authentication and traceability, but nei-
ther of them can efﬁciently verify message integrity or trace
malicious behaviors. This motivates us to propose a more
efﬁcient and versatile BCPPA protocol for VANETs.
Contributions. Our main contribution is a more efﬁcient
BCPPA protocol (EBCPA) in VANETs. The EBCPA not only
achieves a tradeoff among anonymity, traceability and key/
certiﬁcate management, but also eliminates frequent inter-
actions, costly computation or trustworthy hardwares.
1)
The core idea of our EBCPA is a traceable one-time
public key (also named as anonymous public key)
generation mechanism. This mechanism can ensure
vehicles to authenticate each other anonymously
and only a trusted entity (i.e., manager) can recover
the long-time public key, namely the real identity of
a vehicle. The concrete construction of EBCPA is
based on a reconstructed key derivation (KeyDer)
scheme and the authentication is realized by a new
signatures of knowledge (SoK) scheme.
2)
Blockchain is employed to record anonymous public
keys publicly, such that vehicles can adopt these keys to
share trafﬁc data. Due to the use of KeyDer, the anony-
mous public keys could be submitted in advance and
periodically (e.g., pre-submitting about 240 anonymous
public keys once for an interval of two days). The
authentication between two vehicles only involves on-
chain retrieval operations, which can be efﬁciently real-
ized. This indeed mitigates the negative effects caused
by the low throughput and high latency of blockchain.
3)
In addition to the efﬁcient secret key/certiﬁcate revo-
cation and trustworthy hardware-free, our EBCPA
protocol is more efﬁcient than existing BCPPA proto-
cols especially in traceability and veriﬁcation. This
will be demonstrated via security analysis and perfor-
mance evaluation. Speciﬁcally, our proposal improves
the efﬁciency of traceability (at least 48.95%) and veri-
ﬁcation (at least 42.21%) than recent BCPPA protocols
(i.e., CertCoin [18], BCPPA [14] and BPAS [20]).
Fig. 1. Typical network framework of VANETs.
LIN ET AL.: EBCPA: EFFICIENT BLOCKCHAIN-BASED CONDITIONAL PRIVACY-PRESERVING AUTHENTICATION FOR VANETS
1819
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:49 UTC from IEEE Xplore.  Restrictions apply. 



# Page 3

Organization. The rest sections are organized as follows.
Sections 2 and 3 review the related work of CPPA and
involving preliminaries (including notations, cryptographic
primitives, system model, and security/privacy require-
ments) respectively. In Section 4, we introduce design details
of our KeyDer scheme, SoK scheme and smart contract, fol-
lowing by the constructed EBCPA protocol. Then, we dem-
onstrate the advantage of our proposal through security
analysis and performance evaluation in Sections 5 and 6
respectively. Section 7 is the conclusion of this paper.
2
RELATED WORK
The concept of CPPA in VANETs has been studied inten-
sively, which can be broadly classiﬁed into PKI-based, ID-
based, certiﬁcateless, and blockchain-based.
PKI-Based. In 2007, Raya and Hubaux [7] ﬁrst introduced
a PKI-based CPPA which can deal with security and pri-
vacy issues in VANETs. However, their proposal requires
pre-loading lots of public/secret key pairs together with
anonymous certiﬁcates. This will cause a considerable stor-
age overhead and also complex operations for achieving
key/certiﬁcate revocation. In addition, Freudiger et al. [21]
and Zhang et al. [22] adopted mix-zones and k-anonymity
respectively to propose new CPPA protocols. While their
proposals are more efﬁcient than previous solutions, they
still involve costly certiﬁcate storages on RSUs and vehicles.
To address the above issue, Lu et al. [8] introduced RSU-
based anonymous certiﬁcates into CPPA. That is, vehicles
can request a temporary anonymous certiﬁcate from their
nearby RSUs, such that they can anonymously communicate
with each other. While such a mechanism indeed achieves
the conditional privacy protection, the communication pro-
cedure (including signing and veriﬁcation) is subject to the
online RSUs. Worse still, these certiﬁcate-based CPPA proto-
cols involve costly certiﬁcate managements.
ID-Based. ID-based CPPA protocols are proposed to elim-
inate the certiﬁcate management issue, which mainly adopt
ID-based signature [23], [24], [25], software-based method
[9], pseudo-ID-based method [15], and so forth.
These ID-based CPPA protocols can improve the security
or efﬁciency of certiﬁcate-based solutions, but most of them
are either requiring a trustworthy hardware or difﬁcult to
be applied into multi-cloud environment. To address the
ﬁrst challenge, the one-time identity-based aggregate signa-
ture and Chinese Remainder Theorem (CRT) have been
used in [16] and [17] respectively (both of which only
involve realistic tamper-proof devices). With regard to the
second challenge, Cui et al. [26] employed the elliptic curve
cryptography to propose a robust and extensible CPPA pro-
tocol to satisfy the need of growing diversiﬁed services.
However, existing ID-based solutions are faced with the
troublesome escrow/revocation of vehicles’ secret keys.
Certiﬁcateless. Certiﬁcateless CPPA protocols were proposed
to solve the key escrow issue in ID-based CPPA protocols. That
is, an attacker is unable to obtain the vehicle’s full secret key
even it colludes with the KGC. In 2015, Horng et al. [11] pro-
posed a new certiﬁcateless signature scheme for conditional
privacy protection in VANETs, although their proposal was
then shown vulnerable to malicious-but-passive key generation
center attacks [27]. In 2018, Ming et al. [28] proposed a practical
certiﬁcateless CPPA protocol for VANETs, which does not
involve intractable bilinear pairing and map-to-hash opera-
tions. Recently, Xu et al. [12] employed the CRT to propose a
novel certiﬁcateless CPPA for VANETs with batch veriﬁcation
and conditional privacy protection. Existing certiﬁcateless
CPPA protocols may have mitigated the privacy, security and
efﬁciency issues in VANETs, but they are still faced with the
intractable key revocation.
Blockchain-Based. Blockchain, is a distributed ledger technol-
ogy, which consists of chronologically chained hashing blocks.
This special structure, together with other technologies such as
peer-to-peer network, cryptography and consensus, ensures the
decentralization, immutability, and veriﬁability of blockchain.
While blockchain has been classiﬁed into public, permissioned,
private, all of them are still faced with insufﬁciencies such as
low throughput and high latency [29], [30]. The potential of
blockchain in VANETs is that we can realize the authentication
with only on-chain retrieval operations, which can mitigate the
negative effects caused by the insufﬁciencies of blockchain.
Blockchain has been studied to solve the aforementioned
issues (i.e., non-transparency of trusted authorities and com-
plex certiﬁcate revocation) existing in PKI-based CPPA proto-
cols and the intractability of key escrow/revocation in ID-
based or certiﬁcateless protocols. In 2019, Lu et al. [31] com-
bined blockchain with Merkle Patricia Tree to design a block-
chain-based privacy-preserving authentication protocol. Their
proposal can protect the privacy of vehicles and revoke the cer-
tiﬁcates efﬁciently, but it involves multi-interactions between
vehicles and CA for generating certiﬁcates. In 2020, Gabay et al.
[32] integrated a token-based mechanism and Pederson com-
mitment into blockchain to propose two anonymous authenti-
cation protocols. Other solutions such as [33] were also
proposed
for
the
privacy-preserving
authentication
in
VANETs. However, none of these solutions took the traceabil-
ity into account, failing to trace the malicious behavior of
vehicles (e.g., issuing counterfeit trafﬁc information).
In 2018, to further introduce traceability into the privacy pro-
tection for blockchain-enabled VANETs, Li et al. [18] employed
a threshold ring signature to construct a CertCoin protocol.
However, the efﬁciency and privacy of CertCoin are seriously
affected by the ring and threshold size. Recently, Lin et al. [14]
integrated blockchain with a key derivation algorithm to pro-
pose a BCPPA protocol, and Feng et al. [20] combined attribute-
based encryption and blockchain-enabled smart contract to
design a BPAS protocol. However, neither of them can achieve
efﬁcient traceability, where the former is linearly affected by
the average searching number of one-time public keys and the
latter is limited to the number of leaf nodes in the access tree. In
addition, the efﬁciency of message veriﬁcation in both [14] and
[20] can be further improved. Thus, we are motivated to pro-
pose a more efﬁcient BCPPA protocol for achieving a tradeoff
among security, privacy and utility for VANETs.
3
PROBLEM DEFINITION
This section mainly presents involved notations and crypto-
graphic primitives, together with deﬁning system model
and security/privacy requirements of BCPPA in VANETs.
3.1
Notations
Table 1 lists main involved notations throughout this paper.
1820
IEEE TRANSACTIONS ON DEPENDABLE AND SECURE COMPUTING, VOL. 20, NO. 3, MAY/JUNE 2023
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:49 UTC from IEEE Xplore.  Restrictions apply. 



# Page 4

3.2
Cryptographic Primitives
This subsection brieﬂy reviews the involved cryptographic
primitives in our proposal, namely, S-protocols and signa-
tures of knowledge.
3.2.1
S-Protocols
S-protocols [34] are with a 3-move form between a prover P
and a verify V, where P would like to convince V that it owns
a witness w such that ðx; wÞ 2 R without showing w directly.
After the interaction, a triple ða; c; zÞ will be output, in which
a and z are computed by P based on a random challenge c
chosen by V. A S-protocol is required to satisfy three differ-
ent properties, namely, completeness (i.e., ðx; a; c; zÞ will be
always accepted if there exist a veriﬁcation algorithm f such
that Pr½fðx; a; c; zÞ ¼ 1  1  neglðÞ, and this property is
perfect if the probability is equal to 1), special soundness (i.e.,
given two accepted ðx; a; c; zÞ and ðx; a; c0; z0Þ where c 6¼ c0,
the witness w can be efﬁciently computed) and special honest-
veriﬁer zero-knowledge (i.e., there exists a simulator S can out-
put an accepted ðx; a; c; zÞ based on a known c, and the out-
put is indistinguishable from that generated by a real
interaction between P and V).
Notably, a S-protocol could be turned into non-interac-
tive via Fiat-Shamir heuristic [35]. That is, P ﬁrst computes a
and adopts a secure hash function H to compute c ¼
Hðx; aÞ, then it executes the remaining operations of S-pro-
tocol to compute z and sends ðx; a; c; zÞ to V. Then, we can
prove the soundness and zero-knowledge of the new proto-
col in the random oracle (RO) model [36] by replacing
Hðx; aÞ with a random oracle [35].
3.2.2
Signatures of Knowledge
Signatures of knowledge [37] is a proof system that allows
one entity to convince others about knowing a secret value
but without revealing it. Also, it has the functionality of digi-
tal signature, that is, ensuring message integrity and identity
authenticity. Such a cryptographic primitive is generally
transformed from a S-protocol on basic of Fiat-Shamir heuris-
tic. Thus, the SoK can be proven secure in the random oracle
model and its interactive version owns the zero-knowledge
property. Speciﬁcally, a SoK scheme is comprised by the fol-
lowing three algorithms.

Setupð1Þ: This parameter generation algorithm takes
a security parameter  as input, and outputs a public
parameter pp.

GenProofðpp; m; x; wÞ: This proof algorithm takes pub-
lic parameter pp, message m and a relation ðx; wÞ 2 R
as inputs (where x is an instance and w is the secret
witness), and outputs a SoK proof p.

VerfProofðpp; m; x; pÞ: This veriﬁcation algorithm takes
public parameter pp, message m, instance x and SoK
proof p as inputs, it outputs 1 if the p is valid; Other-
wise it outputs 0.
3.3
System Model
In the system model of our EBCPA protocol, there are ﬁve
participants, namely, Certiﬁcate Authority (CA), Vehicle, Road
Side Uints (RSU), Blockchain and Manager (see Fig. 2). Com-
munication methods mainly involve M2B, M2V, V2V, V2R,
and V2C, where M2B is for a manager to communicate with
blockchain nodes (e.g., RSUs) for submitting/retrieving
anonymous public keys, M2V is for vehicles to register their
anonymous public keys with manager, V2V is for vehicles to
communicate with each other via dedicated short range com-
munications (DSRC) protocol, V2R is for vehicles to query
transactions from the blockchain or to share trafﬁc status
with RSUs, and V2C is for vehicles/RSUs to register certiﬁ-
cates from CA ofﬂine/online.

CA: This trusted entity, with abundant computation
and storage resources, mainly manages certiﬁcates of
vehicles’ or RSUs’ public keys. In our proposal, the
vehicles and RSUs need to register certiﬁcates from
the CA before the authentication. Thus, the CA will
generate and return certiﬁcates to the vehicles or
RSUs ofﬂine/online. The certiﬁcate management can
be realized based on blockchain or existing public
key certiﬁcate system (e.g., X.509) [38].

Manager: This trusted entity is in charge of registering
vehicles’ anonymous public keys through the smart
contract. Then, the vehicles can adopt these registered
TABLE 1
Involved Notations in This Paper
Notation
Description

a security parameter.
p; q
two large prime numbers.
E
an elliptic curve deﬁned by y2 ¼x3þaxþb ðmod pÞ, where a;b 2 Fp.
G
an additive group with order q, comprising all points on E and
an inﬁnite point O.
P
a generator of G.
pseed
a private seed in the key derivation scheme.
i; j
two positive integers.
pdiroot
i
the ith vehicle’s root private derivation information.
askj
i
the ith vehicle’s jth deriving anonymous secret key.
APKj;1
i ,APKj;2
i
the ith vehicle’s jth deriving anonymous public key.
pdij
i
the ith vehicle’s jth private derivation information.
lski
the ith vehicle’s long-term secret key.
LPKi
the ith vehicle’s long-term public key.
lskm
the manager’s long-term secret key.
LPKm
the manager’s long-term public key.
H
a secure hash function H : f0; 1g ! Z
q.
msgi
the ith vehicle’s sharing trafﬁc message.
tsi
the ith vehicle’s timestamp to share message.
R ¼ ðxi; wiÞ
a relation with instance xi and corresponding witness wi.
jj
concatenation operation of strings.
PPT
abbreviation of probabilistic polynomial time.
neglðÞ
a negligible function.
tx_rtv
retrieving transactions from blockchain.
eth_calls
performing a message call in Ethereum.
ESign
signing algorithm of a secure digital signature scheme (e.g., ECDSA).
EVerf
corresponding veriﬁcation algorithm of the secure digital
signature scheme.
Fig. 2. Architecture of blockchain-enabled VANETs.
LIN ET AL.: EBCPA: EFFICIENT BLOCKCHAIN-BASED CONDITIONAL PRIVACY-PRESERVING AUTHENTICATION FOR VANETS
1821
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:49 UTC from IEEE Xplore.  Restrictions apply. 



# Page 5

keys to communicate with other vehicles or RSUs
anonymously. In our model, the manager is the only
entity owning the ability to track real identities of tar-
geted malicious vehicles.

Vehicle: This entity is equipped with an internal proc-
essing unit (i.e., OBU) owning the tamper-proof
property and supporting DSRC protocol. On basis of
the OBU, vehicles are able to communicate with
other vehicles/RSUs. It is worth noting that the OBU
in our proposal is realistic, for its stored secret keys
are updated periodically. Speciﬁcally, each OBU ini-
tializes a private seed for deriving the vehicle’s one-
time anonymous secret keys via a reconstructed Key-
Der algorithm. Thus, the OBU can avoid pre-storing
vast secret keys. In VANETs, the OBU broadcasts its
current trafﬁc status to nearby vehicles/RSUs regu-
larly, where the OBU communicates with RSUs and
other vehicles via the V2R and V2V respectively.

RSU: This entity acts as a blockchain full node,
namely, storing all the transaction data of blockchain.
It also provides the APIs for retrieving transactions
(deﬁned as tx_rtv) and invoking functions of smart
contract (including the execution of a message call
eth_calls). As mentioned above, the RSU responds to
the vehicles’ requests via the DSRC protocol. In addi-
tion, these RSUs are assumed as fully trusted entities
and they will not provide false APIs.

Blockchain: This entity is a decentralized ledger main-
tained by the RSUs, and it is responsible for storing
vehicles’ public information (e.g., anonymous public
keys). The anonymous public keys can be embedded
into blockchain as authorized, such that vehicles can
check an anonymous public key authorized or not. If
yes, the vehicles further verify the authenticity of
received messages. Here, any blockchain with the
functionality of smart contract (e.g., public Ethereum
and permissioned Hyperledger) can be adopted in
our EBCPA, only requiring that RSUs act as full
nodes to provide the aforementioned services.
3.4
Security and Privacy Requirements
Security and privacy properties are indispensable for a com-
munication protocol to securely share trafﬁc status in
VANETs. According to [2], [15], [38], the security and pri-
vacy requirements of a BCPPA protocol in VANETs mainly
include the following aspects.
1)
Message authentication. Authenticity of transmitted
messages (including message integrity and identity
legality) should be checked. In other words, any
modiﬁcation on the message will make it invalid.
Here, we only consider the message authentication
among the V2V and V2R (when sharing trafﬁc sta-
tus), since the HTTPs protocol can be directly used
in the M2B, V2R (during retrieving data from block-
chain), and V2C communications.
2)
Conditional privacy-preserving. This property requires
that a vehicle’s identity privacy can be conditionally
hided. That is, only the manager can obtain the real
identity of a vehicle involved in an intercepted mes-
sage. RSUs and other vehicles can trust the message
received from an authenticated vehicle, but they can-
not know its real identity. Hence, the privacy and
security of honest vehicles can be efﬁciently pro-
tected, and malicious behaviors (e.g., sharing inaccu-
rate trafﬁc statuses) will be timely tracked and
revoked by the manager.
3)
Unlinkability. To prevent the vehicle’s driving records
from being traced by adversaries, two transmitting
messages from the same vehicle are difﬁcult to link.
4)
Resilient to birthday collision. Due to the use of block-
chain, a BCPPA protocol should avoid chaining two
same blocks (i.e., with the same block hash, but dif-
ferent block contents) simultaneously. That is, it can
achieve the birthday collision resilience and hence
avoiding disputes among sub-blockchains. Once the
BCPPA fails to resist against this attack, the adver-
sary would be able to rewrite transactions and it will
lead to an arbitrary authorization of anonymous
public keys.
5)
Resilient to hijacking. Also considering the dependency
of blockchain, we require that a BCPPA protocol can
prevent adversaries from hijacking transactions. That
is, all the valid transactions will be chained smoothly.
Otherwise, the submission of anonymous public keys
will be hindered maliciously, which seriously affects
the authorization of vehicles.
6)
Resilient to 51% attacks. A BCPPA protocol should
ensure that adversaries are unable to control major-
ity of computing power or consensus ability (i.e.,
hashrate in PoW and number of permissioned nodes
in PBFT [29]). Otherwise, the adversary can reverse
and modify history transactions to change the autho-
rization of anonymous public keys.
7)
Resilient to other attacks. A BCPPA protocol in
VANETs should also resist against common attacks
including impersonation, modiﬁcation, distributed
denial of service, reply, man-in-the-middle, stolen
veriﬁer table, and side-channel.
4
OUR PROPOSALS
In this section, we ﬁrst reconstruct a key derivation scheme
for user (e.g., vehicle or RUS) and CA to separately update
anonymous secret key and anonymous public key without
interactions. Then, a new SoK scheme and smart contract
are designed for authentication. On basis of these building
blocks, we ﬁnally introduce our EBCPA protocol.
4.1
Reconstructed Key Derivation Scheme
In our EBCPA protocol, the manager periodically updates
vehicles’ anonymous public keys into the smart contract
(e.g., pre-submitting about 240 anonymous public keys for
an interval of two days at a time [7], [14]). Correspondingly,
vehicles can generate fresh anonymous secret keys to
authenticate each other. Only those anonymous public keys
appeared in smart contract are regarded as authorized. To
avoid frequent interactions between vehicles and manager,
we reconstruct BIP322 and apply it into our design. Thus, a
vehicle interacts with the manager (via M2V) only once for
2. https://github.com/bitcoin/bips/wiki/Comments:BIP-0032
1822
IEEE TRANSACTIONS ON DEPENDABLE AND SECURE COMPUTING, VOL. 20, NO. 3, MAY/JUNE 2023
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:49 UTC from IEEE Xplore.  Restrictions apply. 



# Page 6

sharing its root anonymous public key. Subsequently, the
vehicle and manager can independently update the vehi-
cle’s new anonymous secret keys and anonymous public
keys, respectively. Speciﬁcally, the reconstructed KeyDer
scheme consists of the following algorithms.

ðaskroot
i
; pdiroot
i
Þ  KDGenðpseedÞ. This algorithm is
invoked by the ith vehicle to generate the root anon-
ymous secret key askroot
i
and root private derivation
information pdiroot
i
. It takes as input a private seed
pseed to compute hljjhr ¼ HðpseedÞ, and it sets
askroot
i
¼ hl ðmod qÞ and pdiroot
i
¼ hr ðmod qÞ, then it
computes the root anonymous public keys APKroot;1
i
¼
askroot
i
P and APKroot;2
i
¼ LPKi þ askroot
i
LPKm. Finally,
it returns askroot
i
and pdiroot
i
. Also, the APKroot
i
and
pdiroot
i
are sent to the manager securely.

ðaskj
i; pdij
iÞ  PriKDðaskj1
i
; pdij1
i
; jÞ. This algorithm
is invoked by the ith vehicle to derive the jth anony-
mous secret key. It takes as input the j  1th anony-
mous secret key askj1
i
and the j  1th private
derivation information pdij1
i
(or askroot
i
and pdiroot
i
when j ¼ 1). It ﬁrst computes APKj1;1
i
¼ askj1
i
P
and hljjhr ¼ HðAPKj1;1
i
jjj; pdij1
i
Þ. It ﬁnally returns
the
jth
anonymous
secret
key
askj
i ¼ askj1
i

hl ðmod qÞ and the jth private derivation information
pdij
i ¼ hr ðmod qÞ.

ðAPKj;1
i ; APKj;2
i ; pdij
iÞ  PubKDðAPKj1;1
i
;
pdij1
i
; j;
LPKi; lskmÞ. This algorithm is invoked by the man-
ager to generate the jth anonymous public key of the
ith vehicle. It takes as input the j  1th anonymous
public key APKj1;1
i
, the j  1th private derivation
information pdij1
i
(or APKroot;1
i
and pdiroot
i
when
j ¼ 1), the number j, the long-term public key of vehi-
cle LPKi and its long-term secret key lskm, and com-
putes hljjhr ¼ HðAPKj1;1
i
jjj; pdiroot
i
Þ as well as setting
APKj;1
i
¼ hlAPKj1;1
i
; pdij
i ¼ hr ðmod qÞ. It also com-
putes APKj;2
i
¼ LPKi þ lskmAPKj;1
i . Finally, it returns
ðAPKj;1
i ; APKj;2
i ; pdij
iÞ.
Security of the above reconstructed KeyDer scheme can be
reduced to the discrete logarithm assumption [39]. That is, no
PPT adversary is able to reverse the jth derived anonymous
public key ðAPKj;1
i ; APKj;2
i Þ to the root anonymous public
key ðAPKroot;1
i
; APKroot;2
i
Þ or previous anonymous public
key ðAPKa;1
i
; APKa;2
i
Þ (where a < j). This property is signiﬁ-
cant for guaranteeing the anonymity and unlinkability of our
EBCPA protocol.
4.2
Designed Signatures of Knowledge Scheme
We design a SoK scheme for vehicles to authenticate each
other. The main idea is that the vehicles prove themselves in
a zero-knowledge method, namely, owning the correspond-
ing secret key of an anonymous public key without revealing
any other information. Also, our SoK scheme works as a sig-
nature to authenticate the shared trafﬁc status msg at a speci-
ﬁed timestamp ts. Speciﬁcally, we denote the above SoK as
SoKfðlski; askj
i; LPKiÞ : APKj;1
i
¼ askj
iP ^ APKj;2
i
¼ LPKiþ
askj
iLPKm ^ LPKi ¼ lskiPgðmsg; tsÞ, which consists of the
following algorithms. Note that, the PASK-BVerfProof is an
efﬁciency-enhancing (batch) veriﬁcation algorithm for veri-
fying multiple received message/signature pairs at once.

ðmsgi; si; tsiÞ  PASK-GenProofðxi; askj
i; lski; msgi; tsiÞ.
This proof generation algorithm takes as input an
instance xi = ðP; APKj;1
i ; APKj;2
i ; LPKmÞ, wi = ðaskj
i;
lski; LPKiÞ, candidate message msgi and a time-
stamp tsi. It ﬁrst randomly chooses ri;1; ri;2 2 Z
q to
compute Ri;1 ¼ ri;1P, Ri;2 ¼ ri;2P þ ri;1LPKm, ci ¼
HðxijjmsgijjtsijjPjjAPKj;1
i jjAPKj;2
i jjLPKmjjRi;1 jjRi;2Þ.
Then, it computes zi;1 ¼ ri;1  askj
i  ci ðmod qÞ; zi;2 ¼
ri;2  lski  ci ðmod qÞ. Finally, it returns ðmsgi; si ¼
ðci; zi;1; zi;2; Ri;1; Ri;2Þ; tsiÞ.

f0; 1g  PASK-VerfProofðxi; msgi; si; tsiÞ. This veriﬁ-
cation algorithm takes as input the instance xi ¼
ðP; APKj;1
i ; APKj;2
i ; LPKmÞ, a candidate message/
signature pair ðmsgi; siÞ and a timestamp tsi. It ﬁrst
parses si ¼ ðci; zi;1; zi;2; Ri;1; Ri;2Þ, and then computes
ci ¼ HðxijjmsgijjtsijjPjjAPKj;1
i jjAPKj;2
i jjLPKmjjRi;1
jjRi;2Þ. Finally, it checks if Ri;1 þ Ri;2 ¼ ðzi;1 þ zi;2ÞPþ
zi;1LPKm þ ciðAPKj;1
i
þ APKj;2
i Þ holds or not. If yes,
it returns 1 to represent the validity of ðmsgi; si; tsiÞ,
and 0 otherwise.

f0; 1g  PASK-BVerfProofðfxi; msgi; si; tsign
i¼1Þ.
This
batch veriﬁcation algorithm takes as input the n-tuple
instances, candidate message/signature pairs and
timestamps fxi; msgi; si; tsign
i¼1. It ﬁrst parses xi ¼
ðP;APKj;1
i ; APKj;2
i ; LPKmÞ; si ¼ ðci; zi;1; zi;2; Ri;1; Ri;2Þ;
8i 2 f1; 2; . . . ; ng. Then, it chooses a random vector
v! ¼ fv1; v2; . . . ; vng, where vj 2 ½1; 2t; 8i 2 f1; 2; . . . ;
ng and t is a small integer (with little computation
costs). It is worth noting that, if without these random
integers, an adversary can inject two invalid message/
signature pairs which are negatives with each other.
As a result, the veriﬁer will accept the whole batching
message/signature pairs and timestamps (including
the two invalid ones).
Next, it computes
ci ¼ HðxijjmsgijjtsijjPjjAPKj;1
i jj
APKj;2
i jjLPKmjjRi;1 jjRi;2Þ; 8i 2 f1; 2; . . . ; ng. Finally,
it checks if Sn
i¼1½viðRi;1 þ Ri;2Þ ¼ ½Sn
i¼1viðzi;1 þ zi;2ÞPþ
ðSn
i¼1vizi;1ÞLPKmþ
Sn
i¼1½viciðAPKj;1
i
þ APKj;2
i Þ.
It
returns 1 if this equation hold, and 0 otherwise.
Our proposed SoK scheme can satisfy the security prop-
erties of completeness, soundness, and zero-knowledge.
The concrete proof will be given in Section 5.
4.3
Design of Smart Contract
Smart contract generally refers to automation of legal con-
tracts, and now it widely represents code scripts running
synchronously in blockchain [40]. In a blockchain system
(e.g., Ethereum, Hyperledger), each contract is with a unique
address and their equipping algorithms can provide various
services (e.g., anonymous public key management in this
paper). One can invoke the algorithms via submitting the
smart contract address and corresponding parameters (e.g.,
algorithm name and arguments).
In our designed EBCPA protocol, we use smart contract
to manage anonymous public keys. One anonymous public
key is authorized if and only if it was submitted into the
smart contract, and the submission operation can be only
executed by the manager. Then, the vehicles can authenti-
cate each other via acting as the submitted anonymous pub-
lic key. Additionally, the manager can revoke all the related
LIN ET AL.: EBCPA: EFFICIENT BLOCKCHAIN-BASED CONDITIONAL PRIVACY-PRESERVING AUTHENTICATION FOR VANETS
1823
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:49 UTC from IEEE Xplore.  Restrictions apply. 



# Page 7

anonymous public keys when he/she ﬁnds a vehicle broad-
casting counterfeit messages maliciously. Thus, our designed
smart contract mainly includes three algorithms, namely,
Submit, Check and Revoke (shown in Algorithm 1). It is worth-
ing noted that our smart contract can be deployed in public
Ethereum or permissioned Hyperledger according to differ-
ent goals such as robustness or efﬁciency.
Algorithm 1. Smart Contract on APKList
Require: Function name, invoked parameters
Ensure: Setting up functions:
address manager; % The address of manager.
function APKList()
% Constructor, automatically executed during the deployment.
manager = msg:sender; % Initialize the issuer as manager.
struct APK
APK1; % uint256[2], one part of an APK.
APK2; % uint256[2], the other part of an APK.
mapping (uint256 ¼ > APK) apk % A mapping of APK.
function Submit(unit256[2] APK1, uint256[2] APK2) publicre-
turns (address addr)
% Invoked by manager to add a new anonymous public key.
require(msg:sender ¼¼ manager); % Only the manager can suc-
cessfully invoke this algorithm.
index ¼ HðAPK1; APK2Þ; % Compute the index for subsequently
retrieving anonymous public keys.
apk½index:APK1 ¼ APK1;
apk½index:APK2 ¼ APK2;
returnmsg:sender;
function Check(unit256[2] APK1, uint256[2] APK2) view returns
(bool)
% Invoked by anyone to check if one APK is authorized or not.
index ¼ HðAPK1; APK2Þ;
if apk½index:APK1 ¼ APK1 ^ apk½index:APK2 ¼ APK2 then
return1;
return0;
function Revoke(unit256[2] APK1, uint256[2] APK2) public
returns (bool)
% Invoked by manager to revoke an APK.
require(msg:sender ¼¼ manager); % Only the manager can
successfully execute the revocation.
index ¼ HðAPK1; APK2Þ;
if apk½index:APK1 ¼ APK1 ^ apk½index:APK2 ¼ APK2 then
apk½index:APK1 ¼ NULL;
apk½index:APK2 ¼ NULL;
return1;
return0;
4.4
Constructed EBCPA Protocol
On basis of the above system building blocks (i.e., KeyDer
scheme, SoK scheme and smart contract), we will introduce
the construction of EBCPA in this section.
4.4.1
System Setup Phase
This phase is performed by vehicles, CA and manager to
register/update the real/anonymous identities of vehicles.
It consists of the following steps.
1)
Each vehicle randomly chooses lski 2 Z
q as its long-
term secret key and computes LPKi ¼ lskiP as the
long-term public key. Then, it applies for the certiﬁcate
certi of LPKi from the CA via submitting its identiﬁca-
tion information online/ofﬂine. After checking the
validity of application information, the CA computes
and returns the certiﬁcate certi to the vehicle. Note
that we suggest using the blockchain-based certiﬁcate
management mechanism [38] for reducing the com-
plexity, and certainly the existing public key certiﬁcate
system (e.g., X.509) can be also adopted directly.
2)
To register the anonymous public key from manager,
the vehicle ﬁrst randomly chooses a private seed and
generates the secret information (i.e., a root anony-
mous secret key askroot
i
and root private derivation
information pdiroot
i
). Notably, the askroot
i
and pdiroot
i
will be securely stored in the vehicle’s OBU and
then updated periodically. For example, deriving
about 240 times for an interval of two days at a
time [7], [14]. It also computes the root anonymous
public keys APKroot;1
i
¼ askroot
i
P
and APKroot;2
i
¼
LPKi þ askroot
i
LPKm. Then, the vehicle uses its long-
term secret key lski to sign ðAPKroot;1
i
; APKroot;2
i
;
pdiroot
i
Þ via ESign, that is, Si ¼ ESignðlski; APKroot;1
i
;
APKroot;2
i
; pdiroot
i
Þ. Finally, the vehicle sends ðAPKroot;1
i
;
APKroot;2
i
; pdiroot
i
; Si; certiÞ to the manager via a secure
channel.
The manager uses the certi (probably retrieved
from blockchain) to check the authenticity of LPKi,
and
then
he/she
invokes
EVerfðLPKi; APKroot;1
i
;
APKroot;2
i
; pdiroot
i
; SiÞ to check if ðAPKroot;1
i
; APKroot;2
i
;
pdiroot
i
Þ is actually from the vehicle of long-term public
key LPKi.
3)
The manager deploys the smart contract APKList
into the blockchain and he/she will obtain a smart
contract identity sid. The sid will be public for all the
vehicles and RSUs to trigger this smart contract sub-
sequently. Note that this deployment is executed
only once.
At the ﬁrst time of submitting the anonymous
public key into the scid, the manager uses its long-
term
secret
key
lskm
to
check
if
APKroot;2
i
¼
LPKi þ lskmAPKroot;1
i
. If not, this request will be
discarded; Otherwise, the manager invokes Submit
to submit the anonymous public key ðAPKroot;1
i
;
APKroot;2
i
Þ into the sid. For submitting the jth (where
j > 1) anonymous public key, the manager needs to
invoke
ðAPKj;1
i ; APKj;2
i ; pdij
iÞ  PubKDðAPKj1;1
i
; j;
LPKi; lskmÞ prior to submitting ðAPKj;1
i ; APKj;2
i Þ. In
our EBCPA protocol, the manager periodically sub-
mits a new ðAPKj;1
i ; APKj;2
i Þ into the scid such that
vehicles can anonymously share their trafﬁc statuses.
4.4.2
Message Signing Phase
This phase is performed by vehicles to compute a message/
signature pair for authenticating their identities and sharing
messages. In VANETs, the generated message/signature
pair will be broadcast to nearby RSUs and vehicles through a
wireless communication method (e.g., DSRC). For a clearer
description, we suppose that vehicle Va would like to broad-
cast a message msga to nearby vehicles (e.g., Vb) or RSUs, it
will proceed the following steps.
1824
IEEE TRANSACTIONS ON DEPENDABLE AND SECURE COMPUTING, VOL. 20, NO. 3, MAY/JUNE 2023
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:49 UTC from IEEE Xplore.  Restrictions apply. 



# Page 8

1)
Assuming that the Va’s current anonymous secret
key is askk1
a
and current private derivation informa-
tion is pdik1
a
, then it invokes ðaskk
a; pdik
aÞ  PriKD
ðaskk1
a
; pdik1
a
; kÞ
and
computes
APKk;1
a
¼ askk
aP;
APKk;2
a
¼ LPKa þ askk
aLPKm, where LPKa is the
long-term public key of vehicle Va and LPKm is the
long-term public key of manager. This process can be
orderly precomputed several times before each com-
munication, such that the vehicle can directly adopt a
new anonymous public key to share its message.
2)
The vehicle Va invokes ðmsga; sa; tsaÞ  PASK-
GenProofðxa; askk
a; lska; msga; tsaÞ to generate the sig-
nature of msga, where xa ¼ ðP; APK1
a; APK2
a; LPKmÞ,
tsa is the current timestamp. The ðmsga; sa; tsaÞ will
be sent to the vehicle Vb. Also, the ðAPK1
a; APK2
aÞ in
xa needs to be sent each time for veriﬁcation.
4.4.3
Message Veriﬁcation Phase
This phase is executed by a vehicle or RSU to validate a
received message/signature pair and timestamp. The content
of message (e.g., trafﬁc status) will be accepted if and only if
the message/signature pair and timestamp pass the veriﬁca-
tion. To verify a single message/signature pair and time-
stamp, namely, suppose the Vb receives ðmsga; sa; tsaÞ and
ðAPK1
a; APK2
aÞ from the vehicle Va. Then, the vehicle Vb
directly invokes CheckðAPK1
a; APK2
aÞ in smart contract scid
to check if the anonymous public key ðAPK1
a; APK2
aÞ is
revoked or not. Here, the smart contract scid was deployed in
the blockchain during the setup phase. If not, Vb continues to
invoke PASK-VerfProof to check the validity of ðmsga; sa; tsaÞ.
If invalid, Vb discards this trafﬁc status; Otherwise, Vb believes
the message msga is valid (i.e., msga is indeed received from
the authentic Va).
In addition to the above single veriﬁcation of one mes-
sage, we also provide a batch veriﬁcation of multiple mes-
sages for improving the veriﬁcation efﬁciency. Assuming
that the vehicle Vb has received n-tuple message/signature
pairs, timestamps ðmsgi; si; tsiÞn
i¼1 and one-time anonymous
public keys ðAPKj;1
i ; APKj;2
i Þn
i¼1 from different vehicles. The
Vb ﬁrst invokes CheckðAPKj;1
i ; APKj;2
i Þ; 8i 2 ½1; 2; . . . ; n from
scid to check if the anonymous public keys are revoked or
not. If not, Vb continues to invoke PASK-BVerfProof to check
the validity of ðmsgi; si; tsiÞn
i¼1. If valid, Vb accepts these
messages; Otherwise, it rejects.
5
SECURITY ANALYSIS
This section demonstrates that our EBCPA protocol can
satisfy the aforementioned security requirements, which is
mainly owing to the security of designed SoK scheme. Before
analyzing the security of EBCPA, we ﬁrst prove the security
of designed SoK scheme as follows.
Theorem 1. The above SoK scheme is a non-interactive zero-
knowledge argument in the random oracle model. That is, it satis-
ﬁes Perfect completeness, Soundness and Zero-knowledge.
Proof. We prove the (perfect) completeness, soundness, and
zero-knowledge of our SoK scheme as follows.
(Perfect) Completeness. This property represents two
consistencies, namely, between PASK-GenProof and PASK-
VerfProof, PASK-GenProof and PASK-BVerfProof. The former
refers to that a message/signature pair and timestamp
generated by PASK-GenProof will be accepted by PASK-
VerfProof, and the latter refers to multiple message/signa-
ture pairs and timestamps generated by PASK-GenProof
will be accepted by PASK-BVerfProof at once. The proposed
SoK scheme satisﬁes this property for the following equa-
tions always hold.
ci ¼ HðxijjmsgijjtsijjPjjAPKj;1
i jjAPKj;2
i jjLPKmjjRi;1
jjRi;2Þ;
Ri;1 þ Ri;2
¼ ðzi;1 þ zi;2ÞP þ zi;1LPKm þ ciðAPKj;1
i
þ APKj;2
i Þ
¼ ri;1P  askj
i  ciP þ ri;2P  lski  ciP þ ri;1LPKm
 askj
i  ciLPKm þ ciðaskj
iP þ LPKi þ askiLPKmÞ
¼ ðri;1 þ ri;2ÞP þ ri;1LPKm  ciaskiP  ciLPKi
 ciaskj
iLPKm þ ciaskj
iP þ ciLPKi þ ciaskiLPKm
¼ Ri;1 þ Ri;2;
8i 2 ½1; . . . ; n;
ci ¼ HðxijjmsgijjtsijjPjjAPKj;1
i jjAPKj;2
i jjLPKmjjRi;1
jjRi;2Þ;
Sn
i¼1½viðRi;1 þ Ri;2Þ
¼ Sn
i¼1viðzi;1P þ ciAPKj;1
i
þ zi;2P þ zi;1LPKm
þ ciAPKj;2
i Þ ¼ Sn
i¼1viðri;1  askj
i  ciÞP
þ Sn
i¼1ðviciaskj
iPÞ þ Sn
i¼1viðri;2  lski  ciÞP
þ Sn
i¼1viðri;1  askj
i  ciÞLPKm
þ Sn
i¼1viciðLPKi þ askiLPKmÞ
¼ Sn
i¼1viri;1P þ Sn
i¼1viri;2P þ Sn
i¼1viri;1LPKm
¼ Sn
i¼1ðviðRi;1 þ Ri;2ÞÞ:
Soundness. The soundness follows from the property of
special soundness of S-protocol, but simulating the H as a
random oracle instead. Suppose a PPT prover P  gener-
ates an accepted instance and message/signature pair ðxi;
msgi; siÞ and timestamp tsi, where si ¼ ðci; zi;1; zi;2; Ri;1;
Ri;2Þ. Then, we construct such an extractor EXT, where
upon seeing the above accepted pair, EXT rewinds P 
to the oracle HðxijjmsgijjtsijjPjjAPKj;1
i jjAPKj;2
i jjLPKijj
LPKmjj Ri;1jjRi;2Þ that returns ci. It then reprograms the
random
oracle
such
that
bci ¼ Hðxijjmsgijj
tsijjPjj
APKj;1
i jjAPKj;2
i jjLPKijjLPKmjj Ri;1jjRi;2Þ and continues
the rest execution of P . In an expected polynomial time,
another valid message/signature pair and timestamp will
be generated, namely, ðxi; msgi; bsi; tsiÞ, where si ¼ ðbci;
bzi;1; bzi;2; Ri;1; Ri;2Þ. According to the equations zi;1 ¼ ri;1
askj
i  ci ðmod qÞ; zi;2 ¼ ri;2  lski  ci ðmod qÞ and bzi;1 ¼ ri;1
askj
i  bci ðmod qÞ; bzi;2 ¼ ri;2  lski  bci ðmod qÞ, the witnesses
can be extracted via computing the following equations.
askj
i ¼ ðzi;1  bzi;1Þðbci  ciÞ1 ðmod qÞ;
lski ¼ ðzi;2  bzi;2Þðbci  ciÞ1 ðmod qÞ:
Note that bci  ci is prime to q since both bci and ci lie in
Z
q and q is a large prime as mentioned. This means that
ðbci  ciÞ1 ðmod qÞ can be efﬁciently computed by the
extended euclidean algorithm.
LIN ET AL.: EBCPA: EFFICIENT BLOCKCHAIN-BASED CONDITIONAL PRIVACY-PRESERVING AUTHENTICATION FOR VANETS
1825
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:49 UTC from IEEE Xplore.  Restrictions apply. 



# Page 9

Zero-Knowledge. To prove this property, we construct a
simulator Sim (see Algorithm 2) that simulates all interac-
tions with any veriﬁer V  except the setting that Sim con-
trols hash function H as a random oracle OH. Finally, it
generates the message/signature pair and timestamp
ðxi; msgi; si ¼ ðc
i ; z
i;1; z
i;2; R
i;1; R
i;2Þ; tsiÞ.
Observing that this message/signature pair and time-
stamp will be accepted by the V  because the secure hash
function is controlled as a random oracle. In addition, the
c
i ; z
i;1; z
i;2 in Sim have the same distribution as that in real
protocol execution. Also, the R
i;1 and R
i;2 are uniquely
determined by c
i ; z
i;1; z
i;2, according to the computations
R
i;1 ¼ z
i;1P þ c
i APKj;1
i
and
R
i;2 ¼ z
i;2P þ z
i;1LPKm þ
c
i APKj;2
i . This means that the distribution of R
i;1 and R
i;2
is also identical to that in the real protocol execution, and
hence the transcript ðxi; msgi; si; tsiÞ output by the Sim
has the same distribution as that output by an honestly
generated transcript. Therefore, we can conclude that our
proposed SoK scheme satisﬁes the zero-knowledge, for
the Sim does not involve any information of witness
wi ¼ ðlski; askj
i; LPKiÞ.
tu
Then, we characterize the anonymity property of the
EBCPA protocol, which ensures that trafﬁc data reveal no
real identity information of RSU or vehicles to the adversary.
That is, no PPT adversary A can distinguish between two
message/signature pairs, where the long-term public keys
are chosen by A. To achieve a more clearer and formal deﬁni-
tion, we denote ðLPK; lskÞ  LKGðppÞðÞ as the vehicle’s
long-term public/secret key generation algorithm, ðAPK;
ask; pdiiÞ  AKGðlsk; pdii1; LPKm; iÞ as the vehicle’s anony-
mous public/secret key generation algorithm, ðm; s; tsÞ  
Signðask; m; tsÞ as the message signing algorithm, and
f0; 1g  VerifyðAPK; m; s; tsÞ as the veriﬁcation algorithm.
Algorithm 2. Simulator Sim
Require: a security parameter .
Ensure: the message/signature pair ðmsgi; siÞ and timestamp tsi.
1: Given an instance xi ¼ ðP;APKj;1
i ; APKj;2
i ; LPKmÞ to be
proved.
2: Randomly choose c
i ; z
i;1; z
i;2 2 Z
q.
3: Compute R
i;1 ¼ z
i;1P þ c
i APKj;1
i
and
R
i;2 ¼ z
i;2P þ z
i;1LPKm þ c
i APKj;2
i .
4: Set OHðxijjmsgijjtsijjPjjAPKj;1
i jjAPKj;2
i jjLPKijj
LPKmjjR
i;1jjR
i;2Þ ¼ c
i .
5: returnðmsgi; si ¼ ðc
i ; z
i;1; z
i;2; R
i;1; R
i;2Þ; tsiÞ.
Deﬁnition 1 (Anonymity). A EBCPA protocol P = (LKG,
AKG, Sign, Verify) owns the anonymity if no PPT adversary
A ¼ ðA1; A2Þ can distinguish the following experiments with
a non-negligible probability.
EXPb
anðP; A; Þ :
ðLPKm; lskmÞ  LKGðÞ;
ððLPK0; lsk0Þ; ðLPK1; lsk1ÞÞ  A
LKGðÞ
1
;
ðAPKb; askb; pdiiÞ  AKGðlsk; pdii1; LPKm; iÞ;
ðm; sb; tsÞ  Signðaskb; m; tsÞ;
b0  A2ðm; sb; tsÞ:
That is,
j Pr½EXP0
anðP; A; Þ ¼1  Pr½EXP1
anðP; A; Þ ¼ 1j
 neglðÞ:
Theorem 2. The EBCPA protocol P = (LKG, AKG, Sign, Verify)
satisﬁes the property of anonymity iff the adopted SoK scheme
owns the zero-knowledge property.
Proof. To prove the anonymity property, we present the fol-
lowing hybrid experiments (EXP0
an, E1, E2, EXP1
an).

Experiment E1. E1 modiﬁes EXP0
an by adopting
the simulator S (see Algorithm 2) to compute the
signature when executing the Sign algorithm.
Speciﬁcally, the challenger simulates an instance
x0 ¼ ðP; APKj;1
0 ; APKj;2
0 ; LPKmÞ and computes
ðm; s0; tsÞ  Sð1Þ but not the PASK-GenProof
algorithm when executing the Sign. Due to the
zero-knowledge property of adopted SoK scheme,
and the E1 owns identical message/signature pair
distribution with EXP0
an; hence, we have
j Pr½EXP0
anðP; A; Þ ¼1  Pr½E1ðP; A; Þ ¼ 1j
 neglðÞ:

Experiment E2. E2 modiﬁes E1 when invoking the
Sign algorithm. The challenger simulates the other
instance x1 ¼ ðP; APKj;1
1 ; APKj;2
1 ; LPKmÞ, which
is the same as that in EXP1
an and computes ðm; s1;
tsÞ  Sð1Þ.
We also have fx0; m; s0; tsg 	fx1; m; s1; tsg
c
3
due to the zero-knowledge property of proposed
SoK scheme. Hence, the following is satisﬁed.
j Pr½E1ðP; A; Þ ¼1  Pr½E2ðP; A; Þ ¼ 1j
 neglðÞ:
The zero-knowledge property also implies that
j Pr½E2ðP; A; Þ ¼1  Pr½EXP1
anðP; A; Þ ¼ 1j
 neglðÞ:
As discussed above, we can conclude the entire proba-
bility that the adversary A distinguishes the hybrid experi-
ments as follows.
j Pr½EXP0
anðP; A; Þ ¼1  Pr½EXP1
anðP; A; Þ ¼ 1j
 neglðÞ:
tu
On basis of the above theorems, we can further discuss
how our proposal meets the aforementioned security and
privacy requirements.
Message Authentication. According to the perfect complete-
ness and soundness of adopted SoK scheme, no PPT adver-
sary can forge a valid message/signature pair without the
anonymous or long-term secret keys. Moreover, the chained
anonymous public key in smart contract can be used to verify
the authenticity of sender. Thus, the receiver conﬁrms the
authenticity of a receiving message/signature pair ðxa; msga;
3. The notation X 	
c Y represents that two distribution ensembles X
and Y are computationally indistinguishable.
1826
IEEE TRANSACTIONS ON DEPENDABLE AND SECURE COMPUTING, VOL. 20, NO. 3, MAY/JUNE 2023
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:49 UTC from IEEE Xplore.  Restrictions apply. 



# Page 10

saÞ and timestamp tsa via checking if PASK-VerProofðxa;
msga; sa; tsaÞ ¼ 1 and CheckðAPK1
a; APK2
aÞ ¼ 1 hold. The for-
mer equation is to validate a message/signature pair and
timestamp, and the latter is to ensure that the sender is indeed
authorized.
Conditional Privacy-Preserving. Our proposal adopts a fresh
anonymous public/secret key pair in each authentication.
On the one hand, the aforementioned anonymity of EBCPA
implies that the anonymous public key can efﬁciently hide
the information of long-term public key, that is, the PPT
receiver and adversaries only obtain the knowledge of autho-
rized anonymous public keys but not the real identities. On
the other hand, the manager who owns the tracing key lskm
can track the real identity (i.e., long-term public key). Speciﬁ-
cally, to trace an anonymous key ðAPKj;1
i ; APKj;2
i Þ, the man-
ager uses lskm to compute the long-term public key via
LPKi ¼ APKj;2
i
 lskmAPKj;1
i .
Unlinkability. As mentioned above, each authentication in
our proposal involves a fresh anonymous public/secret key
pair. This pair is derived from a root/previous anonymous
public/secret key pair and private derivation information
based on the KeyDer algorithm. Thus, to link two different
messages to the same sender, one should be able to derive
one anonymous public key to the other. However, the deri-
vation algorithm of anonymous public/secret key pairs
requires a private derivation information which is only
known by the sender itself. In addition, the anonymity of
EBCPA further prevents the adversary from distinguishing
two different message/signature pairs. Thus, our proposal
can satisfy this security requirement.
Resilient to Birthday Collision. Our proposal can satisfy this
property if the adopted blockchain can resilient to birthday
collision. We use the mature blockchain systems (e.g., Ether-
eum and Hyperledger) supporting smart contract for our
design. These blockchain systems adopt secure hash func-
tions such as Keccak256 in [41] and SHA256 [42] to compute
the block hash, and hence they can efﬁciently avoid generat-
ing two blocks of birthday collision.
Resilient to Hijacking. All the transactions are comprised
of a digital signature scheme (e.g., ECDSA) and broadcast
in the blockchain network. This means that those valid
transactions cannot be tampered by PPT adversaries suc-
cessfully, and they will be recored into the blockchain (via
different recording nodes) sooner or later once valid.
Resilient to 51% Attacks. This property is also due to the
adopted blockchain system (i.e., Ethereum and Hyper-
ledger). In popular blockchain systems, the main method to
resist this attack is to higher the execution cost. For instance,
Ethereum uses a PoW with “ASIC-resistant” consensus
mechanism to reduce economic incentives of centralized
mining. Hyperledger applies a permissioned paradigm,
namely, assuming that the recording nodes are all trusted
and difﬁcult to be corrupted.
Resilient to Other Attacks. We also demonstrate that our
proposal can resist the following common attacks.

Impersonation. Once the adversary would like to imper-
sonate an authorized vehicle (e.g., Alice), it needs to
compute a valid signature as Alice for a targeted mes-
sage. However, it is impossible for a PPT adversary
due to the message authentication property, that is,
the veriﬁer can easily detect this attack via verifying
the receiving message/signature pair and timestamp.

Modiﬁcation. We suppose that a PPT adversary tem-
pers a transmitting message msg0, it will be found
and leads to the msg0 being discarded by the
receiver. Due to the soundness of SoK, the adversary
is unable to forge a valid signature for msg0 without
the knowledge of receiver’s anonymous or long-
term secret key. Thus, any modiﬁcation on msg0 will
make the veriﬁcation of original signature false.

DDoS. This property also beneﬁts from adopted
blockchain systems (e.g., Ethereum and Hyper-
ledger). In Ethereum, the execution of DDoS attacks
will involve economically expensive costs (including
transaction fees and gas costs). This huge cost is
really the advantage of Ethereum to resist DDoS
attacks, by comparing to the regular Internet where a
server responds to user’s request for free. In Hyper-
ledger, it does not require any transaction fee, but
the trusted permissioned nodes can adaptively dis-
card those malicious transactions and hence Hyper-
ledger can resist DDoS attacks.

Replay. In each authentication, the vehicle derives a
fresh anonymous public/secret key pair. Moreover,
the transmitting message/signature pair is embed-
ded with a current timestamp. These can effectively
keep the freshness of transmitting message and hence
promote the detection of replay attacks timely.

Man-in-the-middle. According to the aforementioned
discussion of message authentication, our proposal
can provide secure mutual authentication among
vehicles.

Stolen veriﬁer table. This attack represents that an
adversary can steal or tamper passwords or veriﬁca-
tion tables stored in a server’s database. In the whole
authentication process, our proposal only involves
the proposed SoK without the need to maintain a ver-
iﬁer table. The only stored anonymous public keys in
blockchain are public and immutable due to the
immutability of blockchain. Thus, the adversary can-
not steal any veriﬁer table for launching other attacks.

Side-channel. Our proposal only stores the current
anonymous secret key and private derivation infor-
mation in the OBU. That is, these secrets will be
updated periodically (i.e., our adopted OBU is realis-
tic but not trustworthy), meaning that it is more difﬁ-
cult to launch success side-channel attacks on our
proposal than that on existing ID-based solutions
(e.g., [10], [15]). Indeed, embedding several secrets
into the OBUs is common in most existing authenti-
cation protocols. Therefore, in terms of resilience to
side-channel attacks, our proposal and these proto-
cols have the similar security level. To further
enhance the protection of these secrets and resist
against powerful side-channel attacks, multiplicative
secret sharing technique [16] can be adopted.
6
PERFORMANCE EVALUATION
To show the utility of our EBCPA protocol, we ﬁrst imple-
ment it through the prototype of blockchain in Ethereum
LIN ET AL.: EBCPA: EFFICIENT BLOCKCHAIN-BASED CONDITIONAL PRIVACY-PRESERVING AUTHENTICATION FOR VANETS
1827
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:49 UTC from IEEE Xplore.  Restrictions apply. 



# Page 11

and Hyperledger test networks, vehicle authentication efﬁ-
ciency and simulated VANETs scenario. Then, we discuss
the efﬁciency according to the implementation results.
6.1
Implementation
To implement the blockchain-enabled prototype, we ﬁrst
adopt an on-line public Ethereum test network (i.e., Rinkeby
4) to deploy our design smart contract, where Rinkeby pro-
vides IDE (Integrated Development Environment) for com-
piling and deploying Solidity smart contract conveniently.
Speciﬁcally, our adopted conﬁguration of Remix is compiler
(0.4.19+commit.c4cbbb05), language (Solidity), EVM ver-
sion (compiler default), Deployment Environment (Java-
Script Virtual Machine) and Featured Plugins (Debugger,
Deploy and Run Transactions, Solidity Compilier, Solidity
Static Analysis, and Solidity Uint Testing). After compiling
our written Solidity smart contract code, we deploy it into
the above conﬁgured Remix to measure the gas cost of each
algorithm. Here, the gas cost is one of concerned factors in
Ethereum, which reﬂects the cost of using Ethereum typo-
logical blockchain [43].
We also implement our prototype based on the permis-
sioned Hyperledger to further show its compatibility. Con-
cretely, we build a test network comprising two organizations
and each organization is with one peer node. This simulation
platform is with the operation system (Ubuntu TLS 19.0.4),
CPU (Inter(R) Core(TM) i7-9750H, 2.60GHz), and RAM (1.9
GB), Hyperledger (V2.1) and Caliper (V0.4.0). Involved
dependencies include docker (V19.03.6), docker-compose
(V2.0.1), go (V1.17), Node.js (V10.22.1), npm (V6.14.6), and
npx (V10.2.2). In the test network, we create a channel named
as mychannel and instantiate our chaincode (i.e., apklist) in it.
For accuracy, we run 500 test times on random samples for
every algorithm in the chaincode, and ﬁnally we obtain the
latency and throughput.
In addition, we use our personal computer (PC) to theo-
retically and practically evaluate the authentication efﬁ-
ciency in terms of communication and computation costs.
In the theoretical analysis, involved notations and corre-
sponding size are listed in Table 2. In the practical evalua-
tion, the PC is conﬁgured with operation system (Windows
10, 64 bits), CPU (Inter(R) Core(TM) i7-9750H, 2.60GHz)
and RAM (16.0 GB), the cryptographic library is Miracl
V7.0, and the elliptic curve is Barreto-Naehrig (BN) curve
over base ﬁeld F256.
Finally, to discuss the average message authentication
delay and average message loss rate of the EBCPA, we simu-
late it via VanetMobiSim 5 and NS-2 6 in the simulation envi-
ronment of VANETs. The concrete conﬁguration of PC is
with operation system (Ubuntu 16.04, 64 bits), CPU (Intel(R)
Core(TM) i7-9750H, 2.60GHz), and RAM (4GB). As shown in
Fig. 3, our simulated scenario is performed in a map with
four 0:5 
 0:5km2 blocks and each block is equipped with a
RSU (whose communication range is 600 miles). Vehicles
have different average speeds (i.e., ranging from 5 miles/sec-
ond to 70 miles/second) and the same communication range
(i.e., 300 miles/second), and their broadcast message inter-
val, broadcast bandwidth bound, and packet size are set as
100 milliseconds, 6 Mbps and 264 bytes, respectively. Other
parameters like Channel, Propagation, Phy, Mac, Queue,
and Antenna are chosen as WirelessChannel, TwoRay-
Ground, WirelessPhy, 802_11, DropTail/PriQueue, and
OmniAntenna, respectively. The running time of each simu-
lation is 100 seconds. Interested readers could refer to our
source codes 7 for more details of the above implementations.
6.2
Benchmarks
Gas cost. From the above blockchain-enabled prototype in
Ethereum, we can obtain the involved gas cost in per-
forming our proposal. Speciﬁcally, the Gas Limit is set as
10; 000; 000gas and each gas is worth 2GWei (corresponding
to
0:006Ether
or
1:35USD
for
an
exchange
rate
225USD=Ether). As shown in Fig. 4, most gas cost is the
deployment of smart contract with 0:5414USD transaction
cost (which includes the 0:2229USD execution cost). The
costs of executing Submit, Check, and Revoke are all less than
0:1USD, especially the Check only requires 0:0159USD
(including 0:0012USD). Deploying smart contract is per-
formed only once, and the Check will be invoked in each
veriﬁcation, and thus such a cost is acceptable.
Latency and throughput. On basic of the above implemen-
tation in Hyperledger, we obtain the practical latency and
throughput shown in Table 3. All of three algorithms (i.e.,
Submit, Check, and Revoke) do not fail among respective 500
TABLE 2
Notations, Descriptions and Size
Notation
Description
Size (byte)
Notation
Description
jGj
Size of an element in group G
64
Tsm
Time of scale multiplication in G
jZ
qj
Size of an element in ﬁeld Z
q
32
Tme
Time of modular exponentiation in Z
q
jTidj
Size of a transaction hash in Ethereum
32
Tpa
Time of point addition in G
jmsgj
Size of a message in our simulation
32
Tmi
Time of modular inversion in Z
q
jtsj
Size of a timestamp in our simulation
8
Tmm
Time of modular multiplication in Z
q
jIDj
Size of an entity identity
8
Th
Time of hash function keccak256
jcABEj
Size of a ABE ciphertext
128l þ 64
TAEnc
Time of ABE encryption algorithm
TADec
Time of ABE decryption algorithm
Tenc
Time of AES encryption algorithm
Tdec
Time of AES decryption algorithm
The attribute-based encryption (ABE) scheme is directly cited from [20], among which l is the number of leaf nodes in the access tree.
4. https://www.rinkeby.io
5. http://vanet.eurecom.fr/
6. https://www.isi.edu/nsnam/ns/
7. https://github.com/colyn91/EBCPA
1828
IEEE TRANSACTIONS ON DEPENDABLE AND SECURE COMPUTING, VOL. 20, NO. 3, MAY/JUNE 2023
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:49 UTC from IEEE Xplore.  Restrictions apply. 



# Page 12

test times. The average latency of Submit, Check, and Revoke
is 0.25 second, 0.01 second, and 0.01 second respectively.
This could be accepted in practice especially the Submit
could be pre-executed periodically as mentioned in Sec-
tion 4.4.1. Correspondingly, the throughput of them is 22.8
TPS, 314.5 TPS, and 335.8 TPS respectively, under setting
sending rate as 25.1 TPS, 315.3 TPS, and 336.7 TPS respec-
tively. Here, the “TPS” is abbreviated from “Transactions
Per Second”. This means that the complete percentage of
throughput in all these algorithms is more than 90%, which
can satisfy the practical application requirements.
Computational and communication costs. The theoretical
results are shown in Table 4, from which our EBCPA is
more efﬁcient than CertCoin [18] and BPAS [20] in all the
phases in terms of both time cost and communication cost.
This is due to that CertCoin requires a complex threshold
ring signature and BPAS involves time-consuming ABE
operations. In particular, the communication costs of Cert-
Coin and BPAS are linear to r and l respectively (i.e., 168r þ
40 and 128l þ 64 bytes respectively, but that of EBCPA is a
constant 392 bytes). While the message signing cost of
EBCPA is similar to that of BCPPA [14] and communication
overhead of the former is a little more, the message veriﬁca-
tion and tracing of EBCPA are more efﬁcient than BCPPA.
Especially, the tracing computation cost of BCPPA is linear
to k (i.e., kðTsm þ ThÞ), in contrast to that of our EBCPA is a
constant (i.e., Tsm þ Tpa). Therefore, the preliminary discus-
sion shows that EBCPA is more practical than other com-
paring schemes.
The practical evaluation results (see Figs. 5 and 6) can
further support the above conclusion. Our EBCPA indeed
improves the computational efﬁciency especially the tracing
and message veriﬁcation. The time cost of tracing in EBCPA
is with a constant 10.78 milliseconds, comparing to, that in
CertCoin with 21.12 milliseconds, that in BCPPA with
106.01 milliseconds (if k is set as 10) and that in BPAS with a
higher constant 87.56 milliseconds. Thus, under the setting
Fig. 3. Simulation scenario with 1km 
 1km.
Fig. 4. Gas cost involved in our EBCPA protocol.
TABLE 3
Benchmark Results in the Hyperledger Test Network
Algorithm
Success
Fail
Send rate (TPS)
Max latency (second)
Min latency (second)
Average latency (second)
Throughput (TPS)
Submit
500
0
25.1
2.05
0.03
0.25
22.8
Check
500
0
315.3
0.03
0.00
0.01
314.5
Revoke
500
0
336.7
0.04
0.00
0.01
335.8
TABLE 4
Comparison With the Recent BCPPA [14] and BPAS [20] in VANETs
We denote k as average searching number of one-time public key in [14], r; t; u as ring size, threshold size and bit length in [18] respectively. Here, we omit the
time cost of retrieving transaction tx_rtv and querying smart contract eth_calls which are the scope of transmission latency.
LIN ET AL.: EBCPA: EFFICIENT BLOCKCHAIN-BASED CONDITIONAL PRIVACY-PRESERVING AUTHENTICATION FOR VANETS
1829
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:49 UTC from IEEE Xplore.  Restrictions apply. 



# Page 13

of k ¼ 10, our EBCPA can save about 48.95%, 89.83% and
87.68% computation costs of traceability than the CertCoin,
BCPPA and BPAS respectively. The message signing cost of
CertCoin, BCPPA, BPAS, and EBCPA is 196.11 milliseconds,
32.84 milliseconds, 401.41 milliseconds, and 31.85 millisec-
onds respectively (if r; t; u are set as 10, 5, 256 respectively).
That is, our EBCPA can save at least 83.75%, 3.00% and
92.06% than CertCoin, BCPPA and BPAS respectively in
terms of message signing cost.
With respect to one message veriﬁcation, our proposal
involves 24.30 milliseconds, the CertCoin involves 391.14
milliseconds, the BCPPA needs 42.05 milliseconds, and the
BPAS costs 98.11 milliseconds. This shows that our EBCPA
can save at least 93.78%, 42.21% and 75.23% (for one mes-
sage veriﬁcation time) comparing to the CertCoin, BCPPA
and BPAS respectively. In the n-message veriﬁcation (see
Fig. 6), all the comparing schemes involve linearly increas-
ing time costs, but the growth rate of EBCPA is slower than
that of others. The only compromise is that our EBCPA
requires more communication overhead than BCPPA (392
bytes versus 264 bytes). One can ﬁnd that this small com-
promise could be accepted for a signiﬁcant improvement of
efﬁcient signing, message veriﬁcation, and tracing.
Message authentication delay and loss rate. Motivated by the
average packet delay (APD) and packet loss ratio (PLR)
deﬁned in [44], we combine the aforementioned simulations
to obtain the running results (see Figs. 7 and 8). In the former
simulation, the speed of vehicles is set as a ﬁxed range (i.e.,
from 10 to 20 miles/second) and the density (i.e., the number
of vehicles) changes from 5 to 100 (with setting the step as 5).
As a result shown in Fig. 7, one can ﬁnd that the APD only
changes a little (less than 10 milliseconds) before the density
increases to 50, but after that it increases quickly. Corre-
spondingly, the PLR keeps increasing as the density
increases, but it will be with a slow growth when the density
is more than 50. This shows that the communication perfor-
mance of VANETs (using our proposal) will be degraded
when the density exceeds 50.
To evaluate the impact of vehicles’ average speeds in APD
and PLR, we ﬁx the density as 50 and then change the aver-
age speed from 5 to 70. From the obtained results (see Fig. 8),
as the average speed increases, the PLR is almost unchanged
(about 18.1%) and the APD ﬂuctuates largely (but the ﬂuctu-
ated span is less than 36 milliseconds). For one thing, the
average speed of vehicles makes a little impact on the PLR
within the same density, which ﬁts the fact that only those
data packets out of vehicles’ range will be discarded. For
another, different average speeds of vehicles may lead to
that the distance among vehicles changes unpredictably and
hence different APDs are caused.
7
CONCLUSION AND FUTURE WORK
This paper contributes to a more efﬁcient blockchain-based
privacy-preserving authentication (EBCPA) protocol for
VANETs. We ﬁrst design three system building blocks
namely KeyDer scheme, SoK scheme and smart contract, fol-
lowing by the EBCPA. Moreover, we prove the security of
Fig. 5. Practical comparison results of different phases.
Fig. 6. Practical comparison of n-message veriﬁcation efﬁciency.
Fig. 7. The impact of vehicle density in APD and PLR.
Fig. 8. The impact of vehicle average speed in APD and PLR.
1830
IEEE TRANSACTIONS ON DEPENDABLE AND SECURE COMPUTING, VOL. 20, NO. 3, MAY/JUNE 2023
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:49 UTC from IEEE Xplore.  Restrictions apply. 



# Page 14

designed SoK scheme prior to analyzing the security of
EBCPA. Finally, we implement it in the on-line Ethereum test
network (Rinkeby), Hyperledger test network and VANETs
simulation environment (via VanetMobiSim and NS-2),
together with evaluating the communication and computa-
tional costs in our personal computer. The benchmarks and
comparison demonstrate that our proposal is more suitable
for blockchain-enabled VANETs from its comprehensive
advantage especially the veriﬁcation and traceability.
While our proposal has been demonstrated more efﬁcient
in the simulation environment, it remains indeterminacy in a
real-word setting. In the future, we will further improve the
efﬁciency of EBCPA via designing a speciﬁed blockchain
(e.g., novel architecture, data structure, or consensus mecha-
nism). In addition, we will evaluate our prototype based on a
hybrid hardware and software implementation in the real-
word VANETs.
REFERENCES
[1]
R. G. Engoulou, M. Bellaı¨che, S. Pierre, and A. Quintero, “VANET
security surveys,” Comput. Commun., vol. 44, pp. 1–13, 2014.
[2]
L. Wei, J. Cui, Y. Xu, J. Cheng, and H. Zhong, “Secure and light-
weight conditional privacy-preserving authentication for securing
trafﬁc emergency messages in VANETs,” IEEE Trans. Inf. Forensics
Secur., vol. 16, pp. 1681–1695, 2021.
[3]
I. Tal and G.-M. Muntean, “Clustering and 5G-enabled smart cit-
ies: A survey of clustering schemes in VANETs,” in Research
Anthology on Developing and Optimizing 5G Networks and the Impact
on Society, pp. 1012–1050, Pennsylvania, USA: IGI Global, 2021.
[4]
C. Lai, K. Zhang, N. Cheng, H. Li, and X. Shen, “SIRC: A secure
incentive scheme for reliable cooperative downloading in high-
way VANETs,” IEEE Trans. Intell. Transp. Syst., vol. 18, no. 6,
pp. 1559–1574, Jun. 2017.
[5]
C. Lai, R. Lu, D. Zheng, and X. S. Shen, “Security and privacy chal-
lenges in 5G-enabled vehicular networks,” IEEE Netw., vol. 34, no. 2,
pp. 37–45, Mar./Apr. 2020.
[6]
Z. Yang, S. Yu, W. Lou, and C. Liu, “P2: Privacy-preserving commu-
nication and precise reward architecture for V2G networks in smart
grid,” IEEE Trans. Smart Grid, vol. 2, no. 4, pp. 697–706, Dec. 2011.
[7]
M. Raya and J. Hubaux, “Securing vehicular ad hoc networks,” J.
Comput. Secur., vol. 15, no. 1, pp. 39–68, 2007.
[8]
R. Lu, X. Lin, H. Zhu, P. Ho, and X. Shen, “ECPP: Efﬁcient condi-
tional
privacy
preservation
protocol
for
secure
vehicular
communications,” in Proc. 27th IEEE Int. Conf. Comput. Commun.
Joint Conf. IEEE Comput. Commun. Societies, 2008, pp. 1229–1237.
[9]
T. W. Chim, S. Yiu, L. C. K. Hui, and V. O. K. Li, “SPECS: Secure
and privacy enhancing communications schemes for VANETs,”
Ad Hoc Netw., vol. 9, no. 2, pp. 189–203, 2011.
[10] M. Bayat, M. Barmshoory, M. Rahimi, and M. R. Aref, “A secure
authentication scheme for VANETs with batch veriﬁcation,” Wire-
less Netw., vol. 21, no. 5, pp. 1733–1743, 2015.
[11] S. Horng, S. Tzeng, P. Huang, X. Wang, T. Li, and M. K. Khan,
“An efﬁcient certiﬁcateless aggregate signature with conditional
privacy-preserving for vehicular sensor networks,” Inf. Sci., vol. 317,
pp. 48–66, 2015.
[12] J. Xu, D. Zhang, G. Xiong, and H. Zhang, “CPBA: An efﬁcient con-
ditional privacy-preserving batch authentication scheme for
VANETs,” in Proc. 15th Int. Conf. Wireless Algorithms Syst. Appl.,
2020, pp. 555–567.
[13] Z. Lu, Q. Wang, G. Qu, H. Zhang, and Z. Liu, “A blockchain-
based privacy-preserving authentication scheme for VANETs,”
IEEE Trans. Very Large Scale Integr. Syst., vol. 27, no. 12, pp.
2792–2801, Dec. 2019.
[14] C. Lin, D. He, X. Huang, N. Kumar, and K.-K. R. Choo, “BCPPA:
A blockchain-based conditional privacy-preserving authentica-
tion protocol for vehicular ad hoc networks,” IEEE Trans. Intell.
Transp. Syst., vol. 22, no. 12, pp. 7408–7420, Dec. 2021.
[15] D. He, S. Zeadally, B. Xu, and X. Huang, “An efﬁcient identity-
based conditional privacy-preserving authentication scheme for
vehicular ad hoc networks,” IEEE Trans. Inf. Forensics Security,
vol. 10, no. 12, pp. 2681–2691, Dec. 2015.
[16] L. Zhang, Q. Wu, J. Domingo-Ferrer, B. Qin, and C. Hu, “Distributed
aggregate privacy-preserving authentication in VANETs,” IEEE
Trans. Intell. Transp. Syst., vol. 18, no. 3, pp. 516–526, Mar. 2017.
[17] J. Zhang, J. Cui, H. Zhong, Z. Chen, and L. Liu, “PA-CRT: Chinese
remainder theorem based conditional privacy-preserving authenti-
cation scheme in vehicular ad-hoc networks,” IEEE Trans. Depend-
able Secure Comput., vol. 18, no. 2, pp. 722–735, Mar./Apr. 2021.
[18] L. Li et al., “CreditCoin: A privacy-preserving blockchain-based
incentive announcement network for communications of smart vehi-
cles,” IEEE Trans. Intell. Transp. Syst., vol. 19, no. 7, pp. 2204–2220,
Jul. 2018.
[19] D. Zheng, C. Jing, R. Guo, S. Gao, and L. Wang, “A traceable block-
chain-based access authentication system with privacy preservation
in VANETs,” IEEE Access, vol. 7, pp. 117 716–117 726, 2019.
[20] Q. Feng, D. He, S. Zeadally, and K. Liang, “BPAS: Blockchain-
assisted privacy-preserving authentication system for vehicu-
lar ad hoc networks,” IEEE Trans. Ind. Informat., vol. 16, no. 6,
pp. 4146–4155, Jun. 2020.
[21] F. Julien, M. Raya, M. Felegyhazi, and P. Papadimitratos, “Mixzones
for location privacy in vehicular networks,” in Proc. Assoc. Comput.
Machinery Workshop Wireless Netw. Intell. Transp. Syst., 2007, pp. 1–7.
[22] C. Zhang, X. Lin, R. Lu, and P.-H. Ho, “RAISE: An efﬁcient RSU-
aided message authentication scheme in vehicular communication
networks,” in Proc. IEEE Int. Conf. Commun., 2008, pp. 1451–1457.
[23] K.-A. Shim, “CPAS: An efﬁcient conditional privacy-preserving
authentication scheme for vehicular sensor networks,” IEEE
Trans. Veh. Technol., vol. 61, no. 4, pp. 1874–1883, May 2012.
[24] C. Zhang, R. Lu, X. Lin, P.-H. Ho, and X. Shen, “An efﬁcient iden-
tity-based
batch
veriﬁcation
scheme
for
vehicular
sensor
networks,” in Proc. 27th Conf. Comput. Commun., 2008, pp. 246–250.
[25] C. Zhang, P. Ho, and J. Tapolcai, “On batch veriﬁcation with
group testing for vehicular communications,” Wireless Netw., vol.
17, no. 8, pp. 1851–1865, 2011.
[26] J. Cui, X. Zhang, H. Zhong, J. Zhang, and L. Liu, “Extensible con-
ditional privacy protection authentication scheme for secure
vehicular networks in a multi-cloud environment,” IEEE Trans.
Inf. Forensics Security, vol. 15, pp. 1654–1667, 2020.
[27] J. Li, H. Yuan, and Y. Zhang, “Cryptanalysis and improvement of
certiﬁcateless aggregate signature with conditional privacy-pre-
serving for vehicular sensor networks,” IACR Cryptol. ePrint Arch.,
vol. 2016, 2016, Art. no. 692.
[28] Y. Ming and X. Shen, “PCPA: A practical certiﬁcateless condi-
tional privacy preserving authentication scheme for vehicular ad
hoc networks,” Sensors, vol. 18, no. 5, 2018, Art. no. 1573.
[29] C. Lin, D. He, X. Huang, K. R. Choo, and A. V. Vasilakos, “BSeIn:
A blockchain-based secure mutual authentication with ﬁne-
grained access control system for industry 4.0,” J. Netw. Comput.
Appl., vol. 116, pp. 42–52, 2018.
[30] H.-N. Dai, Z. Zheng, and Y. Zhang, “Blockchain for Internet of Things:
A survey,” IEEE Internet Things J., vol. 6, no. 5, pp. 8076–8094,
Oct. 2019.
[31] Z. Lu, Q. Wang, G. Qu, H. Zhang, and Z. Liu, “A blockchain-
based privacy-preserving authentication scheme for VANETs,”
IEEE Trans. Very Large Scale Integr. Syst., vol. 27, no. 12, pp.
2792–2801, Dec. 2019.
[32] D. Gabay, K. Akkaya, and M. Cebe, “Privacy-preserving authenti-
cation scheme for connected electric vehicles using blockchain
and zero knowledge proofs,” IEEE Trans. Veh. Technol., vol. 69, no. 6,
pp. 5760–5772, Jun. 2020.
[33] Z. Xu, W. Liang, K. Li, J. Xu, and H. Jin, “A blockchain-based
roadside unit-assisted authentication and key agreement proto-
col for Internet of vehicles,” J. Parallel Distrib. Comput., vol. 149,
pp. 29–39, 2021.
[34] C. Hazay and Y. Lindell, Efﬁcient Secure Two-Party Protocols: Tech-
niques and Constructions. Berlin, Germany: Springer, 2010.
[35] A. Fiat and A. Shamir, “How to prove yourself: Practical solutions
to identiﬁcation and signature problems,” in Proc. Conf. Theory
Appl. Cryptographic Techn., 1986, pp. 186–194.
[36] M. Bellare and P. Rogaway, “Random Oracles are practical: A par-
adigm for designing efﬁcient protocols,” in Proc. 1st ACM Conf.
Comput. Commun. Secur., 1993, pp. 62–73.
[37] M. Chase and A. Lysyanskaya, “On signatures of knowledge,” in
Proc. 26th Annu. Int. Cryptol. Conf., 2006, pp. 78–96.
[38] C. Lin, D. He, X. Huang, M. K. Khan, and K.-K. R. Choo, “DCAP:
A secure and efﬁcient decentralized conditional anonymous pay-
ment system based on blockchain,” IEEE Trans. Inf. Forensics
Secur., vol. 15, pp. 2440–2452, 2020.
LIN ET AL.: EBCPA: EFFICIENT BLOCKCHAIN-BASED CONDITIONAL PRIVACY-PRESERVING AUTHENTICATION FOR VANETS
1831
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:49 UTC from IEEE Xplore.  Restrictions apply. 



# Page 15

[39] G. Gutoski and D. Stebila, “Hierarchical deterministic bitcoin wal-
lets that tolerate key leakage,” in Proc. 19th Int. Conf. Financial
Cryptogr. Data Secur., 2015, pp. 497–504.
[40] W. Zou et al., “Smart contract development: Challenges and oppor-
tunities,” IEEE Trans. Softw. Eng., vol. 47, no. 10, pp. 2084–2106,
Oct. 2021.
[41] G. Wood, “Ethereum: A secure decentralized generalized transac-
tion ledger,” Ethereum project yellow paper, vol. 151, no. 2014,
pp. 1–32, 2014.
[42] E. Androulaki et al., “Hyperledger fabric: A distributed operating
system for permissioned blockchains,” in Proc. 13th EuroSys Conf.,
2018, pp. 30:1–30:15.
[43] G. Wood et al., “Ethereum: A secure decentralised generalised transac-
tion ledger,” Ethereum project, Yellow paper, vol. 151, no. 2014,
pp. 1–32, 2014.
[44] Y. Liu, L. Wang, and H.-H. Chen, “Message authentication using
proxy vehicles in vehicular ad hoc networks,” IEEE Trans. Veh.
Technol., vol. 64, no. 8, pp. 3697–3710, Aug. 2015.
Chao Lin received the PhD degree from the
School of Cyber Science and Engineering, Wuhan
University, Wuhan, China, in 2020. He currently
works with the College of Computer and Cyber
Security, Fujian Normal University, China. His
research interests include applied cryptography
and blockchain technology.
Xinyi Huang received the PhD degree from the
School of Computer Science and Software Engi-
neering, University of Wollongong, Australia. He is
currently a professor with the College of Computer
and Cyber Security, Fujian Normal University,
China, and the co-director of the Fujian Provincial
Key Laboratory of Network Security and Cryptol-
ogy. He has authored more than 100 research
papers in refereed international conferences and
journals. His research interests include applied
cryptography and network security. His work has
been cited more than 9,000 times with Google Scholar (H-Index: 50). He is
also an associate editor of IEEE Transactions on Dependable and Secure
Computing.
Debiao He received the degree in applied mathe-
matics from the School of Mathematics and Statis-
tics, Wuhan University, Wuhan, China, in 2009. He
is currently a professor with the School of Cyber
Science and Engineering, Wuhan University. He
has published more than 150 research papers in
refereed international journals and conferences,
such as IEEE Transactions on Dependable and
Secure Computing, IEEE Transactions on Informa-
tion Forensics and Security, and Usenix Security
Symposium. His research interests include cryp-
tography and information security, in particular, cryptographic protocols. He
was a recipient of the 2018 IEEE Systems Journal Best Paper Award and
the 2019 IET Information Security Best Paper Award. His work has been
cited more than 9,000 times with Google Scholar. He is in the editorial board
of several international journals, such as the Journal of Information Security
and Applications, Frontiers of Computer Science, and Human-Centric
Computing and Information Sciences.
" For more information on this or any other computing topic,
please visit our Digital Library at www.computer.org/csdl.
1832
IEEE TRANSACTIONS ON DEPENDABLE AND SECURE COMPUTING, VOL. 20, NO. 3, MAY/JUNE 2023
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:49 UTC from IEEE Xplore.  Restrictions apply. 
