

# Page 1

IEEE TRANSACTIONS ON DEPENDABLE AND SECURE COMPUTING, VOL. 21, NO. 4, JULY/AUGUST 2024
1587
Blockchain-Based Lightweight Message
Authentication for Edge-Assisted Cross-Domain
Industrial Internet of Things
Fengqun Wang
, Jie Cui
, Senior Member, IEEE, Qingyang Zhang
, Debiao He
, Chengjie Gu
,
and Hong Zhong
Abstract— In edge-assisted cross-domain Industrial Internet of
Things (IIoT), blockchain-based authentication is an effective way
to build cross-domain trust and secure cross-domain data. How-
ever, existing authentication schemes still have serious challenges
in terms of efﬁciency and security. In this article, we propose
a blockchain-based lightweight message authentication scheme.
First, to address efﬁciency challenges, we build a blockchain-
enabled edge-assisted lightweight authentication framework. This
framework uses edge servers to assist smart devices in achieving
cross-domain authentication and effectively reduce redundant in-
teractions between entities. Second, to resolve the security chal-
lenges, we design a lightweight message authentication algorithm
for cross-domain IIoT. The algorithm guarantees message security
with low computational overhead and is suitable for multi-receiver
cross-domain IIoT. The security proof and analysis demonstrate
that the proposed scheme is secure under the random oracle model
and can resist various attacks. The performance evaluation shows
that our proposed scheme is superior in terms of computation
and communication overhead when compared with other related
schemes.
Index Terms—Industrial Internet of Things (IIoT), consortium
blockchain, cross-domain authentication, elliptic curve crypto-
graphy (ECC).
Manuscript received 3 May 2022; revised 11 May 2023; accepted 7 June 2023.
Date of publication 15 June 2023; date of current version 11 July 2024. This
work was supported in part by the National Natural Science Foundation of China
under Grants 62272002, 62202005, and U1936220, in part by the Excellent
Youth Foundation of Anhui Scientiﬁc Committee under Grant 2108085J31,
in part by the Natural Science Foundation of Anhui Province, China under
Grants 2008085QF297 and 2208085QF198, in part by the University Synergy
Innovation Program of Anhui Province under Grant GXXT-2022-049, in part by
the Foundation of Anhui Educational Committee under Grant KJ2020A0037,
and in part by the Special Fund for Key Program of Science and Technology
of Anhui Province, China under Grant 202003A05020043. (Corresponding
author: Jie Cui.)
Fengqun Wang, Jie Cui, Qingyang Zhang, and Hong Zhong are with the Key
Laboratory of Intelligent Computing and Signal Processing of Ministry of Ed-
ucation, School of Computer Science and Technology, Anhui University, Hefei
230039, China, also with the Anhui Engineering Laboratory of IoT Security
Technologies, Anhui University, Hefei 230039, China, and also with the Institute
of Physical Science and Information Technology, Anhui University, Hefei
230039, China (e-mail: fqwang108@foxmail.com; cuijie@mail.ustc.edu.cn;
qingyang.zhang.inchina@gmail.com; zhongh@ahu.edu.cn).
Debiao He is with the School of Cyber Science and Engineering, Wuhan
University, Wuhan 430072, China (e-mail: hedebiao@163.com).
Chengjie Gu is with Security Research Institute, New H3C Group, Hefei
230088, China (e-mail: gu.chengjie@h3c.com).
Digital Object Identiﬁer 10.1109/TDSC.2023.3285800
I. INTRODUCTION
I
N RECENT years, the introduction of edge computing [1],
[2]intotheIndustrialInternetofThings(IIoT)[3],[4],[5]has
shortened decision latency, simpliﬁed network topology, and op-
timized device management in industrial manufacturing [6], [7].
However, as manufacturing becomes more complex, producing
a product often requires smart devices from multiple adminis-
trative domains (e.g., different smart factories) to collaborate in
real time [8], [9].
Fig. 1 shows a typical data exchange scenario in the edge-
assisted cross-domain IIoT. In this scenario, multiple smart
devices can support the same IIoT service (e.g., the same
production task) [10], [11], so this scenario is generally a
multi-receiver scenario, i.e., a message has multiple receivers.
These devices generate real-time data according to the service
type, exchange data with the assistance of edge servers, and
process the received data in time. However, the data faces many
security issues throughout the transmission process [12], [13].
For example, malicious network attackers can intercept and
tamper with real-time data. Once this tampered data is used, it
could lead to disruptions in industrial production and economic
losses. On the other hand, trust between multiple domains
is difﬁcult to build. That is, multiple administrative domains
do not trust each other and are reluctant to share sensitive
data.
To secure cross-domain data and build trust between multi-
ple administrative domains, many researchers have introduced
consortium blockchain technology [14], [15], [16] and proposed
cross-domain authentication schemes [17], [18]. However, ex-
isting blockchain-based cross-domain authentication schemes
face several challenges.
r A blockchain-enabled authentication framework should
be lightweight. Most existing blockchain-enabled frame-
works have complex organizational structures. For exam-
ple, the authentication framework is complex in the scheme
proposed by Shen et al. [19]. Verifying the legitimacy
of a message requires multiple interactions between mul-
tiple entities (smart device, authentication agent server,
and blockchain). In the multiple-receiver IIoT, these in-
teractions increase as the number of receivers increases.
This generates huge communication overheads and non-
negligible communication latency, which may eventually
1545-5971 © 2023 IEEE. Personal use is permitted, but republication/redistribution requires IEEE permission.
See https://www.ieee.org/publications/rights/index.html for more information.
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:47:57 UTC from IEEE Xplore.  Restrictions apply. 



# Page 2

1588
IEEE TRANSACTIONS ON DEPENDABLE AND SECURE COMPUTING, VOL. 21, NO. 4, JULY/AUGUST 2024
Fig. 1.
Data exchange between two domains based on edge computing.
lead to conﬂicts between collaborating devices and disrupt
the production process [20].
r An authentication algorithm should be lightweight. IIoT
requires a high level of real-time data. For example, in
some industrial control applications, feedback is required
within 10 −100 milliseconds (ms) [21]. Most existing au-
thentication schemes involve many time-consuming cryp-
tographic operations. In this case, smart devices with lim-
ited computing power cannot process massive amounts of
real-time data in time, leading to signiﬁcant delays in pro-
duction decisions [13] and chaotic industrial production.
In the multi-receiver IIoT, this challenge becomes more
prominent because the time-consuming operation of most
existing schemes increases linearly with the number of
receivers.
r The security of the authentication algorithm should be
more comprehensive. Most existing authentication algo-
rithms do not consider data conﬁdentiality and anonymity
simultaneously. If data conﬁdentiality is not guaranteed,
attackers can easily obtain industry-critical data (e.g.,
business secrets), which can lead to signiﬁcant ﬁnancial
losses [4], [22]. If data anonymity is not guaranteed, at-
tackers can mark the real identity of a smart device and
capture the data sent by that device for analysis, leading to
a privacy leakage of the device or even the IIoT [23], [24].
To solve the above problems and balance the relationship
between real-time and security, we design a blockchain-based
lightweight message authentication scheme. In the proposed
scheme, we use blockchain to build trust between multiple
administrative domains.
The contributions of the proposed scheme are as follows:
r We construct a blockchain-enabled lightweight cross-
domain authentication framework. The framework uses
edge servers to assist smart devices in cross-domain com-
munication. Compared to existing cross-domain authenti-
cationframeworks,theproposedframeworkinvolvesfewer
entities and requires fewer interactions between entities to
complete authentication.
r We design a blockchain-based lightweight message au-
thentication algorithm, which is composed of elliptic curve
cryptography and hash functions. In addition, we imple-
ment our proposed scheme and compare its performance
with those of three other related schemes. The theoretical
analysis and simulation results show that our proposed
scheme has a lower computational overhead and is superior
to the multi-receiver cross-domain IIoT.
r Thesecurityproofshowsthattheproposedschemesatisﬁes
conﬁdentiality and unforgeability. In addition, we conduct
a security analysis and compare the security with three
other schemes. The results show that our proposed scheme
is highly secure, especially considering data conﬁdentiality
and anonymity.
The remainder of this paper is organized as follows. Section II
presents work related to authentication in IIoT. Section III dis-
cusses the preliminary knowledge. Section IV offers the speciﬁc
details of the framework design. Section V presents details of
the proposed scheme. Section VI focuses on the security proof
and analysis of the proposed scheme. Section VII provides
an experimental evaluation of the proposed scheme. Finally,
Section VIII concludes the paper.
II. RELATED WORK
In this section, we mainly introduce and analyze the work
related to security authentication in IIoT.
In recent years, with the development of IIoT, the security of
IIoThasalsoreceivedmoreandmoreattentionfromindustryand
academia. Considering the limited computing power of smart
devices in IIoT, Esfahani et al. [25] proposed a lightweight
authentication scheme that enables device-to-device authenti-
cation. In this scheme, there are only hash and XOR operations,
so it has the advantages of low computation and communication
overhead. Regarding security, it can resist common attacks such
as replay attacks. In 2020, Verma et al. [26] proposed an efﬁcient
proxy signature scheme for securing IIoT data, dramatically
improving performance. However, neither of these two schemes
guarantees the anonymity of messages.
In 2018, Esposito et al. [27] designed a message authenti-
cation scheme using group signature. In terms of efﬁciency,
this scheme uses short group signatures to reduce computational
overhead. Still, for security, the scheme mainly focuses on the
integrity and anonymity of the message and does not consider
the conﬁdentiality of messages. Subsequently, Cui et al. [28]
used proxy re-encryption techniques to design an anonymous
message authentication scheme. This scheme introduces edge
computing to effectively reduce messages’ transmission delay
and guarantees messages’ integrity, anonymity, and conﬁden-
tiality. These two schemes focus on the security of a single
administrative domain, and trust between all entities is based
on trust in a trusted authority (TA). However, in a cross-domain
IIoT environment, each domain does not trust the other. To
establishtrustbetweeneachdomain,themostcommonapproach
is to have multiple domains trust a speciﬁc domain’s TA, or to
establish a common TA for multiple domains; however, these
two approaches are difﬁcult to implement. Therefore, these
schemes are not suitable for cross-domain IIoT.
More and more researchers [29], [30], [31], [32] have started
usingblockchaintosolvetheaboveproblems.In[29],Guanetal.
used the decentralized feature of blockchain to solve the cen-
tralized private key generator key escrow problem. The scheme
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:47:57 UTC from IEEE Xplore.  Restrictions apply. 



# Page 3

WANG et al.: BLOCKCHAIN-BASED LIGHTWEIGHT MESSAGE AUTHENTICATION FOR EDGE-ASSISTED CROSS-DOMAIN
1589
uses blockchain as an information source for synchronizing
user revocation lists, enabling fast detection of user revocations.
However, this scheme only achieves data anonymity, not data
conﬁdentiality. In [30], Wang et al. used blockchain to achieve
efﬁcient conditional anonymity and key management, and the
scheme has advantages in terms of communication cost and
security. Still, this scheme does not take into account data con-
ﬁdentiality. In 2022, Wang et al. [33] abstracted smart devices
in multiple domains into an undirected graph. They designed an
authentication scheme using dynamic accumulator and digital
signature techniques, which has good performance in terms of
efﬁciency, but the scheme does not speciﬁcally consider data
anonymity and conﬁdentiality. To achieve both conﬁdentiality
and anonymity of data, some researchers have started to com-
bine existing encryption and signature algorithms. For example,
Shen et al. [19] designed a secure and practical cross-domain
authentication scheme, which combines encryption and group
signature technology. The scheme achieves data anonymity and
conﬁdentiality. However, in terms of efﬁciency, the scheme
contains many time-consuming cryptographic operations, re-
sulting in high computational and communication overheads.
In terms of security, the scheme does not achieve unlinkability
of data. In addition, the scheme uses blockchain to solve the
trust problem between multiple domains, but the authentication
framework is complex, resulting in many interactions between
entities during the authentication process. Subsequently, Yang
et al. [34] proposed a blockchain-based lightweight authenti-
cation scheme that offers signiﬁcant advantages in terms of
computational overhead. The scheme does not meet the data
conﬁdentiality. In addition, the above studies do not consider
multi-receiver cross-domain IIoT scenarios. They also fail to
consider that smart devices in different administrative domains
are geographically dispersed and cannot directly cross-domain
interaction, because these devices’ communication and mobility
capabilities are limited.
In summary, although some authentication schemes have been
proposed, the existing schemes do not fully consider the com-
plexity of the system framework, the lightweight of the authen-
tication algorithm, the conﬁdentiality and anonymity of the data
in the multi-receiver IIoT scenario. Therefore, it is necessary
and meaningful to design a secure and efﬁcient authentication
scheme for the multi-receiver cross-domain IIoT.
III. PRELIMINARIES
In this section, to better understand our proposed scheme, we
introduce the elliptic curve cryptosystem and blockchain used
in the proposed scheme.
A. Elliptic Curve Cryptosystem
Let Fp be a ﬁnite ﬁeld, which is determined by a prime number
p. Let a set of elliptic curve point E over Fp be deﬁned by the
equation: y2 = x3 + ax + b mod p, where a, b ∈Fp. Let O be
an inﬁnity point, then O and other points on E make up an
additive elliptic curve group G with the order q and generator
P. The main properties of G are listed below:
r Scalar point multiplication: Let P ∈G and m ∈Z∗
q, the
scalar multiplication of E is deﬁned as m · P = P + P +
· · · + P (m times). It is worth noting that the ”+” here
indicates the point addition.
r Elliptic Curve Discrete Logarithm problem (ECDLP): x ∈
Z∗
q, Q = xP, where P, Q ∈G on curve E. Given Q = xP,
it is computational hard for a probabilistic polynomial-time
(PPT) adversary to calculate x.
r Elliptic Curve Difﬁe-Hellman Problem (ECDHP): x, y ∈
Z∗
q, and X = xP, Y = yP, where X, Y ∈G on curve E.
Given X = xP and Y = yP, it is computational hard for
a PPT adversary to calculate xyP.
B. Blockchain
A blockchain is essentially a distributed, shared, and tamper-
proof database ledger [35]. Based on the degree of central-
ization [8], blockchain can be divided into three types: public
blockchain, consortium blockchain, and private blockchain. In
the proposed scheme, we focus on the following three charac-
teristics of the blockchain:
r Tamperprooﬁng:Datastoredontheblockchainaretamper-
proof and trustworthy.
r Decentralization: Blockchain is not dependent on third-
party institutions and can maintain databases based on
consensus protocols.
r Smart contract: A smart contract [36] is a computer pro-
gram running on the blockchain that can be executed
automatically and accurately according to a contract. Once
a smart contract is deployed, it will not be modiﬁed.
Taking efﬁciency and security into account, we choose a
consortium blockchain that can only be accessed by authorized
organizations.
IV. FRAMEWORK DESIGN
In this section, we ﬁrst describe the blockchain-enabled au-
thentication framework. Then, we present the outline and the
security model of the proposed scheme. Finally, we introduce
the security objectives.
A. Blockchain-Enabled Authentication Framework
In this subsection, to introduce the blockchain-enabled au-
thentication framework more clearly, we present the entity
overview and the communication process, respectively.
1) Entity Overview: We consider the scenario of implement-
ing service-based cross-domain authentication in edge-assisted
IIoT with the enablement of blockchain technology. As shown in
Fig. 2, we divide the blockchain-enabled authentication frame-
work into three layers based on functionality: the end device
layer, the management layer, and the blockchain layer.
The end device layer is responsible for data sensing and
processing, so it comprises all the smart devices (SD) in each
domain.
The management layer is primarily responsible for managing
all data in the domain, including data storing, forwarding, and
querying. Therefore, this layer contains all the trusted authority
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:47:57 UTC from IEEE Xplore.  Restrictions apply. 



# Page 4

1590
IEEE TRANSACTIONS ON DEPENDABLE AND SECURE COMPUTING, VOL. 21, NO. 4, JULY/AUGUST 2024
Fig. 2.
Blockchain-enabled authentication framework.
(TA), the edge server (ES), and the blockchain domain agents
(BCDA) in each domain. The TA, the ES, and the BCDA in
this layer collaborate to assist smart devices with secure cross-
domain communication and authentication.
The blockchain layer mainly builds trust between multiple
administrative domains, and it is composed of BCDAs in the
management layer. Speciﬁcally, these BCDAs in different do-
mains form a consortium blockchain to maintain a ledger. This
ledger contains pseudonym information for each SD, which is
tamper-proof and can be used during cross-domain authentica-
tion.
The following is a detailed description of the various entities.
r BCDA: Each administrative domain has a BCDA, and
all BCDAs form a consortium blockchain. The BCDA
from different domains can issue smart contracts through
negotiation. In each domain, BCDA can collaborate with
TA to dynamically update the domain’s latest information
based on IIoT services and revoke illegal smart devices.
r TA: Each administrative domain has a TA. The TA is trusted
to all entities in the domain. TA is mainly responsible for
generating the security information and managing IIoT
services. In addition, TA is the only entity that can trace
messages source in its domain.
r ES: Each administrative domain has an ES. The ES is
primarily responsible for storing and forwarding informa-
tion from devices, TA, and other administrative domains.
In addition, ES can assist SD in generating service-based
keys and cooperate with BCDA to complete necessary data
queries. Note that ES as a relay node is not required to be
anonymous.
r SD: Each administrative domain has numerous SD. They
have limited computing, mobility, and communication ca-
pabilities. Their main functions are to negotiate service-
based keys, sign and encrypt messages to be sent, and
decrypt and authenticate messages received. Note that
SD’s real identity needs to be anonymous in our proposed
scheme.
2) Communication Process: In IIoT, SDs support different
IIoT services. For a cross-domain service, the message sender
distributes a piece of data; there may be multiple SDs in
the message-receiving domain as receivers of that data. This
communication is widely available currently and usually im-
plemented in publish/subscribe systems [37], [38]. However,
on the one hand, each domain is relatively independent and
geographically dispersed [39], [40]. On the other hand, SDs
have limited communication power and mobility. Therefore,
SDs distributed in different domains cannot communicate with
each other directly. In the blockchain-enabled authentication
framework, we provide an ES in each administrative domain
to assist SDs in cross-domain communication. That is, when
SDs communicate across domains, the data needs to go through
the ES.
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:47:57 UTC from IEEE Xplore.  Restrictions apply. 



# Page 5

WANG et al.: BLOCKCHAIN-BASED LIGHTWEIGHT MESSAGE AUTHENTICATION FOR EDGE-ASSISTED CROSS-DOMAIN
1591
Our proposed authentication framework is lightweight. For
example, in scheme [19], when a smart device receives a mes-
sage, this smart device needs to send the message to the authen-
tication agent server. Then the authentication agent server needs
to query the relevant information in the blockchain. Finally,
the authentication agent server veriﬁes the message and sends
the veriﬁcation result to the smart device. However, there is
no authentication agent server in the framework we designed.
When the message passes through the edge server, the edge
server queries the relevant information in the blockchain. Then,
the edge server forwards the query result and the message to
the smart device. Finally, the smart device directly veriﬁes
the received messages. Therefore, our proposed scheme has
fewer interactions between entities when performing message
veriﬁcation. In addition, in our proposed scheme, to complete
a service-based cross-domain authentication, ES only needs to
query the relevant data from the blockchain once, regardless
of how many receivers there are. In contrast, in other schemes,
the number of queries submitted to the blockchain increases
with the number of receivers. Therefore, in a multi-receiver
IIoT, our proposed scheme’s advantage becomes even more
signiﬁcant.
B. Outline of the Proposed Scheme
The proposed scheme consists of six algorithms, including
Setup, Service-Based Key Generation (SBKGen), Sign, Encrypt,
Decrypt and Verify, which are deﬁned as follows.
1) Setup(1λ): The algorithm is executed by TA. Given the
random system security parameter λ, the TA outputs pub-
lic system parameters params, system secret key msk
and system public key Ppub.
2) SBKGen(servt, PKB
ES, IDB
ES, PKA
ES, skB
head): The al-
gorithm is executed by a smart device SDB
head, which
generates the service-based key. Given the service servt,
the public key PKB
ES and identity IDB
ES of the ES in the
message receiving domain, the public key PKA
ES of the
ES in the message sending domain, and the SDB
head’s se-
cret key skB
head, it outputs the corresponding servt-based
secret key skservt and servt-based public key PKservt.
Note that the message sender uses PKservt to encrypt
the plaintext m to get the ciphertext c, and the message
receiver uses skservt to decrypt the ciphertext c to obtain
the plaintext m, so we subsequently call the skservt as the
decryption key and the PKservt as the encryption key.
3) Sign(skA
i,j, PIDA
i,j, PKB
ES, IDB
ES, PKA
ES, PKservt,
m): The algorithm is executed by the message sender
SDA
i . Given {PKB
ES, IDB
ES, PKA
ES}, the system
parameter params, signer’s secret key skA
i,j, signer’s
pseudonym PIDA
i,j, the PKservt, and a plaintext m, it
outputs some parameters {h, u, U} and the corresponding
signature σ.
4) Encrypt(u, U, PKservt, PKB
head, h, σ, Ti, m): The algo-
rithm is executed by the message sender SDA
i . Given the
{u, U, PKservt, PKB
head, h}, signature σ, timestamp Ti,
and plaintext m, it outputs the ciphertext c.
5) Decrypt(c, Ti, skservt): The algorithm is executed by the
message receiver SDB
k . Given the ciphertext c, the times-
tamp Ti, the servt-based secret key skservt, it output the
intermediate parameter U, the corresponding plaintext m
and signature σ.
6) Verify(m, σ, U, W, PKA
i,j, skservt, Ppub, PIDA
i,j, IDB
ES,
PKB
ES, PKA
ES): The algorithm is executed by the
message receiver SDB
k . Given parameters {m, σ, U, W,
PKA
i,j, skservt, Ppub, PIDA
i,j, IDB
ES, PKB
ES, PKA
ES}, it
outputs 1 if the input parameters are valid and 0 otherwise.
C. Security Model
In the security model, we divide the adversary into two
categories: AI and AII. Among them, AI is the adversary
that attacks the conﬁdentiality of the scheme, and AII is the
adversary that attacks the unforgeability of the scheme.
1) Conﬁdentiality
Deﬁnition 1: Our proposed scheme meets conﬁdentiality if
the probability that the adversary AI could solve the ECDHP is
negligible in any polynomial time. In our proposed scheme, con-
ﬁdentiality is deﬁned as indistinguishability under the adaptive-
chosen-ciphertext attack (IND-CCA2).
Game 1: The game is an interaction between the simulator B
and the adversary AI under IND-CCA2. The speciﬁc deﬁnition
of this game is as follows:
r Setup: Given the security parameter λ, the simulator B
outputs the system parameters params, system public
key Ppub, system secret key msk, and then B sends
(Ppub, params) to the adversary AI and keep msk secret.
r H1-query:AdversaryAI sendsapoint< Xi >toB,where
Xi ∈G. The B returns the corresponding hash value rH1
to AI, where rH1 ∈Z∗
q.
r H2-query: Adversary AI sends a point < SPK > to B,
where SPK ∈G. The B returns the corresponding hash
value rH2 to AI, where rH2 ∈{0, 1}∗.
r H3-query:
Adversary
AI
sends
<
IDB
ES, PKB
ES, PKA
ES >
to
B,
the
B
returns
the
corresponding hash value rH3 to AI, where rH3 ∈Z∗
q.
r H4-query: Adversary AI sends < K, Ti > to B, where
K ∈G and Ti is a timestamp. The B returns the corre-
sponding hash value rH4 to AI, where rH4 ∈{0, 1}∗.
r H5-query: Adversary AI sends a message < m > to B,
where m ∈{0, 1}∗. The B returns the corresponding hash
value rH5 to AI, where rH5 ∈Z∗
q.
r Extract encryption key query: Adversary AI sends a ser-
vice < servt > to B, and B returns the encryption key
PKservt corresponding to the < servt > to AI.
r Extract decryption key query: Adversary AI sends a ser-
vice < servt > to B, and B returns the decryption key
skservt corresponding to the < servt > to AI.
r Extract veriﬁcation key query: Adversary AI sends a
pseudonym < PIDA
i,j > to B, and B returns the veriﬁca-
tion key PKA
i,j corresponding to the < PIDA
i,j > to AI.
r Extract signature key query: Adversary AI sends a
pseudonym < PIDA
i,j > to B, and B returns the signature
key skA
i,j corresponding to the < PIDA
i,j > to AI.
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:47:57 UTC from IEEE Xplore.  Restrictions apply. 



# Page 6

1592
IEEE TRANSACTIONS ON DEPENDABLE AND SECURE COMPUTING, VOL. 21, NO. 4, JULY/AUGUST 2024
r Encryption key replacement query: Adversary AI sends a
service servt and a valid new encryption key PK′
servt to
B, B replaces the original encryption key PKservt with the
PK′
servt.
r Encryption query: Adversary AI sends a encryption query
for a message m to B, then the B returns the corresponding
encryption result δ to AI.
r Decryption query: Adversary AI sends a decryption query
for a message δ to B, then the B returns the corresponding
decryption result m to AI.
Challenge: After the above queries are over, adversary AI
sends two plaintext {m0, m1} to B. The B randomly chooses a
bit d ∈{0, 1}, calculates the encryption message δ correspond-
ing to md, and ﬁnal returns the δ to AI. AI asks B some queries.
However, the AI cannot query for the decryption key of δ and
cannot query for the decryption result of δ. Finally, the AI
outputs a bit d′ ∈{0, 1}. If d′ = d, AI wins the game; otherwise,
AI fails.
2) Unforgeability
Deﬁnition 2: Our proposed scheme meets unforgeability if
the probability that the adversary AII could solve the ECDLP
is negligible in any polynomial time. In our proposed scheme,
the unforgeability is deﬁned as existential unforgeability under
chosen message attack (EUF-CMA).
Game 2: The game is an interaction between the simulator B
and the adversary AII under EUF-CMA. The speciﬁc deﬁnition
of this game is as follows:
r Setup, Hash query, Extract signature key query, Extract
veriﬁcation key query: Adversary AII and B perform the
same operations as in Game 1.
r Veriﬁcation key replacement query: Adversary AII sends a
pseudonym PIDA
i,j and a valid new veriﬁcation key PKA′
i,j
to B, B replaces the original veriﬁcation key PKA
i,j with
the PKA′
i,j.
r Sign query: Adversary AII sends a sign query for a mes-
sage m to B, then the B returns the corresponding sign
result σ and some necessary parameters to AII.
r Verify signature query: Adversary AII sends a verify sig-
nature query for a signature σ to B, then the B returns the
corresponding veriﬁcation result to AII.
Forgery: After the above queries are over, adversary AII
returns a forged signature pair (m, σ). If the signature pair is
valid, then AII wins the game; otherwise, AII fails. Note that
in the forgery process, AII cannot query for the signature key.
D. Security Objectives
To protect the security of the multi-receiver IIoT, the proposed
scheme needs to meet the following security objectives.
1) Message conﬁdentiality: To prevent privacy-sensitive data
from being obtained by malicious network attackers, mes-
sage senders should encrypt messages, and the encrypted
messages can only be decrypted by legal message re-
ceivers.
2) Message integrity and authentication: To guarantee the
security of the IIoT system, it is necessary to ensure the
integrity of the messages and ensure that the message
receiver can verify the messages’ validity after receiving
them. If a message has been tampered with, the receiver
should detect it in time.
3) Message anonymity: To guarantee the privacy of smart
devices, the smart devices’ real identity should remain
anonymous from malicious network attackers and third
parties. Other than the TA in the same domain as the smart
device, no other entities can obtain the real identity of the
smart device.
4) Un-linkability: To protect privacy, malicious network at-
tackers and third parties cannot link two messages gener-
ated by two pseudonyms.
5) Traceability: Suppose a message is found to be illegal. In
that case, the TA in the same administrative domain as the
smart device can extract the pseudonym through messages
and then should be able to trace the smart device’s real
identity corresponding to the pseudonym.
6) Identity revocation: When a smart device is found to have
sent an illegal message, the TA in the same administrative
domain should have the ability to revoke the identity of
the smart device.
7) Resistance to attacks: To guarantee the security of IIoT
system, the proposed scheme should be able to withstand
various common attacks such as the replay attack, the
modiﬁcation attack, and the impersonation attack.
V. PROPOSED SCHEME
In this section, we describe our scheme in detail. As shown
in Fig. 3, the proposed scheme can be divided into three main
phases: system initialization, service-based key negotiation,
message signing and veriﬁcation. The message signing and
veriﬁcation phase contains two parts: message signing and
encryption, message decryption and veriﬁcation. In addition,
the proposed scheme supports illegal message traceability and
identity revocation. Therefore, to introduce the proposed scheme
more clearly, in this section, we present it in the following
ﬁve parts: system initialization, service-based key generation,
message signing and encryption, message decryption and ver-
iﬁcation, illegal message tracing and identity revocation. The
notations used in this process are shown in Table I.
A. System Initialization
When a new administrative domain X is added to the IIoT sys-
tem,theblockchaindomainagentBCDAX joinstheblockchain
according to the strategy conﬁgured in the blockchain. Given the
public parameters (p, q, E, G, Z∗
q) for administrative domain X,
then TAX initializes the domain X as per the following steps.
1) The TAX selects a random number mskX ∈Z∗
q as the
system master secret key in domain X and computes the
corresponding public key P X
pub = mskX · P.
2) TA
from
different
domains
negotiate
several
se-
cure
one-way
hash
functions:
H1 : G →Z∗
q,
H2 :
G →{0, 1}∗,
H3 : {0, 1}∗× G × G →Z∗
q,
H4 : G ×
{0, 1}∗→{0, 1}∗, H5 : {0, 1}∗→Z∗
q. Then, the system
parameters params will be published in IIoT, which
include {q, G, E, P, P X
pub, Z∗
q, H1, H2, H3, H4, H5}.
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:47:57 UTC from IEEE Xplore.  Restrictions apply. 



# Page 7

WANG et al.: BLOCKCHAIN-BASED LIGHTWEIGHT MESSAGE AUTHENTICATION FOR EDGE-ASSISTED CROSS-DOMAIN
1593
Fig. 3.
Message authentication process overview.
3) TAX selects a random number skX
ES ∈Z∗
q as the se-
cret key for ESX and computes the corresponding
public key PKX
ES = skX
ES · P. Then, the TAX sends
{skX
ES, PKX
ES} to ESX via a secure channel.
4) When a new smart device is added to administrative
domain X, the TAX
ﬁrst selects a real identity
RIDX
i
for the smart device SDX
i . Then, the TAX
selects
a
random
number
rj ∈Z∗
q
and
computes
skX
i,j = H1(rj · Ppub) + mskX as a secret key for SDX
i .
To ensure the anonymity of a message, TAX computes
pseudonym
PIDX
i,j = RIDX
i ⊕H2(skX
i,j · P X
pub)
and
calculates public key PKX
i,j = skX
i,j · P for SDX
i . Sub-
sequently, the TAX sends {skX
i,j, PKX
i,j, PIDX
i,j, V P X
i,j}
to SDX
i
via a secure channel, where V P X
i,j indicates
the validity period of the PIDX
i,j. Noting that skX
i,j and
PIDX
i,j are updated every period of time, so TAX will
generate multiple set of data (skX
i,1, PKX
i,1, PIDX
i,1,
V P X
i,1), (skX
i,2, PKX
i,2, PIDX
i,2, V P X
i,2), (skX
i,3, PKX
i,3,
PIDX
i,3, V P X
i,3), ..., (skX
i,n, PKX
i,n, PIDX
i,n, V P X
i,n)
to
SDX
i .
5) TAX sends administrative domain X initial parameters
{P X
pub, PKX
ES} to BCDAX, then the BCDAX triggers
a smart contract to write these initial parameters into the
blockchain.
B. Service-Based Key Negotiation
Suppose the message sender is the entity in domain A, and the
receiverisindomainB.Givenanewservice(e.g.,servt),entities
from domains A and domain B need to negotiate a servt-based
key before exchanging information. In our proposed scheme, the
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:47:57 UTC from IEEE Xplore.  Restrictions apply. 



# Page 8

1594
IEEE TRANSACTIONS ON DEPENDABLE AND SECURE COMPUTING, VOL. 21, NO. 4, JULY/AUGUST 2024
TABLE I
NOTATIONS AND DEFINITIONS USED
blockchain creates a list for each service, and these lists are used
to query information about valid smart devices corresponding to
services. For example, if the service is servt, the corresponding
list is Listservt. And the Listservt stores all valid pseudonyms,
the public key, and the validity period of all smart devices that
support the service servt.
It is worth noting that there are multiple message receivers
for the same service. However, in the service-based key nego-
tiation process, the servt-based public key PKservt and the
servt-based secret key skservt are generated by a certain smart
device, which has relatively strong computing power and low
computingdensityamongallmessagereceivers.Assumethatthe
smart device SDB
head is the generator of PKservt and skservt.
Negotiating the servt-based key as per the following steps.
1) The edge server ESA sends a request SigskA
ES(servt) for
key negotiation to edge server ESB.
2) Upon receiving the request SigskA
ES(servt), the ESB
veriﬁes the validity of SigskA
ES(servt) by computing
V erP KA
ES(SigskA
ES(servt)). If passed, ESB sends servt
to the corresponding smart device SDB
head.
3) Upon
receiving
servt,
SDB
head
selects
a
random
number d ∈Z∗
q
and computes a servt-based pub-
lic
key
PKservt = d · P.
Then
the
smart
device
SDB
head
uses
its
secret
key
skhead
to
calculate
servt-based secret key skservt = d + skB
head · h, where
h = H3(IDB
ES, PKB
ES, PKA
ES). Subsequently, SDB
head
sends PKservt to ESB and sends {skservt, PKservt}
to other smart devices in administrative domain B that
support the same service via a secure channel.
4) Upon receiving PKservt, the edge server ESB gener-
ates signature SigskB
ES(PKservt, PKB
head) and sends it
to ESA.
5) Once ESA receives the signature SigskB
ES(PKservt,
PKB
head), it ﬁrst veriﬁes the validity of the sig-
nature
by
computing
V erP KB
ES(SigskB
ES(PKservt,
PKB
head)). If passed, ESA
sends SigskA
ES(IDB
ES,
PKB
ES, PKservt, PKB
head)
to
corresponding
smart
devices and trusted authority TAA in administrative
domain A.
6) Once SD receives SigskA
ES(IDB
ES, PKB
ES, PKservt,
PKB
head), it ﬁrst veriﬁes the legitimacy of the signature,
if it is not legitimate, directly discard; otherwise, store the
corresponding servt-based data.
7) The TAA submits a signature SigmskA(Store_req,
servt, PIDS, SDPKS, V PS)
to
BCDAA,
where
Store_req indicates a storage request, PIDS indicates
a set of all valid pseudonyms based on servt, SDPKS
denotes the public key set corresponding to PIDS, V PS
indicates the validity period set corresponding to PIDS.
When the BCDAA receives the signature, it veriﬁes
whether the signature is valid. If it is invalid, BCDAA
discards the request directly; otherwise, BCDAA stores
{PIDS, SDPKS, V PS} into Listservt.
C. Message Signing and Encryption
Assume that the smart device SDA
i in administrative domain
A is the message sender and the smart device SDB
k in adminis-
trative domain B is the message receiver. To ensure the security
of messages, SDA
i needs to sign and encrypt the message before
sending them, as explained below.
1) The message sender SDA
i selects two random numbers
w, u ∈Z∗
q, and computes W = w · P, U = u · P respec-
tively. Then the SDA
i calculates h3 = H3(PIDA
i,j, W, U)
and h = H3(IDB
ES, PKB
ES, PKA
ES).
2) When a smart device SDA
i wants to send a plaintext m, it
ﬁrst selects current timestamp Ti and computes signature
σ = skA
i,j · (H5(m) · w + (h + h3) · u)−1. Then it cal-
culates ciphertext c = (s, Y A
i ), where s = H4(U, Ti) ⊕
(m||σ), Y A
i
= u(PKservt + h · PKB
head).
3) SDA
i sends the ﬁnal message δ = (c, W, PIDA
i,j, Ti) to
SDB
k through ESA and ESB.
Remark 1: In the message signing and encryption process,
some data (e.g., w, u, W, U, h3, h, Y A
i ) generation does not re-
quire online messages m. Therefore, when the smart device
is idle or computational density is not high, the smart device
can generate these data in advance through pre-processing and
store them for generating online signatures in the future. Using
this pre-processing approach can effectively improve the signing
efﬁciency of the smart device.
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:47:57 UTC from IEEE Xplore.  Restrictions apply. 



# Page 9

WANG et al.: BLOCKCHAIN-BASED LIGHTWEIGHT MESSAGE AUTHENTICATION FOR EDGE-ASSISTED CROSS-DOMAIN
1595
D. Message Decryption and Veriﬁcation
Upon receiving a message δ′ = (c′, W ′, PIDA′
i,j, T ′
i), ESB
queries the blockchain to check if the PIDA′
i,j is valid, and if so,
forwards the corresponding data to SDB
k . SDB
k ﬁrst decrypts
the ciphertext c′ by using skservt and then veriﬁes the integrity
of the received signature σ′. The main process is divided into
the following steps.
1) When ESB receives the ﬁnal message δ′, it ﬁrst queries
the blockchain whether the PIDA′
i,j exists in Listservt and
has not expired. If the result of the query is that the PIDA′
i,j
does not exist or has expired, ESB will directly discard
the ﬁnal message; otherwise, ESB will obtain the PKA′
i,j
corresponding to the PIDA′
i,j from the blockchain. Finally,
ESB sends the δ′ and PKA′
i,j to the corresponding smart
device SDB
k .
2) Upon receiving this message δ′, SDB
k checks the freshness
of T ′
i. Assume that the time of receiving message is T. If
ΔT ≥T −T ′
i, SDB
k continues; otherwise, SDB
k discards
the message δ′.
3) To obtain plaintext m and signature σ, SDB
k
com-
putes U ′ = Y A
i
′ · sk−1
servt, and then calculates m′||σ′ =
H4(U ′, Ti) ⊕s′.
4) To verify the validity and integrity of signature σ′,
SDB
k computes h′
3 = H3(PIDA′
i,j, W ′, U ′) and then cal-
culates h = H3(IDB
ES, PKB
ES, PKA
ES). Subsequently,
SDB
k checkswhethertheformulaPKA′
i,j = σ′ · (H5(m′) ·
W ′ + (h + h′
3) · U ′) holds true or not. If not, SDB
k rejects
the δ′; otherwise, the δ′ be considered legal.
Due to PKservt = d · P, skservt = d + skB
head · h, W = w ·
P, PKA
i,j = skA
i,j · P, U = u · P, the correctness of the U ′ can
be ensured using the below formula.
U ′ = Y A′
i
· sk−1
servt
= u(PKservt + h · PKB
head) · sk−1
servt
= u(d · P + skservt · P −d · P) · sk−1
servt
= (u · skservt · P) · sk−1
servt
= u · P
= U
(1)
The correctness of the veriﬁcation can be ensured using the
below formula.
σ′ · (W ′ · H5(m′) + (h + h′
3) · U ′)
= skA
i,j · (w · H5(m) + (h + h3) · u)−1
· (W · H5(m) + (h + h3) · U)
= skA
i,j · (w · H5(m) + (h + h3) · u)−1
· (w · H5(m) + (h + h3) · u) · P
= skA
i,j · P
= PKA
i,j
(2)
Remark 2: The pre-processing approach can also improve
message decryption and veriﬁcation efﬁciency like the message
signing and encryption process. When the message has not yet
arrived, and the smart device is idle or computational density
is not high, some data (e.g., h) can be pre-processed ofﬂine
and stored for future use in decrypting and verifying received
messages.
E. Illegal Message Tracing and Identity Revocation
In the proposed scheme, if it is found that a smart device in
the administrative domain X has published an illegal message,
then TAX traces the source of the illegal messages and revokes
the identity of the smart device as per the following steps.
1) TAX queries the PKX
i,j corresponding to the PIDX
i,j,
and then computes temp = mskX · PKX
i,j, RIDX
i =
PIDX
i,j ⊕H2(temp).
2) TAX stops regenerating the pseudonym PIDX
i,j and se-
cret key skX
i,j corresponding to the RIDX
i . Then the
TAX submits a signature SigmskX(Del_req, PIDSX
i )
to the BCDAX to delete the PIDSX
i , where Del_req
indicates delete request and PIDSX
i indicates a set of all
pseudonyms corresponding to the RIDX
i .
3) Upon
receiving
the
signature
SigmskX(Del_req,
PIDSX
i ),
BCDAX
ﬁrst
veriﬁes
the
validity
of
the
signature
by
computing
V erP X
pub(SigmskX
(Del_req, PIDSX
i )).
If
the
signature
is
valid,
BCDAX will delete the {PIDSX
i , PKSX
i , V PSX
i }
in corresponding list, where PKSX
i
denotes the public
key set corresponding to PIDSX
i , V PSX
i
indicates the
validity period set corresponding to PIDSX
i .
VI. SECURITY PROOF AND ANALYSIS
In this section, we ﬁrst demonstrate that our proposed scheme
issecurethroughsecurityproof.Thenweshowthatourproposed
scheme can resist various common attacks through security
analysis.
A. Security Proof
This subsection will perform detailed security proof to prove
the security of our proposed scheme.
1) Conﬁdentiality
Theorem 1: In the random oracle model, if an adversary
AI with probabilistic polynomial time executes Game 1 and
wins the game with a non-negligible probability εI, then the
simulator B with probabilistic polynomial time can solve the
ECDHP problem with a non-negligible probability no less than
(1 −qdsk
2λ )
εI
e(qenc+qdsk), where qdsk denotes the maximum times
of extracting decryption key queries, qenc denotes the maximum
times of encryption queries, λ denotes secure parameter, e
denotes natural logarithm base.
Proof: If there is an adversary AI that can break the proposed
scheme with a non-negligible probability εI, then we can con-
struct asimulator B basedonAI, andtheB cansolvetheECDHP
run by AI as a subroutine with non-negligible probability. Given
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:47:57 UTC from IEEE Xplore.  Restrictions apply. 



# Page 10

1596
IEEE TRANSACTIONS ON DEPENDABLE AND SECURE COMPUTING, VOL. 21, NO. 4, JULY/AUGUST 2024
a group G and an ECDHP instance {P, aP, bP|a, b ∈Z∗
q}, B
simulates oracles queried by AI as follows.
Setup: Upon receiving the setup query from AI, the B sends
the public parameters {E, G, P, Ppub, Hi(i = 1, 2, 3, 4, 5)} to
AI.
H1 -Query: For the query, B presets a map MapH1, and
the MapH1 is empty at the beginning. When the adversary
AI makes an H1 query with < Xi >, where Xi denotes an
elliptic curve point, B checks whether the MapH1 has the key
< Xi >. If so, B ﬁnds the corresponding value and returns it
to AI. Otherwise, B chooses a random number rH1 ∈Z∗
q, and
rH1 should satisfy rH1 /∈MapH1. Then the B sets the value
MapH1(< Xi >) = rH1, and returns rH1 to AI.
H2 -Query: For the query, B presets a map MapH2, and
the MapH2 is empty at the beginning. When the adversary AI
makes an H2 query with < SPK >, where SPK denotes an
elliptic curve point, B checks whether the MapH2 has the key
< SPK >. If so, B ﬁnds the corresponding value and returns it
to AI. Otherwise, B chooses a random bit-string rH2 ∈{0, 1}∗,
and rH2 should satisfy rH2 /∈MapH2. Then the B sets the value
MapH2(< SPK >) = rH2, and returns rH2 to AI.
H3 -Query: For the query, B presets a map MapH3, and
the MapH3 is empty at the beginning. When the adversary AI
makes an H3 query with < IDB
ES, PKB
ES, PKA
ES >, B checks
whether the MapH3 has the key < IDB
ES, PKB
ES, PKA
ES >. If
so, B ﬁnds the corresponding value and returns it to AI. Oth-
erwise, B chooses a random number rH3 ∈Z∗
q, and rH3 should
satisfy rH3 /∈MapH3. Then the B sets the value MapH3(<
IDB
ES, PKB
ES, PKA
ES >) = rH3, and returns rH3 to AI.
H4 -Query: For the query, B presets a map MapH4, and
the MapH4 is empty at the beginning. When the adversary
AI makes an H4 query with < K, Ti >, B checks whether the
MapH4 has the key < K, Ti >. If so, B ﬁnds the corresponding
value and returns it to AI. Otherwise, B chooses a random
bit-string rH4 ∈{0, 1}∗, and rH4 should satisfy rH4 /∈MapH4.
Then the B sets the value MapH4(< K, Ti >) = rH4, and
returns rH4 to AI.
H5 -Query: For the query, B presets a map MapH5, and
the MapH5 is empty at the beginning. When the adversary
AI makes an H5 query with < m >, where m ∈{0, 1}∗. B
checks whether the MapH5 has the key < m >. If so, B ﬁnds
the corresponding value and returns it to AI. Otherwise, B
chooses a random number rH5 ∈Z∗
q, and rH5 should satisfy
rH5 /∈MapH5. Then the B sets the value MapH5(< m >) =
rH5, and returns rH5 to AI.
Extract Encryption Key Query: For the query, B presets a
map MapEK, and the MapEK is empty at the beginning.
When the adversary AI makes an extract encryption key query
with a service < servt >, B checks whether the MapEK has
the key < servt >. If so, B ﬁnds the corresponding value and
returns it to AI. Otherwise, the B chooses a random number
ct ←{0, 1}, and Pr[ct = 1] =
1
qenc+qdsk+1, where the ′′1′′ in
the denominator denotes that AI has selected one service as
the challenge service. If ct = 0, the B chooses two random
numbers skservt, rH ∈Z∗
q, then the B computes PKservt =
skservt · P −rH · PKhead, where the PKservt should satisfy
PKservt /∈MapEK. Final the B sets MapEK(< servt >) =
PKservt, and returns PKservt to AI. At the same time, the B
sets Mapdsk(< servt >) = skservt. If ct = 1, let PKservt =
rknow · P, where the rknow ∈Z∗
q that B already knows. The
PKservt should satisfy PKservt /∈MapEK. Otherwise, B re-
chooses rknow, then B sets the value MapEK(< servt >) =
PKservt, and ﬁnal returns PKservt to AI.
Extract Decryption Key Query: For the query, B presets a
map Mapdsk, and the Mapdsk is empty at the beginning. When
the adversary AI makes an extract decryption key query with a
service < servt >, B checks whether the Mapdsk has the key
< servt >. If so, B ﬁnds the corresponding value and returns
it to AI. Otherwise, the B ﬁrst conducts extract encryption key
query and obtains the corresponding response < PKservt >.
If ct = 0, it means that B has been set Mapdsk(< servt >) =
skservt, and then the B returns the corresponding skservt to AI.
If ct = 1, B will abort the process.
Extract Veriﬁcation Key Query: For the query, B presets a map
MapV K, and the MapV K is empty at the beginning. When the
adversary AI makes an extract veriﬁcation key query with a
pseudonym < PIDA
i,j >, B checks whether the MapV K has
the key < PIDA
i,j >. If so, B ﬁnds the corresponding value and
returns it to AI. Otherwise, the B chooses a random number
gi,j ←{0, 1}, and Pr[gi,j = 1] =
1
qs+qssk+1, where the ′′1′′ in
the denominator denotes that AI has selected one pseudonym
as the challenge pseudonym, qssk denotes the maximum times
of extracting signature key queries, qs denotes the maximum
times of sign queries. If gi,j = 0, the B chooses a random
numbers ski ∈Z∗
q, then the B computes PKA
i,j = skA
i,j · P,
where the PKA
i,j should satisfy PKA
i,j /∈MapV K. Final the
B sets MapV K(< PIDA
i,j >) = PKA
i,j, and returns PKA
i,j to
AI. At the same time, the B sets Mapssk(< PIDA
i,j >) = ski.
If gi,j = 1, let PKA
i,j = rknow2 · P, where the rknow2 ∈Z∗
q
that B already knows. The PKA
i,j should satisfy PKA
i,j /∈
MapV K. Otherwise, B re-chooses rknow2, then B sets the value
MapV K(< PIDA
i,j >) = PKA
i,j, and ﬁnal returns PKA
i,j to
AI.
Extract Signature Key Query: For the query, B presets a map
Mapssk, and the Mapssk is empty at the beginning. When
the adversary AI makes an extract signature key query with
a pseudonym < PIDA
i,j >, B checks whether the Mapssk has
the key < PIDA
i,j >. If so, B ﬁnds the corresponding value
and returns it to AI. Otherwise, the B ﬁrst conducts extract
veriﬁcation key query and obtains the corresponding response
< PKA
i,j >. If gi,j = 0, it means that B has been set Mapssk(<
PIDA
i,j >) = ski, and then the B returns the corresponding
skA
i,j to AI. If gi,j = 1, B will abort the process.
Encryption Key Replacement Query: For the query, the adver-
sary AI can randomly choose a new encryption key PK′
servt to
replace the original encryption key PKservt corresponding to
servt.
Encryption Query: When the adversary AI makes an en-
cryption query with < m, IDA
ES, IDB
ES, PIDA
i,j, servα, Ti >
(assume that AI has already executed extract encryption key
query with < servα >), B queries the PKservα corresponding
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:47:57 UTC from IEEE Xplore.  Restrictions apply. 



# Page 11

WANG et al.: BLOCKCHAIN-BASED LIGHTWEIGHT MESSAGE AUTHENTICATION FOR EDGE-ASSISTED CROSS-DOMAIN
1597
to servα. If cα = 1, B will abort the process; otherwise, B
obtains skA
i,j and PKservα by querying Mapssk and MapEK
respectively. Then, B runs the Sign algorithm and Encrypt
algorithm to generate the ﬁnal encryption message δ = (c =
(s, Yi), W, PIDA
i,j, PKA
i,j, Ti), ﬁnal the B sends δ to AI.
Decryption Query: When the adversary AI makes a de-
cryption query with < δ, IDA
ES, IDB
ES, servα > (assume that
AI has already executed extract encryption key query with
< servα >), B queries the PKservα corresponding to servα. If
cα = 0, B obtains skservα by querying Mapdsk. Then B runs the
Decrypt algorithm to obtain m, ﬁnal the B returns the m to AI,
if the δ is invalid, the B will return ⊥. If cα = 1, B obtains rH,
rH3 by querying MapH3, B obtains rH4 by querying MapH4.
Then the B calculates m||σ = s ⊕rH4 and obtains rH5 by
querying MapH5, if PKA
i,j = σ(rH5 · W + (rH + rH3) · U),
B returns the m to AI. If δ is invalid, the B will return ⊥.
If there is no value for < servα > in MapEK, it means that
encryption key was replaced. Then the B obtains r′
H, r′
H3 by
querying MapH3 and obtains r′
H4 by querying MapH4. Next,
the B calculates m||σ = s ⊕r′
H4 and obtains r′
H5 by querying
MapH5, if PKA
i,j = σ(r′
H5 · W + (r′
H + r′
H3) · U), B returns
the m to AI. Otherwise, B outputs ⊥.
Challenge: Adversary AI outputs a challenged pseudonym
PIDA
e,f, a challenged service servα and two plaintext m0, m1.
B executes extract encryption key query on servα, and ob-
tains the value PKservα. If cα = 0, B aborts the process.
Otherwise, B chooses random number a, b, w ∈Z∗
q, sets U =
a · P and PKB
head = b · P. Then the B obtains rH, rH3 by
querying MapH3 and obtains rH4, rH5 by querying MapH4,
MapH5 respectively. Next, B computes σ = skA
e,f · (rH5 · w +
(rH + rH3) · a)−1,s = rH4 ⊕(md||σ),Y A
i
= a · (PKservα +
rH · PKB
head). Finally, B sends the challenged message δ =
(c = (s, Y A
i ), W, PIDA
e,f, PKA
e,f, Ti) to AI.
After
Adversary
AI
executes
the
above-mentioned
query
of
the
probability
polynomial
time
and
outputs
the guess value d′ ∈{0, 1}. If d′ = d, B outputs abP =
1
rH (Y A
i
−rknowU) as the valid solution of the ECDHP, where
Y A
i
= a(PKservα + rH · PKB
head) = (rknow + rH · b) · U,
U = aP, rH = H3(IDB
ES, PKB
ES, PKA
ES). Otherwise, B did
not solve the ECDHP.
If the simulator B does not abort during the simulation, and
the adversary AI broke the conﬁdentiality of the scheme with a
non-negligible probability εI, then B outputs the valid solution
of ECDHP. Assume that ε′
I denotes AI did not perform extract
decryption key query for the challenged service, then Pr[ε′
I] =
1 −qdsk
2λ ; ε′′
I denotes B did not abort during the query phase, then
Pr[ε′′
I] = (1 −τ)qenc+qdsk; ε
′′′
I denotes B did not abort during
the challenge phase, then Pr[ε
′′′
I ] = τ.
The probability that B does not abort in the entire simulation
process is Pr[ε′
I ∧ε′′
I ∧ε
′′′
I ] = (1 −qdsk
2λ )(1 −τ)qenc+qdskτ,
where τ =
1
qenc+qdsk+1. When qenc + qdsk is large enough,
(1 −
1
qenc+qdsk+1)qenc+qdsk+1 tends to e−1. Therefore, the prob-
ability that B does not abort during the simulation is at least
(1 −qdsk
2λ )
1
e(qenc+qdsk).
In summary, if simulator B does not abort during the sim-
ulation process, and adversary AI break the conﬁdentiality
of the scheme with a non-negligible probability εI, then the
simulator B with probabilistic polynomial time outputs the valid
solution of ECDHP with a non-negligible probability no less
than (1 −qdsk
2λ )
εI
e(qenc+qdsk).
2) Unforgeability
Theorem 2: In the random oracle model, if an adversary
AII with probabilistic polynomial time executes Game 2 and
wins the game with a non-negligible probability εII, then the
simulator B with probabilistic polynomial time can solve the
ECDLP problem with a non-negligible probability no less than
(1 −qssk
2λ )
εII
e(qs+qssk), where qssk denotes the maximum times of
extracting signature key queries, qs denotes the maximum times
of sign queries.
Proof: If there is an adversary AII that can break our pro-
posed scheme with non-negligible probability εII, then we can
construct a simulator B based on AII, and the B can solve
the ECDLP run by AII as a subroutine with a non-negligible
probability. Given a group G and an ECDLP instance {P, Q =
bP|b ∈Z∗
q, P ∈G, Q ∈G}, B simulates oracles queried by
AII as follows.
Adversary AII executes setup, H1, H2, H3, H4, H5 query,
extract veriﬁcation key query and extract signature key query of
the random oracle in Theorem 1.
Veriﬁcation Key Replacement Query: For the query, the ad-
versary AII can randomly choose a new veriﬁcation key PKA′
i,j
to replace the original veriﬁcation key PKA
i,j corresponding to
PIDA
i,j.
Sign-Query: For the query, B presets a map Mapsig, and
the Mapsig is empty at the beginning. When the adversary
AII makes a signing query with < m, PIDA
e,f > (assume that
AII has already executed extract veriﬁcation key query with
< PIDA
e,f >), B ﬁrst queries the value skA
e,f of Mapssk. If
ge,f = 1, B aborts the process. Otherwise, B chooses some ran-
dom numbers w, u ∈Z∗
q, then B obtains rH, rH3 by executing
H3-query and obtains rH5 by executing H5-query. Then, B runs
the Sign algorithm and Encrypt algorithm to generate the ﬁnal
encryption message δ = (c = (s, Yi), W, PIDA
e,f, PKA
e,f, Ti),
ﬁnal the B sends δ to AII.
Verify Signature Query: When the adversary AII makes a
verify signature query with δ = (c = (s, Yi), W, PIDA
e,f, Ti)
(assume that AII has already executed extract veriﬁcation key
query with < PIDA
e,f >), B queries the PKA
e,f corresponding
to PIDA
e,f. If ge,f = 0, B runs the Decrypt algorithm to obtain
m, ﬁnal the B returns the m to AII. If the δ is invalid, the B
will return ⊥. If ge,f = 1, B obtains rH, rH3, rH4 by querying
MapH3, MapH3 and MapH4 respectively. Then the B calcu-
lates m||σ = s ⊕rH4 and obtains rH5 by querying MapH5,
if PKA
e,f = σ(rH5 · W + (rH + rH3) · U), B returns the m to
AII. If δ is invalid, the B will return ⊥. If there is no value
for < PIDA
e,f > in MapV K, it means that veriﬁcation key
was replaced. Then the B obtains r′
H, r′
H3, r′
H4 by querying
MapH3, MapH3 and MapH4 respectively. Next, the B cal-
culates m||σ = s ⊕r′
H4 and obtains r′
H5 by querying MapH5,
if PKA
e,f = σ(r′
H5 · W + (r′
H + r′
H3) · U), B returns the m to
AII. Otherwise, B outputs ⊥.
Forgery: After executes the above-mentioned query of the
probability polynomial time, adversary AII outputs a forged
signature σ. If AII successfully forges the signature and ge,f =
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:47:57 UTC from IEEE Xplore.  Restrictions apply. 



# Page 12

1598
IEEE TRANSACTIONS ON DEPENDABLE AND SECURE COMPUTING, VOL. 21, NO. 4, JULY/AUGUST 2024
1, then B outputs b = rknow2 as the valid solution of ECDLP.
Otherwise, B did not solve ECDLP.
Assume that ε′
II denotes AII did not perform extract sig-
nature key query for the challenge pseudonym PIDA
e,f, then
Pr[ε′
II] = 1 −qssk
2λ . Assume that ε′′
II denotes B did not abort
during querying phase, then Pr[ε′′
II] = (1 −τ)qs+qssk. Assume
that ε
′′′
II denotes B did not abort in the forgery phase, then
Pr[ε
′′′
II] = τ. Hence, the probability that B does not abort in
the entire simulation process is Pr[ε′
II ∧ε′′
II ∧ε
′′′
II] = (1 −
qssk
2λ )(1 −τ)qs+qsskτ, where τ =
1
qs+qssk+1. When qs + qssk
is large enough, (1 −
1
qs+qssk+1)qs+qssk+1 tends to e−1. There-
fore, the probability that B does not abort during the simulation
is at least (1 −qssk
2λ )
1
e(qs+qssk).
In summary, if simulator B does not abort during the simula-
tion process, and adversary AII broke the unforgeability of the
scheme with a non-negligible probability εII, then the simulator
B with probabilistic polynomial time outputs the valid solution
of ECDLP with a non-negligible probability of no less than
(1 −qssk
2λ )
εII
e(qs+qssk).
B. Security Analysis
This subsection gives a detailed analysis of various security
features that our proposed scheme satisﬁes.
1) Message Conﬁdentiality: According to Theorem 1, we
know that no polynomial adversary can challenge success if
the ECDHP is hard. Before sending a message, the smart device
ﬁrst encrypts the plaintext m by calculating s = H4(U, Ti) ⊕
(m||σ). During transmission, messages are in ciphertext, and
u, U are stored in the message sender. Through calculation
or guessing, malicious network attackers and illegal receivers
cannot obtain u or U. In addition, only the legitimate message
receiver with the service-based secret key skserv can obtain
U by computing Y A
i
· sk−1
serv, and further, obtain the plaintext
m by calculating H4(U ′, Ti) ⊕s. Therefore, the scheme can
guarantee the conﬁdentiality of the message.
2) Message Integrity and Authentication: According to the
Theorem 2, it can be concluded that if the ECDLP is difﬁcult to
solve, then no adversary can forgery a legal signature within a
given polynomial time. In addition, as long as the message and
signature meet PKA′
i,j = σ′(H5(m′) · W ′ + (h + h′
3) · U ′), the
signature σ′ is proven to be valid. Therefore, the scheme can
guarantee the integrity and authentication of the message.
3) Message Anonymity: In the process of cross-domain
authentication,
the
smart
device
SDX
i
does
not
use
its real identity when signing and encrypting, but uses
pseudonym PIDX
i,j = RIDX
i ⊕H2(skX
i,j · P X
pub) and skX
i,j =
H1(rj · Ppub) + mskX, where rj ∈Z∗
q. To obtain the real iden-
tity RIDX
i of SDX
i , the pseudonym PIDX
i,j and secret key skX
i,j
of SDX
i
must be obtained. On the one hand, the skX
i,j is not
transmitted on the network; on the other hand, according to the
ECDLP, network attackers and message receivers cannot obtain
the secret key skX
i,j through the public key PKX
i,j. Therefore,
except for the pseudonym owner and TAX, no other entity can
obtain the real identity based on public information.
4) Un-Linkability: In our proposed scheme, the smart device
SDX
i uses a pseudonym PIDX
i,j to generate a signature. Note
that generating PIDX
i,j needs a random number rj, and each
random number is unique and un-linkability. So no adversary
can link the two different signatures generated by two different
pseudonyms from the same smart device. Therefore, our pro-
posed scheme supports unlinkability.
5) Traceability: TAX can extract the pseudonym PIDX
i,j
from the message sent by a smart device SDX
i , and it can
calculate the SDX
i ’s real identity RIDX
i through the PIDX
i,j.
If a smart device is found to send an illegal message, the IIoT
system will feed the illegal message back to TAX. TAX ﬁrst
queries the public key PKX
i,j corresponding to PIDX
i,j, and then
calculates RIDX
i = H2(mskX · PKX
i,j) ⊕PIDX
i,j to obtain
the real identity. Therefore, in our proposed scheme, TA can
trace the source of any illegal message.
6) Identity Revocation: In our proposed scheme, TA can
cooperate with the blockchain to revoke illegal identity. If a
smart device SDX
i
is found to publish an illegal message,
TAX ﬁrst calculates the real identity RIDX
i corresponding to
the illegal message and then stops generating the pseudonym
PIDX
i,j. Subsequently, TA packs all the current pseudonyms
into PIDSX
i and forwards the delete request for PIDSX
i to the
blockchain. Finally, the blockchain can delete the corresponding
information according to the delete request. If the illegal smart
device regenerates a signature, ES can’t ﬁnd valid PIDX
i,j in the
blockchain, so the signature will be discarded. Therefore, our
proposed scheme supports identity revocation.
7) Resistance to Replay Attack: In the proposed scheme, the
message receiver should check whether the message has expired
before veriﬁcation. Assuming that T1 represents the timestamp
when the message is sent, T2 represents the timestamp when
the message is received, and ΔT represents the maximum
delay time of the message. If T2 −T1 ≤ΔT, the receiver will
further authenticate the message; otherwise, the message will
be considered expired, and the receiver will directly discard the
message. Therefore, our proposed scheme can withstand replay
attack.
8) Resistance to Modiﬁcation Attack: According to the The-
orem 2, we know that if an attacker modiﬁes any parameter in
{c, W, PIDA
i,j, PKA
i,j, Ti}, the message receiver can determine
that some parameters were modiﬁed by verifying that PKA′
i,j =
σ′ · (H5(m′) · W ′ + (h + h′
3) · U ′) does not hold. Therefore,
the proposed scheme can withstand the modiﬁcation attack.
9) Resistance to Impersonation Attack: Suppose an attacker
wants to impersonate a legitimate smart device. In that case, the
attacker should have the ability to construct legitimate parame-
ters {c, W, PIDA
i,j, PKA
i,j, Ti} and needs to ensure that the for-
mula PKA′
i,j = σ′ · (H5(m′) · W ′ + (h + h′
3) · U ′) holds. Ac-
cording to the Theorem 2, it is impossible for an attacker to gen-
erate the above legitimate parameters. Therefore, the proposed
scheme can withstand the impersonation attack.
C. Security Comparisons
We compare the security of our proposed scheme with three
recently proposed authentication schemes for IIoT. In addition,
we use SR-1, SR-2, SR-3, SR-4, SR-5, SR-6, SR-7, SR-8, and
SR-9 to denote message conﬁdentiality, message integrity and
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:47:57 UTC from IEEE Xplore.  Restrictions apply. 



# Page 13

WANG et al.: BLOCKCHAIN-BASED LIGHTWEIGHT MESSAGE AUTHENTICATION FOR EDGE-ASSISTED CROSS-DOMAIN
1599
TABLE II
SECURITY COMPARISON OF FOUR SCHEMES
authentication, message anonymity, un-linkability, traceability,
identity revocation, resistance to replay attack, resistance to
modiﬁcation attack, and resistance to impersonation attack,
respectively. The results of the security comparison are shown
in Table II.
It is worth noting that in [19], the conﬁdentiality of the
message is satisﬁed only after the message sender encrypts the
message using the negotiated key. Still, during the subsequent
interaction, the message sender uses this key all the time, so the
un-linkability of the message is not satisﬁed. In [19] and [34],
only the anonymity of the message senders is guaranteed, while
in [28] and our proposed scheme, the anonymity of both the
message senders and the message receivers are guaranteed.
Because [28] and our proposed scheme are designed for a
multi-receiver scenario, so the sender does not know which
speciﬁc device the receiver is. However, [19] and [34] are not
suited for a multi-receiver cross-domain IIoT scenario, so the
sender is supposed to know exactly which device the receiver is
and send the message directed.
VII. PERFORMANCE EVALUATION
For a cross-domain IIoT scenario, the computing power of
smart devices is limited, but the scenario requires a high level
of real-time data. To demonstrate the feasibility of our proposed
scheme, we evaluate the performance in terms of three aspects:
computation overhead, communication overhead, and query
latency.
A. Experimental Settings
1) Comparison Schemes Setting: To demonstrate the effec-
tiveness of our proposed scheme, we compare it with three other
schemes. To make the comparison more fair and convenient,
in all schemes, we set up that all smart devices from different
domains cannot communicate with each other directly and must
communicate with each other through the edge server. Other
corresponding changes are described in detail as follows.
r In Cui et al.’s scheme [28], SDA
i signs the initial message,
ESB re-encrypts the message, and SDB
k authenticates the
received message.
r In Shen et al.’s scheme [19], SDA
i
and SDB
k need to
negotiate an encryption key before message authentication,
and then SDA
i sends the encrypted message to SDB
k . So it
takes three rounds of interaction between SDA
i and SDB
k
to complete a message authentication. During these three
rounds of interactions, the generation of the initial message
and key negotiation is done by smart devices. The message
signing, veriﬁcation, and on-chain querying are all done by
edge servers. Note that the encryption algorithm used in our
experiments is Advanced Encryption Standard (AES).
r In Yang et al.’s scheme [34], SDA
i signs the initial mes-
sage, ESB queries the necessary information from the
blockchain, and SDB
k authenticates the received message.
2) Experimental Environment Settings: To evaluate the per-
formance of the proposed scheme in a real scenario, we use
C++ to implement these schemes. In the experiment, the crypto-
graphic tool library we use is Miracl Core [41]. And we choose
the BLS12381 type curve, which provides 128-bit security level.
In addition, all the common secure hash functions we use in this
experiment ﬁrst convert the input parameters to binary, then hash
them using the SHA256 function and ﬁnally convert them to the
required data type.
In our experiments, we use a PC running Ubuntu 18.04.3
operating system to simulate ES; this PC is equipped with an
Intel Core i5-7500 CPU @3.4 GHz and 16 GB of memory. Since
the computing power of SD is limited, we use a Raspberry Pi 4 to
simulate the SD. This Raspberry Pi 4 runs Debian GNU/Linux
11 operating system and is equipped with a 1.5 GHz CPU and
4 GB of memory.
To facilitate testing the time spent on the corresponding
operations in the blockchain, we deploy a blockchain platform.
This platform uses the hyperledger fabric[42] and is deployed on
nine PCs with the same performance. All nine PCs are running
Ubuntu 18.04.3 operating system and have Intel Core i7-11700
CPU @2.50 GHz and 16 GB of memory. Among these nine
PCs, one PC acts as an orderer node, and each of the other PCs
acts as a BCDA in a certain administrative domain, respectively.
We built different channels using different numbers of BCDAs
to simulate consortium blockchains built by different numbers
of domains. In addition, we use a PC equipped with an Intel
Core i5-7500 CPU @3.4 GHz and 16 GB of memory as the
client node. The on-chain operations we implement using the
Go code.
It is worth noting that we assume that a cross-domain IIoT
service has n receivers and the experimental results we show
are the average of 200 experiments.
B. Computation Overhead
To compare the computational overhead more comprehen-
sively, we ﬁrst perform a theoretical analysis of the computa-
tional overhead and then compare the computational overhead
by analyzing experimental simulation results.
1) Theoretical Analysis: To make the theoretical analysis
more convenient, we deﬁne some notations for some time-
consuming operations as follows. Note that according to the
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:47:57 UTC from IEEE Xplore.  Restrictions apply. 



# Page 14

1600
IEEE TRANSACTIONS ON DEPENDABLE AND SECURE COMPUTING, VOL. 21, NO. 4, JULY/AUGUST 2024
TABLE III
TIME-CONSUMING CRYPTOGRAPHIC OPERATIONS IN THE FOUR SCHEMES
experimental setup, a message has n receivers. In addition, “-” in
Table III indicates no time-consuming cryptographic operations.
r B: a bilinear pairing operation e(g1, g2), where g1 ∈G1,
g2 ∈G2.
r S1: a scalar point multiplication operation a · P1, where
a ∈Z∗
q and P1 ∈G1.
r S2: a scalar point multiplication operation a · P2, where
a ∈Z∗
q and P2 ∈G2.
r E1: an exponential operation P r
1 , where r ∈Z∗
q and P1 ∈
G1.
r E2: an exponential operation P r
3 , where r ∈Z∗
q and P3 ∈
GT .
r H: a hash-to-point operation H(m) ∈G1, where H(·) is
a secure hash function and m ∈{0, 1}∗.
In each scheme, speciﬁc information on the time-consuming
cryptographic operations on each entity is shown in Table III.
When there is no pre-processing in the authentication process,
wecanseethatinscheme[28],mostofthetime-consumingcryp-
tographic operations are performed by SDA
i and SDB
k , and the
time-consuming cryptographic operations performed by SDA
i
and SDB
k are 10E1 + 3E2 + 3B + H and 9E1 + 4E2 + 5B
respectively. In scheme [19], we can see that the time-consuming
cryptographic operations that need to be performed by entities
other than the SDB
k increase with the number of receivers.
In scheme [34], the time-consuming cryptographic operation
performed by the SDA
i increases with the number of receivers,
which is 3nS1. And the time-consuming cryptographic opera-
tion performed by the SDB
k is 3S1. In our proposed scheme,
the time-consuming cryptographic operations performed by the
SDA
i
and SDB
k are ﬁxed, both being 4S1. That is, in our
proposed scheme, the time-consuming cryptographic operations
performed by SDA
i and SDB
k do not vary with the number of
receivers.
Many operations can be pre-processed ofﬂine before the mes-
sage is generated. As shown in Table III, with pre-processing,
the time-consuming operations of the various schemes are effec-
tivelyreduced.Forexample,inscheme[28],thetime-consuming
cryptographic operations performed by SDA
i
and SDB
k are
reduced by 10E1 + 3E2 + 3B + H and (9E1 + 4E2 + 5B) −
(9E1 + 4E2 + 2B) = 3B, respectively. In scheme [19], the
Fig. 4.
Comparison of computation overhead when the number of message
receivers is 1 (WPP: with pre-processing, WOPP: without pre-processing).
time-consuming cryptographic operations to be performed by
SDA
i , ESA, ESB andSDB
k arereducedbynS1, (nE2 + 2nB),
(nE2 + 2nB) and S1 respectively. Similarly, we ﬁnd that in
scheme [34], the time-consuming cryptographic operations to
be performed by SDA
i are reduced by 3nS1. In our proposed
scheme, the time-consuming operations performed by SDA
i are
reduced by 4S1. It is worth noting that the time-consuming oper-
ation required for SDB
k in our proposed scheme is 4S1 −3S1 =
1S1 more than that required for SDB
k in [34], because our
proposed scheme guarantees data conﬁdentiality while [34] does
not, and the 1S1 is required for decryption operation in our
proposed scheme. Data conﬁdentiality is achieved using fewer
cryptographic operations, which we consider to be an effective
trade-off between security and efﬁciency.
2) Simulation Experimental Results: To illustrate that our
proposed scheme is lightweight more concretely, we imple-
ment each scheme with and without pre-processing according
to the experimental setting. When the number of receivers is
1, the experimental results are shown in Table IV and Fig. 4.
Note that all cryptographic operations (e.g., integer addition
and multiplication) are included in the simulation experiments.
Therefore, in Table IV, when schemes support pre-processing,
computational overhead exists for the SDA
i in the scheme [34]
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:47:57 UTC from IEEE Xplore.  Restrictions apply. 



# Page 15

WANG et al.: BLOCKCHAIN-BASED LIGHTWEIGHT MESSAGE AUTHENTICATION FOR EDGE-ASSISTED CROSS-DOMAIN
1601
TABLE IV
SIMULATION EXPERIMENTAL RESULTS OF THE FOUR SCHEMES (MS)
Fig. 5.
Authentication time consumption for different number of message
receivers (with pre-processing).
and our proposed scheme. In addition, Fig. 5 compares the total
time required for authentication in each scheme as the number
of message receivers increases. The “-” in Table IV indicates no
computational overhead.
Combining Table IV and Fig. 4, we can see that when the
number of receivers is 1, the total time cost to complete an au-
thentication process in [28] without pre-processing is 47.746 +
0.278 + 63.971 = 111.995 ms, which is the highest among the
four schemes. The reason is that resource-constrained smart de-
vices perform many time-consuming cryptographic operations.
Similarly, the scheme [19] contains many time-consuming cryp-
tographic operations, and the total time required to complete an
authentication is 2.523 + 10.394 + 10.387 + 2.496 = 25.800
ms. Fig. 4 shows that the total time required to complete an
authentication between [34] and our proposed scheme is very
low, where [34] takes 3.900 + 3.552 = 7.452 ms, which is the
lowest time cost among the four schemes. In our proposed
scheme, the time required is (4.790 + 4.597) −7.452 = 1.935
ms more than that needed by [34], but this gap will be effectively
reduced with pre-processing.
From Table IV, we ﬁnd that the time cost of our
scheme
with
pre-processing
is
saved
about
((4.790 +
4.597) −(0.064 + 4.516))/(4.790 + 4.597) ≈51.2% relative
to
the
case
without
pre-processing.
We
can
see
that
with
pre-processing,
the
time
spent
in
our
proposed
scheme is about (0.064 + 4.516)/(0.029 + 0.277 + 42.654) ≈
10.7% of [28] and (0.064 + 4.516)/(1.266 + 4.664 + 4.660 +
1.263) ≈38.6% of [19]. In addition, with pre-processing,
the time cost of our proposed scheme is (0.064 + 4.516) −
(0.035 + 3.235) = 1.310 ms more than [34]. The reason is that
our proposed scheme achieves data conﬁdentiality and requires
a decryption operation while [34] does not.
In Fig. 5, we can see that the time spent in [19] grows fastest
as the number of message receivers increases. The time spent
in [28] and our proposed scheme does not increase with the
number of message receivers, which is because both schemes
are designed for multi-receiver IIoT scenarios. In addition, we
ﬁnd that the time consumption of [34] and our proposed scheme
have been at a low level. However, when the number of message
receivers exceeds 38, the time to be consumed by [34] will ex-
ceed that of our proposed scheme. Therefore, the computational
overhead of our proposed scheme is better than other related
schemes when the number of receivers exceeds 38.
In summary, our proposed scheme is lightweight and suitable
for multi-receiver cross-domain IIoT.
C. Communication Overhead
According to the experimental setting, to compare the com-
munication overhead of each scheme, we ﬁrst record the inter-
actions between devices throughout the process from signature
generation to signature authentication, then compute the size
of communication packets. In the cryptographic tool library we
use, the occupied space size for elements in Z∗
q is 48 bytes,
and the occupied space size for elements in G1 is 97 bytes. We
set the size of the message is 22 bytes and set the size of the
timestamp is 16 bytes. In addition, we let ISD−ES, IES−ES,
IES−BC denote the interaction between the smart device and
the edge server, the interaction between the edge server and
the edge server, the interaction between the edge server and the
blockchain respectively.
In our proposed scheme, the smart device SDA
i sends data
δ = (c, W, PIDA
i,j, Ti) to ESA, where the size of this data is
(22 + 48 + 97 + 97 + 32 + 16) = 312 bytes. The ESA then
forwards the received data to the ESB, which is 312 bytes.
Once the ESB receives the data, it will send PIDA
i,j of size 32
bytes to BCDAB and then get the PKA
i,j corresponding to the
PIDA
i,j. Finally, the ESB sends data (c, W, PIDA
i,j, Ti, PKA
i,j)
to SDB
k , where the size of this data is (312 + 97) = 409 bytes.
In addition, there are n receivers for an IIoT service. Therefore,
in our proposed scheme, the total communication packet size
is (312 + 312 + 32 + 97) + 409n = 753 + 409n bytes and the
total interaction is (n + 1)ISD−ES+IES−ES+2IES−BC.
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:47:57 UTC from IEEE Xplore.  Restrictions apply. 



# Page 16

1602
IEEE TRANSACTIONS ON DEPENDABLE AND SECURE COMPUTING, VOL. 21, NO. 4, JULY/AUGUST 2024
Fig. 6.
Comparison of total communication packet size when the number of
message receivers is 1.
We compute the communication overhead of other schemes
using the same method. In Cui et al.’s scheme [28],
the total communication packet size is about 1444 + 698n
bytes, and the total interaction is (n + 1)ISD−ES+IES−ES.
In Shen et al.’s scheme [19], the total communication
packet
size
is
about
1318n
bytes,
and
the
total
in-
teraction
is
6nISD−ES+3nIES−ES+4nIES−BC.
In
Yang
et
al.’s
scheme
[34],
the
total
communication
packet
size is about 1816n bytes, and the total interaction is
2nISD−ES+nIES−ES+2nIES−BC. First, we ﬁnd that [28] has
the lowest interactions since the authentication process of this
scheme does not involve the blockchain. Second, we ﬁnd that
the total interactions of [34] and [19] are more than the total
interactions of our proposed scheme because our proposed
scheme leverages service-based ideas and is suitable for the
multi-receiver scenario. In our proposed scheme, completing
an authentication process only needs one signature, and the
edge server only needs to submit one query request to the
blockchain. In contrast, the other two related schemes require
n signatures and more interactions between entities during the
authentication processing (e.g., the edge server needs to submit
n query requests to the blockchain). In addition, the comparison
of the total communication packet size of the four schemes when
the message receiver is 1 is shown in Fig. 6.
From Fig. 6, we can see that our proposed scheme has
the smallest total communication packet size among the four
schemes. Speciﬁcally, the total communication packet size of
our proposed scheme is approximately 980 bytes less than that
of [28], approximately 156 bytes less than that of [19], and
approximately 654 bytes less than that of [34]. In addition, as
the number of message receivers increases, the communication
overhead advantage of our proposed scheme will become more
signiﬁcant. There are three reasons for this situation. The ﬁrst
reason is that the data transferred per interaction between the
entities of our proposed scheme is short, and the second reason
is that the total number of interactions between the entities of
our proposed scheme is low. The last reason is that our proposed
scheme is designed for the multi-receiver cross-domain IIoT
scenario. In summary, our proposed scheme has a low commu-
nication overhead and is suitable for IIoT environments with
high real-time data requirements.
Fig. 7.
Query latency.
D. Query Latency
In the process of message authentication, [28], [34], and
our proposed scheme need to interact with the blockchain,
where these interactions are mainly to perform query operations.
Speciﬁcally, the ES submits a pseudonym to the blockchain;
the blockchain performs the query operation and returns the
information corresponding to that pseudonym. Therefore, we
evaluate the on-chain query latency based on the blockchain
platform settings mentioned in Section VII-A. The results of the
experiment are shown in Fig. 7.
From Fig. 7, we can see that when the number of pseudonyms
in a batch query is constant, the average latency does not
change signiﬁcantly with the number of domains. For example,
regardless of the number of administrative domains, the average
latency is about 0.20 s when the number of pseudonyms for a
batch query is 20. This is because the query operation is mainly
performed in the local ledger. Therefore, the number of domains
does not affect the query latency. In addition, we can see that the
average query latency rises when the number of pseudonyms
in a batch query increases. For example, when the number of
pseudonyms for a batch query is 1, the average latency is about
0.01 s. And when the number of pseudonyms in the batch query
is 160, the average latency is about 0.24 s.
Insight: To meet the IIoT requirements for real-time data, we
should reduce the number of interactions with the blockchain.
By analyzing the communication overhead, we ﬁnd that for
an IIoT service, our proposed scheme queries the blockchain
only once during the authentication process, regardless of the
number of receivers. However, in [28] and [34], the number of
queries to the blockchain increases with the number of receivers.
Therefore, our proposed scheme is applicable to multi-receiver
cross-domain IIoT scenarios.
VIII. CONCLUSION
In this paper, we propose a blockchain-based lightweight
message authentication scheme for multi-receiver cross-domain
IIoT. The main goal of this scheme is to satisfy the security
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:47:57 UTC from IEEE Xplore.  Restrictions apply. 



# Page 17

WANG et al.: BLOCKCHAIN-BASED LIGHTWEIGHT MESSAGE AUTHENTICATION FOR EDGE-ASSISTED CROSS-DOMAIN
1603
and efﬁciency requirements in cross-domain IIoT. Speciﬁcally,
we ﬁrst design a lightweight edge-assisted cross-domain au-
thentication framework using blockchain, and then design a
lightweight message authentication algorithm. Detailed security
proofs and analysis demonstrate that the proposed scheme can
resist various attacks. In addition, a comparison with related
schemes shows that our proposed scheme is lightweight in terms
of computational and communication overheads and suitable for
multi-receiver cross-domain IIoT scenarios. In the future, we
will design secure and efﬁcient message authentication schemes
for mobile smart devices in IIoT.
ACKNOWLEDGMENT
The authors are very grateful to the anonymous referees for
their detailed comments and suggestions regarding this article.
REFERENCES
[1] W. Shi, J. Cao, Q. Zhang, Y. Li, and L. Xu, “Edge computing: Vision and
challenges,” IEEE Internet Things J., vol. 3, no. 5, pp. 637–646, Oct. 2016.
[2] J. Cui, L. Wei, H. Zhong, J. Zhang, Y. Xu, and L. Liu, “Edge computing
in VANETs-An efﬁcient and privacy-preserving cooperative downloading
scheme,” IEEE J. Sel. Areas Commun., vol. 38, no. 6, pp. 1191–1204,
Jun. 2020.
[3] Y. Liao, E. de Freitas Rocha Loures, and F. Deschamps, “Industrial Internet
of Things: A systematic literature review and insights,” IEEE Internet
Things J., vol. 5, no. 6, pp. 4515–4525, Dec. 2018.
[4] M. Serror, S. Hack, M. Henze, M. Schuba, and K. Wehrle, “Challenges and
opportunities in securing the industrial Internet of Things,” IEEE Trans.
Ind. Informat., vol. 17, no. 5, pp. 2985–2996, May 2021.
[5] J.Cui,J.Lu,H.Zhong,Q.Zhang,C.Gu,andL.Liu,“Parallelkey-insulated
multi-user searchable encryption for industrial Internet of Things,” IEEE
Trans. Ind. Informat., vol. 18, no. 7, pp. 4875–4883, Jul. 2022.
[6] W. Sun, J. Liu, and Y. Yue, “AI-enhanced ofﬂoading in edge computing:
When machine learning meets industrial IoT,” IEEE Netw., vol. 33, no. 5,
pp. 68–74, Sep./Oct. 2019.
[7] T. Qiu, J. Chi, X. Zhou, Z. Ning, M. Atiquzzaman, and D. O. Wu, “Edge
computing in industrial Internet of Things: Architecture, advances and
challenges,” IEEE Commun. Surv. Tuts., vol. 22, no. 4, pp. 2462–2488,
Fourth Quarter 2020.
[8] H. Zhang, X. Chen, X. Lan, H. Jin, and Q. Cao, “BTCAS: A blockchain-
based thoroughly cross-domain authentication scheme,” J. Inf. Secur.
Appl., vol. 55, 2020, Art. no. 102538. [Online]. Available: https://www.
sciencedirect.com/science/article/pii/S221421261931004X
[9] K. I.-K. Wang, X. Zhou, W. Liang, Z. Yan, and J. She, “Federated transfer
learning based cross-domain prediction for smart manufacturing,” IEEE
Trans. Ind. Informat., vol. 18, no. 6, pp. 4088–4096, Jun. 2022.
[10] J. M. Mcginthy and A. J. Michaels, “Secure industrial Internet of Things
critical infrastructure node design,” IEEE Internet Things J., vol. 6, no. 5,
pp. 8021–8037, Oct. 2019.
[11] G. Li, J. Wu, J. Li, K. Wang, and T. Ye, “Service popularity-based smart
resources partitioning for fog computing-enabled industrial Internet of
Things,” IEEE Trans. Ind. Informat., vol. 14, no. 10, pp. 4702–4711,
Oct. 2018.
[12] H. Xiong, Q. Mei, and Y. Zhao, “Efﬁcient and provably secure certiﬁ-
cateless parallel key-insulated signature without pairing for IIoT environ-
ments,” IEEE Syst. J., vol. 14, no. 1, pp. 310–320, Mar. 2020.
[13] A.-R. Sadeghi, C. Wachsmann, and M. Waidner, “Security and privacy
challenges in industrial Internet of Things,” in Proc. ACM/EDAC/IEEE
52nd Des. Automat. Conf., 2015, pp. 1–6.
[14] B. Cao et al., “When Internet of Things meets blockchain: Challenges
in distributed consensus,” IEEE Netw., vol. 33, no. 6, pp. 133–139,
Nov./Dec. 2019.
[15] T. Meng, Y. Zhao, K. Wolter, and C.-Z. Xu, “On consortium blockchain
consistency: A queueing network model approach,” IEEE Trans. Parallel
Distrib. Syst., vol. 32, no. 6, pp. 1369–1382, Jun. 2021.
[16] J. Cui, F. Ouyang, Z. Ying, L. Wei, and H. Zhong, “Secure and efﬁcient data
sharing among vehicles based on consortium blockchain,” IEEE Trans.
Intell. Transp. Syst., vol. 23, no. 7, pp. 8857–8867, Jul. 2022.
[17] L. Xue, H. Huang, F. Xiao, and W. Wang, “A cross-domain authentication
scheme based on cooperative blockchains functioning with revocation for
medical consortiums,” IEEE Trans. Netw. Service Manag., vol. 19, no. 3,
pp. 2409–2420, Sep. 2022.
[18] X. Jiang, F. R. Yu, T. Song, Z. Ma, Y. Song, and D. Zhu, “Blockchain-
enabled cross-domain object detection for autonomous driving: A model
sharing approach,” IEEE Internet Things J., vol. 7, no. 5, pp. 3681–3692,
May 2020.
[19] M. Shen et al., “Blockchain-assisted secure device authentication for
cross-domain industrial IoT,” IEEE J. Sel. Areas Commun., vol. 38, no. 5,
pp. 942–954, May 2020.
[20] S. Viswanathan, R. Tan, and D. K. Y. Yau, “Exploiting power grid for
accurate and secure clock synchronization in industrial IoT,” in Proc. IEEE
Real-Time Syst. Symp., 2016, pp. 146–156.
[21] E. Sisinni, A. Saifullah, S. Han, U. Jennehag, and M. Gidlund, “Industrial
Internet of Things: Challenges, opportunities, and directions,” IEEE Trans.
Ind. Informat., vol. 14, no. 11, pp. 4724–4734, Nov. 2018.
[22] X.
Zhang,
C.
Xu,
H.
Wang,
Y.
Zhang,
and
S.
Wang,
“FS-
PEKS: Lattice-based forward secure public-key encryption with key-
word search for cloud-assisted industrial Internet of Things,” IEEE
Trans. Dependable Secure Comput., vol. 18, no. 3, pp. 1019–1032,
May/Jun. 2021.
[23] F. Tong, X. Chen, K. Wang, and Y. Zhang, “CCAP: A com-
plete cross-domain authentication based on blockchain for Internet of
Things,” IEEE Trans. Inf. Forensics Secur., vol. 17, pp. 3789–3800,
2022.
[24] Q. Zhang, J. Wu, H. Zhong, D. He, and J. Cui, “Efﬁcient anony-
mous authentication based on physically unclonable function in indus-
trial Internet of Things,” IEEE Trans. Inf. Forensics Secur., vol. 18,
pp. 233–247, 2023.
[25] A. Esfahani et al., “A lightweight authentication mechanism for M2M
communications in industrial IoT environment,” IEEE Internet Things J.,
vol. 6, no. 1, pp. 288–296, Feb. 2019.
[26] G. K. Verma, B. Singh, N. Kumar, M. S. Obaidat, D. He, and H. Singh, “An
efﬁcient and provable certiﬁcate-based proxy signature scheme for IIoT
environment,” Inf. Sci., vol. 518, pp. 142–156, 2020. [Online]. Available:
https://www.sciencedirect.com/science/article/pii/S0020025520300074
[27] C. Esposito, A. Castiglione, F. Palmieri, and A. D. Santis, “Integrity for an
event notiﬁcation within the industrial Internet of Things by using group
signatures,” IEEE Trans. Ind. Informat., vol. 14, no. 8, pp. 3669–3678,
Aug. 2018.
[28] J. Cui, F. Wang, Q. Zhang, Y. Xu, and H. Zhong, “Anonymous message
authentication scheme for semitrusted edge-enabled IIoT,” IEEE Trans.
Ind. Electron., vol. 68, no. 12, pp. 12921–12929, Dec. 2021.
[29] J. Guan, Y. Wu, S. Yao, T. Zhang, X. Su, and C. Li, “BSLA: Blockchain-
assisted secure and lightweight authentication for SGIN,” Comput.
Commun., vol. 176, pp. 46–55, 2021. [Online]. Available: https://www.
sciencedirect.com/science/article/pii/S0140366421001997
[30] J. Wang, L. Wu, K.-K. R. Choo, and D. He, “Blockchain-based anony-
mous authentication with key management for smart grid edge computing
infrastructure,” IEEE Trans. Ind. Informat., vol. 16, no. 3, pp. 1984–1992,
Mar. 2020.
[31] S. Guo, F. Wang, N. Zhang, F. Qi, and X. Qiu, “Master-slave chain based
trusted cross-domain authentication mechanism in IoT,” J. Netw. Comput.
Appl., vol. 172, 2020, Art. no. 102812. [Online]. Available: https://www.
sciencedirect.com/science/article/pii/S1084804520302836
[32] C. Feng, B. Liu, Z. Guo, K. Yu, Z. Qin, and K.-K. R. Choo, “Blockchain-
based cross-domain authentication for intelligent 5G-enabled Internet
of Drones,” IEEE Internet Things J., vol. 9, no. 8, pp. 6224–6238,
Apr. 2022.
[33] L. Wang, Y. Tian, and D. Zhang, “Toward cross-domain dynamic accu-
mulator authentication based on blockchain in Internet of Things,” IEEE
Trans. Ind. Informat., vol. 18, no. 4, pp. 2858–2867, Apr. 2022.
[34] Y. Yang, L. Wei, J. Wu, C. Long, and B. Li, “A blockchain-based
multi-domain authentication scheme for conditional privacy preserving
in vehicular ad-hoc network,” IEEE Internet Things J., vol. 9, no. 11,
pp. 8078–8090, Jun. 2022.
[35] H. Xiong, Y. Wu, C. Su, and K. H. Yeh, “A secure and efﬁcient cer-
tiﬁcateless batch veriﬁcation scheme with invalid signature identiﬁca-
tion for the Internet of Things,” J. Inf. Secur. Appl., vol. 53, 2020,
Art. no. 102507. [Online]. Available: https://www.sciencedirect.com/
science/article/pii/S2214212619307999
[36] Y. Yu, Y. Li, J. Tian, and J. Liu, “Blockchain-based solutions to security
and privacy issues in the Internet of Things,” IEEE Wireless Commun.,
vol. 25, no. 6, pp. 12–18, Dec. 2018.
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:47:57 UTC from IEEE Xplore.  Restrictions apply. 



# Page 18

1604
IEEE TRANSACTIONS ON DEPENDABLE AND SECURE COMPUTING, VOL. 21, NO. 4, JULY/AUGUST 2024
[37] B. Oki, M. Pﬂuegl, A. Siegel, and D. Skeen, “The information bus: An
architecture for extensible distributed systems,” SIGOPS Oper. Syst. Rev.,
vol. 27, no. 5, pp. 58–68, Dec. 1993. [Online]. Available: https://doi.org/
10.1145/173668.168624
[38] S. Qian, W. Mao, J. Cao, F. L. Mouël, and M. Li, “Adjusting matching algo-
rithm to adapt to workload ﬂuctuations in content-based publish/subscribe
systems,” in Proc. IEEE Conf. Comput. Commun., 2019, pp. 1936–1944.
[39] W. Zhang et al., “Optimizing federated learning in distributed industrial
IoT: A multi-agent approach,” IEEE J. Sel. Areas Commun., vol. 39, no. 12,
pp. 3688–3703, Dec. 2021.
[40] J. Lohmer and R. Lasch, “Production planning and scheduling in multi-
factory production networks: A systematic literature review,” Int. J. Prod.
Res., vol. 59, no. 7, pp. 2028–2054, 2021. [Online]. Available: https://doi.
org/10.1080/00207543.2020.1797207
[41] Miracl core, 2020. [Online]. Available: https://github.com/miracl/core
[42] Hyperledger, 2020. [Online]. Available: https://github.com/hyperledger/
fabric
Fengqun Wang is currently working toward the PhD
degree with the School of Computer Science and
Technology, Anhui University, Hefei, China. His re-
search interests include IoT security, blockchain, and
applied cryptography.
Jie Cui (Senior Member, IEEE) received the PhD de-
gree from the University of Science and Technology
of China, in 2012. He is currently a professor and
PhD supervisor with the School of Computer Sci-
ence and Technology, Anhui University. His current
research interests include applied cryptography, IoT
security, vehicular ad hoc network, cloud computing
security, and software-deﬁned networking (SDN). He
has more than 150 scientiﬁc publications in reputable
journals (e.g., the IEEE Transactions on Dependable
and Secure Computing, IEEE Transactions on Infor-
mation Forensics and Security, IEEE Journal on Selected Areas in Commu-
nications, IEEE Transactions on Mobile Computing, IEEE Transactions on
Parallel and Distributed Systems, IEEE Transactions on Computers, IEEE
Transactions on Vehicular Technology, IEEE Transactions on Intelligent Trans-
portation Systems, IEEE Transactions on Network and Service Management,
IEEE Transactions on Industrial Informatics, IEEE Transactions on Industrial
Electronics, IEEE Transactions on Cloud Computing and IEEE Transactions on
Multimedia), academic books and international conferences.
Qingyang Zhang received the BEng and PhD de-
grees in computer science from Anhui University, in
2021. He is currently a lecture with the School of
Computer Science and Technology, Anhui Univer-
sity. His research interests include edge computing,
computer systems, and security.
Debiao He received the PhD degree in applied math-
ematics from the School of Mathematics and Statis-
tics, Wuhan University, Wuhan, China, in 2009. He
is currently a professor with the School of Cyber
Science and Engineering, Wuhan University, Wuhan,
China. His main research interests include cryptog-
raphy and information security, in particular, crypto-
graphic protocols. He has published more than 100
research papers in refereed international journals and
conferences, such as the IEEE Transactions on De-
pendable and Secure Computing, IEEE Transactions
on Information Security and Forensic, and Usenix Security Symposium. He
is the recipient of the 2018 IEEE Sysems Journal Best Paper Award and the
2019 IET Information Security Best Paper Award. His work has been cited
more than 10,000 times with Google Scholar. He is in the Editorial Board of
several international journals, such as the Journal of Information Security and
Applications, Frontiers of Computer Science, and Human-centric Computing &
Information Sciences.
Chengjie Gu received the PhD degree from the Nan-
jing University of Posts and Telecommunications, in
2012. From 2012 to 2017, he was an innovation team
leader with the 38th Research Institute of CETC and
conducted research and development in the commu-
nication and networking sector. Currently, he is a
president of Security Research Institute, New H3C
Group. He is also studying for postdoctoral fellow-
ship with the USTC. He is a high-level innovation
leader of Anhui province and a cybersecurity expert
of Zhejiang province in China. His research interests
include network security and trusted network architecture, etc.
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
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:47:57 UTC from IEEE Xplore.  Restrictions apply. 
