

# Page 1

4206
IEEE TRANSACTIONS ON INTELLIGENT VEHICLES, VOL. 9, NO. 2, FEBRUARY 2024
BAP: A Blockchain-Assisted Privacy-Preserving
Authentication Protocol With User-Controlled
Data Linkability for VANETs
Zijian Bao
, Debiao He
, Member, IEEE, Huaqun Wang
, Min Luo
, and Cong Peng
Abstract—With the proliferation of vehicular networking and
data in the era of Vehicular Ad-hoc Networks (VANETs), ensuring
privacy-preserving authentication and data privacy during analy-
sis has emerged as a pivotal research focus. In this article, we pro-
pose a blockchain-assisted privacy-preserving authentication pro-
tocol BAP with user-controlled data unlinkability for VANETs. We
leverage Pointcheval-Sanders (PS) signatures to design a privacy-
preserving authentication protocol that supports user traceability
and revocation of malicious users. Additionally, we introduce an
auxiliary data processor (DP) in our model to analyze VANET data
with explicit and implicit linkability. The DP is capable of linking
messages on the same or different topics, enabling minimal privacy
disclosure during Big Data analysis. We provide a detailed proof
and demonstrate that our scheme satisﬁes the required properties.
Finally, performance evaluations demonstrate the efﬁciency of our
proposed scheme. While supporting the mentioned functionalities,
the gas cost is limited to a small range, and the signature size is only
354 bytes.
Index Terms—Blockchain, Authentication, Privacy-Preserving,
Data Linkability.
Manuscript received 14 August 2023; accepted 20 August 2023. Date of
publication 23 August 2023; date of current version 29 April 2024. This work
was supported in part by the Shandong Provincial Key Research and Develop-
ment Program under Grant 2021CXGC010107, in part by the National Natural
Science Foundation of China under Grants 62172307, U21A20466, 62272350,
and 62272238, in part by the New 20 Project of Higher Education of Jinan under
Grant 202228017, in part by the Special Project on Science and Technology
Program of Hubei Provience under Grants 2020AEA013 and 2021BAA025, and
in part by the Fundamental Research Funds for the Central Universities under
Grant 2042023KF0203. (Corresponding authors: Debiao He; Cong Peng.)
Zijian Bao is with the School of Cyber Science and Engineering, Wuhan
University, Wuhan 430072, China, and also with the Institute of Information
Technology, Shenzhen Institute of Information Technology, Shenzhen 518172,
China (e-mail: baozijian@whu.edu.cn).
Debiao He is with the School of Cyber Science and Engineering, Wuhan
University, Wuhan 430072, China, and also with the Shandong Provincial Key
Laboratory of Computer Networks, Qilu University of Technology (Shandong
Academy of Sciences), Jinan 250014, China (e-mail: hedebiao@163.com).
Huaqun Wang is with the School of Computer Science, Nanjing Uni-
versity of Posts and Telecommunications, Nanjing 210023, China (e-mail:
wanghuaqun@aliyun.com).
Min Luo is with the School of Cyber Science and Engineering, Wuhan
University, Wuhan 430072, China, and also with the Shanghai Key Laboratory
of Privacy-Preserving Computation, MatrixElements Technologies, Shanghai
201204, China (e-mail: mluo@whu.edu.cn).
Cong Peng is with the School of Cyber Science and Engineering, Wuhan
University, Wuhan 430072, China (e-mail: cpeng@whu.edu.cn).
Color versions of one or more ﬁgures in this article are available at
https://doi.org/10.1109/TIV.2023.3307699.
Digital Object Identiﬁer 10.1109/TIV.2023.3307699
I. INTRODUCTION
T
HE Internet of Vehicles (IoV) [1], [2] is a network that
leverages Big Data to facilitate information exchange
among “people-vehicles-road-cloud” through speciﬁc commu-
nication protocols and standardized data interactions. It seam-
lessly connects vehicles, road infrastructure, cloud computing,
and individuals, enabling cooperative and intelligent trafﬁc man-
agement. As shown in Fig. 1, the common VANETs [3], [4]
contain vehicles equipped with on-board units (OBU), roadside
units (RSUs), Internet and the trusted authority (TA). There
exists three types of communication: vehicle-to-vehicle (V2V),
and vehicle-to-RSU (V2R), wired/wireless Internet. The OBUs
facilitate seamless data exchange among vehicles, while RSUs
act as communication gateways, enhancing network coverage
and enabling efﬁcient connectivity between vehicles and the
Internet. The TA plays a crucial role in ensuring the security
and integrity of the VANET by managing authentication, au-
thorization, and cryptographic key distribution, fostering trust
among the participating entities.
In spite of the ability of the VANET architecture mentioned
above to facilitate information exchange and data convergence,
the current communication framework is exposed to various se-
curity vulnerabilities [5]. Particularly, when messages are trans-
mitted wirelessly between vehicles, they become susceptible to
eavesdropping, tampering, and other malicious activities. The
compromise of critical vehicle-related information, including
speed, location, and personal data, can have severe implications
and potentially result in disastrous outcomes. Therefore, it is
imperative to address these vulnerabilities and safeguard the
integrity and conﬁdentiality of data exchanged within VANETs.
Ensuring secure and trustworthy communication among
Vehicle-to-Vehicle (V2V) and Vehicle-to-Roadside (V2R) con-
nections is a pivotal research focus [6]. Authentication mech-
anisms play a vital role in verifying the identity of vehicles
and Roadside Units (RSUs), facilitating secure communication,
and safeguarding against malicious entities. The implementation
of robust authentication mechanisms is essential to foster trust
among the participating entities and to mitigate the risks associ-
ated with unauthorized access and information compromise in
the VANET environment.
However, the authentication schemes still confront the issue
of privacy leakage, which has the potential to disclose vehicle
identity information. Several privacy-preserving authentication
2379-8858 © 2023 IEEE. Personal use is permitted, but republication/redistribution requires IEEE permission.
See https://www.ieee.org/publications/rights/index.html for more information.
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:48:42 UTC from IEEE Xplore.  Restrictions apply. 



# Page 2

BAO et al.: BAP: A BLOCKCHAIN-ASSISTED PRIVACY-PRESERVING AUTHENTICATION PROTOCOL
4207
protocols [4], [7], [8] for VANETs have already been proposed,
yet most do not adequately consider the traceability of malicious
users and the implementation of efﬁcient revocation mecha-
nisms. Furthermore, in the era of Big Data, it is crucial to incor-
porate vehicle data analysis into our model. The challenge lies
in achieving the minimum level of privacy leakage granularity
while simultaneously maximizing the utilization of data.
In this article, inspired from ideas for data protection in
group signatures [9], [10], we introduce a data processor for
the analysis of data in the context of vehicular networks. To
facilitate effective analysis of relevant VANETs data, we pro-
pose the use of a data label, referred to as “topic”, along with
two types of data linkability: implicit linkability and explicit
linkability. On the one hand, implicit linkability allows the data
processor to establish connections between data within the same
topic for a particular vehicle. This enables the aggregation and
analysis of related data, providing insights into vehicle behavior
and performance within speciﬁc contexts. On the other hand,
explicit linkability comes into play when dealing with data from
different topics for the same vehicle. In such cases, the data
processor can establish connections only when explicit proof
of linkage is provided by the vehicle actively. This ensures that
data from different topics can be linked together for compre-
hensive analysis, while maintaining data privacy and integrity.
Our approach aims to strike a balance between data analysis
and privacy protection. Messages from the same vehicle on
the same topic can be directly analyzed by the data processor,
without requiring explicit declaration. However, for messages
from the same vehicle on different topics, proactive declaration
of linkages by the vehicle is necessary to enable proper analysis.
Wecallthemuser-controlledlinkability,i.e.,theuserisincontrol
of the processor’s links to this data.
Further, blockchain [11] and smart contracts [12] have
emerged as transformative technologies, revolutionizing indus-
tries across the globe. Blockchain, a decentralized and im-
mutable ledger, ensures transparent and secure record-keeping
by cryptographically linking individual transactions into an
unalterable chain. Complementing this, smart contracts are self-
executing agreements with predeﬁned conditions, automatically
executing transactions without intermediaries. Leveraging these
innovations, we design two smart contracts to store the key infor-
mation. This contract harnesses the transparency of blockchain
to maintain data integrity and facilitate efﬁcient management of
registered vehicles by authorized entities.
A. Our Contributions
1) First, we introduce BAP, a privacy-preserving authenti-
cation protocol enhanced by blockchain technology. Our
protocol leverages PS group signatures, non-interactive
zero-knowledge proofs (ZKPOK) and signature of knowl-
edge (SOK) techniques to ensure privacy protection. Ad-
ditionally, we employ accumulators to facilitate the reg-
istration of legitimate user identities and the revocation
of malicious identities. The utilization of blockchains
enables us to record critical data securely, mitigating the
risk of data tampering by malicious participants.
Fig. 1.
Architecture of VANETs.
2) Second, we present a comprehensive security analysis
of our proposed protocols, namely ZKPOK and SOK.
Additionally, we conduct an analysis of the properties
of BAP, in terms of supporting message authentication,
privacy preservation, conditional traceability, unlinkabil-
ity, resistance against common attacks and user-controlled
linkability.
3) Third, we provide a detailed performance evaluation, fo-
cusing on three key aspects: blockchain cost, authenti-
cation cost, and simulation cost. For our blockchain test
network, we employ Ethereum as the underlying platform.
To simulate vehicle networking, we utilize both VanetMo-
biSim and NS-2.
B. Organization
In Section II, we review the related work. In Section III,
we present the system model and outline the speciﬁc security
requirements In Section IV, we introduce the notations and pre-
liminary, and propose two designed smart contracts, further give
the high-level description. In Section V, we present our proposed
privacy-preserving authentication protocol with user-controlled
data linkability. In Section VI, we conduct a thorough security
analysis of our proposed protocol. In Section VII, we analyze the
performance of the solution from three aspects. In Section VIII,
we conclude the article.
II. RELATED WORK
In this section, we review the related authentication pro-
tocols for VANETs. Raya and Hubaux [13] proposed a road
condition information transferring system with a Public Key
Infrastructure (PKI) system. However, it requires large number
of public-private key pairs and user certiﬁcates, which reduces
the efﬁciency of system usage. After that, Lu et al. [14] made
use of anonymous certiﬁcates to conduct a privacy-preserving
authentication protocol. The vehicle can obtain a temporary
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:48:42 UTC from IEEE Xplore.  Restrictions apply. 



# Page 3

4208
IEEE TRANSACTIONS ON INTELLIGENT VEHICLES, VOL. 9, NO. 2, FEBRUARY 2024
anonymous certiﬁcate when it passes by a RSU. However,
frequent communication between the vehicle and RSU may
make the system inefﬁcient. Wasef et al. [15] presented an
expedite message authentication protocol. They adopted the
PKI and Certiﬁcate Revocation Lists (CRLs) and used the
keyed hash message authentication code to achieve revoca-
tion check process. Soleymani et al. [16] proposed a security
model named AFPM for 5G-VANET, utilizing an authentication
mechanism with cuckoo ﬁlter for illegitimate node detection
and a plausibility model based on fuzzy logic to handle in-
accurate information and misbehavior nodes. Wen et al. [17]
presented a novel message physical layer assisted message
authentication (PAA) framework in vehicular communication
networks, utilizing temporal and spatial uniqueness in physical
layer channel responses to establish trust between vehicles,
achieving high efﬁciency, minimal authentication delay, and
strong security without compromising the requirements. Wang
et al. [8] proposed a two-factor lightweight privacy-preserving
authentication by using message-authentication-code (MAC)
and hash operations. However, it requires the CA to maintain
a large table of vehicle messages and system keys. However,
the existing schemes both has the weakness that a reliable third
party necessitates signiﬁcant storage capacity to accommodate
all the certiﬁcates.
Someresearchershaveturnedtoidentity-basedcryptosystems
to avoid mass storage of certiﬁcates. Zhang et al. [18] gave
an identity-based batch signature veriﬁcation scheme for ve-
hicular communications. It utilized the group testing technique,
enabling the detection of invalid signatures through a minimal
number of batch veriﬁcations. Chim et al. [19] proposed a
software-based solution by using two shared secrets to enhance
the security of [18]. However, it still suffers from the imper-
sonation attack presented by Horng et al. [20]. To ﬁx the attack,
He et al. [21] put forward an efﬁcient identity-based conditional
privacy-preserving authentication scheme for VANETs. They
used a schnorr-like mechanism to conduct the protocol and
assumes that the vehicle is equipped a tamper-proof OBU.
With the popularity of blockchain technology, research schol-
ars are considering the use of blockchain to secure critical data
and design authentication protocols accordingly. Lu et al. [22]
used a Merkle Patricia tree to design a distributed authentication
protocol for VANETs. However, it requires a multi-interaction
between a vehicle and the trusted party. Gabay et al. [23] used a
token-based mechanism and and Pederson commitment scheme
to realize anonymous authentication. Feng et al. [7] presented
a blockchain-assisted privacy-preserving authentication system
BPAS without an online registration center. They used fuzzy
extractor and attribute-based encryption to preserve vehicle pri-
vacy. Li et al. [24] introduced a new accountable attribute-based
authentication with ﬁne-grained access control, achieving ﬁne-
grained access control, anonymity, and public accountability in
user authentication. They also presented the ﬁrst attribute-based,
fair, anonymous, and publicly traceable crowdsourcing scheme
on blockchain, balancing anonymity and accountability while
ensuring fairness in worker competition. Lin et al. [4] com-
bined the blockchain technology and a key derivation algorithm
BCPPA to achieve a certiﬁcate management, which meets both
Fig. 2.
System model.
anonymity and traceability. However, none of them consider the
data linkability after the authentication.
III. PROBLEM OVERVIEW
In this section, we present the system model and security
requirements.
A. System Model
VANET is a wireless sensor network based on vehicles com-
municating with each other, which can provide services such
as intelligent trafﬁc management, vehicle security, driver assis-
tance, etc. Our system model includes (see Fig. 2) the following
ﬁve entities: TA (Trust Authority), vehicle, RSUs (Roadside
Unit), blockchains and DPs (data processors).
r Trust Authority (TA): It is responsible for ensuring secure
communication between vehicles and RSUs. TA protects
communication between vehicles and RSUs by providing
services such as security certiﬁcates and key management
to prevent malicious attacks and data leakage. It has suf-
ﬁcient computation and communication capabilities and
is considered trusted. In addition, TA is also involved in
maintaining the blockchain system to protect data from
tampering. Moreover, if necessary, TA can trace a vehicle’s
real identity and revoke it.
r Vehicle: It is equipped with OBU (On-Board Unit), which
is used to receive and send vehicle information. OBU can
get information from RSU and other vehicles, such as
trafﬁc congestion, accident alerts, etc., and also can send
its own information to other vehicles and RSU.
r Roadside Unit (RSU): It is installed on the road, acts as an
access point between vehicles and the network (including
blockchain). RSU can provide information on vehicle lo-
cation, trafﬁc ﬂow, etc., and can also send road condition
information, trafﬁc management instructions to vehicles.
It connects to nearby vehicles and veriﬁes the validity of
received messages and uploads data to DPs for instructions.
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:48:42 UTC from IEEE Xplore.  Restrictions apply. 



# Page 4

BAO et al.: BAP: A BLOCKCHAIN-ASSISTED PRIVACY-PRESERVING AUTHENTICATION PROTOCOL
4209
r Blockchain: It is a decentralized and distributed database
technology. Blockchain technology can be used to manage
and authenticate the identity and information of vehicles.
This can help avoid fraud and unnecessary disputes, and
increase the management and control of vehicles. Specif-
ically, the blockchain supports two types of smart con-
tracts, i.e., authentication contract to store vehicle reg-
istration information and support vehicle revocation; and
transaction contract to store data authentication informa-
tion.
r Data Processor (DP): DP can processe data from V2V
and V2R to provide more efﬁcient instructions for vehicles
and better guide on the work of IoV. DP can implicitly link
data from the same scope for the same vehicle. While for
data from different scopes for the same vehicle, DP can
only link data after the vehicle actively provides explicit
link proof. DP can analyze the data of the same vehicle
in the same scope, and in different scopes (if explicit link
proof is provided).
B. Security Requirements
To meet the necessary security issues in real-world scenarios,
a feasible blockchain-assisted privacy-preserving authentication
protocol for VANETs should fulﬁll the following vital security
requirements.
r Message authentication: The vehicle and RSU have the
capability to authenticate the received message (including
integrity and identity legality). Additionally, the systems
are designed to detect any potential attempts at message
manipulation. Note we consider the V2V and V2R com-
munications, while other communication is secured by the
https protocol, which is out of our goals.
r Privacy Preservation: This property requires that the ve-
hicle’s identity can be hidden. Only when necessary, the
TA can open the vehicle’s identity. Therefore, the scheme
can effectively protect vehicle’ privacy.
r Conditional Traceability: This property requires that only
TA can open can open the vehicle’s identity when there is
malicious behavior occurring. Therefore, the scheme can
effectively protect vehicle privacy and provide traceability.
Therefore, TA can take corresponding measures to revoke
the identity of malicious vehicles and perform regulatory
actions (e.g., law enforcement, penalty).
r Unlinkability: In order to avoid detection by potential ad-
versaries, it is difﬁcult to link two messages sent by the
same vehicle based on previous communication history.
r Resistance against other common attacks: The scheme
should resist against commonly encountered attacks in
VANETs, such as replay attacks, modiﬁcation attacks, and
impersonation attacks.
In addition, we also emphasize two additional requirements.
r Implicit linkability: The DP can obtain the message/SOK
pair accompanied with a pseudonym, generated by the ve-
hicle for a particular scope scp (e.g., parking payment, mo-
torway toll). For the same scope, the vehicle’s pseudonym
is the same. While for the different scopes, pseudonymous
TABLE I
USED NOTATIONS
signaturesfordifferentscopes(evenfromthesamevehicle)
cannot be linked. The property is straight as DP can analyze
the data of the same vehicle in the same scope.
r Explicit linkability: After the signatures has been gener-
ated, the vehicle can actively claimed and linked them, i.e.,
the vehicle can generates a proof to prove that two signa-
tures for different scopes belong to the same vehicle. This
property is also necessary, e.g., sometimes vehicle man-
agement agencies need to calculate the vehicle’s parking
payment, motorway toll and other spending, and determine
whether a certain amount is reached, to make an overall
discount.
IV. OUR CONSTRUCTION
A. Notations
For convenience, the notations used in our paper are listed in
Table I.
B. Preliminary
1) Bilinear Pairing: Let G1, G2, and GT be cyclic groups
with the order p. We say that a map e : G1 × G2 →GT is a
bilinear map if it satisfy the following properties [25]. Note
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:48:42 UTC from IEEE Xplore.  Restrictions apply. 



# Page 5

4210
IEEE TRANSACTIONS ON INTELLIGENT VEHICLES, VOL. 9, NO. 2, FEBRUARY 2024
that we employ a type-3 bilinear pairing, which implies that G1
and G2 are distinct groups and there exists no homomorphism
between them that can be efﬁciently computed.
r Bilinear:
For
∀a, b ∈Z∗
p
and
∀g ∈G1, ∀˜g ∈G2,
e(ga, ˜gb) = e(g, ˜g)ab.
r Non-degnerate: For ∀g ∈G1, ˜g ∈G2, e(g, ˜g) ̸= 1, where
1 denotes the identity element in GT .
r Computability: For ∀g ∈G1, ˜g ∈G2, e(g, ˜g) can be efﬁ-
ciently computable.
2) ZKPOK: Zero-knowledge
proof
of
knowledge
(ZKPOK) [26] is a special kind of zero-knowledge proof
that allows a prover to convinces a veriﬁer that he knows a
witness w satisfying a relations R with a public statement x
without revealing the witness itself. We make use of the notation
ZKPOK{(w) : (w, x) ∈R} for representing a ZKPOK proof.
Currently, Σ-protocol [27] is a well-used three-move ZKPOK
protocol. It can be further transformed to a Signature of
Knowledge (SOK) [28] with Fiat-Shamir heuristic. Compared
to ZKPOK, it can additionally be seen as a signature for
the message m. It consists of three probabilistic polynomial
time (PPT) algorithms, which should meet the properties of
completeness, soundness, zero-knowledge.
r Setup(λ): Given the security parameter λ, this algorithm
outputs public parameters pp.
r GenProof(pp, m, w, x, R): Given the public parameters
pp, a message m, a witness/statement pair (w, x) ∈R,
this algorithm outputs a proof π. We use the equation
SOK{(w) : (w, x) ∈R}(m) to represent the process.
r VrfProof(pp, m, x, π): Given the public parameters pp, a
message m, a statement x and a proof π, this algorithm
checks the validity of π. If valid, this algorithm outputs 1;
otherwise, outputs 0.
3) PS Signature: Pointcheval-Sanders (PS) [29] signature
is a privacy-perserving signature scheme that employs type-3
bilinear pairing to achieve shorter signature size. The signature
consists of only two elements, while the digital signature tech-
nique ensures the authenticity and integrity of the signed data.
Moreover, the signature σ can be randomized to a new random-
ized signature σ′, while keeping the validity of the signature.
Overall, this scheme presents a promising solution for practical
applications that require privacy protection. The PS Signature Φ
consists of four PPT algorithms.
r Setup(λ): Given the security parameter λ, this algo-
rithm outputs public parameters pp = {G1, G2, GT , e, p},
where e : G1 × G2 →GT is a type-3 bilinear pairing, p is
the order of G1, G2 and GT .
r KenGen(pp): Given the public parameters pp, it randomly
chooses ˜g ∈G2, and computes x, y ∈Z∗
p, sets ( ˜X, ˜Y ) ←
(˜gx, ˜gy), this algorithm outputs the key pair (sk, pk), sk =
(x, y), pk = (˜g, ˜gx, ˜gy).
r Sign(m, sk): Given a message m, it randomly chooses g ∈
G∗
1, this algorithm outputs a signature σ ←(σ1, σ2) ←
(g, g(x+y·m)).
r Verify(m, pk, σ): Given a message m, a public key pk and
a signature σ, it parses σ as (σ1, σ2), then checks σ1̸=1G1
and e(σ1, ˜X · ˜Y m) = e(σ2, ˜g), If passed, this algorithm
outputs 1; otherwise, outputs 0.
4) Group Signature Based on PS Signature: The group sig-
nature [29] based on PS signature Ψ consists of six PPT algo-
rithms.
r GSetup(λ): Given the security parameter λ, it sets public
parameters pp = {G1, G2, GT , e, p}. It randomly chooses
˜g ∈G2, x, y ∈Z∗
p, computes ( ˜X, ˜Y ) ←(˜gx, ˜gy), this al-
gorithm outputs the public parameters pp, the group private
key gsk = (x, y) along with a generator g ∈G1, the group
public key gmpk = (˜g, ˜gx, ˜gy).
r PKIJoin(i, λ): The user i uses Φ.Setup(λ) to get pp
and Φ.KenGen(pp) to generates a public/private key pair
(uski, upki) and sends upki to the certiﬁcation authority.
r GJoin: The user i who wants to join the group, ﬁrst ini-
tiates a interactive protocol with the group manager (ab-
breviated as GM). The user randomly chooses ski ←Z∗
p,
sets (γ, ˜γ) ←(gski, ˜Y ski), computes σ ←Φ.Sign(γ, uski)
and sends σ to the GM. Then, the GM checks the va-
lidity of σ and checks whether e(γ, ˜Y ) = e(g, ˜γ). Then,
the user proves that he knows the secret value ski, i.e.,
sends POK{(ski) : γ = gski ∧˜γ = ˜Y ski}. Then, the GM
randomly chooses t ←Z∗
p and computes η ←(η1, η2) ←
(gt, (gx · γy)t) which is a signature of ski (i.e., η =
(gt, gt(x+y·ski)). At last, the GM stores the entry (i, γ, ˜γ, σ)
in his own register, and sends η to the user. The user i sets
his private group key gski as (ski, η).
r GSign(m, gski): The user randomly chooses r ∈Z∗
p and
computes a re-randomized signature (η′
1, η′
2) ←(ηr
1, ηr
2),
then computes a signature of proof SOK{(ski) : e(η′
1, ˜X ·
˜Y ski) = e(η′
2, ˜g)}(m) as a group signature π on m.
r GVerify (m, gpki, π): The veriﬁer checks whether π is
a valid SOK. If valid, the veriﬁer outputs 1; otherwise,
outputs 0.
r GOpen(m, gmsk, μ): When we need to open a user’s sig-
nature, the GM searches all entries (i, γi, ˜γi, σi) in his own
register whether e(η2, ˜g) · e(η1, ˜X)−1 = e(η1, ˜γ)) holds.
Until he gets a match, he outputs the corresponding entry
(i, γi, σi) where i is the user’s identity and outputs a proof
of knowledge of a valid ˜γi. Anyone can checks the validity
of the proof.
5) Accumulator: We make use of a accumulator [30], [31]
with one-way domain. An accumulator can combine a set
of value {xi}i∈[n] into a accumulated value acc. For a xi,
we have a witness wi, which can be used for proving that
x is indeed accumulated into acc. If values can be dynami-
cally added to or removed from an accumulator, it is a dy-
namic accumulator. The accumulator consists of four PPT
algorithms.
r Setup(λ): Given the security parameter λ, this algorithm
randomly chooses sk ∈Z∗
p, ˜h ∈G2, computes pk = ˜hsk
and outputs a public/private key pair (pk, sk),
r Eval({xi}i∈[n], sk): Given a set of value {xi}i∈[n] ∈
Z∗
p, this algorithm outputs an accumulated value acc =
˜h
n
i=1 (xi + sk).
r WitnessGen(acc, xj): Given an accumulated value acc
and a value xj, this algorithm outputs a witness w =
˜h
n
i=1,i̸=j (xi + sk).
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:48:42 UTC from IEEE Xplore.  Restrictions apply. 



# Page 6

BAO et al.: BAP: A BLOCKCHAIN-ASSISTED PRIVACY-PRESERVING AUTHENTICATION PROTOCOL
4211
r Verify(acc, w, xj): Given an accumulated value acc, a
witness w and a value xj, this algorithm checks whether
acc = wxj. If valid, the veriﬁer outputs 1; otherwise, out-
puts 0.
6) Blockchain and Smart Contract: Blockchain [11] em-
ploys cryptographic techniques to provide data security and tam-
per resistance. It serves as a decentralized distributed database
system. Blockchain is made up of a number of chronologically
ordered blocks, each of which includes the hash value of pre-
ceding blocks as well as the current newly added transactions.
Through a decentralized trust mechanism and transparent trans-
actionrecords, blockchainincreases thereliabilityandefﬁciency
of transactions while lowering costs and risks. Recently, the
smart contracts [12] on the blockchain have received a lot
of attention. Smart contracts are automated contracts that can
execute, validate, and enforce the terms of a contract digitally
without the assistance of a third party. Blockchain technology
is used in smart contracts to guarantee the validity and tamper
resistance character of the contract as well as the capacity to au-
tomatically enforce the conditions. By automating the execution
of contracts, it lowers transaction costs, saves time, and boosts
transaction reliability.
C. Design of Smart Contract
We design two smart contracts to store the key information.
The ﬁrst contract authentication contract is used for store the
vehicle registration information and support vehicle revocation.
Namely, it stores a entry (uid, tag, Acc), where uid is a a
randomly selected number but unique to each vehicle, tag is a bit
(1 denotes the member was granted; 0 denotes the member was
revoked), Acc is the accumulated value after granting or revok-
ing the member. It is depolyed by the the TA. It consists of four
algorithmsUserList, updateUser, getAcc(seeAlgorithm1).By
providing the smart contract address and the necessary parame-
ters (such as the algorithm name and arguments), one can invoke
the algorithms. The UserList is a constructor algorithm, which is
only executed once when a contract is created. The updateUser
algorithm can only be invoked by the contract owner (i.e., TA), it
is used for granting or revoking a vehicle. The getAcc algorithm
provides the latest accumulated value to the invoker, which will
be later used to prove that the vehicle’s unique identiﬁcation uid
has indeed been accumulated to the latest accumulation value,
i.e., to show that the vehicle’s identity is legitimate.
Another contract is the transaction contract to store data
authentication information. It mainly stores two parts, the ﬁrst
part is a group signature π (i.e., a SOK proof in our paper),
the group signature is used for providing authentication for the
V2R/V2V messages; the second part is a vehicle’s encrypted
pseudonym cnym, which contains (cnym1, cnym2). The en-
crypted pseudonym will be later decrypted into a pseudonym,
which is used for providing implicit/explicit linkability. It
is depolyed by the the TA. It consists of three algorithms
TxList, addNym, getNym (see Algorithm 2). The TxList is also
a constructor algorithm. The addTx is used for adding the group
signature and encrypted pseudonym. The getTx is used for
obtaining the corresponding authentication information.
Algorithm 1: Authentication Contract.
Require: Function name, invoked parameters
Ensure: Setting up functions:
address owner; % The address of owner is TA.
Struct UserList {
uint256 uid; % the user’s unique identiﬁcation.
bool tag; % the user’s authorization status.
uint256 [2] acc; % the accumulated value.
}
UserList[] private userlist;
constructor UserList public { % Constructor,
automatically executed during the deployment.
owner = msg.sender; % Initialize the issuer as
manager.
}
function updateUser(uid, tag, acc) {
require(msg.sender==owner);
userlist.push(UserList(uid, tag, acc));
}
function getAcc() view {
UserList user = userlist[arclist.length −1];
return user.acc;
}
Algorithm 2: Transaction Contract.
Require: Function name, invoked parameters
Ensure: Setting up functions:
address owner; % The address of owner is TA.
Struct TxList {
uint256 [9] gs; % a group signature.
uint256 cnym1; % the ﬁrst part of a pseudonym.
uint256 cnym2; % the second part of a pseudonym.
}
mapping (uint256 => TxList) txlist;
constructor TxList public { % Constructor, automatically
executed during the deployment.
owner = msg.sender; % Initialize the issuer as
manager.
}
function addTx(txid, gs, cnym1, cnym2) {
txlist[txid].gs = gs;
txlist[txid].cnym1 = cnym1;
txlist[txid].cnym2 = cnym2;
}
function getTx(txid) view {
return (txlist[txid].gs, txlist[txid]
.cnym1, txlist[txid].cnym2);
}
D. High-Level Description
r Step 1 System Initialization:
Given
the
security
pa-
rameter λ, this step initializes the public parame-
ters and blockchain, and deploys the smart contracts
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:48:42 UTC from IEEE Xplore.  Restrictions apply. 



# Page 7

4212
IEEE TRANSACTIONS ON INTELLIGENT VEHICLES, VOL. 9, NO. 2, FEBRUARY 2024
authentication contract and transaction contract on the
blockchain.
r Step 2 Registration: Given the public parameters pp, the
vehicle i registers with TA and obtains a signature η on
ski as his credential, the TA uploads a vehicle registration
information to the authentication contract.
r Step 3 Message Signing: Given a message m, the vehicle
signs the message m to obtain a group signature π (i.e., a
SOKproof),whichensuresthatithasavalidre-randomized
signature η′ of η, along with a encrypted pseudonym
cnym ←(cnym1, cnym2), where cnym is a ciphertext
of a pseudonym nym = H1(scp)ski, where scp is a scope
indicating an application scenario (e.g., parking payment).
The nym is further used for providing implicit/explicit
linkability in Step 5.
r Step 4 Message Veriﬁcation: Given a message m, a scope
scp, a signature π and a encrypted pseudonym cnym,
the vehicle/RSU must validate the validity of π. If π
is determined to be valid, the vehicle/RSU will upload
the data authentication information (π, cnym) to the
authentication contract for further processing by the data
processor (DP).
r Step 5 Message Link: Given some message/signature /en-
crypted pseudonym pairs {mi, πi, cnymi}i∈[n], this step
provides two types of linkability: implicit or explicit. The
DP ﬁrst decrypts the encrypted pseudonym cnymi to ob-
tain the pseudonym nymi, where nymi = H1(scp)ski. For
implicit linkability, if nymi = nymj, it indicates that these
two messages belong to the same vehicle for the same
scope. For explicit linkability, the vehicle must provide an
explicit link proof for a list of messages and send the proof
to the DP. Then, the DP can verify the proof and determine
that these messages belong to the same vehicle.
r Step 6 Tracking and Revocation: Given a group signa-
ture π on a message m, the TA is able to open the sig-
nature and extract the identity i of the vehicle. More-
over, the TA can issue a revocation instruction to the
authentication contract to revoke the vehicle. This en-
ables the system to track the behavior of the vehicle and
prevent it from accessing the system in case of malicious
activity or misbehavior.
V. PROPOSED SCHEME
In this section, we present the detailed construction of the
scheme. The overview of BAP is shown in Fig. 3.
A. System Initialization
This step initializes the public parameters and blockchain.
The TA needs to deploy two smart contracts.
r Basic initialization. The TA chooses a type-3 bilinear pair-
ing e : G1 × G2 →GT , p is the order of G1, G2 and
GT . The TA randomly chooses g, h ∈G1, ˜g, ˜h ∈G2,
x, y1, y2 ∈Z∗
p, computes ( ˜X, ˜Y1, ˜Y2) ←(˜gx, ˜gy1, ˜gy2).
The TA also chooses two hash functions: H1 : {0, 1}∗→
G1 and H2 : {0, 1}∗→Z∗
p. The TA stores (x, y1, y2) as
Fig. 3.
Overview of BAP.
the group private key gsk. The (˜g, ˜X, ˜Y1, ˜Y2) is the group
public key gmpk. The TA also randomly chooses ask ∈Z∗
p,
computes apk = ˜hask, and sets (ask, apk) as the key pair
for an accumulator. The initialized accumulated value is
set to h.
r The
DP
randomly
chooses
dsk ∈Z∗
p,
computes
dpk = ˜hdsk,
sets
(dsk, dpk)
as
the
key
pair
used
for
encryption.
The
DP
sends
dpk
to
the
TA.
The
TA
outputs
the
public
parameters
pp =
{G1,G2,GT , e, p, g, h, ˜g, ˜h,H1, H2, ˜X, ˜Y1, ˜Y2, apk, dpk}.
r Blockchain initialization. The TA sets the initialization
parameters of a blockchain and maintains the blockchain
together with other nodes (possibly multiple nodes within
the TA or other trusted institutions outside the TA). For
simplicity, TAs can also join an existing blockchain system
directly.
r Smart contract deployment.
The
TA
deploys
the
smart
contracts
authentication contract
and
transaction contract on the blockchain. The addresses
of the two smart contracts are published and those with
the appropriate permissions can invoke the corresponding
functions.
B. Registration
The vehicle i registers with TA and obtains a signature η. The
step is as follows:
r The vehicle i runs Ψ.PKIJoin(i, λ) (see Section IV-B) to
obtain his public/private key pair (uski, upki). The key pair
is utilized to authenticate the messages sent by the vehicle
to the TA.
r The vehicle i randomly chooses ski ←Z∗
p, sets (γ, ˜γ) ←
(gski, ˜Y ski
1
), computes σ ←Φ.Sign(γ, uski), computes the
following zero-knowledge proof ZKPOK1, which proves
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:48:42 UTC from IEEE Xplore.  Restrictions apply. 



# Page 8

BAO et al.: BAP: A BLOCKCHAIN-ASSISTED PRIVACY-PRESERVING AUTHENTICATION PROTOCOL
4213
that he knows the secret value ski. The vehicle sends
(σ, ZKPOK1, γ, ˜γ) to the TA.
ZKPOK1{(ski) : γ = gski ∧˜γ = ˜Y ski
1
}.
r The TA checks the validity of σ, ZKPOK1 and checks
whether e(γ, ˜Y1) = e(g, ˜γ). If valid, the TA randomly
chooses a unique identiﬁcation uidi ∈Z∗
p for the ve-
hicle. The TA computes η ←(η1, η2) ←(gt, (gx · γy1 ·
guidi·y2)t). Finally, the TA stores the entry (i, γ, ˜γ, σ, uidi)
in his own register, and sends (η, uidi) to the vehicle. The
vehicle i sets his private group key gski as (ski, η).
r The TA grants access to the vehicle i. Suppose there are ℓ
authorized entries in the uselist, the TA ﬁrst invokes getAcc
algorithm to get the latest accumulated value accℓ. The
TA computes accℓ+1 = accℓask+uidi and sets the vehicle’s
witness wℓ+1 = accℓ.
r The TA invokes updateUser(uidi, 1, accℓ+1) algorithm to
add the vehicle’s unique identiﬁcation in the userlist. When
othervehiclesalreadyregisteredseethecontractinvocation
on the blockchain, they update their own witness, i.e., a
vehicle k with a witness w and his unique identiﬁcation
uidk sets his new witness wnew = accℓ· w(uidℓ+1−uidk).
C. Message Signing
In this stage, the vehicle produces a message/signature pair
along with a encrypted pseudonym. The vehicle has the private
group key gski = (ski, η) and the witness w. He also invokes
getAcc algorithm to get the latest accumulated value acc.
r The vehicle i ﬁrst randomly chooses r ∈Z∗
p and computes
a re-randomized signature (η′
1, η′
2) ←(ηr
1, ηr
2) which is
actually a signature of ski.
r The vehicle selects a scope scp for this communication
message m, randomly chooses α ∈Z∗
p, and computes
a encrypted pseudonym cnym ←(cnym1, cnym2) ←
(gα, dpkα · H1(scp)ski).
r The vehicle computes a signature of proof SOK1 (see
Fig. 4) as a group signature π on the message m, and sends
(m, scp, π, cnym, time) to nearby vehicles or RSUs,
where time denotes the current time.
SOK1{(ski, uidi, w) : e(η′
1, ˜X · ˜Y ski
1
· ˜Y uidi
2
) = e(η′
2, ˜g)
∧e(w, apk · ˜huidi) = e(acc, ˜h). ∧cnym1 = gα∧
cnym2 = dpkα · H1(scp)ski}(m||time).
D. Message Veriﬁcation
In this stage, given the tuple (m, scp, π, cnym), the veriﬁer (a
vehicle or an RSU) can check the validity of π. If π is determined
to be valid, the veriﬁer accepts the message and uploads the data
authentication information for further processing by the DP.
r The veriﬁer checks the validity of π. If valid, the veriﬁer
accepts the trafﬁc-related information m.
r The veriﬁer parses cnym as (cnym1, cnmy2), com-
putes
a
transaction
id
txid = H2(m)
and
invokes
addTx(txid, π, cnym1, cnmy2) algorithm. The veriﬁer
also sends the message m to the DP.
Fig. 4.
Construction of SOK1.
E. Message Link
Inthisphase,theDPcanobtainimplicitandexplicitlinkability
of messages. DP received different messages {mi}i∈[n] from
vehicles or RSUs.
r Foreachmessage{mi}i∈[n],theDPcomputesatransaction
id txidi = H2(mi), and invokes getTx(txidi) algorithm
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:48:42 UTC from IEEE Xplore.  Restrictions apply. 



# Page 9

4214
IEEE TRANSACTIONS ON INTELLIGENT VEHICLES, VOL. 9, NO. 2, FEBRUARY 2024
Fig. 5.
Construction of ZKPOK2.
to obtain (gsi, cnym1,i, cnmy2,i). Then, the DP sets gsi
as the group signature πi and (cnym1,i, cnmy2,i) as the
encrypted pseudonym cnymi.
r For
i ∈[n],
the
DP
computes
the
pseudonym
nymi = cnmy2,i/cnmy1,idpk, which implys nymi =
cnmy2,i/cnmy1,idpk = dpkα · H1(scp)ski/gα·dsk =
H1(scp)ski. If nymi = nymj, ∀i, j ∈[n], it indicates
that these two messages belong to the same vehicle for the
same scope. The DP can analyze the information of the
same vehicle and provide corresponding instructions to
the vehicle or nearby RSUs (if needed).
r For explicit linkability, the vehicle i must provide an
explicit link proof ZKPOK2 for a list of his messages
(Assuming there are k messages). The DP can check the
validity of ZKPOK2 (see Fig. 5). If valid, The DP can do
the analysis work and provide instructions.
ZKPOK2{(ski) : nym1 = H1(scp1)ski ∧. . .
∧nymk = H1(scpk)ski}.
F. Tracking and Revocation
In this stage, the TA is able to open the signature and extract
the identity i of the vehicle.
r The TA searches all entries (i, γi, ˜γi, σi, uidi) in his own
register whether e(η2, ˜g) · e(η1, ˜X)−1 = e(η1, ˜γ)) holds.
Until he gets a match, the TA knows the corresponding
entry (i, γi, σi, uidi) where i is the vehicle’s identity.
The vehicle’s identity can be revoked as follows.
r The TA ﬁrst invokes getAcc algorithm to get the lat-
est accumulated value accℓ. The TA computes accℓ+1 =
accℓ1/(ask+uidi).
The
TA
invokes
updateUser(uidi,
0, accℓ+1) algorithm to revoke the vehicle’s unique identi-
ﬁcation in the userlist.
r When other vehicles already registered see the contract
invocation on the blockchain, they update their own
witness, i.e., a vehicle k with a witness w and his
unique identiﬁcation uidk sets his new witness wnew =
( w/accℓ+1)1/(uidk−uidi).
VI. SECURITY ANALYSIS
In this section, we show that our scheme satisﬁes previously
deﬁned security requirements. As BAP mainly uses the ZKPOK
and SOK to protect privacy. First, we prove that they satisﬁes
the security properties of the NIZK argument, including com-
pleteness, soundness, and zero-knowledge. Second, we analyze
the security requirements.
Theorem 1: The ZKPOK1 and ZKPOK2 constructed
from Σ-protocol and Fiat-Shamir heuristic transformation sat-
isﬁes the properties of completeness, soundness and zero-
knowledge.
PROOF (SKETCH): These two ZKPOKs are used to prove
simple discrete logarithmic relations, and since they are derived
from the Σ-protocol via Fiat-Shamir heuristic transformation,
the scheme is easy to prove the completeness, soundness and
zero-knowledge, and we ignore it here.
Theorem 2: The SOK1 constructed from Σ-protocol and
Fiat-Shamir heuristic theorem satisﬁes the properties of com-
pleteness, soundness, zero-knowledge.
PROOF (SKETCH). We discuss completeness, soundness and
zero-knowledge respectively.
Completeness: First, we need to prove the correctness
of
the
converted
SOK1.
The
converted
signature
of
knowledge
is
SOK1{(ζ1, ζ2, θ1, θ2, ski, uidi, w, α) : B1 =
gζ1hζ2 ∧Buidi
1
= gθ1hθ2 ∧T4/T1 = T ski
2 T uidi
3
∧T6 =
T7
θ2T8
ζ2T9
−uidi) ∧cnym1 = gα ∧cnym2 = dpkα · T ski
6 },
Note
B1 = gζ1hζ2 ∧Buidi
1
= gθ1hθ2,
it
implies
θ1 =
ζ1 · uidi,
θ2 = ζ2 · uidi.
Then,
T4/T1 = T ski
2 T uidi
3
=⇒
e(η′
2, ˜g)/e(η′
1, ˜X) = e(η′
1, ˜Y1)skie(η′
1, ˜Y2)uidi =⇒e(η′
1, ˜X ·
˜Y ski
1
· ˜Y uidi
2
) = e(η′
2, ˜g). Meanwhile,
T6 = T7
θ2T8
ζ2T9
−uidi
=⇒e(B2, apk)/e(acc, ˜h) = e(h, ˜h)
θ2
× e(h, apk)ζ2e(B2, ˜h)
−uidi
=⇒e(w · hζ2, apk · ˜huidi)/e(acc, ˜h)
= e(h, ˜h)
ζ2·uidie(h, apk)ζ2
=⇒e(w, apk · ˜huidi)e(hζ2, apk · ˜huidi)
= e(acc, ˜h)e(h, ˜h)
ζ2·uidie(h, apk)ζ2
=⇒e(w, apk · ˜huidi) = e(acc, ˜h)
Then, we have that the SOK1s before and after conversion are
equivalent. Second, we need to prove that the process on the
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:48:42 UTC from IEEE Xplore.  Restrictions apply. 



# Page 10

BAO et al.: BAP: A BLOCKCHAIN-ASSISTED PRIVACY-PRESERVING AUTHENTICATION PROTOCOL
4215
converted SOK is correct. Since the SOK is used to prove simple
discrete logarithmic relations, it is easy to prove its correctness.
Soundness:
Assuming
the
discrete
logarithm
assump-
tion,
we
can
prove
that
the
proposed
scheme
satis-
ﬁes soundness under the random oracle model. Assum-
ing a PPT prover P output an accepted transcript π =
(c, zζ1, zζ2, zθ1, zθ2, zski, zuidi, zw, zα) to the V. There exists
a knowledge extractor E. E can use rewinding to get another
transcript (c′, z′
ζ1, z′
ζ2, z′
θ1, z′
θ2, z′
ski, z′
uidi, z′
w, z′
α). Further, the
E can extract the witness:
ζ1 =
zζ1 −z′
ζ1
c′ −c
,
ζ2 =
zζ2 −z′
ζ2
c′ −c
,
θ1 = zθ1 −z′
θ1
c′ −c
,
θ2 = zθ2 −z′
θ2
c′ −c
, ski = zski −z′
ski
c′ −c
,
uidi = zuidi −z′
uidi
c′ −c
, w = zw −z′
w
c′ −c .
The adversary can use this algorithm to break the ECDLP with
non-negligible probability. Thus, SOK1 satisﬁes soundness.
Zero-knowledge: For the Fiat-Shmir heuristic transforma-
tion, we prove that there exists a simulator S which can
simulate the interaction with a prover. S randomly chooses
c∗, z∗
ζ1, z∗
ζ2, z∗
θ1, z∗
θ2, z∗
ski, z∗
uidi, z∗
w, z∗
α ∈Z∗
p, and computes
D∗
1 = B1
c∗gz∗
ζ1 hz∗
ζ2, D∗
2 = B1
−z∗
uidi gz∗
θ1hz∗
θ2,
D∗
3 = (T4/T1)c∗T
z∗
ski
2
T
z∗
uidi
3
, D∗
4 = T6
c∗T7
z∗
θ2T8
z∗
ζ2T9
−z∗
uidi ,
D∗
5 = (cnym1)c∗gz∗
α, D∗
6 = (cnym2)c∗dpkz∗
αT6
z∗
ski.
S views the hash function H1 as a random oracle and set the
outputs H1(c∗, z∗
ζ1, z∗
ζ2, z∗
θ1, z∗
θ2, z∗
ski, z∗
uidi, z∗
w, z∗
α, m||time) to
c∗. Since all numbers are selected at random, the transcript
(m, D∗
1, D∗
1, D∗
2, D∗
3, D∗
4, D∗
5, D∗
6, c∗, z∗
ζ1, z∗
ζ2, z∗
θ1, z∗
θ2, z∗
ski,
z∗
uidi, z∗
w, z∗
α) are distributed identically with the a real one,
which concludes the zero-knowledge.
Then, we analyze the properties of our proposed scheme.
r Message authentication. The EUF-CMA of PS signature
ensures that the user’s private group key gski is unforge-
able. Further, due to the completeness and soundness
of SOK1, there exists no PPT adversary who can forge
a valid message/signature pair in the Message Signing
phase. Therefore, the veriﬁer can checks the validity of
the signature in the textsfMessage Veriﬁcation phase.
r Privacy Preservation. Privacy preservation is a paramount
concern in our paper, given the sensitivity of vehicular
data and the potential threats in VANETs. To ensure a
comprehensive analysis of privacy, we conduct a thorough
analysis of our protocol from the perspective of each entity
involved.
– For an honest and curious TA, our protocol employs ZKPOK1
to safeguard the secrecy of each vehicle’s secret key (ski).
This cryptographic technique enables the TA to grant access
to vehicle i without having access to ski. As a result, the TA
remains unaware of individual vehicle identities, reinforcing
privacy protection.
– To address potential threats from malicious veriﬁers during the
Message Veriﬁcation phase, we utilize SOK1. This ensures
that each vehicle possesses a valid signature on η, effectively
concealing the real identity of the vehicle. Even with the
TA’s involvement in the process, the actual vehicle identity
remains hidden from the TA and any potential eavesdroppers
or malicious entities.
– For an honest and curious Data Provider (DP), our protocol
limits the information accessible to them. The DP can only
obtain pseudonyms of vehicles and has restricted access to
linking information for the same vehicle in the case of implicit
linkability. In the case of explicit linkability, the DP is a
passive recipient of unsolicited information from the vehicle.
Our protocol ensures that sensitive vehicular data remains
secure and anonymous, mitigating the risk of privacy breaches.
r Conditional Traceability. Only the TA can open can open
the vehicle’s identity when there is malicious behavior
occurring. In this article, this property is ensured by
searching the entries (i, γi, ˜γi, σi, uidi) in his own register
whether e(η2, ˜g) · e(η1, ˜X)−1 = e(η1, ˜γ)) holds. There-
fore, our scheme can effectively provides conditional trace-
ability.
r Unlinkability. In the Message Signing phase, the vehicle
can produce a group signature π, which ensures that it
has a valid re-randomized signature η′ of η, along with a
encrypted pseudonym cnym ←(cnym1, cnym2). Since
the use of PS group signature, the signature η′ is re-
randomized, and cnym is encrypted pseudonym of the
pseudonym nym by using a random number r, there is
no no PPT adversary who can link two messages sent by
the same vehicle based on previous communication history.
r Resistance against other common attacks: Our scheme
can resist against commonly encountered attacks in
VANETs, such as replay attacks, modiﬁcation attacks, and
impersonation attacks.
– Impersonation attack: Once a adversary wants to imper-
sonate a legal vehicle, it needs to forge a valid siganture
of the TA. However, the message authentication property
makes it difﬁcult for a PPT adversary.
– Modiﬁcation attack: Since the completeness and sound-
ness of SOK, the adversary cannot forge a valid group
signature. Moreover, any modiﬁcation can be discovered
in the veriﬁcation phase.
– Man-in-the-middle attack: Since the message authenti-
cation property is given previously, the adversary cannot
forge a valid signature without knowing ski. Thus, our
scheme can defend this attack.
– Replay attack: At each authentication, a new SOK1 is
generated and embedded with a current timestamp time.
By checking the timestamp, it can be ensured that the
scheme can resist replay attacks
– Key escrow problem: The identity-based system always
leaks the user’s private key if the authority is corrupted.
However, in our scheme, even the TA is corrupted, the
secret key of a vehicle (i.e., ski) is still preserved.
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:48:42 UTC from IEEE Xplore.  Restrictions apply. 



# Page 11

4216
IEEE TRANSACTIONS ON INTELLIGENT VEHICLES, VOL. 9, NO. 2, FEBRUARY 2024
– Birthday collision resilience: We make use of a
hash function H2 to generate a transaction id in
transaction contract. Since the collision-resistant of
hash functions (e.g., SHA256), our scheme can defend
this attack.
r Implicit linkability: For the same scope, the vehicle’s
pseudonym is the same. This property comes straight-
forward. After the decryption, the DP get the message’s
nymi = H1(scp)ski. If nymi = nymi, this necessarily
indicates that the messages corresponding to the two
pseudonyms belong to the same topic of the same vehicle.
r Explicit linkability: This property is ensured by active dec-
laration of the vehicle. If the ZKPOK1 is well-formed,
then we have ZKPOK2{(ski) : nym1 = H1(scp1)ski ∧
. . . ∧nymk = H1(scpk)ski}. It implies that the messages
corresponding to these pseudonyms belong to the different
topic of the same vehicle.
VII. PERFORMANCE EVALUATION
In this section, we divided the discussion into three parts:
blockchain cost, authentication cost, and simulation and results.
We test BAP in a simulated scenario of VANET. The experimen-
tal results showed the feasibility of our scheme.
A. Blockchain Cost
We make use of Ethereum for our blockchain test network
(i.e., Rinkeby). More speciﬁcally, we use a Remix which sup-
ports compiler (pragma solidity 0.4.25), language (Solidity),
EVM version (compiler default). In Ethereum smart contracts,
each operation (such as transferring funds, storing data) requires
a certain amount of gas, which is a pricing unit in Ethereum used
to pay for executing smart contract operations. Note that the
smart contract method marked as view does not need to modify
the state on the blockchain, so it does not consume any gas. This
is because the view method only reads data on the blockchain
and does not modify it.
We wrote two smart contracts authentication contract and
transaction contract. Then, we compile and depoly them on
the test network. Based on the contracts, we calculated the gas
required for each operation and the corresponding USD cost (gas
requires consumption of ether, which can be purchased in USD).
We know that 1 gas needs 32 GWei and 1 GWei = 10−9 Ether,
1 Ether ≈1, 878 USD.1
We use “deploy1” and “deploy2” to represent the de-
ployment of smart contracts authentication contract and
transaction contract. The gas cost for these two operations
is slightly larger, respectively. Fortunately, they only need to
be operated at contract initialization phase, and getAcc and
getTX algorithms are gas-free. As shown in Figs. 8 and 9,
the gas costs of updateUser and addTX algorithms are 154426
(0.004941632 USD) and 365576 (0.011698432 USD), respec-
tively, which demonstrates the practicality of our scheme.
Scalability: Evaluating the scalability of VANETs is crucial as
these networks involve numerous vehicles generating signiﬁcant
1https://etherscan.io/gastracker, accessed on April 26, 2023.
Fig. 6.
TPS for authentication contract.
Fig. 7.
TPS for transaction contract.
data. To achieve this, we utiliz the Ethereum client, “geth” to
deploy the smart contract representing our proposed protocol
onto the blockchain network. Subsequently, we employ the
CURL command-line tool to execute remote procedure calls
(RPC) and interact with the deployed smart contract. To assess
the scalability of our protocol, we conduct thorough load testing
using the Apache HTTP server benchmarking tool, “ab”. We
design a series of experiments with varying levels of concur-
rency (i.e., the number of simultaneous requests) to emulate
real-world scenarios with increasing numbers of participants. By
employing the “ab” tool with parameters -n 1000 (total number
of requests) and -c 100 (concurrency level), we systematically
test the protocol’s performance under different workloads.
As shown in the Figs. 6 and 7, the average TPS of the
blockchain ranges from 350 to 450, making it suitable for ac-
commodating the demands of VANETs applications. The results
of our experiments demonstrat promising scalability character-
istics, as the protocol maintain a relatively high TPS even with
increased concurrency. This indicates that our proposed protocol
can handle a substantial volume of transactions and participants
while sustaining satisfactory performance. Indeed, while our
solution has been locally tested using “geth,” acknowledging
that real-world implementations may vary, our future research
direction focuses on conducting practical evaluations in live
vehicular ad hoc networks (VANETs).
Resource Requirements: Based on the operation of existing
Ethereum clients [32], we list the minimum and recommended
hardware speciﬁcations as follows:
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:48:42 UTC from IEEE Xplore.  Restrictions apply. 



# Page 12

BAO et al.: BAP: A BLOCKCHAIN-ASSISTED PRIVACY-PRESERVING AUTHENTICATION PROTOCOL
4217
TABLE II
EXECUTION TIME AND DATA SIZE
r Minimum Requirements: CPU: 2 cores or above, Memory:
8 GB, Available Hard Disk Space: 700 GB, Bandwidth:
10 MB/second or above.
r Recommended Hardware: CPU: 4 cores or above, with
high speed, Memory: 16 GB or above, High-Speed
Solid State Drive (SSD): 1 TB or above, Bandwidth:
25 MB/second or above.
B. Authentication Cost
In this section, we conduct our experiment on the laptop with
an AMD Ryzen 7 6800H processor, clocking in at 3.20 GHz.
It also comes equipped with 16 GB of RAM. The system
operatesona64-bitoperatingsystem,basedonanx64processor.
We tested each common operation (e.g., point addition, point
multiplication) by executing each operation 1000 times to take
the average value, and the results are shown in Table II. we also
summarized the size of the components in the scheme (also see
Table II).
Further,
we compare our scheme with the closest works
BCPPA [4], BPAS [7] focused on providing privacy-preserving
authentication protocol. For the computational cost, we compare
our scheme with other schemes in detail in Table III and Fig. 10.
Note that [7] provides additional access control, so the cost is
larger. Both [7] and [4] cannot provide data linkability, which
reduces the computational cost in this aspect. In our scheme,
we use the precomputed techniques. Let T1 = e(η′
1, ˜X), T2 =
e(η′
1, ˜Y1), T3 = e(η′
1, ˜Y2), T4 = e(η′
2, ˜g). Then, since η′
1 =
ηr
1, the vehicle can ﬁrst pre-compute U1 = e(η1, ˜X), U2 =
e(η1, ˜Y1), U3 = e(η1, ˜Y2), U4 = e(η2, ˜g). When the vehicle
Fig. 8.
Gas cost of our scheme.
Fig. 9.
USD cost of our scheme.
Fig. 10.
Computational cost.
need to sign a message, he can directly calculate T1 = U r
1 , T2 =
U r
2 , T3 = U r
4 , T4 = U r
4 . Note that T5 = H1(scp), T7 = e(h, ˜h),
T8 = e(h, apk) also can be pre-computed. Since our solution
supports additional features: implicit and explicit linkability, the
computational cost of our scheme is in an acceptable range.
For the communication cost, we compare the schemes in
Fig. 11. BCPPA needs to transmit a transaction id along with
a signature and a timestamp. The total communication cost is
3|txid| + 4|Zp| + |time| + |msg| (264 bytes + |msg|). BPAS
requires a ABE encryption and a signature to transferred. The
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:48:42 UTC from IEEE Xplore.  Restrictions apply. 



# Page 13

4218
IEEE TRANSACTIONS ON INTELLIGENT VEHICLES, VOL. 9, NO. 2, FEBRUARY 2024
TABLE III
THEORETICAL TIME
Fig. 11.
Signature size.
Fig. 12.
Map of Washington, D.C. (USA).
total communication cost is |G1| + |Zp| + |time| + |msg| +
|ABE| (200 bytes + 128ℓ+ |msg|), which is linear to ℓ. Our
scheme BAP needs to send (m, scp, π, cnym, time), whose
size is 2|G1| + 9|Zp| + |time| + |msg| + |scp| (354 bytes +
|msg|). Due to the need for additional encrypted pseudonym
communication, the signature size of our scheme is between the
2 schemes.
C. Simulation and Results
In this section, we run simulations of our schemes. We use
VanetMobiSim to simulate mobile nodes in VANETs as a way
Fig. 13.
Virtual map.
Fig. 14.
APD and PLR with different densities.
Fig. 15.
APD and PLR with different speeds.
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:48:42 UTC from IEEE Xplore.  Restrictions apply. 



# Page 14

BAO et al.: BAP: A BLOCKCHAIN-ASSISTED PRIVACY-PRESERVING AUTHENTICATION PROTOCOL
4219
Fig. 16.
APD and PLR with different network latency.
to evaluate the communication performance, routing protocols,
and the effectiveness of communication protocols in vehicular
networks. We use NS-2 to perform discrete-time simulations,
which needs to set the number of vehicle nodes, the number
of RSUs, and import map information. The network latency
can be simulated by setting the transmission delay of the links
during the creation of the network topology. Note that we use a
1.0 ∗1.0 km2 map in Fig. 12 in Washington, D.C. (USA) whose
Latitude and longitude are (38.900015 ◦, −77.021515 ◦). We use
a virtual map in Fig. 13 to perform the simulation.
We perform three types of simulations. First, we ﬁx the speed
of the vehicles at 30 m/s −40 m/s and the transmission delay at
0 ms, then change the density of the vehicles from 5 to 100. We
get the corresponding average packet delay (APD) and packet
loss rate (PLR). As shown in Fig. 14, APD starts to rise at 30
vehicles, while PLR starts to rise rapidly at 60 vehicles. Second,
we ﬁx the number of the vehicles at 50 and the transmission
delay at 0 ms, then change the speeds of the vehicles from 5 m/s
to 100 m/s. As shown in Fig. 15, we ﬁnd that APD and PLR
vary dynamically and do not increase linearly with increasing
vehicle speed. Third, we ﬁx the number of the vehicles at 50
and the speed of the vehicles at 30 m/s−40 m/s, then change the
network latency from 10 m/s to 100 m/s. As shown in Fig. 16,
TheAPDandPLRexhibitapositivecorrelationwiththeincrease
in network latency.
VIII. CONCLUSION
In this article, we introduced BAP, a privacy-preserving au-
thentication protocol enhanced by blockchain technology. Our
protocol utilizes PS group signature, ZKPOK, SOK, accumula-
tor and blockchain techniques to ensure privacy protection. We
employ accumulators for efﬁcient registration and revocation of
user identities. The use of blockchain enhances data security and
mitigates the risk of data tampering by malicious participants.
Through the security analysis, we veriﬁed the properties of
ZKPOK and SOK protocols, as well as the overall security
of BAP. The protocol supports message authentication, privacy
preservation, traceability, and resistance against common at-
tacks while providing user-controlled linkability. In the perfor-
mance evaluation, we assessed blockchain, authentication, and
simulation costs. Overall, BAP demonstrated commendable ef-
ﬁciency and scalability.
Future work will focus on scalability, privacy-utility trade-
offs,andreal-worlddeploymenttofurtheradvancetheprotocol’s
capabilities and applicability. We aim to address several aspects
to further enhance BAP:
r Scalability: Exploring techniques like sharding and layer-
two solutions to improve the protocol’s scalability for
large-scale deployments.
r Privacy-Utility Trade-off: Adjusting the protocol to strike
a balance between privacy protection and utility remains a
focus of future research.
r Real-world Deployment: Conducting real-world deploy-
ments and pilot studies in vehicular networks or other
relevant scenarios will help validate BAP’s practicality.
REFERENCES
[1] J. Cheng, J. Cheng, M. Zhou, F. Liu, S. Gao, and C. Liu, “Routing in
internet of vehicles: A review,” IEEE Trans. Intell. Transp. Syst., vol. 16,
no. 5, pp. 2339–2352, Oct. 2015.
[2] S. Sarkar et al., “Effective urban structure inference from trafﬁc ﬂow
dynamics,” IEEE Trans. Big Data, vol. 3, no. 2, pp. 181–193, Jun. 2017.
[3] J.Shen,C.Wang,A.Castiglione,D.Liu,andC.Esposito,“Trustworthiness
evaluation-based routing protocol for incompletely predictable vehicu-
lar ad hoc networks,” IEEE Trans. Big Data, vol. 8, no. 1, pp. 48–59,
Feb. 2022.
[4] C. Lin, D. He, X. Huang, N. Kumar, and K.-K. R. Choo, “BCPPA: A
blockchain-based conditional privacy-preserving authentication protocol
for vehicular ad hoc networks,” IEEE Trans. Intell. Transp. Syst., vol. 22,
no. 12, pp. 7408–7420, Dec. 2021.
[5] S. S. Manvi and S. Tangade, “A survey on authentication schemes in
VANETs for secured communication,” Veh. Commun., vol. 9, pp. 19–30,
2017.
[6] S.Son,J.Lee,Y.Park,Y.Park,andA.K.Das,“Designofblockchain-based
lightweight V2I handover authentication protocol for VANET,” IEEE
Trans. Netw. Sci. Eng., vol. 9, no. 3, pp. 1346–1358, May/Jun. 2022.
[7] Q. Feng, D. He, S. Zeadally, and K. Liang, “BPAS: Blockchain-assisted
privacy-preserving authentication system for vehicular ad hoc networks,”
IEEE Trans. Ind. Informat., vol. 16, no. 6, pp. 4146–4155, Jun. 2020.
[8] F. Wang, Y. Xu, H. Zhang, Y. Zhang, and L. Zhu, “2FLIP: A two-factor
lightweight privacy-preserving authentication scheme for VANET,” IEEE
Trans. Veh. Technol., vol. 65, no. 2, pp. 896–911, Feb. 2016.
[9] L.GarmsandA.Lehmann,“Groupsignatureswithselectivelinkability,”in
Proc. Public-Key Cryptography–PKC 22nd IACR Int. Conf. Pract. Theory
Pub.-Key Cryptography, 2019, pp. 190–220.
[10] J. Diaz and A. Lehmann, “Group signatures with user-controlled and
sequential linkability,” in Proc. Public-Key Cryptography–PKC 24th IACR
Int. Conf. Pract. Theory Public Key Cryptography, Virtual Event, 2021,
pp. 360–388.
[11] T. T. A. Dinh, R. Liu, M. Zhang, G. Chen, B. C. Ooi, and J. Wang,
“Untangling blockchain: A data processing view of blockchain systems,”
IEEE Trans. Knowl. Data Eng., vol. 30, no. 7, pp. 1366–1385, Jul. 2018.
[12] Z. Zheng et al., “An overview on smart contracts: Challenges, advances
and platforms,” Future Gener. Comput. Syst., vol. 105, pp. 475–491, 2020.
[13] M. Raya and J.-P. Hubaux, “Securing vehicular ad hoc networks,” J.
Comput. Secur., vol. 15, no. 1, pp. 39–68, 2007.
[14] R. Lu, X. Lin, H. Zhu, P.-H. Ho, and X. Shen, “ECPP: Efﬁcient con-
ditional privacy preservation protocol for secure vehicular communica-
tions,” in Proc. IEEE INFOCOM 27th Conf. Comput. Commun., 2008,
pp. 1229–1237.
[15] A. Wasef and X. Shen, “EMAP: Expedite message authentication protocol
forvehicularadhocnetworks,”IEEETrans.MobileComput.,vol.12,no.1,
pp. 78–89, Jan. 2013.
[16] S. Soleymani et al., “An authentication and plausibility model for Big Data
analytic under LOS and NLOS conditions in 5G-VANET,” Sci. China Inf.
Sci., vol. 63, pp. 1–17, 2020.
[17] H. Wen, P. Ho, and G. Gong, “A framework of physical layer technique
assisted authentication for vehicular communication networks,” Sci. China
Inf. Sci., vol. 53, pp. 1996–2004, 2010.
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:48:42 UTC from IEEE Xplore.  Restrictions apply. 



# Page 15

4220
IEEE TRANSACTIONS ON INTELLIGENT VEHICLES, VOL. 9, NO. 2, FEBRUARY 2024
[18] C. Zhang, P.-H. Ho, and J. Tapolcai, “On batch veriﬁcation with
group testing for vehicular communications,” Wireless Netw., vol. 17,
pp. 1851–1865, 2011.
[19] T.W.Chim,S.-M.Yiu,L.C.Hui,andV.O.Li,“SPECS:Secureandprivacy
enhancing communications schemes for VANETs,” Ad Hoc Netw., vol. 9,
no. 2, pp. 189–203, 2011.
[20] S.-J. Horng et al., “b-SPECS : Batch veriﬁcation for secure pseudonymous
authenticationinVANET,”IEEETrans.Inf.ForensicsSecur.,vol.8,no.11,
pp. 1860–1875, Nov. 2013.
[21] D. He, S. Zeadally, B. Xu, and X. Huang, “An efﬁcient identity-based con-
ditionalprivacy-preservingauthenticationschemeforvehicularadhocnet-
works,” IEEE Trans. Inf. Forensics Secur., vol. 10, no. 12, pp. 2681–2691,
Dec. 2015.
[22] Z.Lu,Q.Wang,G.Qu,H.Zhang,andZ.Liu,“Ablockchain-basedprivacy-
preserving authentication scheme for VANETs,” IEEE Trans. Very Large
Scale Integration Syst., vol. 27, no. 12, pp. 2792–2801, Dec. 2019.
[23] D. Gabay, K. Akkaya, and M. Cebe, “Privacy-preserving authentication
scheme for connected electric vehicles using blockchain and zero knowl-
edge proofs,” IEEE Trans. Veh. Technol., vol. 69, no. 6, pp. 5760–5772,
Jun. 2020.
[24] P. Li, J. Lai, and Y. Wu, “Accountable attribute-based authentication with
ﬁne-grained access control and its application to crowdsourcing,” Front.
Comput. Sci., vol. 17, no. 1, 2023, Art. no. 171802.
[25] D. He, C. Chen, S. Chan, and J. Bu, “Secure and efﬁcient handover
authentication based on bilinear pairing functions,” IEEE Trans. Wireless
Commun., vol. 11, no. 1, pp. 48–53, Jan. 2012.
[26] O. Goldreich and A. Kahan, “How to construct constant-round zero-
knowledge proof systems for NP,” J. Cryptol., vol. 9, no. 3, pp. 167–189,
1996.
[27] I. Damgård, “On Σ-protocols,” 2002. Accessed: Jul. 22, 2023. [Online].
Available: https://www.cs.au.dk/∼ivan/Sigma.pdf
[28] M. Chase and A. Lysyanskaya, “On signatures of knowledge,” in Proc.
Adv. Cryptol.-CRYPTO 26th Annu. Int. Cryptol. Conf., 2006, pp. 78–96.
[29] D. Pointcheval and O. Sanders, “Short randomizable signatures,” in
Proc. Topics Cryptol.-CT-RSA Cryptographers’ Track RSA Conf., 2016,
pp. 111–126.
[30] L. Nguyen, “Accumulators from bilinear pairings and applications,” in
Proc. Topics Cryptology–CT-RSA Cryptographers’ Track RSA Conf.,
2005, pp. 275–292.
[31] M. H. Au, P. P. Tsang, W. Susilo, and Y. Mu, “Dynamic universal accumu-
lators for DDH groups and their application to attribute-based anonymous
credential systems,” in Proc. Topics Cryptol.–CT-RSA Cryptographers’
Track RSA Conf., 2009, pp. 295–308.
[32] Ethereum, “Run an ethereum node - ethereum developers documenta-
tion,” 2023. [Online]. Available: https://ethereum.org/en/developers/docs/
nodes-and-clients/run-a-node/
Zijian Bao received the M.S. degree in computer
application technology from the School of Computer
Science and Engineering, Northeastern University,
Shenyang, China, in 2019. He is currently work-
ing toward the Ph.D. degree with the Key Labora-
tory of Aerospace Information Security and Trusted
Computing Ministry of Education, School of Cy-
ber Science and Engineering, Wuhan University,
Wuhan, China. His research focuses on cryptographic
protocols.
Debiao He (Member, IEEE) received the Ph.D. de-
gree in applied mathematics from the School of Math-
ematics and Statistics, Wuhan University, Wuhan,
China, in 2009. He is currently a Professor with the
School of Cyber Science and Engineering, Wuhan
University, Wuhan, China. He has authored and
coauthored more than 100 research papers in ref-
ereed international journals and conferences, such
as IEEE TRANSACTIONS ON DEPENDABLE AND SE-
CURE COMPUTING, IEEE TRANSACTIONS ON INFOR-
MATION FORENSICS AND SECURITY, and Usenix Se-
curity Symposium. His research interests include cryptography and information
security, in particular cryptographic protocols. He is with the Editorial Board of
several international journals, such as ACM Distributed Ledger Technologies:
Research & Practice, Frontiers of Computer Science, and IEEE TRANSACTIONS
ON COMPUTERS.
HuaqunWangreceivedtheB.S.degreeinmathemat-
ics education from the Shandong Normal University,
Jinan, China and M.S. degree in applied mathematics
from the East China Normal University, Shanghai,
China, in 1997 and 2000, respectively. He received
the Ph.D. degree in cryptography from Nanjing Uni-
versity of Posts and Telecommunications, Nanjing,
China, in 2006, where he is currently a Professor.
His research interests include applied cryptography,
network security, and cloud computing security.
Min Luo received the Ph.D. degree in computer
science from Wuhan University,Wuhan, China, in
2003. He is currently a Professor with the School
of Cyber Science and Engineering, Wuhan Univer-
sity. He has published papers in international con-
ferences/journals, such as IEEE SECURITY AND PRI-
VACY, ACM Transactions on Reconﬁgurable Tech-
nology and Systems, IEEE SYSTEMS JOURNAL, and
IEEE TRANSACTIONS ON VEHICULAR TECHNOLOGY.
His research interests include applied cryptography
and blockchain technology.
Cong Peng received the Ph.D. degree in applied
mathematics from the School of Mathematics and
Statistics, Wuhan University, Wuhan, China, in 2021.
HeiscurrentlyanAssociateProfessorwiththeSchool
of Cyber Science and Engineering, Wuhan Univer-
sity, Wuhan, China. His research interests include
applied cryptography and data security.
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:48:42 UTC from IEEE Xplore.  Restrictions apply. 
