

# Page 1

15200
IEEE TRANSACTIONS ON VEHICULAR TECHNOLOGY, VOL. 72, NO. 12, DECEMBER 2023
Provable Secure and Lightweight Blockchain-Based
V2I Handover Authentication and V2V
Broadcast Protocol for VANETs
Qi Xie
, Zixuan Ding
, Wen Tang, Debiao He
, Member, IEEE, and Xiao Tan
Abstract—As one of the most valuable vehicle-based Internet of
Things (IoT) applications, Vehicular Ad-hoc Networks (VANETs)
have received extensive attention since it was proposed. In order
to ensure the safety of VANETs and improve the communication
efﬁciency between moving vehicles and different Roadside Units
(RSUs), some handover authentication protocols for VANETs have
been proposed. However, the existing protocols have some problems
such as excessive computation overhead, untraceable malicious
messages, and the inability to resist RSU captured attacks. To solve
the above problems, we propose a blockchain-based protocol to
achieve Vehicle to Infrastructure (V2I) authentication, V2I han-
dover authentication, and Vehicle to Vehicle (V2V) broadcasting
authentication. The advantages of our protocol are: (1) It achieves
lightweight V2I handover authentication and V2V broadcast au-
thentication, dynamic anonymity strategy and embedding strat-
egy of pseudo-identity and vehicle feature are used to guarantee
anonymity and traceability simultaneously; (2) The announcement
can be broadcasted veriﬁably without the help of transportation
infrastructure (e.g., RSU) or the Trusted Authority (TA); and (3)
The Physically Unclonable Functions (PUF) technology is used to
resist RSU captured attacks. We use formal security proof under
random oracle model to prove the security of the proposed protocol.
Compared with related V2I handover authentication protocols, our
protocol can resist RSU captured attacks and other various known
attacks. The sum of ﬁrst and handover authentication efﬁciency
of our protocol is 37.93% higher than the previous most effective
protocol, while maintaining the same level of communication and
storage costs.
Index Terms—Handover authentication, VANETs, blockchain,
broadcast authentication, vehicle to infrastructure, vehicle to
vehicle.
I. INTRODUCTION
V
ANETS are the application of IoT technology in the
ﬁeld of transportation, which is based on On-Board Unit
Manuscript received 20 September 2022; revised 26 February 2023; accepted
20 June 2023. Date of publication 26 June 2023; date of current version 19
December2023.ThisworkwassupportedinpartbytheNationalNaturalScience
Foundation of China under Grant U21A20466 and in part by the New 20 Project
of Higher Education of Jinan under Grant 202228017. The review of this article
was coordinated by Dr. Mario Marchese. (Corresponding author: Qi Xie.)
Qi Xie, Zixuan Ding, Wen Tang, and Xiao Tan are with the Key Laboratory of
Cryptography of Zhejiang Province, Hangzhou Normal University, Hangzhou
311121, China (e-mail: qixie68@126.com; dingzixuan8899@163.com; tang-
wen1012@163.com; xiaotan_cs@163.com).
Debiao He is with the School of Cyber Science and Engineering, Wuhan
University, Wuhan 430072, China, and also with the Shandong Provincial Key
Laboratory of Computer Networks, Qilu University of Technology, Shandong
Academy of Sciences, Jinan 250014, China (e-mail: hedebiao@163.com).
Digital Object Identiﬁer 10.1109/TVT.2023.3289175
(OBU) and wireless communication technology to realize the
communication between vehicles and other vehicles or entities.
Therefore, VANETs can be divided into V2V, V2I, Vehicle to
Network (V2N), and Vehicle to Cloud (V2C) according to the
speciﬁc application scenarios. Based on VANETs, vehicles can
upload road conditions to Roadside Units (RSUs) and network
in real-time, or broadcast to other vehicles. The vehicle and
other entities exchange and share vehicle status information
including vehicle location, driving speed, etc., which can be
used to help vehicles dynamically judge the road trafﬁc ﬂow,
improve the intelligent driving of vehicles, provide users with
safe, comfortable, intelligent, and efﬁcient driving and trafﬁc
services, and ameliorate the trafﬁc operation efﬁciency.
However, almost all communications between vehicles and
RSUs are conducted through public channels [1], [2], [3], [4],
[5], [6], [7], [8], [9], [10], [11], [12], [13], [14], [15], [16],
[17], [18], [19], [20], [21], [22], [23], [24], which provide an
opportunity for attackers. For example, an attacker can intercept
and modify the transmitted messages, launch forgery attacks
and obtain the user’s privacy, etc. Vehicles can also release
malicious messages to interfere with normal driving. Therefore,
it is necessary to design a secure and effective authentication
protocol for VANETs to solve the above problems.
In the traditional V2I authentication mode, vehicles needed
to be re-authenticated after entering a new RSU domain, but the
vehicle cannot be authenticated in the absence of infrastructure.
How to achieve reliable V2I handover authentication and V2V
authentication without the participation of trusted infrastructure
is also an urgent problem to be solved. As an emerging tech-
nology, blockchain has the advantages of non-tampering, de-
centralization, transparency, and self-maintenance. Researchers
introduced blockchain as a storage medium into VANETs to
assist authentication and achieve efﬁcient V2I handover au-
thentication [13], [14], [15], [16], [19]. However, uploading
information on the blockchain for authentication may lead to
user’s privacy disclosure and impersonation attack. In addition,
the V2I handover authentication in the above protocols may
be insecure or require exorbitant computation overhead [13],
[16]. On the other hand, in some authentication protocols for the
VANETs [19], [20], [21], [22], [23], [24], the malicious behavior
of legally registered users is difﬁcult to prevent, and the dynamic
anonymity strategy increases the difﬁculty of recovering real
identity.
0018-9545 © 2023 IEEE. Personal use is permitted, but republication/redistribution requires IEEE permission.
See https://www.ieee.org/publications/rights/index.html for more information.
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:51:03 UTC from IEEE Xplore.  Restrictions apply. 



# Page 2

XIE et al.: PROVABLE SECURE AND LIGHTWEIGHT BLOCKCHAIN-BASED V2I HANDOVER AUTHENTICATION
15201
A. Motivations and Contributions
By analyzing the existing protocols, almost all existing proto-
cols cannot resist the impersonation attacks, forgery attacks, and
privacy disclosure due to the RSU captured attack and OBU in-
trusion attack. From the perspective of practical application, the
existing protocols can only be used in scenarios with or without
transport infrastructure, but not both. In terms of authentication
function and computational efﬁciency, the existing protocols
rely on trusted third parties to achieve authentication and do not
design efﬁcient handover authentication policies. As we know,
vehicles always run in scenarios with different RSU domains or
without trafﬁc infrastructure, how to design a protocol that can
be applied to the above scenarios, and achieve secure and fast
handover authentication, or authentication without the partici-
pation of trusted infrastructure, and track malicious behaviors
under the premise of protecting user privacy and anonymity are
urgent problems to be solved.
To address the above problems, we propose a blockchain-
based authentication protocol for VANETs. The contributions
of this article are as follows:
1) To realize the application of more scenarios, we propose
a novel protocol to achieve V2I authentication, V2I han-
dover authentication, and V2V broadcasting authentica-
tion, which can be used in scenarios with different RSU
domains or without transport infrastructure.
2) To achieve security, we use PUF to avoid RSU captured
attacks, use bioinformation to avoid OBU intrusion at-
tacks, and use the dynamic anonymity strategy to avoid
attackers’ tracking attacks. We also design an embedding
strategy of pseudo-identity and vehicle feature to recover
the real identity of the malicious message sender. The
proposed protocol is provable secure under the random
oracle model.
3) To achieve secure and efﬁcient authentication, we skill-
fully use ECC and blockchain technology to make the
communication and computation efﬁciencies superior to
other protocols.
In the next section, we introduce the related work. The models
andgoalsofthisarticlearepresentedinSectionIII.Preliminaries
are introduced in Section IV, and the proposed scheme is given
in Section V. In Sections VI and VII, we present formal security
proof under the random oracle model and informal security anal-
ysis to prove the security of the proposed scheme, respectively.
The proposed scheme is compared with some related schemes
in terms of security, computation, communication and storage
in Section VIII. Section IX concludes this article.
II. RELATED WORK
In 2010, Liu et al. [1] proposed a message authentication
protocol for VANETs. Because the private vehicles and public
vehicles use group signature and identity-based signature to
authenticate their identities, their scheme requires high com-
putational costs and cannot guarantee the user’s privacy. Sim-
ilarly, Xue and Ding [2] proposed a group signature based
vehicle authentication protocol. Because of the use of ﬁxed
pseudo-identity and bilinear pairings based signatures, their
scheme cannot obtain the untraceability and high computational
efﬁciency. In 2016, Liu et al. [3] proposed an anonymous au-
thentication protocol based on bilinear pairings and asymmetric
encryption. Although the protocol realizes batch authentica-
tion, the high computational overhead is still an unavoidable
problem. Wang and Yao [4] proposed an anonymous message
authentication protocol based on local identity. The protocol
uses Certiﬁcate Revocation List (CRL) to resolve the revocation
of the vehicles and RSUs. Entities need to ensure that the
other party is legal in the CRL before authentication. Similarly,
because the protocol uses asymmetric signatures and bilinear
pairs, the computational cost is very high. In order to deal with
the communication overhead, storage overhead, computational
overhead, and potential privacy disclosure brought by CRL,
Jiang et al. [5] proposed an anonymous batch authentication
scheme using the identity-based signature and the Hash Mes-
sage Authentication Code (HMAC), In addition, the protocol
uses RSUs to manage vehicles locally in the way of grouping
by region, but asymmetric encryption and bilinear pair also
bring considerable computational overhead. Zhang et al. [6]
proposed a bilinear pairing-based authentication protocol com-
bining batch group signature veriﬁcation and group session key
distribution for VANETs, which resists impersonation attacks by
using tracking key implementation. Compared with the previous
protocols, the efﬁciency of this protocol is not much improved.
In 2019, Li et al. [7] proposed a hierarchical revocable au-
thentication scheme based on the self-certiﬁed public keys and
Elliptic Curve Cryptography (ECC)-based Schnorr signatures.
Comparedwiththeaboveschemes,theefﬁciencyofthisprotocol
has been greatly improved, but there is still the problem of
location leakage caused by ﬁxed pseudo-identity. Zhang et al. [8]
constructed a group communication authentication protocol for
VANETs using the Chinese Remainder Theorem (CRT). How-
ever, Xiong et al. [9] found out that Zhang et al.’s scheme is vul-
nerable to impersonation attack. The disadvantage of CRT is that
the public parameters need to be updated when the members are
added and removed, which may suffer from desynchronization
attack. In 2021, Wang et al. [10] proposed a lightweight authen-
tication protocol for an emergency vehicle. In their scheme, after
thevehicleisauthenticatedbytheﬁrstRSU,thevehiclecancom-
plete the mutual authentication with the subsequent RSU. The
handover authentication is realized by the continuous forward-
ing of messages between RSUs, in which the ﬁxed parameters
of vehicles will lead to tracking attacks. Meanwhile, RSU has
certain privileges, the protocol cannot resist privileged-insider
attack and RSU captured attack. Wang and Liu [11] proposed a
message authentication protocol for VANETs, which combines
pseudonym and group signature to realize mutual authentication
between vehicles and RSU. This protocol uses CRL and asym-
metric signature to achieve V2I authentication, which cannot
avoid the problems mentioned above. Xie et al. [12] proposed
a lightweight V2V broadcast authentication and key agreement
protocol without relying on a third party, which is based on ECC
and the pseudo-identity to protect privacy and unlinkability. The
advantage of this protocol is that it can perform V2V authen-
tication and message broadcast in the scenario without trafﬁc
infrastructure.
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:51:03 UTC from IEEE Xplore.  Restrictions apply. 



# Page 3

15202
IEEE TRANSACTIONS ON VEHICULAR TECHNOLOGY, VOL. 72, NO. 12, DECEMBER 2023
Fig. 1.
The model of V2I authentication and announcement.
The above signature strategies based on asymmetric encryp-
tion have high computing and communication overhead, group
communication and group signature also have great limitations
in practical applications. In addition, RSUs are independent
entities deployed on the roadside which stored secret values [10],
[13], [14], [15], [16], once the RSU is captured, attackers can
obtain the information stored in RSU, and launch impersonation
attack, forgery attack, and obtain user’s identity.
As a new technology with many advantages, blockchain has
also been applied to VANETs and V2I handover authentication.
In 2019, Zheng et al. [13] proposed an access authentication
system for VANETs. Blockchain is regarded as a public dis-
tributed ledger to realize authentication and accident recording.
Zheng et al.’s protocol eliminates the computational and time
overhead caused by repeated authentication. However, vehicles
still need to use asymmetric encryption-based signatures to
authenticate, and an attacker can impersonate any vehicle to
publish forged information by capturing RSU. The scheme is
not secure enough and still has a high computation overhead. In
2020, Ma et al. [14] proposed a decentralized key management
mechanism for VANETs, which realizes registration, update,
and revocation of vehicles’ public keys based on the smart con-
tract. In addition, they presented a bivariate polynomial-based
authentication protocol. However, the RSU handover authenti-
cation is not considered and designed, so the vehicle needs to be
re-authenticated when entering a new RSU domain. Wang et al.
[15] proposed a V2I authentication scheme using blockchain to
realize trusted and scalable computing. Their scheme realizes
rapid re-authentication of vehicles through ownership transfer
between RSUs. Nonetheless, the use of bilinear pairs makes the
scheme maintain a high time overhead. In 2022, Son et al. [16]
proposed a scheme of handover authentication for VANETs to
avoid unnecessary duplicate authentication. During the ﬁrst V2I
authentication, the vehicle and RSU agree on the session key
based on Elliptic Curve Discrete Logarithm Problem (ECDLP),
and RSU uploads the vehicle authentication information and sig-
nature to the blockchain. Nevertheless, we found that in the sub-
sequent blockchain-based handover authentication, vehicles and
other RSUs still need time-consuming authentication processes,
and their scheme cannot resist RSU captured attacks. Qureshi
et al. [17] proposed a blockchain-based authentication model
for intelligent transportation systems. The model uses smart
Fig. 2.
The model of V2V broadcast.
contracts and RSU to authenticate the vehicles. The scheme
realizes decentralized data storage based on the blockchain
network. Yang et al. [18] proposed a decentralized handover
authentication protocol for VANETs based on the bilinear pair-
ing and ECC. After the ﬁrst authentication with the edge node,
the vehicle will receive an authentication token based on the
identity signature, and the handover authentication is based on
the token. Mei et al. proposed a blockchain-based authentication
scheme for the transportation cyber-physical system [19].
However, it can be seen from the above protocols [13], [14],
[15], [16], [18] that the introduction of blockchain has not solved
RSU captured attack, privacy disclosure, and high computation
overhead.
III. MODELS AND GOALS
A. System Model
The proposed scheme consists of vehicles (OBU), RSUs, TA,
and the blockchain. TA is ofﬁcially trusted and used for the
registration of vehicles and RSUs. In addition, TA can track
the real identity of the malicious message. Fig. 1 shows the
scene of ﬁrst authentication, handover authentication, and V2I
announcement during driving. When the vehicle enters the road
area composed of legal RSUs for the ﬁrst time, the vehicle selects
an RSU to conduct the ﬁrst mutual authentication, then the RSU
uploads the authentication information to the blockchain. When
a vehicle issues an announcement, it sends a request to an RSU
nearby. The RSU ﬁrst performs handover authentication for the
vehicle with the help of the blockchain. After the authentication
is passed, the RSU broadcasts the announcement of the vehicle
and uploads it to the blockchain. RSU can be regarded as an
ofﬁcial terminal device providing professional, extensive, and
guaranteed services for vehicles.
Considering that the deployment of RSU is not fully covered
in the actual application scenario. If an emergency occurs in the
road section without RSU, the vehicle safety may be threatened
due to time delay. Therefore, in addition to the V2I authenti-
cation and announcement protocol, the proposed protocol can
also realize V2V broadcasting authentication without RSU or
TA. The broadcast protocol model is shown in Fig. 2. When the
vehicle encounters a situation, it broadcasts a message to the
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:51:03 UTC from IEEE Xplore.  Restrictions apply. 



# Page 4

XIE et al.: PROVABLE SECURE AND LIGHTWEIGHT BLOCKCHAIN-BASED V2I HANDOVER AUTHENTICATION
15203
surrounding vehicles. After receiving the broadcast message,
other vehicles ﬁrst verify the legitimacy of the sender’s identity
and the integrity of the broadcast content. If the veriﬁcation
passes, other vehicles trust the broadcast message and take
further actions.
B. Adversary Model
Combined with Dolev-Yao (DY) model [25] and the actual ap-
plication scenario of VANETs, the attacker model for VANETs
is shown as below.
1) The adversary A could be a legitimately registered vehicle
(user) or internal attacker, which means that the attacker
may launch the impersonation attacks or send malicious
messages.
2) A can eavesdrop, modify, intercept, and replay the mes-
sages transmitted publicly.
3) A can launch the side-channel attacks on OBU and RSU to
obtain stored data, but it is difﬁcult for attackers to obtain
biological keys and crack PUF.
4) The content of the blockchain is public to attackers, but at-
tackers cannot tamper with the content on the blockchain.
C. Design Goals
1) The proposed protocol can realize V2I authentication, V2I
handover authentication, and V2V broadcasting authenti-
cation, which can be used in scenarios with different RSU
domains or without transport infrastructure.
2) The proposed protocol is provably secure, which can resist
all known attacks, such as RSU captured attacks, OBU in-
trusionattacks,andcanachieveseveralknownadvantages,
such as perfect forward secrecy, identity traceability, etc.
3) The proposed protocol is lightweight, the communication
and computation costs are more efﬁcient than other pro-
tocols.
IV. PRELIMINARIES
In this section, we introduce the technologies used in the
proposed scheme.
A. Blockchain
As an emerging technology, blockchain has received great
attention and has been widely applicated since it was proposed
[26]. The blockchain is essentially a distributed shared ledger
and database, which has the characteristics of decentralization,
non-tampering, openness and transparency, and traceability of
records. Therefore, it is widely used in ﬁnance, insurance, med-
ical care, VANETs, and other ﬁelds. According to the openness
of blockchain, it can be divided into public blockchains, alliance
blockchains, and private blockchains. The public blockchain
has the highest degree of openness and decentralization, and
its complex consensus mechanism also has an extremely high
overhead. The alliance blockchain is only used by consortium
members, so they are less open than the public blockchain.
The private blockchain is for internal use only. In terms of
computational overhead, the alliance blockchain and the private
blockchain are usually much lower than the public blockchain
[27].
Structurally, a blockchain can be viewed as a chain of multiple
blocks, each of which consists of a block header and a block.
Usually, the header information of the block mainly includes
the version number, the hash value of the previous block, the
timestamp, the Merkle tree, and the nonce. Due to the avalanche
effect of the hash value, the content written to the blockchain
will be difﬁcult to be tampered with.
We use the transparency of the blockchain to ensure the
public veriﬁability of the vehicle identity between RSUs, so the
vehicle can be quickly handover authenticated in subsequent
RSU after the initial authentication. The tamper-proof feature
of blockchain can resist message tampering and identity imper-
sonation attacks. Compared with database sharing and public
transmission, the decentralization of blockchain will not be
affected by single point of failure. In addition, in order to prevent
tracking attacks on content on the blockchain, we use dynamic
anonymity and encryption strategies to protect vehicle privacy.
B. Physically Unclonable Function
PUF is a hardware security technology that exploits inher-
ent device variation to produce an unclonable unique device
response to a given input [28]. PUF can be thought of as similar
to human biometrics, they are an inherent and unique identiﬁer
for each piece of silicon. Due to imperfect silicon processing
technology, each Integrated Circuit (IC) produced is physi-
cally different. These process variations manifest themselves
in different path delays, transistor threshold voltages, voltage
gains, and countless other ways between different integrated
circuits. PUF exploits this inherent difference in IC behavior to
generate a unique encryption key for each IC. Unlike traditional
encryption methods that use a single stored key, PUF works by
implementing challenge-response authentication. For a given
PUF, a speciﬁc input called a “challenge”, will produce an
output called a “response”, that is unique to the speciﬁc PUF
and therefore unclonable. Attempting to detect a PUF greatly
affects its response to a challenge, so even if the hardware device
is acquired by an attacker, the PUF-protected information in the
device will not be leaked [29].
The security of the existing protocols is destroyed due to RSU
captured attacks, the deployment of PUF in RSU can effectively
solve this problem. The reason is that the special circuit design
of PUF may change the output value of PUF when an adversary
analyze and uses data in RSU even if the RSU is captured, which
ensures that the information encrypted by PUF will not be used
by the adversary.
PUF is a fast hardware operation based on the circuit, the
operating frequency level of PUF is MHz, and the time cost of
a single operation is generally less than 1 nanosecond (ns). In
contrast, the time cost of hash operation is at the millisecond
(ms) level, so the time cost of PUF can generally be ignored. In
addition, PUF is only calculated in the RSU and will not generate
additional communication overhead.
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:51:03 UTC from IEEE Xplore.  Restrictions apply. 



# Page 5

15204
IEEE TRANSACTIONS ON VEHICULAR TECHNOLOGY, VOL. 72, NO. 12, DECEMBER 2023
TABLE I
NOTATIONS
V. PROPOSED SCHEME
In this section, we introduce the proposed blockchain-based
lightweight handover authentication and secure broadcasting
protocol for VANETs. The protocol consists of initialization
phase, registration phase, ﬁrst authentication phase, V2I han-
dover authentication and announcement phase, V2V message
broadcast phase, and pseudo-identity of vehicle updates phase.
The notations used in the protocol are listed in Table I.
A. Initialization Phase
The trusted-authority TA selects an elliptic curve E(GFq),
where GF(q) and q are the ﬁnite ﬁeld and a large prime num-
ber, respectively. Then, TA selects a secret parameter KRSU,
and publishes the generator point P of the elliptic curve. TA
generates its secret key SKT A, computes and publishes PKT A,
where PKT A = SKT A · P.
B. Registration Phase
The registration phases include vehicle registration and RSU
registration. The registration phases are shown in Figs. 3 and 4,
respectively.
1) Vehicle Registration Phase:
Step VR1: The vehicle (with driver) generates a secret number
SKV i, and computes PKV i = SKV i · P. Then, it sends the
identity of the vehicle (e.g., engine number) V IDi, the appear-
ance information V aIi, and PKV i to the trusted authority TA.
Step VR2: After receiving the message, TA ﬁrst checks the
legitimacy and uniqueness of V IDi. If not, TA rejects the
registration requestion. Else, it generates random numbers ri
and ai, and computes
Ai = ai · P,
PIDi = Eh(SKT A) (V IDi, V aIi, ri) ,
and bi = h (PIDi ∥PKV i ∥Ai) ∗SKT A + ai.
Fig. 3.
Vehicle registration phase.
Fig. 4.
RSU registration phase.
Then, TA sends the message {PIDi, Ai, bi, PKT A, ri} to the
vehicle through the secure channel.
Step VR3: On receiving the message {PIDi, Ai, bi, PKT A,
ri}, the vehicle ﬁrst veriﬁes ifbi · P = h(PIDi ∥PKV i ∥
Ai) ∗PKT A + Ai, if not, aborts it. Else, the owner inputs the
biological information Bioi, and computes
(σi, τi) = Gen (Bioi) ,
Vi = h (σi ∥V aIi) ,
Si1 = bi ⊕h (σi ∥Vi) ,
Si2 = SKV i ⊕h (Vi ∥σi) ,
and Si3 = ri ⊕h (V IDi ∥σi) .
{P, Vi, Si1, Si2, Si3, Ai, PKV i, PKT A, PIDi, Rep(.),
V aIi, τi} is stored in the OBU by the vehicle.
2) RSU Registration Phase:
Step RR1: TA selects a unique identity RIDt and the secret
key SKRt for the t-th RSU. Then, TA generates a random
number zt and computes
PKRt = SKRt · P,
Zt = zt · P,
and yt = h (RIDt ∥PKRt ∥Zt) ∗SKT A + zt.
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:51:03 UTC from IEEE Xplore.  Restrictions apply. 



# Page 6

XIE et al.: PROVABLE SECURE AND LIGHTWEIGHT BLOCKCHAIN-BASED V2I HANDOVER AUTHENTICATION
15205
The message {RIDt, yt, Zt, SKRt, PKRt, PKT A, KRSU}
is sent to the RSUt through the secure channel.
Step RR2: On receiving the message, RSUt ﬁrst veriﬁes if
yt · P = h(RIDt ∥PKRt ∥Zt) ∗PKT A + Zt. If not, aborts
it, else, RSUt generates a challenge Chat and computes
Rest = PUF (Chat) ,
Kt1 = KRSU ⊕h (Rest) ,
and Kt2 = (yt ∥SKRt) ⊕h (Rest ∥Kt1) .
RSUt stores{RIDt, P, Kt1, Kt2, Zt, PKRt, PKT A, Chat}.
C. First Authentication Phase
In this phase, the vehicle enters the RSU domain and sends
an authentication request to RSUt for the ﬁrst time. The steps
are as follows:
Step FA1: The user inputs the biological information
Bio′i, and the vehicle computes σ′i = Rep(Bio′i, τi). If Vi ̸=
h(σ′i ∥V aIi), the vehicle refuses the login requestion, else,
computes
bi = Si1 ⊕h (σ′
i ∥Vi) ,
and SKV i = Si2 ⊕h (Vi ∥σ′
i) .
The vehicle generates a random number di, timestamp T1,
then computes
Di = di · P,
and ci = bi + SKV i + h(PIDi ∥T1 ∥Di)∗di.
The message {PIDi, Ai, Di, PKV i, ci, T1} is sent to RSUt
via the public channel.
Step FA2: Upon receiving the message {PIDi, Ai, Di,
PKV i, ci, T1}, RSUt ﬁrst checks the freshness of T1, if T1
is fresh and ci · P = h(PIDi ∥PKV i ∥Ai) · PKT A + Ai +
PKV i + h(PIDi ∥T1 ∥Di) · Di, RSUt generates a random
number et and computes
Rest = PUF (Chat) ,
KRSU = Kt1 ⊕h (Rest) ,
(yt ∥SKRt) = Kt2 ⊕h (Rest ∥Kt1) ,
Et = et · P,
and SKti = h (et · Di) .
Then, RSUt generates a timestamp T2 and computes
ft = yt + SKRt + h (Et ∥RIDt ∥T2) ∗et,
and N1 = h (h (SKti) ∥PIDi ∥RIDt ∥T2) .
The message {ft, PKRt, Et, Zt, N1, T2, PIDi, RIDt} is
sent to the vehicle through the public channel. RSUt generates
a random number jt, timestamp T3, then computes
Jt =jt · P,
lt =SKRt + h(N1 ∥h(SKti) ∥RIDt ∥PIDi ∥Jt ∥T3) ∗jt,
and KV iRt = h(SKti) ⊕h(KRSU).
Fig. 5.
First authentication phase.
The record {RIDt, PIDi, KV iRt, N1, lt, Jt, T3} is uploaded
onto the blockchain by RSUt, which indicates that the vehicle
PIDi was authenticated by RSUt at time T3. As a shared im-
mutableledger,thecontentoftheblockchaincannotbetampered
with. Other RSUs can perform fast handover authentication for
the vehicle PIDi based on the ﬁrst authentication information
on the blockchain.
Step FA3: On receiving the message {ft, PKRt, Et, Zt,
N1, T2, PIDi, RIDt}, the vehicle ﬁrst checks if the timestamp
T2 is fresh and if ft · P = h(RIDt ∥PKRt ∥Zt) · PKT A +
Zt + PKRt + h(Et ∥RIDt ∥T2) · Et is correct, if not, the
vehicle terminates the session. Otherwise, computes
SKit = h (di · Et) ,
and N ∗
1 = h (h (SKit) ∥PIDi ∥RIDt ∥T2) .
If N ∗
1 ̸= N1, aborts it. Else, stores SKit. The ﬁrst authentica-
tion phase is shown in Fig. 5.
D. V2I Handover Authentication and Announcement Phase
After the ﬁrst authentication, the vehicle sends an accident
report to the RSU and the RSU announces it. The steps are as
follows:
Step AN1: The vehicle generates the accident report AC
and the timestamp T4, then computes N2 = h(PIDi ∥RIDt ∥
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:51:03 UTC from IEEE Xplore.  Restrictions apply. 



# Page 7

15206
IEEE TRANSACTIONS ON VEHICULAR TECHNOLOGY, VOL. 72, NO. 12, DECEMBER 2023
Fig. 6.
V2I handover authentication and announcement phase.
h(SKit) ∥T4 ∥h(AC)). The message {PIDi, AC, N2, T4} is
sent to RSUm.
Step AN2: On receiving the message, RSUm checks the fresh-
ness of T4 and retrieves the record {RIDt, PIDi, KV iRt, N1,
lt, Jt, T3} according to PIDi on the blockchain, which is the
certiﬁcation that the vehicle PIDi has been authenticated by
RSUt. Then RSUm computes
Resm = PUF (Cham) ,
KRSU = Km1 ⊕h (Resm) ,
(ym ∥SKRm) = Km2 ⊕h (Resm ∥Km1) ,
and h (SKti) = KV iRt ⊕h (KRSU) .
If N2 ̸= h(PIDi ∥RIDt ∥h(SKti) ∥T4 ∥h(AC)) or lt ·
P ̸= PKRt + h(N1 ∥h(SKti) ∥RIDt ∥PIDi ∥Jt ∥T3) ·
Jt, RSUm aborts it. Else, RSUm generates a timestamp T5, a
random number jm, and computes
Jm =jm · P, and
lm =SKRm+h (Jm ∥AC ∥PIDi ∥RIDm ∥T4 ∥T5) ∗jm.
RSUm broadcasts {AC, PIDi, T4, RIDm, lm, Jm, T5} and
uploads it onto the blockchain. The record indicates that
the vehicle PIDi has passed the handover authentication
of RIDm at T5 and the announcement AC of the ve-
hicle was issued by RIDm. Any vehicle can check the
validity of AC by checking whether lm · P = PKRm +
h(Jm ∥AC ∥PIDi ∥RIDm ∥T4 ∥T5) · Jm is right. This
phase is shown in Fig. 6.
Fig. 7.
V2V message broadcast phase.
E. V2V Message Broadcast Phase
If there is no RSU around the vehicle i, the vehicle i can
broadcast the accident reports to other vehicles.
Step BR1: The user inputs the biological information Bio′i,
and the vehicle i computes σ′i = Rep(Bio′i, τi). If Vi ̸=
h(σ′i ∥V aIi), the vehicle i refuses the login requestion, else,
computes
bi = Si1 ⊕h (σ′
i ∥Vi) ,
and SKV i = Si2 ⊕h (Vi ∥σ′
i) .
The vehicle i generates a random number oi, accident report
AC, and timestamp T6. Then, computes
Oi = oi · P,
and wi = bi + SKV i + h (AC ∥Oi ∥V aIi ∥T6) ∗oi.
The vehicle i broadcasts {wi, PIDi, AC, Ai, Oi, PKV i,
V aIi, T6} to other vehicles.
Step BR2: Assumes the vehicle j receives the message {wi,
PIDi, AC, Ai, Oi, PKV i, V aIi, T6}.
The
vehicle
j
ﬁrst
checks the freshness of T6 and veriﬁes if wi · P = h(PIDi ∥
PKV i ∥Ai) · PKT A + Ai + PKV i + h(AC ∥Oi ∥V aIi ∥
T6) · Oi is right. if not, the vehicle j aborts it, else, the vehicle
j trusts the message source. In case of dispute or malicious
message, the vehicle j can send PIDi and V aIi to TA, then
TA can compute Dh(SKT A)(PIDi) = (V IDi, V aIi, ri) and
obtain the identity of vehicle i. The steps of the broadcasting
phase are shown in Fig. 7.
F. Pseudo-Identity of Vehicle Updates Phase
If the vehicle i has completed the current transaction, it
requests TA by performing the following steps to update pseudo-
identity.
Step IU1: The user inputs the biological information Bio′i,
and the vehicle i computes σ′i = Rep(Bio′i, τi). If Vi ̸=
h(σ′i ∥V aIi), the vehicle i refuses the login requestion, else,
computes ri = Si3 ⊕h(V IDi ∥σ′i). The vehicle i generates a
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:51:03 UTC from IEEE Xplore.  Restrictions apply. 



# Page 8

XIE et al.: PROVABLE SECURE AND LIGHTWEIGHT BLOCKCHAIN-BASED V2I HANDOVER AUTHENTICATION
15207
new secret number SK∗
V i, a timestamp T6, and computes
PK∗
V i = SK∗
V i · P,
and M1 = Eri (V IDi, PK∗
V i, PIDi, T6) .
The vehicle i sends {PIDi, M1, T6} to TA through the public
channel.
Step IU2: TA ﬁrst checks if T6 is fresh, then computes
(V IDi, V aIi, ri) = Dh(SKT A) (PIDi) ,
and (V ID∗
i, PK∗
V i, PID∗
i, T ∗
6 ) = Dri (M1) .
If V ID∗
i ̸= V IDi or PID∗
i ̸= PIDi or T ∗
6 ̸= T6, TA aborts
it, else, TA generates random numbers r∗
i, a∗
i, and computes
A∗
i = a∗
i · P,
PID∗
i = Eh(SKT A) (V IDi ∥V aIi ∥r∗
i) ,
and b∗
i = h (PID∗
i ∥PK∗
V i ∥A∗
i) ∗SKT A + a∗
i.
TA generates a timestamp T7, and computes M2 = Eri
(V IDi, A∗
i, PID∗
i, b∗
i, r∗
i, T7). The message {PIDi, M2, T7} is
sent to the vehicle i through the public channel.
Step IU3: On receiving the message, the vehicle i ﬁrst
checks the freshness of T7 and computes (V ID∗∗
i , A∗
i, PID∗
i,
b∗
i, r∗
i, T7) = Dri(M2). If b∗
i · P ̸= h(PID∗
i ∥PK∗
V i ∥A∗
i) ∗
PKT A + A∗
i or V ID∗∗
i ̸= V IDi or T ∗
7 ̸= T7, the vehicle aborts
it, else computes
S∗
i1 = b∗
i ⊕h (σi ∥Vi) ,
S∗
i2 = SK∗
V i ⊕h (Vi ∥σi) ,
and S∗
i3 = r∗
i ⊕h (V IDi ∥σi) .
{P, Vi, S∗
i1, S∗
i2, S∗
i3, A∗
i, PK∗
V i, PKT A, PID∗
i, Rep(.),
V aIi, τi} is stored in the vehicle’s OBU. The above steps are
shown in Fig. 8.
VI. FORMAL SECURITY PROOF
In this section, we provide the formal security proof under
the random oracle model to prove the security of the proposed
protocol.
A. Deﬁnition of Random Oracle Model
Deﬁnition 1 (Participants & partnering): The participants of
the scheme are composed of Trusted Authority (TA), Vehicle
(V ), and roadside unit (RSU). In the i-th instance, the partici-
pants are denoted as Πi
T A, Πi
V i(Πi
V j), and Πi
RSUt, respectively.
The state of the oracle is Accept if it receives a correct request.
If the oracle Πi
V i and Πi
RSUt are in Accept and the session
key SKi
ti (SKi
it) has been agreed, the oracle Πi
V i (Πi
RSUt)
gets its session identity SIDi
V i (SIDi
RSUt) and participant
identity PIDi
V i (PIDi
RSUt). the oracles Πi
V i and Πi
RSUt can
be considered partners if the following conditions are satisﬁed.
(1) The session key SKi
ti = SKi
it. (2) The session identity
SIDi
V i = SIDi
RSUt. (3) The participant identities PIDi
V i =
Πi
RSUt, PIDi
RSUt = Πi
V i.
Deﬁnition 2 (Queries): the queries are deﬁned to simulate
various attacks.
Fig. 8.
Pseudo-identity of vehicle updates phase.
Execute(Πi
V i, Πi
RSUt, Πi
V j) : All the messages exchanged
between Πi
V i, Πi
RSUt, and Πi
V j are intercepted by the adversary.
Send(Πi
V i, Πi
RSUt, m) : A sends a message m to Πi
V i or
Πi
RSUt, if the message is correct, Πi
V i or Πi
RSUt response A.
Reveal(Πi
V i, Πi
RSUt) : A can get the agreed session key
through this query.
Test(Πi
V i, r) : Which is allowed to be executed at most once.
This query generates a random bit r, if r = 1, the real session
key is returned, else, returns a random number.
Corrupt(Πi
V i): Which simulates the attack of intercept-
ing OBU, and returns the stored information {P, Vi, Si1,
Si2, Si3, Ai, PKV i, PKT A, PIDi, Rep(.), V aIi, τi} in OBU.
CorruptRSU(RSUt):
Which
simulates
the
attack
of capturing RSU, and returns the stored information
{RIDt, P, Kt1, Kt2, Zt, PKRt, PKT A, Chat}.
Deﬁnition 3 (Freshness): A instance can be regarded as fresh
if it satisﬁes the following conditions:
(1) Πi
V i and Πi
V j or Πi
RSUt are in Accept. (2) A has not
executed Reveal(Πi
V i, Πi
RSUt) to obtain the session key.
Deﬁnition 4
(Semantic security): After executing at most
once Test(Πi
V i) and multiple Execute(Πi
V i, Πi
RSUt, Πi
V j),
Send(Πi
V i, Πi
RSUt, m), and Reveal(Πi
V i, Πi
RSUt) queries. A
guesses the generated random bit r. The possibility of success is
AdvA
P = |2 Pr[suc(A)] −1|, if AdvA
P > η, the protocol is not
secure, where η is sufﬁciently small.
B. Formal Proof
Theorem 1:
The advantage of obtaining the session key
in polynomial time by A isAdvA
P ≤q2
HA
2lHA + (qSE+qEX)2
n
+
qSE
2lbio−1 + AdvA
P UF + 2AdvA
ECDLP .
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:51:03 UTC from IEEE Xplore.  Restrictions apply. 



# Page 9

15208
IEEE TRANSACTIONS ON VEHICULAR TECHNOLOGY, VOL. 72, NO. 12, DECEMBER 2023
Where qHA, qSE, and qEX represents the times of executing
Hash, Send, and Execute, respectively. lHA, n, and lbio are the
length of hash, transcripts, and biological key, respectively. The
advantage of breaking PUF and ECDLP by A are AdvA
P UF and
AdvA
ECDLP , respectively.
Proof: The games Gamei(0 ≤i ≤4) are deﬁned to simulate
the attacks launched by A. Wini(0 ≤i ≤4) means A guesses
the random bit r in the Gamei. The games are deﬁned as:
Game0 : This game simulates the real attack ﬁrst launched
by A. According to the deﬁnition, we get:
AdvA
P = |2 Pr [Win0] −1|
(1)
Game1 : This game simulates the eavesdropping attack.
A gets all the parameters {PIDi, Ai, Di, PKV i, ci, T1, ft,
PKRt, Et, Zt, N1, T2, RIDt} transmitted between Πi
V i and
Πi
RSUt by executing Execute. Then, A executes Test(Πi
V i)
and guesses if its result is the session key. However, because of
therandomnumberandECDLP,theattackercannotdiscoverany
valuableinformationaboutthesessionkeyfromthetransmission
message. Therefore, we get:
Pr [Win0] = Pr [Win1]
(2)
Game2 : This game simulates the collision attack on the
transcripts and hash results, according to the deﬁnition of the
birthday paradox, we have:
Pr [Win2] −Pr [Win1] ≤
q2
HA
2lHA+1 + (qSE + qEX)2
2n
(3)
Game3 : This game simulates A executes corruption attacks
Corrupt(Πi
V i) and CorruptRSU(RSUt) to obtain the stored
information
{P, Vi, Si1, Si2, Si3, Ai, PKV i, PKT A, PIDi,
Rep(.), V aIi, τi} in OBU and {RIDt, P, Kt1, Kt2, Zt, PKRt,
PKT A, Chat}
in
RSU,
where
Vi = h(σi ∥V aIi),
Si1 = bi ⊕h(σi ∥Vi),
Si2 = SKV i ⊕h(Vi ∥σi),
and
Si3 = ri ⊕h(V IDi ∥σi), σi is the biometric key. The probabil-
ity of obtaining valuable information about the vehicle is qSE
2lbio .
In addition, Rest = PUF(Chat), Kt1 = KRSU ⊕h(Rest),
and Kt2 = (yt ∥SKRt) ⊕h(Rest ∥Kt1). The probability of
breaking PUF by A is AdvA
P UF . Therefore, we have:
Pr [Win3] −Pr [Win2] ≤qSE
2lbio + AdvA
P UF
(4)
Game4 : The parameters Di = di · P and Et = et · P are
transmitted publicly, which are used for session key agreement.
This game simulates that A calculates the session key according
to the messages transmitted publicly. We have:
Pr [Win4] −Pr [Win3] ≤AdvA
ECDLP
(5)
The session keys are generated independently and randomly.
Hence, the advantage of guessing r is equal to guessing the
session key. We have:
Pr [Win4] = 1
2
(6)
Combining the above formulas, we have:
1
2AdvA
P =
Pr [Win0] −1
2

≤
q2
HA
2lHA+1 + (qSE+qEX)2
2n
+ qSE
2lbio +AdvA
P UF +AdvA
ECDLP
That is:
AdvA
P ≤q2
HA
2lHA + (qSE + qEX)2
n
+
qSE
2lbio−1 + AdvA
P UF
+ 2AdvA
ECDLP
VII. INFORMAL SECURITY ANALYSIS
Inthissection,wediscussthesecurityoftheproposedscheme.
A. Stolen-Veriﬁer Attack
In the proposed scheme, TA and RSU do not store the
veriﬁcation tables. Therefore, the proposed protocol can resist
stolen-veriﬁer attack.
B. Replay Attack
Suppose an adversary A intercepts and replays the messages
sent by the vehicle i. In the authentication phase, the sent mes-
sage is {PIDi, Ai, Di, PKV i, ci, T1}, where ci = h(PIDi ∥
PKV iAi) ∗SKT A + ai + SKV i + h(PIDi ∥T1 ∥Di) ∗di.
Because of the timestamp T1 and without knowing the
secret parameters SKT A and SKV i, the replayed message
cannot pass the authentication of RSU. In addition, A cannot
calculate the secret value SKit = h(di · Et) that based
on ECDLP according to the returned message {ft, PKRt,
Et, Zt, N1, T2, PIDi, RIDt}.
In
the
V2I
announcement
phase,
the
sent
message
is {PIDi, AC, N2, T4}, where N2 = h(PIDi ∥RIDt ∥h
(SKit) ∥T4 ∥h(AC)). A cannot forge the accident report or
timestamp to pass the veriﬁcation. Meanwhile, because of the
timestamps and the random numbers, the replay attacks in the
V2V broadcasting phase and vehicle pseudo-identity updating
cannot work too.
C. Forgery Attack/Impersonation Attack
Suppose the adversary A impersonates the vehicle i to authen-
ticate, announce, or broadcast. In the authentication phase, A has
to forge {PIDi, Ai, Di, PKV i, ci, T1}, where ci = h(PIDi
∥PKV i ∥Ai) ∗SKT A + ai + SKV i + h(PIDi ∥T1 ∥Di)
∗di. A cannot forge ci because the secret parameters SKT A
and SKV i are unobtainable. Meanwhile, wi in V2V broadcast
message
{wi, PIDi, AC, Ai, Oi, PKV i, V aIi, T6}
cannot
be forged too. In V2I announcement phase, A cannot forge
N2, where N2 = h(PIDi ∥RIDt ∥h(SKit) ∥T4 ∥h(AC)),
h(SKit) is unavailable. Therefore, the vehicle cannot be forged.
Suppose the adversary A captures and impersonates RSU
to respond to the vehicles or upload information onto the
blockchain. A has to forge {ft, PKRt, Et, Zt, N1, T2, PIDi,
RIDt}
or
{RIDt, PIDi, KV iRt, N1, lt, Jt, T3},
where
ft = yt + SKRt + h(Et ∥RIDt ∥T2) ∗et
and
lt =
SKRt + h(N1 ∥h(SKti) ∥RIDt ∥PIDi ∥Jt ∥T3) ∗jt.
Because of the PUF, SKRt cannot be obtained. Therefore,
forging RSU cannot work.
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:51:03 UTC from IEEE Xplore.  Restrictions apply. 



# Page 10

XIE et al.: PROVABLE SECURE AND LIGHTWEIGHT BLOCKCHAIN-BASED V2I HANDOVER AUTHENTICATION
15209
Therefore, the proposed protocol can resist impersonation
attacks.
D. OBU Intrusion Attack
The vehicle authentication parameters are usually stored in
the OBU, but the OBU of the vehicle is not completely safe.
Attackers can obtain stored data through the side-channel attack,
etc. In some protocols [13], [16], [18], authentication parame-
ters are stored in plain text or encrypted with passwords, but
attackers can still use ofﬂine password guessing to recover the
decrypted parameters. Therefore, the OBU intrusion attack will
cause serious impacts, such as privacy disclosure, impersonation
attacks, and message forgery.
In the proposed scheme, suppose an adversary A intrudes
OBU
and
obtains
{P, Vi, Si1, Si2, Si3, Ai, PKV i, PKT A,
PIDi, Rep(.), V aIi, τi} stored in it, where Si1 = bi ⊕h(σi
∥Vi), Si2 = SKV i ⊕h(Vi ∥σi), Si3 = ri ⊕h(V IDi ∥σi).
σi is the biometric key of the user. When A does not have σi,
he/she cannot obtain any valuable parameters. Therefore, even
if A intrudes the OBU of the vehicle, A cannot launch any
attacks.
E. RSU Captured Attack
In the authentication of VANETs, RSU is an important infras-
tructure for authenticating vehicles, which can verify the user’s
real identity, issue messages, and send the vehicle’s authenti-
cation credentials to other RSUs. RSU usually stores important
secret parameters for authentication. Once RSU is captured, it
may lead to adverse consequences such as privacy disclosure,
impersonation attacks, message forgery, illegal registration, and
so on. Most protocols lack RSU protection [10], [13], [15], [16],
[18], so they cannot resist RSU captured attacks.
In our scheme, each RSU stores {RIDt, P, Kt1, Kt2,
Zt, PKRt, PKT A, Chat}, where Kt1 = KRSU ⊕h(Rest),
Kt2 = (yt ∥SKRt) ⊕h(Rest ∥Kt1),
and
Rest = PUF
(Chat). PUF is the physically unclonable function. According
to the characteristics of PUF, once RSU is captured or the
adversary analyzes the data stored in RSU, the output of
PUF(Chat) will change. Therefore, the attacker cannot obtain
(yt ∥SKRt) and KRSU. In other words, capturing a RSU
cannot inﬂuence other entities or the system.
F. Known-Key Security
The session key SKti = SKit = h(di · Et) = h(et · Di) =
h(et · di · P), where di and et are random numbers and are
different in each session. Because of the computational Difﬁe-
Hellman problem (CDHP) and one-way hash function, an ad-
versary cannot obtain any valuable information even if he/she
gets the session key.
G. Perfect Forward Secrecy
In the proposed protocol, the session key SKti = SKit =
h(di · Et) = h(et · Di) = h(et · di · P), di and et are random
numbers generated in each session by the vehicle and RSU,
TABLE II
COMPARISON OF SECURITY AND PROPERTIES
respectively. Assuming that the adversary knows all the long-
term keys, he/she cannot obtain or calculate the former or current
session keys due to CDHP and hash function. The proposed
protocol has perfect forward secrecy.
H. Anonymity and Unlinkability
In the proposed protocol, the pseudo-identity of the vehicle
is PIDi = Eh(SKT A)(V IDi, V aIi, ri), ri is a random num-
ber generated by TA in each pseudo-identity updating phase.
The pseudo-identities of the vehicle are different and unlink-
able. Only TA can recover the real identity by computing
(V IDi, V aIi, ri) = Dh(SKT A)(PIDi). The adversaries can-
not obtain the real identity or trace the vehicle based on PIDi.
Therefore, the proposed protocol maintains anonymity and un-
linkability.
I. Desynchronization Attack
Suppose the adversary A launches attacks that interfere with
vehicle pseudo-identity updates. In the pseudo-identity updating
phase, the attacker interferes with the vehicle to receive the cor-
rect message {PIDi, M2, T7} from TA utilizing tampering and
interception, where M2 = Eri(V IDi, A∗
i, PID∗
i, b∗
i, r∗
i, T7).
Therefore, the vehicle cannot update the pseudo-identity and
the data stored in the OBU. However, this will not affect
the vehicle’s authentication and message broadcasting, which
can still be done using the vehicle’s existing pseudo-identity
PIDi = Eh(SKT A)(V IDi, V aIi, ri). Likewise,thevehiclecan
continue to attempt to request TA to update the pseudo-identity.
J. Malicious Message Tracking
In VANETs, the malicious messages of legitimate users are
often difﬁcult to prevent, and they are generally handled by
tracking the identity of the sender. However, the anonymity
policy protects privacy and prevents trace attacks but it increases
the difﬁculty of legal accountability. Some protocols cannot
recover the real identity of the user who sent the malicious
message [10], [13], [15].
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:51:03 UTC from IEEE Xplore.  Restrictions apply. 



# Page 11

15210
IEEE TRANSACTIONS ON VEHICULAR TECHNOLOGY, VOL. 72, NO. 12, DECEMBER 2023
TABLE III
COMPARISON OF COMPUTATIONAL COSTS
TABLE IV
COMPARISON OF COMMUNICATION OVERHEAD
In our protocol, the temporary identity PIDi of a legal user
is granted by TA, where PIDi = Eh(SKT A)(V IDi, V aIi, ri),
V IDi is the real identity of the vehicle, V aIi is the appearance
information, ri is the random number, and SKT A is TA’s secret
key. PIDi is combined with identity authentication parameters
bi, where bi = h(PIDi ∥PKV i ∥Ai) ∗SKT A + ai. There-
fore, PIDi cannot be forged and cannot be linked. When a
legitimate user publishes a malicious message, TA can discover
the user’s real identity V IDi by decrypting PIDi.
VIII. PERFORMANCE COMPARISON
Table II is the comparison of the security and properties
between the proposed scheme with some related schemes [10],
[13], [15], [16], [18], which shows that ours has higher security
than others.
We use the environment of Raspberry Pi 4B to simulate the
computational cost of each operation of OBU and RSU in prac-
tical applications. Compared with high-performance computers,
the performance of Raspberry Pi is closer to the OBU, so the
results we get are more practical. The speciﬁcation of Raspberry
Pi 4B is quad-core 64bits ARM Cortex-A72, 1.5GHz, 2GB
LPDDR4 SDARM.
Let TH, TAS, TSig, TME, TBP , and TECC be the time
spent by the operations of Hash (SHA-256), asymmetric
encryption/decryption (RSA-1024), asymmetric encryption-
based signature (DSA-1024), modular exponentiation, bilinear
pairing, and elliptic curve multiplication. According to the
computation result of Raspberry Pi, TH ≈0.019 ms, TAS ≈
19.536 ms,
TSig ≈17.624 ms,
TME ≈5.026 ms,
TBP ≈
44.517 ms, TECC ≈2.610 ms, respectively.
Table III and Fig. 9 show the comparison of computation
costs between ours and some related protocols for VANETs, the
ﬁrst and handover authentication efﬁciencies have increased by
13.50% to 91.05% and 64.34% to 96.38%, respectively. The sum
Fig. 9.
The comparison of computation times.
of ﬁrst authentication and handover authentication is 34.481 ms,
the efﬁciency is 37.93% higher than the existing most efﬁcient
protocol [10].
In Table IV, we calculate and compare the communication
overhead of the protocols. The lengths of the outputs of Hash
(SHA-256), asymmetric encryption/decryption (RSA-1024),
asymmetric encryption-based signature (DSA-1024), one block
symmetric encryption (AES-128), one ECC point, and random
number are 256bits, 1024bits, 1024bits, 128bits, 160bits, and
256bits, respectively. The lengths of identity, the password, and
the timestamp are 32bits. According to the security standard of
Difﬁe-Hellman key exchange, the length of large prime number
p is 500 bits. In scheme [10] and [16], vehicles and Smart Cards
(SC) are both used as storage devices, so we combine the storage
costs in Table V. In scheme [15], because the message sent by
RSU has no modulus calculation, the transmission cost is quite
large. In [18], T is the number of the edge nodes (ENs) in an
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:51:03 UTC from IEEE Xplore.  Restrictions apply. 



# Page 12

XIE et al.: PROVABLE SECURE AND LIGHTWEIGHT BLOCKCHAIN-BASED V2I HANDOVER AUTHENTICATION
15211
TABLE V
COMPARISON OF STORAGE OVERHEAD
ENs set. To achieve better security, Yang et al. [18] suggested
that T ≥10, so we take T = 10 in Tables IV and V. It can be
concluded that the communication overhead of our scheme is at
a lower level in the relevant protocols.
The comparison of the storage overhead is shown in Table V.
Because many previous protocols cannot resist RSU captured
attacksandOBUintrusionattacks,inordertoresisttheseattacks,
our protocol uses biological key and PUF to protect the secret
information stored in OBU and RSU, which directly leads to the
storage costs of our proposed protocol is slightly higher than that
of some other protocols. However, the security and efﬁciency
of authentication protocol in VANETs are more important for
driving safety. In addition, the storage cost of the proposed
protocol is kept within 2Kb, which is at the same level as that of
the relevant protocols less than 4KB. According to our survey of
RSU and OBU products and literature [30], the storage capacity
of OBU and RSU exceeds 2Gb (for example, the OBU of SPV 10
model) and 8Gb (for example, the RSU of FET1012A-C model)
respectively. Therefore, the impact of storage capacity increase
of no more than 1Kb on the system can be ignored.
IX. CONCLUSION
In this article, we ﬁrst analyze the problems and challenges
in the current application scenarios of VANETs and point out
that the existing authentication protocols for VANETs cannot
be applied to the scenarios with different RSU domains or with-
out trafﬁc infrastructure. In addition, few protocols are secure
enough to resist RSU captured attack, OBU intrusion attack, and
recover the real identity of the malicious message sender. There-
fore, we propose a novel protocol to achieve V2I authentication,
V2I handover authentication, and V2V broadcasting authenti-
cation, which can be used in any scenarios. PUF and biological
key are used in RSU and OBU to resist the RSU captured attack
and the OBU intrusion attack. The dynamic anonymity strategy
is used to avoid privacy disclosure and tracking attacks. We also
design an embedding strategy of pseudo-identity and vehicle
feature to recover the real identity of the malicious message
sender by TA. The proposed protocol is proved secure under
the random oracle model. Compared with related V2I handover
authentication protocols, our protocol can resist various attacks,
the sum of ﬁrst and handover authentication efﬁciencies has
increased by 37.93% compared with the existing most efﬁcient
protocol. Therefore, the proposed protocol is safe and effective.
REFERENCES
[1] H. Liu, H. Li, and Z. Ma, “Efﬁcient and secure authentication protocol
for VANET,” in Proc. IEEE Int. Conf. Comput. Intell. Secur., 2010,
pp. 523–527.
[2] X. Xue and J. Ding, “LPA: A new location-based privacy-preserving
authentication protocol in VANET,” Secur. Commun. Netw., vol. 5, no. 1,
pp. 69–78, 2012.
[3] Y. Liu, Z. He, S. Zhao, and L. Wang, “An efﬁcient anonymous authen-
tication protocol using batch operations for VANETs,” Multimedia Tools
Appl., vol. 75, no. 24, pp. 17689–17709, 2016.
[4] S. Wang and N. Yao, “LIAP: A local identity-based anonymous mes-
sage authentication protocol in VANETs,” Comput. Commun., vol. 112,
pp. 154–164, 2017.
[5] S. Jiang, X. Zhu, and L. Wang, “An efﬁcient anonymous batch authenti-
cation scheme based on HMAC for VANETs,” IEEE Trans. Intell. Transp.
Syst., vol. 17, no. 8, pp. 2193–2204, Aug. 2016.
[6] C. Zhang, X. Xue, L. Feng, X. Zeng, and J. Ma, “Group-signature and
group session key combined safety message authentication protocol for
VANETs,” IEEE Access, vol. 7, pp. 178310–178320, 2019.
[7] X. Li, Y. Han, J. Gao, and J. Niu, “Secure hierarchical authentication pro-
tocol in VANET,” Inst. Eng. Technol. Inf. Secur., vol. 14, no. 1, pp. 99–110,
2019.
[8] J. Zhang, J. Cui, H. Zhong, Z. Chen, and L. Liu, “PA-CRT: Chinese
remainder theorem based conditional privacy-preserving authentication
scheme in vehicular ad-hoc networks,” IEEE Trans. Dependable Secure
Comput., vol. 18, no. 2, pp. 722–735, Mar./Apr. 2021.
[9] H. Xiong, J. Chen, Q. Mei, and Y. Zhao, “Conditional privacy-preserving
authentication protocol with dynamic membership updating for VANETs,”
IEEE Trans. Dependable Secure Comput., vol. 19, no. 3, pp. 2089–2104,
May/Jun. 2022.
[10] C. Wang, R. Huang, J. Shen, J. Liu, P. Vijayakumar, and N. Kumar, “A
novel lightweight authentication protocol for emergency vehicle avoidance
in VANETs,” IEEE Internet Things J., vol. 8, no. 18, pp. 14248–14257,
Sep. 2021.
[11] P. Wang and Y. Liu, “SEMA: Secure and efﬁcient message authentica-
tion protocol for VANETs,” IEEE Syst. J., vol. 15, no. 1, pp. 846–855,
Mar. 2021.
[12] Q. Xie, P. Zheng, Z. Ding, X. Tan, and B. Hu, “Provable secure and
lightweight vehicle message broadcasting authentication protocol with pri-
vacy protection for VANETs,” Secur. Commun. Netw., vol. 2022, pp. 1–10,
2022.
[13] D. Zheng, C. Jing, R. Guo, S. Gao, and L. Wang, “A traceable blockchain-
based access authentication system with privacy preservation in VANETs,”
IEEE Access, vol. 7, pp. 117716–117726, 2019.
[14] Z. Ma, J. Zhang, Y. Guo, Y. Liu, X. Liu, and W. He, “An efﬁcient
decentralized key management mechanism for VANET with blockchain,”
IEEE Trans. Veh. Technol., vol. 69, no. 6, pp. 5836–5849, Jun. 2020.
[15] C. Wang, J. Shen, J.-F. Lai, and J. Liu, “B-TSCA: Blockchain assisted
trustworthiness scalable computation for V2I authentication in VANETs,”
IEEE Trans. Emerg. Topics Comput., vol. 9, no. 3, pp. 1386–1396,
Jul./Sep. 2021.
[16] S.Son,J.Lee,Y.Park,Y.Park,andA.K.Das,“Designofblockchain-based
lightweight V2I handover authentication protocol for VANET,” IEEE
Trans. Netw. Sci. Eng., vol. 9, no. 3, pp. 1346–1358, May/Jun. 2022.
[17] K. N. Qureshi, G. Jeon, M. M. Hassan, M. R. Hassan, and K. Kaur,
“Blockchain-based privacy-preserving authentication model intelligent
transportation systems,” IEEE Trans. Intell. Transp. Syst., vol. 24, no. 7,
pp. 7435–7443, Jul. 2023.
[18] A. Yang, J. Weng, K. Yang, C. Huang, and X. Shen, “Delegating authen-
tication to edge: A decentralized authentication architecture for vehicular
networks,” IEEE Trans. Intell. Transp. Syst., vol. 23, no. 2, pp. 1284–1298,
Feb. 2022.
[19] Q. Mei, H. Xiong, Y. C. Chen, and C. M. Chen, “Blockchain-enabled
privacy-preserving authentication mechanism for transportation CPS with
cloud-edge computing,” IEEE Trans. Eng. Manage., early access, Apr.
14, 2022, doi: 10.1109/TEM.2022.3159311.
[20] Q. Li, D. He, Z. Yang, Q. Xie, and K.-K. R. Choo, “A Lattice-based con-
ditional privacy-preserving authentication protocol for the vehicular Ad
Hoc network,” IEEE Trans. Veh. Technol., vol. 71, no. 4, pp. 4336–4347,
Apr. 2022.
[21] Y. Liu, W. Guo, Q. Zhong, and G. Yao, “LVAP: Lightweight V2I authenti-
cation protocol using group communication in VANETs,” Int. J. Commun.
Syst., vol. 30, no. 16, 2017, Art. no. e3317.
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:51:03 UTC from IEEE Xplore.  Restrictions apply. 



# Page 13

15212
IEEE TRANSACTIONS ON VEHICULAR TECHNOLOGY, VOL. 72, NO. 12, DECEMBER 2023
[22] X. Li, T. Liu, M. S. Obaidat, F. Wu, P. Vijayakumar, and N. Kumar,
“A lightweight privacy-preserving authentication protocol for VANETs,”
IEEE Syst. J., vol. 14, no. 3, pp. 3547–3557, Sep. 2020.
[23] T. Nandy, M. Y. I. B. Idris, R. M. Noor, I. Ahmedy, and S. Bhattacharyya,
“An enhanced two-factor authentication protocol for V2V communication
in VANETs,” in Proc. 3rd Int. Conf. Inf. Sci. Syst., 2020, pp. 171–176.
[24] P. R. Babu, A. G. Reddy, B. Palaniswamy, and S. K. Kommuri, “EV-Auth:
Lightweight authentication protocol suite for dynamic charging system of
electric vehicles with seamless handover,” IEEE Trans. Intell. Veh., vol. 7,
no. 3, pp. 734–747, Sep. 2022.
[25] D. Dolev and A. Yao, “On the security of public key protocols,” IEEE
Trans. Inf. Theory, vol. 29, no. 2, pp. 198–208, Mar. 1983.
[26] S. Nakamoto, “Bitcoin: A peer-to-peer electronic cash system,” 2008. [On-
line]. Available: https://assets.pubpub.org/d8wct41f/31611263538139.
pdf
[27] I.-C. Lin and T.-C. Liao, “A survey of blockchain security issues and
challenges,” Int. J. Netw. Secur., vol. 19, no. 5, pp. 653–659, 2017.
[28] C. Herder, M.-D. Yu, F. Koushanfar, and S. Devadas, “Physical unclonable
functions and applications: A tutorial,” Proc. IEEE, vol. 102, no. 8,
pp. 1126–1141, Aug. 2014.
[29] M.PotkonjakandV.Goudar,“Publicphysicalunclonablefunctions,”Proc.
IEEE, vol. 102, no. 8, pp. 1142–1156, Aug. 2014.
[30] Z. Hu, Z. Zheng, T. Wang, L. Song, and X. Li, “Roadside unit caching:
Auction-based storage allocation for multiple content providers,” IEEE
Trans. Wireless Commun., vol. 16, no. 10, pp. 6321–6334, Oct. 2017,
doi: 10.1109/TWC.2017.2721938.
Qi Xie received the Ph.D. degree in applied mathe-
matics from Zhejiang University, Hangzhou, China,
in 2005. Between 2009 and 2010, he was a Visiting
Scholar with the Department of Computer Science,
University of Birmingham, Birmingham, U.K., and
Visiting Scholar with the Department of Computer
Science, City University of Hong Kong, Hong Kong,
in 2012. He has authored or coauthored more than
80 research papers in international journals and con-
ferences, such as IEEE TRANSACTIONS ON INFORMA-
TION FORENSICS AND SECURITY. His research inter-
ests include applied cryptography, digital signatures, authentication and key
agreement protocols. He was the General Co-Chair of ISPEC2012 and ACM
ASIACCS2013, and a Reviewer of more than 40 international journals.
Zixuan Ding received the bachelor’s degree from
Nantong University, Nantong, China, in 2020. He is
currently working toward the master’s degree with
Hangzhou Normal University, Hangzhou, China. He
mainly studies authentication protocols and cryptog-
raphy.
Wen Tang is currently working toward the M.S.
degree with the School of Information Science
and Technology, Hangzhou Normal University,
Hangzhou, China. She mainly studies authentication
and key agreement protocols.
Debiao He (Member, IEEE) received the Ph.D. de-
gree in applied mathematics from the School of Math-
ematics and Statistics, Wuhan University, Wuhan,
China, in 2009. He is currently a Professor with the
School of Cyber Science and Engineering. He has au-
thoredorcoauthoredmorethan100researchpapersin
refereed international journals and conferences, such
as IEEE TRANSACTIONS ON INFORMATION FOREN-
SICS AND SECURITY, and Usenix Security Sympo-
sium. His work has been cited more than 10000 times
at Google Scholar. His main research interests include
cryptographyandinformationsecurity,inparticular,cryptographicprotocols.He
was the recipient of the 2018 IEEE Systems Journal Best Paper Award and 2019
IET Information Security Best Paper Award. He serves on the Editorial Board
of several international journals, such as Journal of Information Security and
Applications, Frontiers of Computer Science, and Human-centric Computing
and Information Sciences.
Xiao Tan received the B.S. and M.S. degrees from
Fudan University,Shanghai,China,in 2007 and 2010,
respectively, and the Ph.D. degree from the City Uni-
versity of Hong Kong, Hong Kong, in 2013. He is
currently a Lecturer with Hangzhou Normal Univer-
sity, Hangzhou, China, and Researcher with the Key
Laboratory of Cryptography of Zhejiang Province.
His main research interests include cryptography
and information security, in particular, digital signa-
tures, authenticated key agreement, and encryption
schemes.
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:51:03 UTC from IEEE Xplore.  Restrictions apply. 
