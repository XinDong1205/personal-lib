

# Page 1

IEEE TRANSACTIONS ON INFORMATION FORENSICS AND SECURITY, VOL. 20, 2025
6413
A Blockchain-Driven Hierarchical Authentication
and Key Agreement Scheme for VANETs With
Cloud-Edge Collaboration
Lu Wei , Member, IEEE, Yongjuan Zhang, Jie Cui , Senior Member, IEEE, Hong Zhong , Irina Bolodurina ,
and Debiao He , Member, IEEE
Abstract—Vehicular ad-hoc networks (VANETs) are the cor-
nerstone
of
intelligent
transportation
systems,
designed
to
enhance road safety and traﬃc eﬃciency. However, their dynamic
and distributed nature poses signiﬁcant challenges for secure
communication and key management. Traditional authentication
and key agreement (AKA) schemes for VANETs often rely on
centralized trust architectures, resulting in system security and
reliability issues. Despite the introduction of distributed trust
architecture schemes that have appeared recently, they fail to
solve one issue, i.e., how the key agreement requests can be
authenticated in the distributed communication scenario where
the authentication authorities are all non-full-credible and have
diﬀerentiated credibility. To solve this issue, we propose a hier-
archical AKA scheme for VANETs with cloud-edge collaboration
powered by consortium blockchain. Speciﬁcally, we ﬁrst proposed
a vehicle reputation evaluation algorithm for evaluating the
trustworthiness of the vehicle, so that the AKA requests sent
by vehicles with low reputation will be rejected. On the basis of
the reputation evaluation algorithm, we proposed a hierarchical
threshold-based AKA scheme for VANETs where cloud servers
(CSs) and edge servers (ESs) can collaboratively authenticate the
AKA requests, so that the authentication service can be trusted
upon getting authenticated by a series of valid combinations of
CSs and ESs. Both formal and informal security proofs validate
the security of our proposed scheme, and simulation experiments
demonstrate its eﬃciency.
Index Terms—Authentication and key agreement, hierarchical
authentication, vehicular ad-hoc networks, blockchain.
Received 24 September 2024; revised 1 April 2025; accepted 12 June 2025.
Date of publication 18 June 2025; date of current version 27 June 2025. This
work was supported in part by the National Natural Science Foundation of
China under Grant U23A20308, Grant 62302008, Grant 62202008, and Grant
62325209; in part by the Natural Science Foundation of Anhui Province,
China, under Grant 2408085JX010; and in part by the University Synergy
Innovation Program of Anhui Province under Grant GXXT-2022-049. The
associate editor coordinating the review of this article and approving it for
publication was Prof. Kun Sun. (Corresponding author: Jie Cui.)
Lu Wei, Yongjuan Zhang, Jie Cui, and Hong Zhong are with the Key
Laboratory of Intelligent Computing and Signal Processing of Ministry of
Education, School of Computer Science and Technology, and the Insti-
tute of Physical Science and Information Technology, Anhui University,
Hefei 230601, China, and also with Anhui Engineering Laboratory of
IoT Security Technologies, Anhui University, Hefei 230039, China (e-mail:
cuijie@mail.ustc.edu.cn).
Irina Bolodurina is with the Faculty of Mathematics and Information
Technologies, Orenburg State University, 460018 Orenburg, Russia (e-mail:
prmat@mail.osu.ru).
Debiao He is with the School of Cyber Science and Engineering, Wuhan
University, Wuhan 430072, China, and also with Shanghai Key Laboratory
of Privacy Preserving Computation, MatrixElements Technologies, Shanghai
201204, China (e-mail: hedebiao@163.com).
Digital Object Identiﬁer 10.1109/TIFS.2025.3581022
I. INTRODUCTION
T
HE vehicular ad-hoc networks (VANETs) are an open
converged network that is dedicated to enhancing auto-
motive intelligence and autonomous driving through the
all-round interconnection of vehicles, people, and networks, as
well as innovating the automotive and transportation service
industry to enhance transportation eﬃciency and elevate the
overall driving experience.
With the rapid increase in vehicles and diverse user
demands, vehicle-generated data is soaring. Eﬀective data pro-
cessing is crucial for a secure and eﬃcient vehicular network,
resulting in traditional VANETs communication architectures
always rely on centralized cloud servers (CSs) to process
data. However, while cloud servers (CSs) handle most data
computation and storage, their distance from vehicles can
cause high latency. Additionally, centralized VANETs commu-
nication architectures are always vulnerable to various security
attacks, especially for internal attacks. For instance, Tesla
suﬀered a severe data breach orchestrated by an internal adver-
sary, where a whistleblower allegedly accessed and leaked
approximately 100GB of sensitive and proprietary information
such as customer data, employee salaries, bank accounts, and
source code [1]. Likewise, Toyota encountered a production
shutdown in Japan when a trusted internal supplier became
the entry point for a cyberattack, prompting the suspension of
operations in 14 factories for a full day [2].
In order to address the performance and security issues
inherent in centralized VANETs communication architectures,
the decentralized and cloud-edge collaborative architecture has
been proposed recently. By leveraging the powerful compu-
tation capabilities of cloud servers alongside the proximity
advantages of edge servers (ESs), which enable real-time data
processing closer to the data source, this approach ensures both
security and high performance for VANETs communications.
Furthermore, the cloud-edge collaborative vehicular network-
ing framework improves service quality for real-time traﬃc
applications, resolving the shortcomings of purely cloud-based
systems and guaranteeing timely, reliable services for vehicles
and users.
Under distributed VANETs communication architectures,
distributed authentication and key agreement (AKA) schemes
designed for the secure communication requirements of
1556-6021 © 2025 IEEE. All rights reserved, including rights for text and data mining, and training of artiﬁcial intelligence and
similar technologies. Personal use is permitted, but republication/redistribution requires IEEE permission.
See https://www.ieee.org/publications/rights/index.html for more information.
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:44:50 UTC from IEEE Xplore.  Restrictions apply. 



# Page 2

6414
IEEE TRANSACTIONS ON INFORMATION FORENSICS AND SECURITY, VOL. 20, 2025
VANETs have shown rapid growth. Zhang et al. [3] introduced
an innovative distributed aggregate AKA scheme. The scheme
adopts a layered trusted architecture. While this scheme
eﬀectively ensures system robustness, it requires RSUs to be
honest and trustworthy, leading to high computational and
communication overhead. Zhu and Liu [4] designed an AKA
scheme using chaotic mapping that supports a multi-server-to-
server architecture in which any server can assume the role of
a registry. Thus, this approach necessitates attention to avert
potential single points of failure.
While existing AKA schemes can ensure security in dis-
tributed key agreement processes under a single authenticated
entity and eﬀectively mitigate external attacks, they exhibit
critical limitations in complex distributed communication
scenarios where authenticated entities possess heterogeneous
privileges and may not be fully trustworthy. To overcome these
challenges, we propose a novel blockchain-driven hierarchical
AKA scheme for vehicular ad hoc networks (VANETs) with
cloud-edge collaboration. The proposed scheme innovatively
leverages cloud servers and edge servers as hierarchically
structured authentication entities with diﬀerentiated permis-
sion levels to collaboratively process AKA requests. Within
this framework, an AKA request is deemed authenticated
only when the combined authentication shares from both
the cloud and edge servers satisfy a predeﬁned threshold,
thereby substantially bolstering the security of the authentica-
tion process. To further fortify the system’s resilience against
internal attacks, the scheme incorporates a dynamic reputation
evaluation mechanism, which synthesizes a vehicle’s historical
communication behavior with real-time communication data
to dynamically assess and update the vehicle’s reputation
score. If a vehicle’s reputation falls below a system-deﬁned
security threshold, it is promptly excluded from participating
in VANETs communications, thereby preemptively neutral-
izing potential insider threats. The main contributions are
summarized as follows:
1) We design a threshold-based hierarchical authentication
AKA scheme for securing VANETs. The scheme uses
CSs and ESs to build an authentication network for
complex distributed scenarios in which authentication
entities have diﬀerent privileges and are not fully trusted,
which not only eliminates the dependence on trusted
centres, but also gets rid of the dependence on the master
key through the concept of hierarchical threshold voting.
Even if a single server fails, the security of the system
will not be aﬀected, thus signiﬁcantly improving the
security and robustness of the overall system.
2) We propose a dynamic vehicle reputation mechanism to
enhance the security of AKA sessions. The mechanism
dynamically updates the reputation value of a vehicle by
evaluating its communication behavior in real-time and
imposes reputation penalties on vehicles sending false or
invalid information. When a vehicle’s reputation value
falls below a threshold set by the system, the vehicle
will be prohibited from launching AKA requests, thus
greatly reducing the probability of the engagement of
internal adversaries in the AKA session.
3) Finally, comprehensive security proofs and thorough
analyses are conducted. Experimental outcomes validate
that our scheme eﬀectively fulﬁlls the security objectives
of vehicular networks, oﬀering distinct security beneﬁts
over the latest VANETs AKA schemes.
II. RELATED WORK
The AKA scheme plays a crucial role in protecting vehicular
communication and addresses two core issues. First, it ensures
the identity of the participants and the authentication of
the interaction messages used for key agreement. Second, it
ensures the correctness and security of the key agreement
process. Since the communication channel of VANET is
open and insecure, it becomes crucial to establish an AKA
mechanism to support the legitimacy of the participants.
Currently, most of the AKA schemes in VANET rely on
a centralized trusted architecture, which necessitates a fully
trusted authority center to undertake functions such as registra-
tion, authentication, and revocation for participants including
vehicles and roadside units. Vijayakumar et al. [5] devised a
key agreement scheme based on batch authentication, which
eﬀectively reduces the computational cost at the vehicle side
by constructing a batch authentication algorithm executed
by the RSU. Ma et al. [6] devised an eﬃcient ECC-based
AKA scheme with trusted center involvement for mutual
authentication between vehicles and fog units, ensuring secure
communication within the system. Abbasinezhad-Mood et al.
[7] introduced an innovative key agreement protocol tailored
for the vehicle-to-grid network, emphasizing anonymity and
eﬃciency. Their scheme leverages chaotic mapping to facili-
tate secure and anonymous session key establishment between
electric vehicles and aggregators, enhancing the protection of
this network.
Wei et al. [8] presented a tree-structured AKA protocol
designed to safeguard both V2V and V2I communications
simultaneously. This protocol optimizes the process of vehicle
joining or leaving the network, minimizing both computational
and communication costs, thereby improving overall eﬃciency
and scalability. Chuang and Chen [9] introduced a multi-server
AKA scheme that oﬀers anonymity to users, enabling a single
registration process for access to multiple servers. However,
the dependency on a centralized registry poses a potential
risk of single-point-of-failure. Cui et al. [10] introduced an
adaptable and resilient key exchange mechanism tailored for
multi-cloud setups. Nevertheless, its reliance on a solitary TA,
renders it susceptible to DoS attacks. Islam et al. [11] devised
a lightweight approach for group key agreement, emphasiz-
ing minimal computational burden. However, it suﬀers from
reduced practicality due to numerous one-to-one interactions
and has security ﬂaws like vulnerability to man-in-the-middle
attacks and lack of forward security.
To reduce reliance on trusted centers, schemes based on dis-
tributed trust architectures, particularly leveraging blockchain
technology have emerged. These schemes aim to achieve
authentication [12], [13] and trust management [14], [15]
for IoT communication, enhancing system security and
robustness.
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:44:50 UTC from IEEE Xplore.  Restrictions apply. 



# Page 3

WEI et al.: BLOCKCHAIN-DRIVEN HIERARCHICAL AUTHENTICATION AND KEY AGREEMENT SCHEME FOR VANETs
6415
Ma et al. [16] introduced a decentralized key agreement
mechanism leveraging blockchain technology for eﬃcient
registration, updates, and revocation of vehicle public keys,
ensuring authenticity validation. However, only the vehicle
service provider and the RSU can trigger smart contracts
on the blockchain network, limiting decentralization to a
local level. Zhang et al. [17] devised a blockchain-integrated
AKA scheme, facilitating the secure exchange of key agree-
ment messages through blockchain transactions. However, the
chained loop structure causes delays as vehicles must wait
for block conﬁrmations sequentially, and the use of bilinear
pair cryptography adds further delays unsuitable for real
V2X communication scenarios. Meng et al. [18] proposed
a private chain-based AKA scheme for secure vehicle-edge
server communication. It records shared keys in the private
chain and introduces a public key registry for key manage-
ment. However, the scheme’s private chain network nodes are
vulnerable to attacks, compromising its security. Li et al. [19]
introduced a blockchain-based certiﬁable key agreement pro-
tocol, emphasizing unlinkability. However, the scheme relies
on the consortium blockchain, cannot run on the public chain,
and involves frequent homomorphic cryptographic operations,
leading to large computational and communication overheads.
Xu et al. [20] proposed an eﬃcient AKA scheme using
blockchain. Trusted centers maintain the network and authen-
tication algorithms. Blockchain stores vehicle identity for
cross-center authentication. However, it assumes trusted cen-
ters are honest and require security tamper-resistant devices,
posing high-security assumptions. Furthermore, reputation
systems have garnered signiﬁcant attention in recent vehicular
network advancements, with various researchers proposing
systems to uphold message trustworthiness. Li et al. [21]
introduced a mechanism enabling vehicles to gauge mes-
sage reliability by assessing senders’ reputation scores. These
scores reﬂect the vehicle’s historical track record of credi-
ble messaging, thereby providing insights into the likelihood
of future credible contributions. Yang et al. [22] proposed
a reputation system integrating blockchain technology for
assessing data trustworthiness, enabling vehicles to compute
senders’ reputation scores based on blockchain-stored ratings.
However, both this and the previously mentioned scheme fall
short of addressing comprehensive vehicular network security
challenges.
In summary, the research on AKA for VANET is mainly
divided into two aspects: centralized and distributed trusted
architectures, with the former having excellent performance
but high security assumptions, and the latter facing challenges
such as large computational and communication overheads
and insuﬃcient security strength although it solves some of
the problems, and both of them have not fully explored the
highly eﬃcient authentication key agreement mechanism using
blockchain technology under the non-trusted and semi-trusted
environments.
III. PRELIMINARIES AND BACKGROUND
A. Elliptic Curve Cryptosystem
In the ﬁeld of VANET security research, the elliptic curve
cryptosystem (ECC) is a commonly used encryption technique
that leverages the mathematical properties of elliptic curves to
provide security and eﬃciency. We introduce ECC from the
following perspectives:
1) Selection of Finite Field and Elliptic Curve: We ﬁrst
deﬁne a ﬁnite ﬁeld Fp, where p is a prime number that
speciﬁes the ﬁeld’s size. Subsequently, we select an elliptic
curve E deﬁned over this ﬁnite ﬁeld Fp, typically represented
by y2 = x3 + ax2 + b mod p, where a and b are elements in
the ﬁnite ﬁeld Fp.
2) Group Structure and Generator: In the ECC, we intro-
duce a cyclic additive group G, where P serves as the generator
of the group. The prime order q of the group G determines
the complexity and security of the ECC.
3) Computational and Decisional Challenges:
• Elliptic Curve Discrete Logarithm Problem (ECDLP): On
an elliptic curve E, if given two points P and Q such that
Q = sP, the likelihood of computing s for a probabilistic
polynomial-time (PPT) adversary is considered negligi-
ble.
• Elliptic Curve Decisional Diﬃe-Hellman Problem (ECD-
DHP): On an elliptic curve E, if given two tuples
P, xP, yP, xyP and P, xP, yP, zP, the likelihood of distin-
guishing between these two tuples for a PPT adversary is
considered negligible.
B. Secret Sharing Schemes
A (t, n) secret sharing scheme [23] over Zq is a polynomial
interpolation based threshold secret sharing scheme proposed
by Adi Shamir in 1979. The core idea is to partition the secret
S into n shares and set a threshold value k(1 < k ≤n) such that
the secret S cannot be recovered by satisfying any less than
k shares and can be uniquely determined by any less than k
shares. The core principle is as follows:
First, construct a (k−1)-order polynomial f(x) = a0 +a1x+
a2x2 + . . . + ak−1xk−1 where a0 = S (secret) and the factors
a1 . . . ak−1 are random numbers. Then, shares (xi, f(xi)) (i =
1, 2, . . ., n) are generated for n participants, with xi being the
public non-zero unique identiﬁer and f(xi) being the private
share value. The secret S = a0 can only be obtained by
reconstructing the polynomial to compute f(0) using Lagrange
interpolation as shown in Equation (1) if at least k secret shares
are collected.
f(x) =
k
X
i=1
f(xi)
kY
j=1, j,i
x −xj
xi −xj
(1)
C. System Model
Our proposed scheme involves ﬁve types of entities which
are the system initiator, cloud server (CS), edge server (ES),
roadside unit (RSU), and vehicle, that collaborate within the
system to achieve its overall functionality. The following is
a detailed description of each type of entity and the system
model visually represented in Fig. 1.
• System initiator: The system initiator is mainly responsi-
ble for the generation of system and security parameters,
the selection of semi-trusted entities that have the priv-
ilege of authenticating vehicles, and the management
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:44:50 UTC from IEEE Xplore.  Restrictions apply. 



# Page 4

6416
IEEE TRANSACTIONS ON INFORMATION FORENSICS AND SECURITY, VOL. 20, 2025
Fig. 1. System model.
of the blockchain network. Note that once the system
initiator is not involved in the AKA process.
• CS: CSs are semi-trusted entities deployed in the cloud,
leveraging their computational and storage capabilities
primarily to contribute to the construction of the consor-
tium blockchain, and achieving the authentication of the
AKA request message in the authentication phase. And
are also responsible for oﬀering registration services for
vehicles and RSUs.
• ES: ESs are semi-trusted entities deployed in closer
physical distance, which are mainly involved in the
authentication
of
AKA
request
messages
in
this
scheme.
• RSU: The RSU primarily facilitates network access
for vehicles and disseminates traﬃc and entertainment
updates to neighboring vehicles. In our proposed scheme,
the RSU collaborates with vehicles to initiate a key
agreement request.
• Vehicle: Vehicles are the most common entities in the
vehicular network. We set reputation values for vehicles
to assess their historical behaviour, as they are vulner-
able to internal or external attacks. The legitimacy of
the vehicle and the messages sent by the vehicle will
be authenticated based on the reputation value of the
vehicle.
IV. THE PROPOSED SCHEME
This section presents a comprehensive overview of our
proposed framework, structured into ﬁve distinct phases: setup,
reputation mechanism, registration, request, and response. The
steps involved in each phase are detailed below and the main
procedures are as shown in Fig. 2.
A. Setup Phase
In this phase, the consortium blockchain is constructed, and
system parameters are generated, along with the selection of
participating entities.
1) Blockchain Construction:
A consortium blockchain,
jointly administered and operated by multiple entities, boasts
of enhanced eﬃciency, robust security measures, and a decen-
tralized structure. In our proposed scheme, CS and ES jointly
construct and maintain a distributed consortium blockchain
network for authentication. We utilize the PBFT consensus
mechanism to safeguard the system’s reliability and secu-
rity. CS and ES participate in the authentication process
of requesting entities independently, respectively. A more
detailed explanation of this conﬁguration will be presented
in subsequent sections of our work.
2) Parameter Initialization: The initialization phase mainly
involves the selection of basic parameters and functions. CS
and ES cooperate to build the consortium blockchain and
complete the initialization process without relying on trusted
entities. Due to the diﬀerences in computing and storage
capacity between CS and ES, they will be given diﬀerent
secret sharing shares to participate in authentication during
the hierarchical threshold secret sharing phase. The speciﬁc
steps of the initialization process are outlined below:
1) The system initiator chooses a secure elliptic curve E :
y2 = x3 + ax + b mod p. A point P can be chosen
from E to generate an additive elliptic curve group G
with order q. In addition, system thresholds t1, t2 are
chosen to balance security and performance. In the key
agreement phase, e.g., it is necessary to satisfy that the
total authentication messages are no less than t2 and no
less than t1 of them come from the CS.
2) It is assumed that the number of CSs and ESs in the
consortium blockchain are n1,n2, where n1 + n2 = n. j
and l are the serial numbers of CSs and ESs respectively
(1 ≤j ≤n1,1 ≤l ≤n2). First, each CS and ES
entity selects random numbers x j, xl ∈Zq to calcu-
late their respective addresses addrj, addrl and sends
the registration request ciphertext that containing the
address information to the registration authority (RA).
Upon receiving the registration request, RA triggers
the execution of the smart contract function detailed
in Algorithm 1 via a signed transaction. Here tag1 is
used as a tag value to distinguish the type of server,
with tag1 = 0 denoting CS, and tag1 = 1 denoting
ES, respectively. Each CS and ES entity obtains a valid
blockchain address upon completing the registration.
3) Next, each CS generates random numbers a j, bj ∈Zq
and each ES generates bl ∈Zq as their respective secret
values. They then compute the public keys U j = ajP,
Kj = bjP, Kl = blP. The blockchain network secures the
storage of each entity’s public key information through
the smart contract functions outlined in Algorithm 3.
Here we leverage a cuckoo ﬁlter to eﬃciently store
the ﬁngerprints of public keys, thereby minimizing the
associated storage overhead. Next, each server gener-
ates polynomials in the form of Equations (2), where
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:44:50 UTC from IEEE Xplore.  Restrictions apply. 



# Page 5

WEI et al.: BLOCKCHAIN-DRIVEN HIERARCHICAL AUTHENTICATION AND KEY AGREEMENT SCHEME FOR VANETs
6417
Fig. 2. The main procedures of our proposed scheme.
aj,1 . . . a j,t−1 are random coeﬃcients, u j is the server’s
corresponding secret value, and t is the system’s pre-
deﬁned threshold. Speciﬁcally, each CS generates two
polynomials, hj(x) and pj(x), from two secret values,
with thresholds t taken as t1 and t2 respectively (where
t1 < t2). Meanwhile, the ES generates a polynomial pl(x)
with a threshold of t taken as t2.
f j(x) = u j + aj,1x + . . . + aj,t−1xt−1 mod q
(2)
4) Each CS and ES obtains the set of secret shares ss j
and ssl of their respective polynomials, as shown in
Equation (3) and Equation (4). In the secret sharing
phase, each server shares the encrypted and signed secret
share ssj,k = (k, f j(k)) with other servers, where k is
the sequence number of the corresponding server and
k , j. After completing the above operations, each CS
computes two collaborative private keys sk0, j and sk1,j
as shown in Equation (5) and Equation (6) from the
secret shares of polynomials h(x) and p(x), respectively,
and each ES computes one collaborative private key
sk1,l as shown in Equation (7) from the secret share of
polynomial p(x).
ssj =
˚ idx0, h j(idx0)

∪(idx1, pj (idx1)) |
idx0 ∈[1, n1] & idx1 ∈[1, n] & idx , j}
(3)
ssl = {(idx, pl(idx)) | idx ∈[1, n] & idx , l}
(4)
sk j = sk0, j = h1( j) + h2( j) + . . . + hn1( j) mod q
(5)
spj = sk1, j = p1( j) + p2( j) + . . . + pn( j) mod q
(6)
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:44:50 UTC from IEEE Xplore.  Restrictions apply. 



# Page 6

6418
IEEE TRANSACTIONS ON INFORMATION FORENSICS AND SECURITY, VOL. 20, 2025
spl = sk1,l = p1(l) + p2(l) + . . . + pn(l) mod q
(7)
Algorithm 1 ES/CS Registration Function
Input: addri,tag1
Output: bool
1:
check the validity of the function caller
2:
ras is an address array
3: if msg.sendernot inras then
4:
return false
5: end if
6:
ess and css are mapping types
7: if tag1 == 1 then
8:
ess[msg.sender][addr] ←true
9: else
10:
css[msg.sender][addr] ←true
11: end if
Algorithm 2 Vehicle/RSU Registration Function
Input: addri
Output: bool
1:
check the validity of the function caller
2:
csa is an address array
3: if msg.sendernot incsa then
4: return false
5: else
6:
va is a mapping type
7: va[msg.sender][addri] ←true
8: return true
9: end if
Algorithm 3 Public Key Registration Function
Input: addr j,pksi
Output: bool
1: if vf==NULL then
2:
init an empty Cuckoo ﬁlter with speciﬁc table size
and maximum kick counts for a type of registrant
3:
v f ←new(S ize, MaxKicks)
4: end if
5: if va[addrj][msg.sender]==True then
6:
for each pki ∈pksi do
7:
call the insert function of the Cuckoo ﬁlter
8:
v f.insert(pki)
9:
end for
10:
return true
11: else
12:
return false
13: end if
5) All public information {E,G, q, P, n, U j, Kj, Kl} will be
stored on the consortium blockchain. Meanwhile, the
system public key PK = Pn
j=1 K j + Pn1
j=1 U j = K + U
can be derived from the information on the blockchain.
B. Reputation Mechanism
Reputation value serves as an indicator for community
members to evaluate each other, enabling users to gauge the
credibility of messages based on the sender’s reputation value.
In our framework, the ES is responsible for performing the
collection, computation, and updating of reputation values.
Speciﬁcally, we categorize the reputation model into three
modules, i.e., the feedback collection, the reputation calcula-
tion, and the reputation update modules. The reputation value
is deﬁned as a value between an interval (e.g. [60, 100]),
and user identities with reputation values below the minimum
of the interval will be blacklisted and their identities will be
broadcast.
1) Feedback Collection Module: For the message from the
target vehicle, the receiver ﬁrst evaluates whether the target
vehicle is trustworthy based on the sender’s initial reputation
value (messages from vehicles blacklisted and broadcasting
their identities are not accepted). Subsequently, the feedback
vehicle evaluates the received message m based on the current
traﬃc environment to provide a credibility assessment Sc for
the message (0 ≤S c ≤1). Then, the feedback vehicle sends
feedback information M to the feedback collection server,
including the vehicle’s own information, the message m, the
corresponding assessment score sc, and a timestamp. All N
vehicles participating in the feedback assessment constitute a
feedback set.
2) Reputation Calculation Module: Firstly, the feedback
information are divided into three reputation interval groups
based on the reputation values of the feedback vehicles in the
feedback set. For example, [60-75], [75-90], [90-100], where
the number of feedback vehicles in each reputation interval
group is n1, n2, n3 (n1 + n2 + n3 = N). The system assigns
diﬀerent evaluation weights w1,w2,w3 for each group (where
w1 < w2 < w3, w1 + w2 + w3 = 1), meaning feedback vehicles
in groups with higher reputation values have higher evaluation
weights. Then, the weighted credibility assessment Sc of the
target vehicle is calculated using Equation (8), where s1k, s2k,
and s3k (all ∈[0, 1]) represent the ratings given by feedback
vehicles from the diﬀerent reputation groups.
S c = ω1
n1
·
n1
X
k=1
s1k + ω2
n2
·
n2
X
k=1
s2k + ω3
n3
·
n3
X
k=1
s3k
(8)
Finally, based on the magnitude of the weighted credibility
assessment Sc, we calculate the reputation of the vehicle. If
S c > β, we deem the message from the target vehicle to
be validated by a majority of vehicles, and accordingly, we
reward its reputation value using Equation (9). Conversely, if
S c < β, we deem the message from the target vehicle to be
questioned by the majority of vehicles, and thus, we penalize
its reputation value using Equation (10). Here β is the system’s
preset reputation threshold, the value of which can be set and
adjusted according to the security requirements based on the
VANETs system.
Rei = Re′
i + rb ·

1 −
Re′
i
Remax

(β1 · Dβ3 + β2 · S cβ4)
(9)
Rei = Re′
i −rb ·
 Re′
i
Remin
−1

(β1 · Dβ3 + β2 · (1 −S c)β4) (10)
The formula introduces two terms, (1 −Re′
i/Remax) and
(Re′
i/Remin −1), which eﬀectively constrain the rapid growth
of reputation values for entities with high current reputation
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:44:50 UTC from IEEE Xplore.  Restrictions apply. 



# Page 7

WEI et al.: BLOCKCHAIN-DRIVEN HIERARCHICAL AUTHENTICATION AND KEY AGREEMENT SCHEME FOR VANETs
6419
values and impose more severe penalties when they publish
false messages. In this context, Re′
i represents the historical
reputation value of the vehicle, Remax and Remin represent
the maximum and minimum of the credible reputation value
interval, respectively, D denotes the current vehicle density
and rb stands for the base value for reputation rewards and
penalties, and β1, β2, β3, β4 are four predeﬁned weighting
factors.
Remark: It is worth noting that the reputation mechanism
is designed without bias under the condition that feedback
scores sik are independent and identically distributed (i.i.d.)
within each reputation group and the density factor D is prop-
erly normalized. Speciﬁcally, weight assignment unbiasedness,
interval grouping unbiasedness, and stability of reward and
penalty functions can be achieved, which can be proved as
follows.
1) Weight
Assignment
Unbiasedness:
Let
Sc
be
the
weighted credibility score and assume sik are i.i.d. with
E[sik] = µ for any i and k, then we get Equation (11).
This shows that the expected score equals the underlying
true mean µ, proving the weight assignment introduces
no bias.
E[S c]
= E
"
w1
n1
n1
X
k=1
s1k + w2
n2
n2
X
k=1
s2k + w3
n3
n3
X
k=1
s3k
#
= w1
n1
n1
X
k=1
E[s1k] + w2
n2
n2
X
k=1
E[s2k] + w3
n3
n3
X
k=1
E[s3k]
= w1
n1
n1µ + w2
n2
n2µ + w3
n3
n3µ = µ
(11)
2) Interval Grouping Unbiasedness: Consider all possible
distributions of vehicles across groups G1 (group with
low reputations), G2 (group with middle reputations),
and G3 (group with high reputations). If all vehicles
belong to G1, G2, or G3, then S c ≈w1µ, S c ≈w2µ,
and S c ≈w3µ hold in these three cases, respectively,
according to Equation (11). If the distributions of vehi-
cles across all groups, then S c ≈w1µ + w2µ + w3µ = µ.
Therefore, the grouping mechanism maintains unbiased-
ness as long as w1 < w2 < w3 (our intentional design).
3) Stability of Reward and Penalty functions: According to
Equations (9, 10), the reward function can be expressed
with Equation (12). By Brouwer’s ﬁxed-point theorem,
since freward is continuous on the compact convex set
[Remin, Remax] and freward maps [Remin, Remax] to itself,
there exists at least one ﬁxed point Re∗where f(Re∗) =
Re∗. Additionally, the derivative of the reward function
satisﬁes ∂freward
∂Rei
= 1 −rbg(D,S c)
Remax
∈(0, 1), since g(D, S c) =
β1Dβ3 + β2S cβ4 ≤1 where β1 + β2 ≤1, this contraction
property guarantees convergence to the ﬁxed point (same
for the penalty function).
freward(Rei) = Rei + rb

1 −
Rei
Remax

g(D, S c)
(12)
3) Reputation Update Module: The ES uploads an updated
reputation score to the blockchain. If the target vehicle’s
reputation falls beneath a predetermined threshold, the ES
blacklists it and broadcasts the vehicle’s real identity.
C. Registration Phase
In the registration phase, the RSU and vehicle need to
complete address and public key registration respectively. The
detailed process proceeds as outlined below:
1) RSU Registration: Firstly, RS Uk selects random num-
bers ek, xk ∈Zq and computes the blockchain address addrk
and public key Xk = xkP. RS Uk forwards a registration request
containing the real identity to the CS j. In turn, CS j initiates
the smart contract, deﬁned in Algorithm 2, by submitting a
signed transaction TX0
j = {addrk}aj to the blockchain network.
Upon conﬁrmation of TX0
j by the blockchain network, the
legitimacy of the RS Uk can be veriﬁed. Next, RS Uk sends the
signed transaction TX1
k = {Xk}ek to the blockchain network,
invoking the smart contract speciﬁed in Algorithm 3 for public
key registration. In this way, RS Uk completes its registration
on the blockchain.
2) Vehicle Registration: Firstly, Vi selects the random num-
bers ei, xi ∈Zq and computes the blockchain address addri and
public key Xi = xiP. The vehicle encrypts its real identity and
address information using the public key U j and then sends the
ciphertext EAi = Enc(U j, addri, idi) to the CS j. Upon receipt
of a registration request from vehicle Vi, CS j initially assesses
the vehicle’s reputation score Rei. Should the reputation value
surpass the system’s predeﬁned threshold, indicating that Vi
is considered legitimate and trustworthy, the CS j sends the
signed transaction TX1
j = {addri}aj to the blockchain. This
triggers the smart contract deﬁned by Algorithm 2, enabling
Vi to complete the address registration. Next, the vehicle sends
the signed transaction of the public key TX1
i = {Xi}ei to the
blockchain network. This action initiates the smart contract
outlined in Algorithm 3, facilitating the registration of the
vehicle’s public key information securely on the blockchain.
In this scheme, public key registration uses a cuckoo ﬁlter
to store public key ﬁngerprints, signiﬁcantly reducing storage
space compared to storing the full public keys.
D. Request Phase
In the request phase, vehicle V ﬁrst initiates an AKA
request towards the RSU. Upon receiving and verifying the
sender’s identity, the RSU subsequently forwards this request
to the blockchain network. The detailed sequence of events is
outlined below:
1) Vehicle Side: To initiate the key agreement process,
vehicle Vi ﬁrst selects a random number qi and computes
the corresponding public key Qi = qiP for the subsequent
key agreement. The vehicle obtains the current timestamp ti
and computes the signature ϵi as shown in Equation (13). Vi
then sends a message Mi = {addri, ti, Qi, Xi, ϵi} containing the
signature information to RS Uk. Here, addri and Xi are values
obtained during the registration phase.
ϵi = qi + xi · h(addri, Qi, ti, Xi)
(13)
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:44:50 UTC from IEEE Xplore.  Restrictions apply. 



# Page 8

6420
IEEE TRANSACTIONS ON INFORMATION FORENSICS AND SECURITY, VOL. 20, 2025
2) RSU Side: Upon receiving the message Mi, RS Uk ﬁrst
validates the timestamp and the vehicle reputation value Rei.
If |ti −tcur| ≤∆T or the Rei value of the vehicle is below a
system threshold, RS Uk rejects the message and terminates
the process. Where tcur represents the current timestamp and
∆T represents the maximum reasonable time interval. If the
message Mi passes the veriﬁcation of RS Uk, RS Uk selects
a random number qk to compute the corresponding public
key Qk = qkP to be used in the key agreement. RS Uk
then obtains the current timestamp tk and sends the ECDSA
signature transaction TXk = {addri, ti, Qi, tk, Qk, Xi, ϵi}sk to the
consortium blockchain.
E. Response Phase
In this phase, the AKA request transaction sent by the
vehicle is processed by the blockchain nodes, and after the
signature transaction is authenticated by a certain number
of blockchain nodes, the vehicle and the RSU can securely
agreement the session key for subsequent communication.
Algorithm 4 Public Key Veriﬁcation Function
Input: pki
Output: bool
1:
check whether pki exists in the array
2: if v f.lookup(pki) == true then
3:
return true
4: else
5:
return false
6: end if
1) Message Authentication: Upon receiving the signature
transaction TXk, the server ﬁrst checks the timestamp of
the message and the reputation value Rei of the vehicle. If
|ti −tcur| ≤∆T or |tk −tcur| ≤∆T or the reputation value
of the vehicle is lower than the system threshold, the server
terminates the agreement process. Secondly, the server uses
a signature algorithm to check the validity of the signing
transaction TXk. Thirdly, the server checks whether the public
key Xi is valid or not, by calling the smart contract described
in Algorithm 4. If the public key is not registered on the
blockchain, the server rejects the message, terminating the
AKA request. Finally, the server uses Equation (14) to check
the validity of the signature ϵi, if the equation does not hold,
indicating that the request message has been tampered with
and not authenticated, the server rejects the message, and
the AKA request is aborted. Otherwise, the AKA message
authentication process passes.
ϵi · P
?= Qi + h(addri, Qi, ti, Xi) · Xi
(14)
2) Token Generation: Upon passing the authentication pro-
cess, the servers can conﬁrm the legitimacy of the vehicle’s
identity and the integrity of the transmitted request message.
Therefore, the servers will use their cooperative private keys
to generate signature shares for the vehicle in the form of
Equation (15), where rj is random number and r j ∈Zq and
Rj = rjP, and xk denotes the index k of ES or CS (i.e., xk = k
based on the index conﬁgure process in the setup phase). The
Algorithm 5 Token Aggregation Function
Input: h(TXk),{(σj, Rj, tag)}
Output: bool
1:
check whether the sender is an ES or CS
2: if msg.sendernot inesa or csa then
3:
return false
4: else
5:
count is used to store the token count.
6:
token is used to store tokens.
7:
for each (σ j, Rj, tag) ∈{(σ j, Rj, tag)} do
8:
if tag = 0 then
9:
ctr0 = count0[h(TXk)]
10:
tokens0[h(TXk)][ctr0] ←(σ0
j, R0
j, tag)
11:
count0[h(TXk)] ←ctr0 + 1
12:
else
13:
ctr1 = count1[h(TXk)]
14:
tokens1[h(TXk)][ctr1] ←(σ1
j, R1
j, tag)
15:
count1[h(TXk)] ←ctr1 + 1
16:
end if
17:
end for
18:
return true
19: end if
CS j generates two signatures σ0
j, σ1
j, for the vehicle using
the two cooperative private keys sk0, j and sk1, j, while the
ES l generates a signature share σ1
l for the vehicle using the
cooperative private key sk1,l. Each signature share corresponds
to the tag value tag, to diﬀerentiate signatures associ-
ated with diﬀerent collaborative private keys. Finally, server
sends a signature transaction TX j
2 = {h(TXk), {(σ j, Rj, tag)}}sj
to the blockchain, triggering the smart contract deﬁned
by Algorithm 5.
σ j =rj+
0
@sk j
1≤k≤t
Y
k, j
0−xk
x j−xk
1
A·h(addri, addrk, PK, h(TXk)) (15)
Algorithm 6 Token Validation Function
Input: h(TXk)
Output: (token[])
1: ctr0 = count0[h(TXk)]
2: ctr1 = count1[h(TXk)]
3: if ctr1 < t2 or ctr0 < t1 then
4:
return NULL
5: else
6:
return all of tokens related h(TXk).
7:
return tokens0[h(TXk)],tokens1[h(TXk)]
8: end if
3) Key Agreement: The authentication of the AKA request
by the blockchain nodes is considered successful only when
the signature transaction receives no fewer than t2 signature
shares from the blockchain nodes, and at least t1 of those
signatures come from the CS. Upon meeting these conditions,
Vi and RS Uk can invoke the smart contract described in
Algorithm 6. If the smart contract yields a null return value,
it signiﬁes that the signature share has not reached the preset
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:44:50 UTC from IEEE Xplore.  Restrictions apply. 



# Page 9

WEI et al.: BLOCKCHAIN-DRIVEN HIERARCHICAL AUTHENTICATION AND KEY AGREEMENT SCHEME FOR VANETs
6421
system value. Conversely, a non-null return value indicates that
the AKA request has been authenticated by a suﬃcient number
of blockchain nodes. Therefore, Vi and RS Uk can use Equation
(16) to verify the legitimacy of TXk according to the signature
information obtained on the blockchain, and if the obtained
signature information can satisfy the equation, it means that
the legitimacy of TXk has been suﬃciently authenticated in
the process of the AKA request. As a result, Vi and RS Uk can
agree on session keys for subsequent communication using
Equation (17).
0
@
t1
X
j=1
σ0
j +
t2
X
j=1
σ1
j
1
A · P
=
0
@
t1
X
j=1
0
@sk j
1≤k≤t1
Y
k, j
0 −xk
xj −xk
1
A +
t2
X
j=1
0
@spj
1≤k≤t2
Y
k,j
0 −xk
xj −xk
1
A
1
A
· h (addri, addrk, PK, h(TXk)) · P +
t1
X
j=1
R0
j +
t2
X
j=1
R1
j
=
t1
X
j=1
R0
j +
t2
X
j=1
R1
j + h (addri, addrk, PK, h(TXk)) · PK (16)
skik = h(qi · Qk, h(TXk)) = h(qk · Qi, h(TXk))
(17)
V. SECURITY ANALYSIS
A. Correctness
Here, we provide the proof for Equation (16). The proof
process cleverly employs the principle of Lagrange interpola-
tion polynomials to ensure that the secret value of each server
can be reconstructed using the individual signature shares from
diﬀerent cooperative private keys. Based on this, the system
public key can be successfully derived and the correctness of
the whole scheme is veriﬁed accordingly. It’s worth noting
that we use h(M) instead of h(addri, addrk, PK, h(TXk)) for
the sake of simplifying the proof procedure.
0
@
t1
X
j=1
σ0
j +
t2
X
j=1
σ1
j
1
A · P
=
t1
X
j=1
0
@sk j
1≤k≤t1
Y
k, j
0 −xk
xj −xk
1
A · h (M) · P +
t1
X
j=1
R0
j
+
t2
X
j=1
0
@spj
1≤k≤t2
Y
k, j
0 −xk
xj −xk
1
A · h (M) · P +
t2
X
j=1
R1
j
=
( t1
X
i=1
h1 (xi)
1≤k≤t1
Y
k,i
0 −xk
xi −xk
+
t1
X
i=1
h2 (xi)
1≤k≤t1
Y
k,i
0 −xk
xi −xk
+ · · · +
t1
X
i=1
hn1 (xi)
1≤k≤t1
Y
k,i
0 −xk
xi −xk
)
· h (M) · P +
t1
X
j=1
R0
j
+
( t2
X
i=1
p1 (xi)
1≤k≤t2
Y
k,i
0 −xk
xi −xk
+
t2
X
i=1
p2 (xi)
1≤k≤t2
Y
k,i
0 −xk
xi −xk
+ · · · +
t2
X
i=1
pn (xi)
1≤k≤t2
Y
k,i
0 −xk
xi −xk
)
· h (M) · P +
t2
X
j=1
R1
j
= (a1 + a2 + . . . + an1) · h (M) · P +
t1
X
j=1
R0
j
+ (b1 + b2 + . . . + bn) · h (M) · P +
t2
X
j=1
R1
j
=
t1
X
j=1
R0
j +
t2
X
j=1
R1
j + h (addri, addrk, PK, h(TXk)) · PK (18)
B. Security Model
Here, a security model is deﬁned to show the interactions
between challengers and adversaries and the behaviors of
the adversary. Four types of participants are involved in our
proposed scheme, i.e., the Vi, the RS Uk, the CS j, and the ES l.
A series of games are deﬁned and adversary A and challenger
C interact with each other under the rules in these games. We
use Πi
Λ to described the instance of these participants, where i
denote the index and Λ ∈{Vi, RS Uk,CS j, ES l}. We described
the details as follows.
1) Execute(Πi
V,Πk
RS U): In this oracle, a passive attack can
be simulate, which mean that the adversary can get the
transmitted messages between Πi
V and Πk
RS U form the
challenger C after sending this query.
2) Send(Πt
Λ,mt): In this oracle, an active attack can be
simulate, which mean that the adversary will receive
the corresponding response from the challenger C after
sending the request message mt for the instance Πt
Λ.
3) Reveal(Πi
V,Πk
RS U): In this oracle, the forward security
can be simulate, which mean that the adversary will get
the generated session key between the Πi
V and Πk
RS U
from the challenger C.
4) Corrupt(Πt
Λ): In this oracle, the forward security can
be simulate, which mean that the adversary will get
the long-term secret key (the secret key of blockchain
address) from the challenger C.
5) Test(Πi
V,Πk
RS U): Upon receiving this query, the chal-
lenger C will check the freshness of Πi
V and Πk
RS U. If
one of them has been requested, C will abort this query.
Otherwise, C will choose a number b in a random toss,
where b ∈{0, 1}. If b = 0, C will choose a random
number as the key to send to A. If when b = 1, C will
send the key of the session between Πi
V and Πk
RS U to A.
Deﬁnition 1 (Participants): The two instances Πt
Λ and Πt∗
Λ
are said to be participants if they communicate with each other
for negotiating a session key in the same session.
Deﬁnition 2
(Freshness): If both the instance Πt
Λ and its
participant Πt∗
Λ has not been requested Reveal(·) query, that we
can said both Πt
Λ and Πt∗
Λ are fresh.
Deﬁnition 3
(Correctness): The two instances Πt
Λ and
Πt∗
Λ of the same session satisfy correctness if each of them
independently generates non-empty and equal session keys.
Deﬁnition 4 (Session Key Semantic Security): To complete
the game described above, adversary A need to launch the
Test(·) query and submit the guess bit b∗. We assume that
the event in which A happens to win the game i.e. b∗= b
is W. The probability that A wins the game is deﬁned as
Adv (A) = 2|Pr(W)−1/2| i.e., the deﬁnition of semantic safety.
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:44:50 UTC from IEEE Xplore.  Restrictions apply. 



# Page 10

6422
IEEE TRANSACTIONS ON INFORMATION FORENSICS AND SECURITY, VOL. 20, 2025
Here, the AKA protocol P is considered semantically secure if
the probability Adv (A) is negligible for any polynomial-time
constrained probabilistic.
C. Proven Security
Theorem 1: According to the above security model, the pro-
posed AKA protocol meets the session key semantic security
if no adversary with a polynomial time and bounded chance
can break ECDDHP.
Proof: In this proof, we design a sequence of games where
the adversary A and the challenger C interact based on
predeﬁned rules. The case that A wins the ith game is marked
as Wi. Additionally, the following are the deﬁnitions of these
games.
Game 0. In game 0, two tuples {A = aP, B = bP,C = abP}
and {A = aP, B = bP,C = cP}, where a, b, c are random
numbers in Zq, are provided to challenger C. The challenger
C will attempt to break ECDDHP with the assistance of A.
It is noted that A can request the oracles according to the
following deﬁnitions.
1) Send(Πi
V,Πk
RS U,reg):
Upon
receiving
this
query,
C
determines
if
KV1[Πi
V, Πk
RS U]
is
null.
C
returns
KV1[Πi
V, Πk
RS U] to A if it is not null. If not, C
uses the protocol method to generate ti, ei, addri, Xi,
and TX1
i for Πi
V and tk, Qk, TXk for Πk
RS U. It then
stores {ti, ei, addri, Xi, TX1
i , tk, Qk, TXk} as the value of
KV1[Πi
V, Πk
RS U] and sends the value tuple to A.
2) Send(Πi
V,Πk
RS U,{Xi}): When C receives this query, it ﬁrst
checks whether tuple KV1[Πi
V, Πk
RS U] is empty. If it is
empty, C terminates this query. Otherwise, C selects
qi, qk to compute Qi, Qk, uses the value Xi in tuple
KV1[Πi
V, Πk
RS U] to compute the signature ϵi and then
generates the ECDSA signature transaction TXk, and
ﬁnally sends TXk to A.
3) Send(Πi
V,Πk
RS U,{TXk}): When C receives this query, it
ﬁrst veriﬁes the validity of the transaction TXk as well
as Equation (14). If there is a validation failure, C
terminates this query. Otherwise, C generates t2 tokens
{(σ j, tag)} generated by the ESs and CSs and stores them
in the tuple KV2[Πi
V, Πk
RS U]. Finally, these tokens are
sent to A.
4) Send(Πi
V,Πk
RS U,{TXk}, {(σj, Rj, tag)}(1 ≤j ≤t2)): When
C receives this query, it ﬁrst checks the validity of these
shares using Equation (16). If the validation fails, C
aborts this query. Otherwise, C computes the session
key skik and stores it in tuple KV3[Πi
V, Πk
RS U], and the
instances Πi
Vand Πk
RS U are set to the unfreshed state.
5) Execute(Πi
V,Πk
RS U): When C receives this query, it
ﬁrst checks the values in tuples KV1[Πi
V, Πk
RS U] and
KV2[Πi
V, Πk
RS U]. If neither tuple is empty, C sends the
values in these tuples to A; otherwise, C terminates this
query.
6) Corrupt(Πi
V,Πk
RS U): When C receives this query, it ﬁrst
checks the value in tuple KV3[Πi
V, Πk
RS U]. If the tuple is
not empty, C sends the value in the tuple to A; otherwise,
C terminates this query.
7) Test(Πi
V,Πk
RS U): When C receives this query, it ﬁrst
checks the freshness of instances Πi
V and Πk
RS U. If it
passes the check. C will toss a coin b ∈{0, 1} and if b=1,
C sends the session key skik negotiated by instances Πi
V
and Πk
RS U to A. If b=0, then C will select a random
number to send to A.
The rules in game 0 correspond to the protocols deﬁned in
the security model without any modiﬁcation. Therefore, the
probability that the adversary A wins the game is satisﬁed:
AdvA = 2|Pr(W0) −1/2|
(19)
Game 1. Game 1 and Game 0 are exactly the same,
with the exception that Game1 simulates hash oracles. More
speciﬁcally, after receiving the request mi for the hash function
h(·), C checks whether or not h(mi) is empty. If so, C selects
a random number ri as the h(mi) value and sends it to A. If
not, C gives h(mi) back to A. Clearly, Game 1 and Game 0
are indistinguishable, so the following equation is satisﬁed.
Pr(W1) = Pr(W0)
(20)
Game
2.
To
prove
it,
we
construct
the
simulation
where the number of involved servers equals to t2,i.e.,
the involved servers are CS 1,CS 2, . . .,CS t1, ES t1+1, . . ., ES t2.
Among these servers, we assume that the adversary A controls
CS 2, . . .,CS t1, ES t1+1, . . ., ES t2 whereas the forger F controls
the honest participant CS 1. Based on the input of public key
PK = K + U for the Schnorr signature algorithm, F interacts
with A using the following simulations.
1) Initialization: a) F chooses randoms u1 = {a1, b1} where
a1 and b1 ∈Z∗
q, calculates PK1 = {U1 = a1P, K1 = b1P}
and f1(x) = {h1(x), p1(x)}, and sends public material
{(PK1, f1( j))|2 ≤j ≤t2} to A. b) A is required to
send {( f j(1), PKj)|2 ≤j ≤t2} to F. c) Based on the
public key PK = K + U, F rewinds A to step a)
for replacing U1 and K1 with
ˆU1 = U −Pn1
j=2 U j,
ˆK1 = K −Pn
j=2 Kj, so that the public material received
by A is { ˆ
PK1, f1( j)|2 ≤j ≤t2}.
2) Token Generation: a) For the token generation query
for the AKA request message m, F chooses random
elements R1 = {R0
1, R1
1} where R0
1, R1
1 ∈G and σ1 =
{σ0
1, σ1
1} where σ0
1 and σ1
1 ∈Z∗
q and sends them to A. b)
A is required to send (Rj, σj)|2 ≤j ≤t2 to C. c) C sends
m to the Schnorr signature oracle to get (σ, R), calculates
ˆR0
1 = RA −Pt1
j=2 R0
j, ˆR1
1 = RB −Pt2
j=2 R1
j,
ˆσ0
1 = σA −
Pt1
j=2 σ0
j and ˆσ1
1 = σB −Pt2
j=2 σ1
j and rewinds A to step
a) for replacing (R1, σ1) with ( ˆR1, ˆσ1). Here RA denotes
Pt1
j=1 R0
j, RB denotes Pt2
j=1 R1
j, σA denotes Pt1
j=1 σ0
j, and
σB denotes Pt2
j=1 σ1
j.
We can observe that the aforementioned simulation does not
aﬀect the validity of the generated tokens, as Equation (21)
holds, satisfying the veriﬁcation described in Equation (16).
The only distinction between the real and simulated views is
the substitution of U1, K1, R0
1 and R1
1 with
ˆU1,
ˆK1, ˆR0
1 and
ˆR1
1, respectively, which is computationally indistinguishable
from the perspective of A. Therefore, we can construct a
distinguisher such that the probability of distinguishing Game
2 and Game 1 is equal to the probability of breaking Schnorr
and ECDSA signature algorithms. As proven in [24], [25],
the advantages ϵ1 and ϵ2 of breaking ECDSA and Schnorr
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:44:50 UTC from IEEE Xplore.  Restrictions apply. 



# Page 11

WEI et al.: BLOCKCHAIN-DRIVEN HIERARCHICAL AUTHENTICATION AND KEY AGREEMENT SCHEME FOR VANETs
6423
signature algorithms by a PPT-adversary under a random
oracle satisfy Equations (22) and (23), where qs denotes the
number of requests to the S end(·) oracle, and ϵ represents the
probability of breaking ECDLP, thus deducing Equation (24).
0
@
t1
X
j=1
σ0
j +
t2
X
j=1
σ1
j
1
A · P
=
0
@σA −
t1
X
j=2
σ0
j +
t1
X
j=2
σ0
j + σB −
t2
X
j=2
σ1
j +
t2
X
j=2
σ1
j
1
A · P
= (σA + σB) · P
=
t1
X
j=1
R0
j +
t2
X
j=1
R1
j + h(PK, m) · (u + k)P
(21)
ϵ1 ≤
3qs(qs + qh)
(q −1)/2 −qs −qh
+ (qs + qh)2/2q + qhϵ
(22)
ϵ2 ≤
s
q + 2qs(qs + qh) + q(qs + qh)ϵ
q
(23)
|Pr(W2) −Pr(W1)| ≤ϵ1 + ϵ2
(24)
Game 3. Game 3 is identical to Game 2 except for a slight
modiﬁcation in the S end(·) oracle, where C selects a random
index idx ∈qs and substitutes Qi, Qk, and Qik with A, B,
and C. Assuming we can construct a distinguisher capable of
discerning between Game 3 and Game 2, it suggests that C
can employ A as a subroutine to breach ECDDHP. Hence,
the Equation (25) holds, where ϵ∗represents the probability
of breaking ECDDHP.
|Pr(W3) −Pr(W2)| ≤qs · ϵ∗
(25)
In Game 3, A cannot eﬀectively diﬀerentiate between a
randomly generated key and skik created using Equation(17)
with a signiﬁcant probability, unless A successfully guesses
h(qi · Qk, h(TXk)). The probability of such an event occurring
can reach up to qh/q. Hence, the Equation (26) holds.
|Pr(W3)| ≤1
2 + qh/q
(26)
Based on above equations, we can derive the Equation (27).
AdvA = 2|Pr(W0) −1/2| = 2|Pr(W1) −1/2|
≤2 (|Pr[W2] −Pr[W1]| + |Pr[W3] −Pr[W2]|
+|Pr[W3] −1
2|

≤2(ϵ1 + ϵ2 + qs · ϵ∗+ qh/q)
≤
6qs(qs + qh)
(q −1)/2 −qs −qh
+ 2(qs + qh)2/2q + 2qhϵ
+ 2
s
q + 2qs(qs + qh) + q(qs + qh)ϵ
q
+ 2qs · ϵ∗+ 2qh/q
(27)
D. Security and Privacy Comparisons
In this section, we undertake a comparative evaluation of
our proposed scheme and several related schemes, including
Vangala et al. scheme [26], Shen et al. scheme [27], Han et al.
scheme [28], and Ma et al. scheme [29] in terms of the
satisﬁed security and privacy requirements. We deﬁne R1
(mutual authentication), R2 (conﬁdentiality), R3 (resistance to
replay attacks), R4 (resistance to man-in-the-middle attacks),
R5 (forward and backward secrecy), R6 (resistance to DDoS
attacks), R7 (conditional privacy-preserving), R8 (resistance to
collusion attacks), R9 (perfect forward security), R10 (resis-
tance to key exposure attacks), and R11 (required trust level
of servers) and Table I presents a comprehensive comparison
of security and privacy aspects. Our proposed scheme exhibits
higher satisfaction for multiple security and privacy require-
ments. A detailed comparison of these security and privacy
requirements is shown below.
1) R1 (mutual authentication): Mutual authentication
means that communicating parties can mutually verify
the integrity and identity validity of their messages
before establishing a connection. In the response phase,
the receiving entity authenticates the message sender
and each message sent by using signature veriﬁcation
algorithm, public key veriﬁcation algorithm, and reputa-
tion check. In the proposed scheme and the comparison
schemes [26], [27], [28], [29], the signature veriﬁcation
algorithm ensures that none of the contents of the sent
message has been modiﬁed. The public key veriﬁcation
algorithm and the reputation check ensure the legal iden-
tity of the vehicle and the RSU, and the authentication
share sent by the server ensures that the vehicle and the
RSU can achieve mutual authentication.
2) R2 (conﬁdentiality): Conﬁdentiality means that only
entities participating in the same AKA session have
the ability to correctly compute the session key. In
the proposed scheme and the comparison scheme, the
entities use their respective private variables to compute
the session key dedicated to both parties respectively.
Since the adversary does not have access to the user’s
private variables, it is unable to compute the session key,
and only the entities involved in the key agreement have
the ability to compute that key, so all of the schemes
[26], [27], [28], [29] satisfy conﬁdentiality.
3) R3 (resistance to replay attacks): The replay attack
is when an adversary is unable to intercept the user’s
legitimate communication data and repeatedly sends
these data to launch an attack. In the proposed scheme
and the comparison schemes [26], [27], [28], [29],
each message M sent by the communicating parties
is accompanied by a timestamp Ti. The receiver can
check the timeliness of M by checking whether the
equation |T j −Tcur| ≤∆T holds, where Tcur denotes
the current timestamp, and ∆T denotes the maximum
legitimate time interval. Thus, replay attacks initiated by
an attacker repeatedly transmitting outdated information
can be prevented in all of the schemes.
4) R4 (resistance to man-in-the-middle attacks): Man-
in-the-middle attack is an attack launched by an active
attacker by forging a valid message after intercepting a
valid message from a valid sender. The proposed scheme
and the comparison schemes [26], [27], [28], [29] use
digital signature and pseudonym techniques respectively,
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:44:50 UTC from IEEE Xplore.  Restrictions apply. 



# Page 12

6424
IEEE TRANSACTIONS ON INFORMATION FORENSICS AND SECURITY, VOL. 20, 2025
TABLE I
SECURITY AND PRIVACY COMPARISONS
not only the adversary is unable to forge the user’s
pseudonym information at the same time any tampering
of the data by the adversary will result in the information
not being able to pass the message authentication, hence
these schemes protect against man-in-the-middle attacks.
5) R5 (forward and backward secrecy): Backward and
forward security means that even if the current session
key is compromised, the communication data encrypted
with the key in past and future sessions will not be
compromised. In the proposed and comparison schemes
[26], [27], [28], [29], the session key for each session
is generated along with random parameters unique to
each session. The parameters used in each session are
independent of the parameters used in other sessions.
Thus, the uniqueness of each session key ensures iso-
lation and prevents any compromise in the security of
keys belonging to other sessions.
6) R6 (resistance to DDoS attacks): DDoS attack means
that the attacker sends a large number of false requests
to the attacked server so that the server is unable
to provide normal service or resource access for a
period of time. The proposed scheme establishes a con-
sortium blockchain distributed authentication network
maintained by multiple servers, and the security of
the system is not aﬀected by the failure of individual
servers. In addition, the use of timestamps allows users
to assess the freshness of messages and ﬁlter out many
malicious messages. As a result, DDoS attacks can be
eﬀectively prevented. In the comparison schemes [26],
[27], [28], [29], the AKA process generally relies on
trusted centers that make the system vulnerable to DDoS
attacks.
7) R7 (conditional privacy-preserving): Conditional pri-
vacy protection means that only a speciﬁc trusted entity
can reveal the true identity based on the received pseudo-
identity. In the proposed scheme and the comparison
scheme [26], [27], [28], [29], the vehicle interacts
using pseudo-identity information. The adversary cannot
access the true identity of the vehicle. And in case the
vehicle exhibits malicious behavior, the trusted entity
can decrypt to reveal the true identity of the vehicle, thus
achieving conditional privacy protection. In contrast, in
Han et al. scheme [28], the vehicle uses the real ID
for data transmission, which cannot achieve conditional
privacy protection.
8) R8 (resistance to collusion attacks): Collusion attack
means the act of two or more malicious nodes jointly
disrupting normal nodes and networks by disguising or
cooperating with each other. In the proposed scheme,
the adversary may try to collude with the consortium
blockchain nodes to pass the authentication. However,
the design of the scheme’s distributed authentication
network framework is such that the adversary needs
to collude with a certain number of nodes in order to
succeed, yet such collusion is not feasible in the real
world. Hence, the scheme is eﬀective against collusion
attacks whereas the comparison schemes [26], [27], [28],
[29] are not able to defend against collusion attacks.
9) R9 (perfect forward security): Perfect forward secrecy
means that the leakage of a long-term session key
does not aﬀect the old keys established during the key
agreement process. In the proposed scheme and the
comparison schemes [26], [27], [28], [29], the vehicle
only uses its long term session key to generate messages
that can be veriﬁed by the receiver. Since the long-term
session key does not participate in the key agreement
process, perfect forward secrecy can be maintained,
ensuring its independence and protection from future
communications.
10) R10
(resistance
to
key
exposure
attacks): Key
exposure attack means if the key held by the trust
infrastructure is compromised or leaked, the security
of the system is compromised. The proposed scheme
and Ma et al. scheme [29], the private keys of the
trust infrastructure do not play a direct role in the
key agreement process. Even if these private keys are
compromised, the session keys of the protocol are still
secure because the compromise does not lead to the
disclosure of any information related to the session keys.
However, the trust infrastructure private keys in the other
comparison scenario are involved in the session key
agreement process, so the leakage of the private keys
can aﬀect the security of the session keys.
11) R11 (required trust level of servers): The trust level
required by the server means the level of trustworthiness
required for the authenticated entities. In the proposed
scheme, multiple consortium blockchain entities perform
distributed authentication of AKA requests and system
security is not compromised in case of individual entities
being oﬄine, hence only semi-trusted authentication
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:44:50 UTC from IEEE Xplore.  Restrictions apply. 



# Page 13

WEI et al.: BLOCKCHAIN-DRIVEN HIERARCHICAL AUTHENTICATION AND KEY AGREEMENT SCHEME FOR VANETs
6425
Fig. 3. The updating of reputation under diﬀerent Ds.
Fig. 4. The updating of reputation under diﬀerent Scs.
entities are required. However, the comparison schemes
[26], [27], [28], [29] typically use a single authenticated
entity to authenticate the AKA request and hence require
full trustworthiness for the authenticated entity.
VI. PERFORMANCE ANALYSIS
This section assesses the performance of our proposed
scheme by employing various tools to establish a simulation
environment. The testbed comprises a PC, equipped with an
Intel i7-12700K CPU and 16GB of RAM. We leverage the
Miracl cryptography library [30], for accurate measurement
of cryptographic operation execution times, and Ganache [31]
along with the Truﬄe framework, a development environment
and testing framework for Ethereum, to evaluate blockchain-
related performance.
A. Reputation Evaluation
Here, we analyse the reputation value of the scheme and
delve into the relationship between the vehicle reputation value
and its initial value, the vehicle density D of the environment in
which it is located, and the vehicle information trustworthiness
score Sc. Fig.3 shows the amount of increase and decrease of
the reputation value for diﬀerent vehicle densities D when the
information credibility score is certain, and Fig. 4 shows the
amount of increase and decrease of the reputation value for
diﬀerent reputation scores Sc when the current vehicle density
D is certain, respectively.
As can be seen from the above analysis, the reputation value
mechanism we designed exhibits two important properties:
ﬁrst, it can eﬀectively limit the rapid growth of the reputation
value of entities with higher current reputation values, thus
Fig. 5. The comparison of computational/communication costs.
avoiding the rapid accumulation and possible abuse of repu-
tation values. Second, entities with higher reputation values
will be penalized more when they publish false information.
This design helps prevent entities from abusing their status
and publishing inaccurate or misleading information after they
have acquired high reputation values. It ensures the stability
and eﬀectiveness of the reputation value system and helps
to build a fair and trustworthy environment for the vehicular
network.
B. Computational Costs Analysis
Fig. 5a appears the computational costs comparison between
our proposed scheme and several other AKA schemes pro-
posed in Vangala et al. scheme [26], Shen et al. scheme
[27], Han et al. scheme [28], and Ma et al. scheme [29].
We deﬁned Th, Tsm−ecc, Teca, Texp as the execution time of
hash function operation, scalar multiplication operation related
to elliptic curve, point addition operation related to elliptic
curve, modular exponentiation operation, where Th ≈0.002ms,
Tsm−ecc ≈0.384ms, Teca ≈0.002ms, Texp ≈0.037ms.
In Vangala et al. scheme [26], the AKA-related computa-
tional cost of the vehicle or fog server is 24Th + 10Tsm−ecc +
4Teca ≈3.896ms.
In Shen et al. scheme [27], the AKA-related computational
cost of the vehicle is 1Th + 14Tsm−ecc ≈5.378 ms, and the
computational cost of the edge node is 2Th + 11Tsm−ecc ≈
4.228ms.
In Han et al. scheme [28], the computational cost of the
vehicle is 4Th+4Texp ≈0.156ms. Similarly, the computational
cost of the server is 5Th + 4Texp ≈0.158ms.
In Ma et al. scheme [29], the computational cost for the
vehicle or fog server is approximately 5Tsm−ecc+1Teca+5Th ≈
1.932ms.
In our scheme, the computational cost of the vehicle is
4Tsm−ecc + (t1 + t2)Teca + 4Th ≈1.552ms. Similarly, the
computational cost of the RSU is calculated as 5Tsm−ecc +
(t1 + t2)Teca + 4Th ≈1.936ms.
Based on the above analysis, it shows that our scheme
signiﬁcantly outperforms the Vangala et al. [26], Shen et al.
[27], and Ma et al. [29] schemes in terms of computational
costs, while it is slightly higher than the scheme of Han et al.
[28]. This means that the computational resources occupied
by our proposed scheme still have some advantages.
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:44:50 UTC from IEEE Xplore.  Restrictions apply. 



# Page 14

6426
IEEE TRANSACTIONS ON INFORMATION FORENSICS AND SECURITY, VOL. 20, 2025
Fig. 6. The processing delays for state-changing Blockchain operations.
C. Communication Costs Analysis
Fig. 5b appears the communication costs comparison
between our proposed scheme and several other AKA schemes
proposed in Vangala et al. scheme [26], Shen et al. scheme
[27], Han et al. scheme [28], and Ma et al. scheme [29]. Our
analysis is conducted at a 128-bit security standard, and we
choose an additive group G that is generated by a point P with
order q over the elliptic curve E : y2 = x3 + ax + b mod p,
where p and q are two 256-bit primes and a, b ∈Zq. Impor-
tantly, our focus remains restricted to the costs exclusive to
the AKA phase, which ensures a more concise and reasonable
evaluation.
In the MVFS AKA phase of Vangala et al. scheme [26], in
order to establish a session key between the vehicle and the
fog node, the communication cost of the vehicle for AKA is
(256∗7+32∗2+512)/8 = 296 bytes. The communication cost
of the fog node for AKA is (256∗10+32∗2+512∗2)/8 = 392
bytes.
In the AKA phase of Shen et al. scheme [27], to establish
a session key between the vehicle Vi and the edge node, the
communication cost on the user side is calculated as (32 +
512+512+32+32+256) / 8 = 172 bytes. The communication
cost on the edge node side is calculated as (256+512 * 3+256
* 3 + 32 * 2 + 32 + 256 + 512 + 32 * 2 + 256 * 2) / 8 = 500
bytes.
In the AKA phase of Han et al. scheme [28], to establish
a session key between the vehicle and the server, the commu-
nication cost related to the vehicle side is (32 + 32 + 512 +
512+256) / 8 = 168 bytes. Similarly, the communication cost
related to the server side is (512 + 32 + 512 + 512 + 256) /
8 = 228 bytes.
In the AKA phase of Ma et al. scheme [29], to establish
a session key between the vehicle and the fog server, the
communication cost related to the vehicle side is (512+256+
256 + 32) / 8 = 132 bytes. The communication cost related to
the fog server side is also (512 + 256 + 256 + 32) / 8 = 132
bytes.
In the AKA phase of our scheme, a secure session key is
established between the vehicle and the RSU, the communi-
cation cost for the vehicle in this AKA phase is calculated
as (256 ∗2 + 512 ∗2 + 32)/8 = 196 bytes. The communi-
cation cost for the RSU in this AKA phase is calculated as
TABLE II
THE GAS COSTS OF STATE-CHANGING OPERATIONS
(256∗3+32∗2+512∗3+(256+256+256+32)t2 +(256+
256 + 32)t1 + 256)/8 = 328 + 100t2 + 68t1 bytes.
Based on the above analysis, it indicates that our pro-
posed scheme incurs slightly higher communication costs
compared to the other schemes, which is a necessary trade-
oﬀfor achieving full decentralization and thereby signiﬁcantly
enhancing system security and robustness. Nonetheless, our
scheme retains notable advantages when evaluated from a
holistic perspective.
D. Blockchain-Related Costs Analysis
In terms of evaluating blockchain overhead, we deeply
measured the gas cost and processing latency to ensure that
our proposed scheme has eﬃcient and practical performance
in a VANETs environment. By creating a simulated local
blockchain network using Ganache, we wrote smart contracts
using Solidity and used the Truﬄe framework for smart
contract deployment and testing.
In the simulation experiment, we modeled a scenario in
which 100 cars sent diﬀerent types of transactions that trig-
gered various operations of the smart contract. Through the
Web3 callback function, we accurately captured the receipts
of each transaction and recorded the gas consumption and
processing latency of each transaction in detail. As illustrated
in Table II, we detailed the gas costs of each operation.
Meanwhile, in Fig. 6, we visualize the distribution of process-
ing delay. Due to the natural diﬀerences in operating system
task scheduling and blockchain network transaction process-
ing, the processing delay exhibits some ﬂuctuations among
diﬀerent vehicles. However, through statistical analysis, we
derive the average processing latency of vehicle registration,
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:44:50 UTC from IEEE Xplore.  Restrictions apply. 



# Page 15

WEI et al.: BLOCKCHAIN-DRIVEN HIERARCHICAL AUTHENTICATION AND KEY AGREEMENT SCHEME FOR VANETs
6427
public key registration, and token registration operations as
13.367 ms,18.952 ms, and 21.575 ms respectively.
The results of the simulation experiments fully prove that
our proposed scheme performs well in terms of processing
latency. According to the T/CSAE 53-2020 [32] standard,
these latency values are all in line with the maximum
latency criterion (500 ms) speciﬁed for V2X communication
for applications in the high-latency, low-frequency category.
Considering that AKA occurs less frequently in real-world
applications, the cost of gas for our scheme is found to be
reasonable and economical.
VII. CONCLUSION
Here,
we
propose
a
hierarchical
AKA
scheme
for
VANETs with cloud-edge collaboration powered by consor-
tium blockchain. This innovative scheme leverages consortium
blockchain technology, where CSs and ESs function as a
robust trust infrastructure, eliminating the need for fully
centralized trust centers. Furthermore, we have developed
a vehicle reputation system that dynamically adjusts user
reputation scores. This mechanism eﬀectively mitigates threats
posed by internal attacks, thus safeguarding system security.
To ensure resilience against potential security breaches, we
also employ a hierarchical threshold voting mechanism. This
approach guarantees that the system’s security remains intact
even in the event of malicious or misbehaving CSs and
ESs, signiﬁcantly enhancing overall security. Our scheme
boasts rigorous proof conﬁrming its correctness, security, and
adherence to essential security and privacy standards. Further-
more, our performance evaluation underscores its superiority
over existing approaches, demonstrating higher computational
eﬃciency, reduced communication overhead, and improved
simulation performance.
ACKNOWLEDGMENT
The authors are very grateful to the anonymous referees for
their detailed comments and suggestions regarding this article.
REFERENCES
[1]
C. Glover. (2023). Tesla Data Breach? Whistleblower ’Leaks 100gb
of Information. Tech Monitor. Accessed: Mar. 25, 2025. [Online].
Available:
https://www.techmonitor.ai/technology/cybersecurity/tesla-
data-breach-whistleblower?cf-view&cf-closed
[2]
Reuters. (2022). Toyota Cyberattack: Production to Restart in Japan
After Attack on Kojima Industries. CNN Business. Accessed: Mar. 25,
2025. [Online]. Available: https://edition.cnn.com/2022/03/01/business/
toyota-japan-cyberattack-production-restarts-intl-hnk/index.html
[3]
L. Zhang, Q. Wu, J. Domingo-Ferrer, B. Qin, and C. Hu, “Distributed
aggregate privacy-preserving authentication in VANETs,” IEEE Trans.
Intell. Transp. Syst., vol. 18, no. 3, pp. 516–526, Mar. 2017.
[4]
H.
Zhu
and
J.
Liu,
“Provably
secure
and
repeatable
authenti-
cated privacy-protection scheme using chaotic maps with distributed
architecture,” Int. J. Netw. Secur., vol. 20, pp. 463–471, Jan. 2018.
[5]
P. Vijayakumar, M. Azees, S. A. Kozlov, and J. J. Rodrigues, “An
anonymous batch authentication and key exchange protocols for 6G
enabled VANETs,” IEEE Trans. Intell. Transp. Syst., vol. 23, no. 2,
pp. 1630–1638, Feb. 2022.
[6]
M. Ma, D. He, H. Wang, N. Kumar, and K.-K. R. Choo, “An eﬃcient
and provably secure authenticated key agreement protocol for fog-based
vehicular ad-hoc networks,” IEEE Internet Things J., vol. 6, no. 5,
pp. 8065–8075, Oct. 2019.
[7]
D.
Abbasinezhad-Mood,
A.
Ostad-Sharif,
S.
M.
Mazinani,
and
M. Nikooghadam, “Provably secure escrow-less Chebyshev chaotic
map-based key agreement protocol for vehicle to grid connections
with privacy protection,” IEEE Trans. Ind. Informat., vol. 16, no. 12,
pp. 7287–7294, Dec. 2020.
[8]
L. Wei, J. Cui, H. Zhong, Y. Xu, and L. Liu, “Proven secure tree-based
authenticated key agreement for securing V2V and V2I communi-
cations in VANETs,” IEEE Trans. Mobile Comput., vol. 21, no. 9,
pp. 3280–3297, Sep. 2022.
[9]
M.-C. Chuang and M. C. Chen, “An anonymous multi-server authenti-
cated key agreement scheme based on trust computing using smart cards
and biometrics,” Expert Syst. Appl., vol. 41, no. 4, pp. 1411–1418, Mar.
2014.
[10] J. Cui, X. Zhang, H. Zhong, J. Zhang, and L. Liu, “Extensible con-
ditional privacy protection authentication scheme for secure vehicular
networks in a multi-cloud environment,” IEEE Trans. Inf. Forensics
Security, vol. 15, pp. 1654–1667, 2019.
[11] S. H. Islam, M. S. Obaidat, P. Vijayakumar, E. Abdulhay, F. Li, and
M. K. C. Reddy, “A robust and eﬃcient password-based conditional
privacy preserving authentication and group-key agreement protocol for
VANETs,” Future Gener. Comput. Syst., vol. 84, pp. 216–227, Jul. 2018.
[12] S. Son, J. Lee, Y. Park, Y. Park, and A. K. Das, “Design of blockchain-
based lightweight V2I handover authentication protocol for VANET,”
IEEE Trans. Netw. Sci. Eng., vol. 9, no. 3, pp. 1346–1358, May 2022.
[13] C. Lin, X. Huang, and D. He, “EBCPA: Eﬃcient blockchain-based con-
ditional privacy-preserving authentication for VANETs,” IEEE Trans.
Depend. Secure Comput., vol. 22, no. 6, pp. 1818–1832, Jun. 2022.
[14] F. Li, Z. Guo, C. Zhang, W. Li, and Y. Wang, “ATM: An active-detection
trust mechanism for VANETs based on blockchain,” IEEE Trans. Veh.
Technol., vol. 70, no. 5, pp. 4011–4021, May 2021.
[15] H. Feng, D. Chen, and Z. Lv, “Blockchain in digital twins-based vehicle
management in VANETs,” IEEE Trans. Intell. Transp. Syst., vol. 23,
no. 10, pp. 19613–19623, Oct. 2022.
[16] Z. Ma, J. Zhang, Y. Guo, Y. Liu, X. Liu, and W. He, “An eﬃcient decen-
tralized key management mechanism for VANET with blockchain,”
IEEE Trans. Veh. Technol., vol. 69, no. 6, pp. 5836–5849, Jun. 2020.
[17] Q. Zhang et al., “Blockchain-based asymmetric group key agreement
protocol for Internet of Vehicles,” Comput. Electr. Eng., vol. 86, Sep.
2020, Art. no. 106713.
[18] C. Meng, H. Zhang, H. Ji, and X. Li, “Mutual authentication and
distributed key management with permissioned blockchain in MEC-
enabled vehicular networks,” in Proc. 7th IEEE Int. Conf. Netw. Intell.
Digit. Content (IC-NIDC), Nov. 2021, pp. 393–397.
[19] X. Li, J. Liu, M. S. Obaidat, P. Vijayakumar, Q. Jiang, and R. Amin,
“An unlinkable authenticated key agreement with collusion resistant for
VANETs,” IEEE Trans. Veh. Technol., vol. 70, no. 8, pp. 7992–8006,
Aug. 2021.
[20] Z. Xu, W. Liang, K.-C. Li, J. Xu, and H. Jin, “A blockchain-based
roadside unit-assisted authentication and key agreement protocol for
Internet of Vehicles,” J. Parallel Distrib. Comput., vol. 149, pp. 29–39,
Mar. 2021.
[21] Q. Li, A. Malip, K. M. Martin, S.-L. Ng, and J. Zhang, “A reputation-
based announcement scheme for VANETs,” IEEE Trans. Veh. Technol.,
vol. 61, no. 9, pp. 4095–4108, Nov. 2012.
[22] Z. Yang, K. Zheng, K. Yang, and V. C. Leung, “A blockchain-based
reputation system for data credibility assessment in vehicular networks,”
in Proc. IEEE 28th Annu. Int. Symp. Pers., Indoor, Mobile Radio
Commun. (PIMRC), Oct. 2017, pp. 1–5.
[23] D. Boneh and V. Shoup. (2020). A Graduate Course in Applied Cryp-
tography. [Online]. Available: http://toc.cryptobook.us
[24] M. Fersch, E. Kiltz, and B. Poettering, “On the provable security of
(EC)DSA signatures,” in Proc. ACM SIGSAC Conf. Comput. Commun.
Secur., Oct. 2016, pp. 1651–1662.
[25] D. Pointcheval and J. Stern, “Security arguments for digital signatures
and blind signatures,” J. Cryptol., vol. 13, no. 3, pp. 361–396, 2000.
[26] A.
Vangala,
A.
K.
Das,
A.
Mitra,
S.
K.
Das,
and
Y.
Park,
“Blockchain-enabled authenticated key agreement scheme for mobile
vehicles-assisted precision agricultural IoT networks,” IEEE Trans. Inf.
Forensics Security, vol. 18, pp. 904–919, 2022.
[27] M. Shen, H. Lu, F. Wang, H. Liu, and L. Zhu, “Secure and eﬃ-
cient blockchain-assisted authentication for edge-integrated Internet-of-
Vehicles,” IEEE Trans. Veh. Technol., vol. 71, no. 11, pp. 12250–12263,
Nov. 2022.
[28] Y. Han, C. Xu, C. Jiang, and K. Chen, “A secure two-factor authen-
tication key exchange scheme,” IEEE Trans. Depend. Secure Comput.,
vol. 21, no. 6, pp. 5681–5693, Nov. 2024.
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:44:50 UTC from IEEE Xplore.  Restrictions apply. 



# Page 16

6428
IEEE TRANSACTIONS ON INFORMATION FORENSICS AND SECURITY, VOL. 20, 2025
[29] Y. Ma, X. Li, W. Shi, and Q. Cheng, “STCLA: An eﬃcient certiﬁcateless
authenticated key agreement scheme for the Internet of Vehicles,” IEEE
Trans. Veh. Technol., vol. 73, no. 4, pp. 4830–4841, Apr. 2024.
[30] Miracl Cryptographic SDK. Accessed: Jul. 29, 2023. [Online]. Avail-
able: https://github.com/miracl/MIRACL/
[31] (2023). Ganache V2.7.1: A Personal Ethereum Blockchain. Accessed:
Jul. 29, 2023. [Online]. Available: https://truﬄesuite.com/ganache/
[32] Cooperative Intelligent Transportation System; Vehicular Communica-
tion; Application Layer Speciﬁcation and Data Exchange Standard,
Cooperative Intelligent Transportation System, T. Society of Automotive
Engineers of China, Beijing, China, 2020.
Lu Wei (Member, IEEE) is currently an Associate
Professor with the School of Computer Science
and Technology, Anhui University. He has over
20 scientiﬁc publications in reputable journals
(e.g., IEEE TRANSACTIONS ON DEPENDABLE AND
SECURE COMPUTING, IEEE TRANSACTIONS ON
INFORMATION FORENSICS AND SECURITY, IEEE
JOURNAL ON SELECTED AREAS IN COMMUNICA-
TIONS, IEEE TRANSACTIONS ON MOBILE COM-
PUTING, and IEEE TRANSACTIONS ON INTELLI-
GENT TRANSPORTATION SYSTEMS). His research
interests include security and privacy issues in vehicular ad hoc networks,
applied cryptography, and blockchain.
Yongjuan Zhang is currently a Research Student
with the School of Computer Science and Technol-
ogy, Anhui University. Her research focuses on the
security of the vehicular ad hoc networks.
Jie Cui (Senior Member, IEEE) was born in Henan,
China, in 1980. He received the Ph.D. degree from
the University of Science and Technology of China
in 2012. He is currently a Professor and a Ph.D.
Supervisor with the School of Computer Science and
Technology, Anhui University. He has over 150 sci-
entiﬁc publications in reputable journals (e.g., IEEE
TRANSACTIONS ON DEPENDABLE AND SECURE
COMPUTING, IEEE TRANSACTIONS ON INFOR-
MATION FORENSICS AND SECURITY, IEEE JOUR-
NAL ON SELECTED AREAS IN COMMUNICATIONS,
IEEE TRANSACTIONS ON MOBILE COMPUTING, IEEE TRANSACTIONS
ON PARALLEL AND DISTRIBUTED SYSTEMS, IEEE TRANSACTIONS ON
COMPUTERS, IEEE TRANSACTIONS ON INTELLIGENT TRANSPORTATION
SYSTEMS, IEEE TRANSACTIONS ON NETWORK AND SERVICE MAN-
AGEMENT, IEEE TRANSACTIONS ON INDUSTRIAL INFORMATICS, IEEE
TRANSACTIONS ON INDUSTRIAL ELECTRONICS, IEEE TRANSACTIONS
ON CLOUD COMPUTING, and IEEE TRANSACTIONS ON MULTIMEDIA),
academic books, and international conferences. His current research interests
include applied cryptography, the IoT security, vehicular ad hoc networks,
cloud computing security, and software-deﬁned networking (SDN). He is on
the Editorial Board of several international journals, such as IET Communi-
cations, Security and Communication Networks, and Sensors.
Hong Zhong was born in Anhui, China, in 1965.
She received the Ph.D. degree in computer science
from the University of Science and Technology
of China in 2005. She is currently a Profes-
sor and a Ph.D. Supervisor with the School of
Computer Science and Technology, Anhui Uni-
versity. She has over 200 scientiﬁc publications
in reputable journals (e.g., IEEE JOURNAL ON
SELECTED AREAS IN COMMUNICATIONS, IEEE
TRANSACTIONS ON PARALLEL AND DISTRIBUTED
SYSTEMS,
IEEE TRANSACTIONS
ON MOBILE
COMPUTING,
IEEE TRANSACTIONS
ON DEPENDABLE
AND SECURE
COMPUTING, IEEE TRANSACTIONS ON INFORMATION FORENSICS AND
SECURITY, IEEE TRANSACTIONS ON INTELLIGENT TRANSPORTATION
SYSTEMS, IEEE TRANSACTIONS ON MULTIMEDIA, IEEE TRANSACTIONS
ON VEHICULAR TECHNOLOGY, IEEE TRANSACTIONS ON NETWORK AND
SERVICE MANAGEMENT, IEEE TRANSACTIONS ON CLOUD COMPUTING,
IEEE TRANSACTIONS ON INDUSTRIAL INFORMATICS, IEEE TRANSAC-
TIONS ON INDUSTRIAL ELECTRONICS, and IEEE TRANSACTIONS ON BIG
DATA), academic books, and international conferences. Her research interests
include applied cryptography, the IoT security, vehicular ad hoc networks,
cloud computing security, and software-deﬁned networking (SDN).
Irina Bolodurina received the Ph.D. degree from
South Ural State University. She is currently a Pro-
fessor and the Head of the Department of Applied
Mathematics, Orenburg State University. She has
over 60 scientiﬁc publications in academic journals
and international conferences indexed in Scopus and
WoS. She has participated in over 20 scientiﬁc
projects supported by RFBR and other Russian
scientiﬁc programs. Her current research interests
include theory of optimal control, mathematical
modeling, information analysis software, control of
social and economic systems, decision support systems, data integration, and
processing.
Debiao He (Member, IEEE) received the Ph.D.
degree in applied mathematics from the School
of Mathematics and Statistics, Wuhan University,
Wuhan, China, in 2009. He is currently a Pro-
fessor with the School of Cyber Science and
Engineering, Wuhan University, and the Shanghai
Key Laboratory of Privacy Preserving Computation,
MatrixElements Technologies, Shanghai, China. He
has published over 100 research papers in refereed
international journals and conferences, such as IEEE
TRANSACTIONS ON DEPENDABLE AND SECURE
COMPUTING, IEEE TRANSACTIONS ON INFORMATION SECURITY AND
FORENSIC, and the Usenix Security Symposium. His work has been cited
more than 10000 times at Google Scholar. His main research interests
include cryptography and information security, in particular, cryptographic
protocols. He was a recipient of the 2018 IEEE Systems Journal Best Paper
Award and the 2019 IET Information Security Best Paper Award. He is
on the Editorial Board of several international journals, such as Journal of
Information Security and Applications, Frontiers of Computer Science, and
Human-Centric Computing and Information Sciences.
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:44:50 UTC from IEEE Xplore.  Restrictions apply. 
