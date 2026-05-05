

# Page 1

7408
IEEE TRANSACTIONS ON INTELLIGENT TRANSPORTATION SYSTEMS, VOL. 22, NO. 12, DECEMBER 2021
BCPPA: A Blockchain-Based Conditional
Privacy-Preserving Authentication Protocol
for Vehicular Ad Hoc Networks
Chao Lin
, Debiao He
, Member, IEEE, Xinyi Huang
, Member, IEEE,
Neeraj Kumar
, Senior Member, IEEE, and
Kim-Kwang Raymond Choo
, Senior Member, IEEE
Abstract—While Vehicular Ad-hoc Networks (VANETs) can
potentially improve driver safety and trafﬁc mangement efﬁ-
ciency (e.g. through timely sharing of trafﬁc status among
vehicles), security and privacy are two ongoing issues that need
to be addressed. Hence, security solutions such as conditional
privacy-preserving authentication (CPPA) protocols have been
proposed. However, CPPA protocols are generally far from being
ready for deployment in VANETs, for example due key/certiﬁcate
management limitations in PKI-based protocols or intractable
private key updating in ID-based protocols. Although serveral
blockchain-based CPPA (BCPPA) protocols have been proposed
to mitigiate these challenges, there still exist some intractabilities
such as revoking private key, or frequent interactions, or requir-
ing an idea hardware. Thus, in this paper, we are motivated to
propose a novel BCPPA protocol without these existing issues.
Speciﬁcally, we present a PKI-based solution (using a typical
digital signature protocol, such as ECDSA) based on Ethereum
(a public blockchain), which is designed to facilitate secure
communication in VANETs. In other words, we combine the
blockchain technology and a key derivation algorithm to realize
an effective certiﬁcate management. This reduces the need for
participating vehicles to store a large number of private keys.
To reduce the veriﬁcation time cost, our BCPPA suppotrs
replacing ECDSA with modiﬁed ECDSA for batch veriﬁcation
Manuscript received September 20, 2018; revised November 2, 2019,
January 11, 2020, and May 7, 2020; accepted June 10, 2020. Date of
publication June 30, 2020; date of current version November 29, 2021. This
work was supported in part by the National Natural Science Foundation of
China under Grant 61972294 and Grant 61932016. The work of Kim-Kwang
Raymond Choo was supported in part by the Cloud Technology Endowed
Professorship and in part by the National Science Foundation CREST under
Grant HRD-1736209. The Associate Editor for this article was C. T. Chigan.
(Corresponding author: Debiao He.)
Chao Lin and Debiao He are with the School of Cyber Science and
Engineering, Wuhan University, Wuhan 430072, China, and also with the Peng
Cheng Laboratory Cyberspace Security Research Center, Shenzhen 518000,
China (e-mail: linchao91@qq.com; hedebiao@163.com).
Xinyi Huang is with the School of Mathematics and Computer Science,
Fujian Normal University, Fuzhou 350117, China, and also with the Fujian
Provincial Key Laboratory of Network Security and Cryptology, Fujian
Normal University, Fuzhou 350117, China (e-mail: xyhuang81@gmail.com).
Neeraj Kumar is with the Department of Computer Science and Engi-
neering, Thapar University, Patiala 147004, India, also with the Depart-
ment of Computer Science and Information Engineering, Asia University,
Taizhong 100600, Taiwan, and also with King Abdul Aziz University, Jeddah,
Saudi Arabia (e-mail: neeraj.kumar@thapar.edu).
Kim-Kwang Raymond Choo is with the Department of Information
Systems and Cyber Security, The University of Texas at San Antonio,
San Antonio, TX 78249 USA, and also with the Department of Electri-
cal and Computer Engineering, The University of Texas at San Antonio,
San Antonio, TX 78249 USA (e-mail: raymond.choo@fulbrightmail.org).
Digital Object Identiﬁer 10.1109/TITS.2020.3002096
or directly adopting other PKI-based signatures with batch
veriﬁcation. In addition to introducing the concrete design,
we also present the security requirements that our BCPPA
protocol can satisfy. We then implement BCPPA in the Ethereum
test network (i.e. Rinkeby) and provide simulations using Vanet-
MobiSim and NS-2 to show its feasibility (i.e. milliseconds).
Index Terms—Vehicular ad hoc network (VANET), conditional
privacy-preserving
authentication
(CPPA),
key
derivation
algorithm, blockchain, smart contract.
I. INTRODUCTION
V
EHICULAR Ad Hoc Network (VANET) is a self-
organized ad-hoc network, where vehicles and roadside
units (RSUs) are connected typically via wireless communica-
tions. Each participating vehicle is equipped with an On-Board
Unit (OBU) (some wireless communication device), which
provides the ability for vehicles to communicate with nearby
vehicles and RSUs. The RSUs can further connect to the
backbone network, for example via the Internet, for data
sharing.
A typical VANET network model (see Figure 1) comprises
Trafﬁc Control Center (TCC), RSU, Vehicle, and Internet.
There are three main modes of communications, namely:
Wired/Wireless connection, Vehicle-to-Vehicle, and Vehicle-
to-RSU. Wired/ wireless connection is used to connect vehicles
and/or RSUs to the Internet, and the other two wireless
communications are controlled by a Dedicated Short Range
Communication (DSRC) protocol to facilitate short-range
communication [1]. On basic of the OBUs and DSRC, vehicles
can communicate with each other or with RSUs to share
their current road trafﬁc conditions (e.g. weather condition
and congestion situation) or driving status (e.g. location and
speed). This can help the vehicles to effectively avoid traf-
ﬁc congestions or possible trafﬁc accidents by executing a
timely response (e.g. re-routing to avoid trafﬁc buildup) [2].
TCC can obtain these trafﬁc messages from the RSUs via the
Internet and take corresponding actions in a timely fashion
(e.g. adjusting trafﬁc lights).
Beneﬁts of VANETs include supporting smart processing
and real-time response in modern intelligent transportation
systems. There are, however, potential safety concerns that
should not be ignored especially during wireless communica-
tion mode, since wireless communication is more vulnerable
1558-0016 © 2020 IEEE. Personal use is permitted, but republication/redistribution requires IEEE permission.
See https://www.ieee.org/publications/rights/index.html for more information.
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:53:50 UTC from IEEE Xplore.  Restrictions apply. 



# Page 2

LIN et al.: BCPPA: A BLOCKCHAIN-BCPPA PROTOCOL
7409
Fig. 1.
A typical VANET network model.
than wired communication. For example, attackers can seek to
create societal unrest by targeting such transportation system,
for instance by intercepting, modifying, replay or deleting
transmitting messages. Hence, the authenticity, validity and
integrity of transmitted messages should be ensured to avoid
impersonation or malicious modiﬁcation. Successful attacks
can result in real-world fatalities.
While message authentication can mitigate some of these
attacks, we also need to consider protecting the privacy of
vehicles (and their drivers/owners). For example, when a
vehicle shares its trafﬁc status with another RSU or vehicle, its
identity will also be known. An attacker could mine such infor-
mation and trace the route of the vehicle. Moreover, according
to existing IEEE Standard [3], vehicles generally broadcast
messages about their road trafﬁc conditions and driving
status periodically at an interval of 100-300 milliseconds.
Such frequency in the broadcasted message facilitates the
traceability of vehicles. Clearly, there are potential privacy and
safety concerns.
One of the proposed solutions to support secure communica-
tions in VANETs is conditional privacy-preserving authentica-
tion (CPPA) [4], [5]. In the context of VANET, the vehicle’s
privacy should be conditionally protected in a CPPA proto-
col. This implies that the vehicle remains anonymous for most
entities, although a trusted entity can extract the real identity of
the vehicle. This allows one to ﬁnd out a misbehaving vehicle
(e.g. a vehicle who has sent a fabricated trafﬁc status), so that
appropriate penalty can be given to the offending vehicle.
Existing CPPA protocols for VANETs can be broadly cat-
egorized into PKI-based [4]–[6] and ID-based [7]–[10]. The
latter category does not suffer from issues due to key/certiﬁcate
preloading and revocation that exist in PKI-based protocols,
and some schemes such as [1], [11], [12] further support batch
veriﬁcation to improve performance. However, these ID-based
solutions result in new problems such as the intractability
of revoking the vehicle’s private key. This issue as well as
other such as frequent interactions and requiring an idea hard-
ware, are still existing in those newly raised blockchain-based
CPPA (BCPPA) protocols (e.g. [13], [14]). Hence, we are
motivated to propose an efﬁcient PKI-based BCPPA protocol
that eases the above issues.
A. Contributions
We demonstrate that Blockchain (a distributed ledger tech-
nology [15]–[17]) can be reliably used to store information
(e.g. certiﬁcates or system parameters), which can then be
retrieved by vehicles or RSUs to facilitate authentication.
We also explain how smart contract can be used to establish
the relationship among relevant information and perform revo-
cation when the need arises. In addition, we introduce a key
derivation algorithm to avoid the need of pre-storing a large
number of keys in vehicle OBU. This really addresses the
key escrow problem and guarantees the periodically updated
private information, meaning that our proposal also relies on
a realistic OBU.
We further propose a concrete BCPPA protocol using a
typical digital signature scheme (e.g. ECDSA) in PKI systems.
Our design supports the replacing of ECDSA with some mod-
iﬁed ECDSA that supports batch veriﬁcation (e.g. [18]–[20])
in order to minimize veriﬁcation cost in VANETs. Note that
other signatures with batch veriﬁcation can also be integrated
into our BCPPA protocol, which is of independent interests.
Finally, we give the security and performance analysis to
demonstrate the feasibility of our proposal.
B. Organization
We organize the rest of this paper as follows. Section II
reviews existing CPPA protocols designed for VANETs.
We introduce the blockchain-based system model and security
requirements in Section III, prior to presenting the system
building blocks in Section IV. We present our proposal
and its security analysis in Sections V and VI, respectively.
In Section VII, we implement our BCPPA in a Ethereum test
network (i.e. Rinkeby1) with MetaMask-Chrome2 and Remix,3
and also provide two simulations using NS-2 for testing the
average message delay and loss ratio. The ﬁndings are also
presented in the section. Finally, we conclude this paper in
Section VIII.
II. RELATED WORK
The
concept
of
CPPA
was
proposed
by
Raya
and
Hubaux [4] to address security and privacy concerns in
VANETs. They also presented a concrete CPPA protocol
using anonymous certiﬁcates, which can be realized using
a modiﬁed PKI. That is, a large number of public/private
key pairs and corresponding certiﬁcates are pre-loaded into
vehicles’ OBUs to achieve anonymous authentication (hiding
the vehicle’s real identity). When the vehicle wishes to share
its trafﬁc status, it should randomly choose a public/private
key pair for message authentication via a signature. This will,
however, result in signiﬁcant storage costs (i.e. storing keys
and certiﬁcates) for both vehicles and the relevant authority,
as well as incurring signiﬁcant cost to perform revocation of
keys and certiﬁcates.
To mitigate the above deﬁciencies, Lu et al. [5] introduced a
novel CPPA protocol via RSU-based anonymous certiﬁcates.
1https://www.rinkeby.io
2https://metamask.io/
3http://remix.ethereum.org
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:53:50 UTC from IEEE Xplore.  Restrictions apply. 



# Page 3

7410
IEEE TRANSACTIONS ON INTELLIGENT TRANSPORTATION SYSTEMS, VOL. 22, NO. 12, DECEMBER 2021
Fig. 2.
Architecture of blockchain-based authentication protocol.
When the vehicle drives to an area near to a RSU, it will
obtain a temporary anonymous certiﬁcate for authentication.
Although one can achieve conditional privacy by frequently
requesting for new anonymous certiﬁcates, signature sign-
ing and veriﬁcation largely rely on online RSUs. This is
inefﬁcient in VANETs. Similarly, the CPPA protocols pre-
sented by Freudiger et al. [21] and Zhang et al. [6] incur
signiﬁcant storage cost for certiﬁcates in both vehicles and
RSUs. In fact, one can observe from the literature a com-
mon limitation in existing CPPA protocols is key/certiﬁcate
management complexity. Thus, there have been attempts to
design ID-based CPPA protocols, such as those using ID-based
signature [7], [22], [23], software-based solution [24], pseudo-
ID-based solutions [1], and so on [8], [25]. All these protocols
either focus on improving some existing solutions to achieve
required security requirements or improving the efﬁciency of
CPPA to support VANET applications.
However, most of these protocols either rely on an ideal
hardware or are not suitable for multi-cloud environment.
For solving the former challenge, Zhang et al. [11] proposed
a Chinese Remainder Theorem-based CPPA Scheme and
Zhang et al. [12] constructed a new CPPA scheme using
multiple trusted authority one-time identity-based aggregate
signature, both of which only require realistic tamper-proof
devices. As the latter one, Cui et al. [26] designed a robust
and extensible CPPA protocol that can meet the increasing
diversiﬁed service needs in VANETs. Nevertheless, there still
exists one common intractability of revoking vehicles’ private
keys in these ID-based solutions, which is an area that is
relatively understudied.
Concurrently,
there
are
several
Blockchain-based
CPPA (BCPPA) protocols have been proposed to solve
those drawbacks existing in PKI-based solutions such as
non-transparency of trusted authorities and heavy workload
of revoking certiﬁcates. For example, Lu et al. [13] integrated
blockchain and Merkle Patricia Tree to propose a novel
BCPPA
protocol
with
privacy
protection
and
efﬁcient
certiﬁcate revocation, but it requires frequent interactions
between
vehicles
and
certiﬁcate
authority
to
generate
anonymous certiﬁcates. Zheng et al. [14] adopted pseudonym
technology to design a ID-based BCPPA protocol with
traceable anonymity, but which is faced with the requirement
of ideal hardware and cannot resist against compromised
certiﬁcate authority.
III. PROBLEM DEFINITION
In this section, we introduce the system model and the
relevant security requirements.
A. System Model
The proposal BCPPA consists of four entities, i.e., Certiﬁ-
cate Authorities (CA), Road Side Uints (RSU), Vehicle and
Blockchain Network (BN) (see Figure 2), which connect with
each other via the communications (C2B, V2R, and V2V).
Here, C2B refers to the communication between CA and
blockchain nodes (e.g. RSUs) that CA publishes transactions
into the blockchain, V2R refers to that vehicles can request
transaction data from the blockchain maintained by nearby
RSUs, and V2V refers to the communication among vehicles
via DSRC protocol. Note that the trafﬁc control center and
Internet in our system are consistent with that of the typical
model in Figure 1, here we omit the description of them.
• CA: The CA is a trusted entity with enough resources
(including computation and storage) who is responsible
for managing certiﬁcates of vehicles’ or RSUs’ public
keys. These certiﬁcates are signed by CA and embedded
into the transactions via the C2B communication. In addi-
tion, CA builds the relationships between the issued
public keys and its transaction identity using the smart
contract such that one can conveniently retrieve the goal
certiﬁcates from the blockchain. In our BCPPA, CA is
the only entity who can obtain the real identity of the
vehicle (i.e. conditional anonymity) from the intercepted
messages.
• RSU: The RSU is a road side infrastructure which uses
the DSRC protocol to communicate with OBUs. It also
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:53:50 UTC from IEEE Xplore.  Restrictions apply. 



# Page 4

LIN et al.: BCPPA: A BLOCKCHAIN-BCPPA PROTOCOL
7411
serves as a full node (i.e. storing all the transaction
data of the blockchain) which provides the APIs for
retrieving transactions and triggering the chained smart
contract (e.g. the test chain rinkeby of Ethereum).4 Here,
we assume that RSUs are fully trusted entities would not
provide pseudo APIs.
• Vehicle: The Vehicle is equipped with an OBU which
is an internal processing unit (with the tamper-proof
property) can support DSRC protocol. Here, the OBU in
our proposal is realistic, in the sense that the stored secrets
inside can be periodically updated. Each OBU stores a
private seed for deriving the vehicle’s one-time private
key via a key derivation algorithm, which efﬁciently
avoids the storage of vast private keys. During the running
process of the vehicle, the OBU regularly broadcasts its
trafﬁc status to nearby vehicles and RSUs. Here, the OBU
mainly interacts with RSU for retrieving transactions
via V2R communication and communicates with other
vehicles via V2V communication.
• BN: The Blockchain Network provides the immutable,
undeniable, and veriﬁable data storage forming as
so-called transactions which constitute a blockchain. Con-
cretely, we embed public certiﬁcates into the transaction
such that the vehicles can obtain the goal certiﬁcates from
the blockchain instead of preloading all the certiﬁcates
in the OBUs. Here, we propose using a mature public
blockchain (e.g. Ethereum) for our design that can be
joined by anyone to maintain the blockchain. As men-
tioned above, RSUs join in this network as a full node
supporting services (including retrieving transactions and
triggering the smart contract) for nearby vehicles.
B. Security Requirements
In VANETs, security and privacy requirements are neces-
sary to guarantee the secure communications among vehi-
cles and RSUs. We investigate the existing research about
authentication in VANETs such as [1], [4], [9] and the
blockchain-based systems such as [27]–[29] to propose the
following security requirements for a secure BCPPA protocol
in VANETs.
1) Message
Authentication: Vehicles can
verify
the
authenticity of transmitted messages from other vehicles.
It means that any modiﬁcation on the message will be
detected. Note that in our model, the C2B and V2R
communications can be realized through HTTPs proto-
col (e.g. a web browser such as rinkeby), because RSUs
mainly provide the blockchain data retrieval service
for vehicles. Hence, we mainly consider this security
requirement among V2V communications.
2) Conditional Privacy Preservation: The vehicle’s pri-
vacy should be conditionally protected, meaning that
only CA but other devices (e.g. RSUs and other vehicles)
can extract the vehicle’s real identity by analyzing the
intercepted messages. In other words, RSUs and other
vehicles can trust the transmitted messages are from
some vehicles without knowing their real identities,
4https://www.rinkeby.io/
which efﬁciently protects the privacy and security of
vehicles. Once a vehicle broadcasts some inaccurate
trafﬁc statuses, they will be disclosed and revoked
by CA.
3) Unlinkability: To prevent some malicious attackers
from tracing the vehicle’s travel path, two messages from
the same vehicle cannot be linked.
4) Birthday Collision Resilience: The protocol should
minimize the possibility of generating two same blocks
simultaneously, i.e., it can efﬁciently resist birthday
collision and avoid disputes between sub-blockchains.
5) Hijacking Resilience: The protocol should prevent
attackers from hijacking transactions to realize a smooth
transaction (i.e. ensuring the non-modiﬁability of trans-
actions).
6) 51% Attack Resilience: The protocol should prevent
attackers from controlling majority of computing power
(i.e. hashrate in PoW) which can directly reverse and
alter past transactions to reach the double-spending
target.
7) Resilience to Other Attacks: The blockchain-based
CPPA protocol should be able to resist various com-
mon attacks (e.g. impersonation, modiﬁcation, distrib-
uted denial of service, replay, man-in-the-middle, stolen
veriﬁer table, and side-channel attacks) in VANETs.
IV. SYSTEM BUILDING BLOCKS
A. Digital Signature
As mentioned in [4], a safety message in VANETs requires
legitimacy but not conﬁdentiality, because it does not contain
any sensitive information. Hence, authentication is enough
for the exchange of safety messages in VANETs and we
adopt digital signatures (e.g. ECDSA) for the message
authentication.
Assuming that each vehicle owns their public/private key
pairs, they can digitally sign messages (denoted as Sign
algorithm) using a private key such that the receiver can verify
its authenticity using the corresponding public key (denoted
as Verify algorithm). For authenticating the public key to a
legitimate vehicle, a trusted authority (i.e. CA) is required to
sign these public keys (generating certiﬁcates). This implies
the use of Public Key Infrastructure (PKI).
In the typical PKI environment, if a vehicle (e.g. V1)
would like to send a safety message to other vehicles,
it needs to sign the message by invoking Sign with its private
key. Meanwhile, it should also provide the issued public
key certiﬁcate from CA such that the receiver can verify
the public key and then authenticate the message. That is,
(M, Sign(skV1, M, T ), CertV1) is necessary for transmitting
a safety message M, where skV1 is V1’s private key, T is the
current timestamp for ensuring the message freshness, CertV1
is the public key certiﬁcate of V1.
In addition, the function of batch veriﬁcation in digital
signatures is an interesting property to reduce the veriﬁcation
time cost. Especially in the vast interactions of VANETs,
this mechanism should be provided for the vehicles so that
they can verify the validity of many messages simultaneously.
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:53:50 UTC from IEEE Xplore.  Restrictions apply. 



# Page 5

7412
IEEE TRANSACTIONS ON INTELLIGENT TRANSPORTATION SYSTEMS, VOL. 22, NO. 12, DECEMBER 2021
Hence, some modiﬁed ECDSA schemes (such as [18]–[20])
supporting batch veriﬁcation could be substituted directly
in our proposal to achieve a lower veriﬁcation cost. Here,
we emphasize that any PKI-based signature with batch ver-
iﬁcation (e.g. Schnorr signature and Boneh–Lynn–Shacham
(BLS) signature [30]) can also be integrated into our BCPPA
for an improved performance.
Anyhow, the communication in our design does not trans-
mit the CA’s certiﬁcate, for which the certiﬁcates are all
pre-recorded into the blockchain by CA for the direct retrieval
by the vehicles. This can avoid the storage cost of storing
abundant certiﬁcates in OBUs.
B. Key Derivation
In the current anonymous authentication protocols for
VANETs based on certiﬁcation (e.g. [4], [31]), a great deal of
public/private key pairs and corresponding certiﬁcates should
be pre-loaded into vehicles’ OBUs. This causes a large storage
space requirement of OBUs to store these key pairs and
certiﬁcates. To avoid the necessity for preloading abundant
key pairs, we propose using a key derivation algorithm (e.g.
BIP325 widely used in Bitcoin) in our protocol. The security
of BIP32 can be reduced to the discrete logarithm assumption,
namely, knowledge of any child public keys pki alone is
insufﬁcient to recover the master public key pkroot or even
other child public keys pk j. This is the core for our proposal
to achieve the property of anonymity and unlinkability [32].
Someone may argue that there exists a weakness in this
algorithm that master private key skroot can be recovered if
given the master public key pkroot and any child private key
ski. Here, we suggest using hardened keys for the account
level in the tree6 or adopting other improved key derivation
algorithms such as [32] to mitigate this risk and achieve
improved security. For a clearer understanding, we have drawn
the ﬂow chart (see Figure 3) for the key derivation algorithm
with the following brief description.
• Private type derivation: This type is executed by the
owner of private key (i.e. the OBUs equipped in the vehi-
cles). A random seed is chosen to generate the root private
key skroot and chain code chainroot, which are used to
derive a fresh private key ski for each communication.
The corresponding pkroot = skrootG and chainroot are
transmitted to CA such that CA can derive the new public
key pki and generate its certiﬁcate.
• Public type derivation: This type is executed by CA
to derive the corresponding public key using the public
information (i.e. pkroot and chainroot). The process is
similar to that of private type derivation, which ﬁnally
generates pki and chaini. Here, we can check that pki =
ski G, meaning that the consistency can be ensured (with
regard to the same index i) even the CA and vehicles do
not interact with each other to perform key management.
This functionality also means that the CA can trace
the master public key pkroot of a given derived public
5https://github.com/bitcoin/bips/wiki/Comments:BIP-0032
6https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki
Fig. 3.
The model of key derivation.
key pki, and hence guarantee the accountability of our
proposal.
Note that CA should pre-issue the certiﬁcate of pki into the
blockchain and update the indexes in the smart contract. This
can guarantee that the vehicle can successfully retrieve the
certiﬁcate corresponding to its new deriving private key.
C. Transaction
For the
certiﬁcates
issue
into
blockchain, we
adopt
embedding the certiﬁcate into the transaction. Speciﬁcally,
the Ethereum (a public blockchain) is used in our design and
its transaction format is reviewed as follows.
• nonce: This ﬁeld records the account of transactions that
a user has published, which is sequentially incremented
for every transaction.
• gasPrice: This ﬁeld deﬁnes the number of Wei (a unit of
measurement in Ethereum) that per gas can be worth.
• gasLimit: This ﬁeld deﬁnes the limitation number of gas
used in the transaction.
• to: This ﬁeld is padded with the receiver address for
receiving tokens or triggering smart contract (when it is
an address of a smart contract).
• value: This ﬁeld represents the amount of tokens sent
from a sender to a receiver.
• (v, r, s): This ﬁeld is a ECDSA signature for authenticat-
ing the transaction information and its sender.
• init: This is one of optional ﬁelds that will be padded
with EVM-code when the type of a transaction is smart
contract creation (i.e. when the ﬁeld to is ∅).
• data: This is the other optional ﬁeld which will be padded
with some input data such as parameters for triggering the
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:53:50 UTC from IEEE Xplore.  Restrictions apply. 



# Page 6

LIN et al.: BCPPA: A BLOCKCHAIN-BCPPA PROTOCOL
7413
smart contract. In our design, we use this ﬁeld to store
the certiﬁcate of the vehicle’s public key.
Note that a smart contract creation will return an address
for the subsequent triggering of this contract. There are
two kinds of transaction for triggering the contract, that
is, “eth_calls” (executed by the local node) and “internal
transactions”(invoked among different smart contracts). The
details of designing our smart contract will be introduced in
Section IV-E.
D. Blockchain
Blockchain, as the nucleus of Bitcoin’s architecture, has
attracted a lot of attention with a signiﬁcant growth in both
horizontal expansion (e.g. Bitcoin [33], Ethereum [34]) and
vertical development (e.g. Hyperledger [35]). The former is
called a public blockchain (i.e. anyone can join or quit the
system to commonly maintain the blockchain), whereas the
latter is only maintained by some trusted nodes (hence, it is
called a permissioned or private blockchain). All these types
of blockchain are maintained based on some consensus mech-
anisms (e.g. PoW [33] and PoS [36] in the public blockchain,
PBFT [37] and RAFT [38] in the permissioned one) such that
the blockchain is chronologically chained with immutability.
As mentioned above, the CA in our proposal needs to issue
the certiﬁcates into the blockchain for others to retrieve. The
smart contract function is necessary for mapping the public
key to the transaction identity. Hence, we propose using the
Ethereum (which has been widely used for designing DAPPs
with Solidity7 for writing smart contracts) for our design.
E. Smart Contract
Smart contracts are computerized transaction protocols that
negotiate and perform a contract which obviates the need for
a contractual clause [39]. It should be compiled into a piece
of bytecode via a Turing complete language (e.g. Solidity),
prior to being recorded into the chain forever. Then, its
provided functions or application binary interfaces (ABIs) can
be invoked via a transaction or a message from other contracts.
It should be noted that each contract is a special account with
its own address (named as smart contract address) and this
address is indispensable for triggering the contract.
In our design, we mainly use the smart contract to map vehi-
cles’ public key to the transaction identities in the blockchain.
The involved smart contract is simple but practical which only
needs to provide the functions of update (only the CA can
successfully invoked to map new transaction identity to the
corresponding public key), get (can be invoked by anyone to
obtain the transaction identity of a required public key), and
deletetx (the same as update but for deleting the existing
mapping when detecting malicious behaviors).
Here, the get is a view type function which is used for
retrieving data from smart contract without any gas con-
sumption and transaction conﬁrmation. This can satisfy the
low latency requirement of communications in VANETs. This
smart contract also owns the function of certiﬁcate revocation,
7http://solidity.readthedocs.io/en/v0.4.24/
which is realized by deletetx algorithm. That is, only those
valid and unrevoked certiﬁcates can be mapped in the contract,
otherwise, the CA will delete the mapping to revoke the invalid
and revoked certiﬁcates. The concrete contract design is brieﬂy
presented in Algorithm 1.
Algorithm 1 Part 1 - Smart Contract on MapPkToTx
Require: Function name, invoked parameters
Ensure: Setting up functions:
address ca; % Deﬁne the address of CA
mapping (address →uint256) public PK2T X;
function MapPkToTx()
% Constructor, automatically invokes when this smart con-
tract is deployed.
ca = msg.sender; % Deﬁne the deployer as the CA
function update(address user, uint256 txid) public returns
(address addr)
% Invoked by CA to map a transaction identity to a public
key.
require(msg.sender == ca); % Only the CA can success-
fully executed this algorithm
PK2T X[user] = txid;
return msg.sender;
function get() view returns (txid)
% Invoked by any to retrieve a transaction identity to the
required public key.
return PK2T X[msg.sender];
function deletetx(target) public returns (txid)
% Invoked by CA to delete the target mapping
require(msg.sender == ca); % Only the CA can success-
fully delete the existing mapping
delete PK2T X[target];
V. THE PROPOSED BCPPA
In this section, we describe our BCPPA based on a pub-
lic blockchain (i.e. Ethereum). Note that the digital signa-
ture scheme we adopt is ECDSA, however, this scheme
could be replaced by some ones supporting batch veriﬁcation
(e.g. [18]–[20]) to reduce the veriﬁcation time cost and achieve
a more satisfactory performance for VANETs. No matter
which algorithm will be used, the proposed BCPPA can
efﬁciently support the secure V2V communication, which
consists of three phases (as shown in Figure 4), i.e., System
Initialization Phase (Step 1∼7), Message Signing Phase
(Step 8∼12) and Message Veriﬁcation Phase (Step 13∼15).
A. System Initialization Phase
This phase is executed by Vehicles and Certiﬁcate Author-
ities (CA) to initialize the key derivation and issue key
certiﬁcates. Before the process of key certiﬁcates, all the
vehicles should execute the private type derivation as shown
in Fig. 3. That is, each of them randomly chooses a private
seed (also named as a mnemonic word) to generate the
private information (skroot and chainroot). Then they compute
the corresponding public information (pkroot and chainroot)
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:53:50 UTC from IEEE Xplore.  Restrictions apply. 



# Page 7

7414
IEEE TRANSACTIONS ON INTELLIGENT TRANSPORTATION SYSTEMS, VOL. 22, NO. 12, DECEMBER 2021
Fig. 4.
The model of key derivation.
which are transmitted to CA. The former private information
will be pre-loaded into the OBUs for deriving subsequent
private keys by vehicles and the latter public ones are for
deriving the corresponding public keys by CA.
For the convenient retrieval of certiﬁcates, CA deploy the
smart contract to build the relationship between a public key
and its relevant transaction identity. The obtained identity of
smart contract (denoted by SC I D) is also replied to all the
vehicles for subsequently triggering this smart contract (i.e.
require or update data in SC I D). Then CA executes the
following processes to issue key certiﬁcates in the blockchain
for vehicles.
1) Assuming that the current serial number of vehicle Vi
is j, CA executes the public type derivation to get the
jth public key pkij of vehicle Vi.
2) Then it uses private key skC A to generate the certiﬁcate
of pkij via computing Sij = Sign(skC A, pkij ).
3) To record the certiﬁcate into the blockchain, CA embeds
Sij into a transaction that will be broadcast and chained
into the blockchain by the miners. Then, the CA will
obtain the transaction identity T x I Dij , which can be
used to retrieve the certiﬁcate Sij .
4) Finally, CA invokes the update algorithm to update pkij
and T x I Dij into the smart contract.
In addition, the CA could invoke the deletetx algorithm to
revoke the compromised and expired vehicles. Once the map-
ping is deleted, the index of a certiﬁcate will no longer exist,
meaning that this certiﬁcate has been revoked or invalided.
B. Message Signing Phase
This phase is executed by any vehicle to generate a
message/signature pair for authenticating its identity and the
message. This pair will be broadcast to nearby RSUs and
vehicles via wireless communications such that all the vehicle
can share their current trafﬁc status with each other. Here,
we assume that a vehicle (e.g. Vi) would like broadcast a
message M to nearby vehicles (e.g. Vj), it will perform the
following steps.
1) Due to the OBUs equipped in vehicles do not preload all
the private keys, Vi should ﬁrst execute the private type
derivation to obtain the current private key (denoted as
skij ) and computes pkij = skij G.
2) Then, Vi triggers the smart contract SC I D via invok-
ing Get algorithm to get the transaction identity (i.e.
T x I Dij ) of the public certiﬁcate corresponding to pkij.
If the certiﬁcate is not revoked and Vi will obtain the
T x I Dij ; otherwise, it will get a null value.
3) Finally, Vi invokes the signing algorithm to gener-
ate the signature of M and T x I Dij using skij , that
is, S = Sign(skij , M, T, T x I Dij ), where T is the
current timestamp. Then, the message /signature pair
(S, M, T, T x I Dij ) will be sent to Vj.
C. Message Veriﬁcation Phase
In this phase, the veriﬁer (a vehicle or a RSU) will verify
if the received message/signature pair valid or not. Once
the received information is valid, it means that the veriﬁer
can believe the received trafﬁc status and perform some
actions (e.g. changing lanes) if need be. According to the
above subsection, the vehicle Vj will receive (S, M, T x I Dij )
from Vi. Then, it can check the validity of (S, M, T x I Dij )
with the certiﬁcate of CA’s public key and the blockchain data
(i.e. Vi’s certiﬁcate). The veriﬁcation process is presented as
follows.
1) Vj
gets the transaction data of T x I Dij
from the
blockchain (via ABIs provided by the nearby RSU).
Then, Vj can obtain the certiﬁcate Sij of Vi’s public
key pkij from this transaction data.
2) Then Vj uses the certiﬁcate of CA’s public key pkC A to
check the validity of Sij , that is, it estimates the equation
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:53:50 UTC from IEEE Xplore.  Restrictions apply. 



# Page 8

LIN et al.: BCPPA: A BLOCKCHAIN-BCPPA PROTOCOL
7415
Verify(pkC A, pkij , Sij ) = 1 holds or not. If not, Vj
rejects this trafﬁc status; otherwise, Vj uses the pkij to
verify if the equation Verify(pkij, M, T, T x I Dij , S) =
1 holds or not. If it holds, the message M is valid and
authenticated from Vi.
VI. SECURITY ANALYSIS
In this section, we discuss the security requirements that
our proposal can satisfy. That is mainly based on the security
of the adopted digital signature scheme and the blockchain
system. The details are given as follows.
1) Message Authentication: Due to the security of our
adopted signature scheme (e.g. ECDSA), there exist
no probabilistic polynomial time adversary can forge a
valid message without the signing private key. In addi-
tion, the certiﬁcate signed by the CA can help the
receiver to authenticate the sender’s public key. There-
fore, the receiver can verify the authenticity and integrity
of the message (S, M, T, T x I Dij ) through checking
if both the equations Verify(pkC A, pkij , Sij ) = 1 and
Verify(pkij , M, T, T x I Dij , S) = 1 hold.
2) Conditional Privacy Preservation: In our proposal,
the vehicle uses vast one-time public/private key pairs
derived by a key derivation algorithm (which is hard
to reverse the root pkroot and skroot with those derived
public keys). Note that the CA owns (pkroot, chainroot)
and hence it can record the history of the derived public
keys in the local database for relating some one-time
public keys to the root pkroot (i.e. ﬁnding out the
vehicle’s real identity). It means that no one (except CA)
can know the real identity of these one-time public keys
through intercepting the transmitted messages. Hence,
our proposal satisﬁes the aforementioned conditional
privacy preservation.
3) Unlinkability: To broadcast a message M, the vehi-
cle will derive a new private key and then signs M.
To link two messages to the same senders, one should
own the derivation ability to verify if one public key
is derived from another one. However, the derivation
process requires a chain code (i.e., chaini) which is
secretly keep by the CA. This represents that our pro-
posal can reach to this security requirement.
4) Birthday Collision Resilience: This property is ensured
because of the consensus mechanisms used in the
Ethereum (i.e. PoW and PoS). These consensus mech-
anisms are used to combat forks and hence effectively
decrease probability of blocks’ birthday collisions.
5) Hijacking Resilience: All the transactions in Ethereum
are signed by a digital signature scheme (i.e. ECDSA).
This can resist hijacking attacks, because the security
of ECDSA guarantees that no probabilistic polynomial
time adversary can tamper the message of a transaction
without invalidating the signatures.
6) 51% Attack Resilience: To resist this attack, the only
feasible measure is to make the cost of executing it
as high as possible. For example, a higher issuance
rate or a higher market price will help with that.
The adopted Ethereum in our proposal uses a novel PoW
with the “ASIC-resistant” expected to reduce economic
incentives for mining centralization and then mitigates
this risk.
7) Resilience to Other Attacks: Other attacks our proposal
can resist are also listed as follows.
• Impersonation Attack: To impersonate a legiti-
mate vehicle to other vehicles, the attacker must
generate a valid signature for its targeted message.
However, this is not possible for any probabilistic
polynomial time attacker according to the mentioned
discussion and the receiver can detect this mali-
cious attack by the simply verifying the signature.
Hence, our BCPPA can resist the impersonation
attack.
• Modiﬁcation Attacks: Assuming that an attacker
modiﬁes the broadcast message M′, it will be dis-
covered and discarded because it cannot forge a
valid signature for M′ without the sender’s private
key and the veriﬁcation of the modiﬁed message
/signature will return false.
• Distributed Denial of Service (DDoS) Attack: Our
BCPPA is beneﬁted from the adopted Ethereum,
among which DDoS requires a economically expen-
sive transactions fees or gas consumptions. That’s
one of the attractive features because a server
responds to your request for free on the regular
Internet whereas the blockchain requires you to pay
a price (which is actually huge).
• Replay Attack: A fresh one-time private /public key
pair is derived (by the vehicle and CA respectively)
for the signing/veriﬁcation of each communication.
In addition, the timestamp embedded in each signa-
ture can also keep the message freshness. This can
facilitate the vehicles in detecting any replay attack.
• Man-in-the-middle Attack: From the above analy-
sis of message authentication, it is clear that BCPPA
provides secure authentication among the vehicles.
Thus, it can also withstand this type of attacks.
• Stolen Veriﬁer Table Attack: The authentication in
our design is based on the digital signatures without
the need of maintaining a veriﬁer table in Vehicles.
Hence, the adversary cannot steal any veriﬁer table
for malicious attacks.
Side-channel
• Attacks: In our BCPPA, only the secrets skroot and
chainroot are stored in OBUs. These information
are periodically updated, and hence it is much
harder for an attacker to recover these secrets via
launching side-channel attacks than to recover some
unchanged secret embedded in existing ID-based
solutions such as [1], [9]. As a matter of fact,
most of existing secure protocols supporting online
authentication have to embed similar secrets in the
OBUs. This means that our BCPPA can achieve
the similar security level of the secrets to these
protocols. Furthermore, we suggest adopting mul-
tiplicative secret sharing MSS) technique [12], [40]
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:53:50 UTC from IEEE Xplore.  Restrictions apply. 



# Page 9

7416
IEEE TRANSACTIONS ON INTELLIGENT TRANSPORTATION SYSTEMS, VOL. 22, NO. 12, DECEMBER 2021
Fig. 5.
The issue of certiﬁcation.
to protect these secrets and increase the difﬁculty of
launching powerful side-channel attacks.
VII. PERFORMANCE ANALYSIS
A. Implementation and Gas Cost
To discuss the feasibility of our BCPPA, we implemented
it on Rinkeby8 (a Ethereum test network). Here, Rinkeby not
only provides a free request of funds, but also designs a
user friendly web interface for a convenient block explorer.
Moreover, we adopted a plug-in of Google Chrome (i.e.
MetaMask-Chrome9) to connect Rinkeby in the Chrome and
Remix10 to deploy and invoke the smart contract. The details
of this implementation are presented as follows.
1) Firstly, we used MetaMask to generate three accounts
(C A, Vehicle1, and V ehicle2) for our test, addresses
of which are 0×0e185e60Cee4Fb7c60dc22A52ca6F717
B379D5C2, 0×74d7BE4941cD90ebacbBF42F017fA
8397 970 f A22, and 0xe85bFDd5045dea3253092E50b
6aF F7F124F7aC2b respectively. Then switched to
the C A’s account and requested 3 Ethers from the
Rinkeby such that C A can publish transactions for
issuing certiﬁcates. Here, we simulated the C A to
issue the certiﬁcate of V ehicle1’s public key, that is,
C A prepared the certiﬁcate and embedded it into a
transaction. Once this transaction is recorded into the
Rinkeby, a transaction identity would be returned such
that others can retrieve it from the chain. The results
are shown in Figure 5.
2) Then, we executed the followings as C A’s identity.
As shown in Figure 6, we deployed the smart contract
into the Rinkeby using Remix and obtained its address
8https://www.rinkeby.io
9chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/home.html#
10http://remix.ethereum.org
Fig. 6.
The deployment of smart contract.
Fig. 7.
Executing the update function.
(i.e.
0×0 f b5739 f 30d47a3c7edce10 f 2631288b42cb
6ead). We also invoked the update algorithm via
Remix to update the V ehicle1’s public key with the
aforementioned transaction identity into the Rinkeby
(see Figure 7).
3) Next, we simulated the V ehicle1 to retrieve the loca-
tion of its certiﬁcate chained in the Rinkeby. That is,
we switched to the V ehicle1 account and invoked the
get algorithm to obtain the information (see Figure 8).
Here, the designed get is a view type algorithm which
does not modify the state of the smart contract (hence,
without any transaction conﬁrmation time).
4) Finally, assuming that the V ehicle2 received a message
from Vehicle2, it should retrieve the certiﬁcate from the
Rinkeby according to the received transaction identity.
Hence, we switched to the Vehicle2 account and get the
targeted transaction in the Rinkeby (see Figure 9). Note
that the transaction identity stored in the smart contract
is decimal, which should be conversed into hexadecimal
before being used to retrieve the transaction data.
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:53:50 UTC from IEEE Xplore.  Restrictions apply. 



# Page 10

LIN et al.: BCPPA: A BLOCKCHAIN-BCPPA PROTOCOL
7417
Fig. 8.
Retrieving the transaction identity.
Fig. 9.
Retrieving the transaction data.
TABLE I
SMART CONTRACT GAS COST (GAS PRICE = 2 GWEI,
1 ETHER = 188 USD)
In addition, to test the cost in terms of transaction fees,
we evaluated the gas cost of these operations (i.e. deploy
update, get, and deletetx). From the result in Table I,
the maximum cost was the deployment of smart contract
(i.e. deploy) with approximately USD 0.1536, but which was
only executed once. While all the other operations would be
invoked repeatedly, the cost of them was less than USD 0.03
(especially the cost of get was about USD 0.0093). This means
that one vehicle only needs to spend about USD 0.0093 for
authenticating the other, which is an acceptable cost even the
authentication is frequent.
B. Vehicle Authentication Efﬁciency
We also tested the time cost of key derivation KD algo-
rithm, Sign and Verify algorithms of ECDSA, for which both
the certiﬁcate issue and authentication phases involve these
algorithms. The pairing-based library (version 0.5.12)11 was
used in our simulation and the adopted Type A pairings were
constructed on the curve y2 = x3+x over the ﬁeld Fq for some
primes q =3 mod 4. Each algorithm was executed 1000 times
to obtain the average results. The concrete simulation platform
11http://crypto.stanford.edu/pbc/
TABLE II
TIME COST (IN S) OF CRYPTOGRAPHIC ALGORITHMS
is Ubuntu 16.04 (64 bits) with an Intel (R) Core (TM) i7-
6700 CPU 3.40 GHZ and 3 GB RAM, and ﬁndings are shown
in Table II.
Based on the test time of above algorithms, we ﬁnally
evaluated the performance of our BCPPA from the perspec-
tives of certiﬁcate management (maintained by the C A) and
authentication in communications (among vehicles).
1) Certiﬁcate Management: As mentioned in [4], a vehi-
cle should change its key within an interval of around
1 min. Assuming that a driver uses his/her car about
average two hours per day and a driver requires about
43800 certiﬁcates per year. Because the solution in [4]
requires that all the keys/certiﬁcates are generated at a
time and pre-loaded into the OBUs. This not only causes
an intolerable storage cost in OBUs, but also results in
a crowded huge amount of computation cost in C A and
a long time cost for checking the validity of certiﬁcate
via the fast-growing CRL.
Our proposal can resolve these issues, where the vehicles
do not need to pre-load the keys /certiﬁcates in OBUs
but only the private seed and index (which can be used
to derive a new private key in each new communication).
In addition, the vehicles can obtain the certiﬁcates from
Rinkeby directly.
As the certiﬁcate manager, the C A needs to pre-issue
the certiﬁcates into the Rinkeby. Here, we propose that
the C A can derive public keys for some day usages
(e.g. about 240 for a interval of two days) at a time
and generate the corresponding certiﬁcates. In addition,
the certiﬁcate revocation can be directly realized via
triggering the deletetx in the smart contract.
Although these operations also cause some computation
and time costs (e.g. KD algorithm, Sign, and Transaction
Conﬁrmation), they have greatly reduced the complex
computational cost compared to that of the existing
PKI-based solutions. Here, we would not detail the
concrete cost because these can be preprocessed by the
C A. Instead, we focus on the follow analysis of the
computation and time cost in a commutation.
2) Authentication in Communications: In each commu-
nication among two vehicles, it involves the message
signing and veriﬁcation. Hence we ﬁst counted the
operations and then computed the approximate time and
communication costs, the comparative results of which
are shown in Table III. Here, eth_calls represents the
invocation of get algorithm from the smart contract
and transaction_retrieval is the operation of retrieving
transaction data from Rinkeby, |T x I D| is the length of
a transaction hash (i.e. 32 bytes), |S| is the length of
a ECDSA signature (i.e. 64 bytes in our simulation),
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:53:50 UTC from IEEE Xplore.  Restrictions apply. 



# Page 11

7418
IEEE TRANSACTIONS ON INTELLIGENT TRANSPORTATION SYSTEMS, VOL. 22, NO. 12, DECEMBER 2021
TABLE III
COMPARISON WITH EXISTING PKI-BASED SOLUTIONS
|M| is the length of a message (where we set as
32 bytes), and |T | is the length of a timestamp (where
we set as 8 bytes).
Both Message Signing and Veriﬁcation phases of our
BCPPA have the similar time costs to that of tra-
ditional ECDSA-based protocols [41], [42], for the
time costs of eth_calls and transaction_retrieval can be
omitted if without considering the transmission delay.
In addition, the communication cost is 264 bytes in
our BCPPA, which requires three additional hash values
(i.e. 96 bytes) than protocols in [41], [42]. This cost is
acceptable for our BCPPA owns some additional features
(e.g. anonymity and traceability) than those traditional
ECDSA-based protocols.
From the above discussion, we can ﬁnd that the main time cost
may be caused in the certiﬁcate management (which can be
preprocessed) and the time cost of the authentication can reach
to the millisecond level. This could satisfy with the feel-good
experience requirement of users and demonstrates the major
beneﬁt of our BCPPA.
C. Message Authentication Delay and Loss Rate
To analyze the average message authentication delay and
average message loss rate, we performed two simulations
using VanetMobiSim12 and NS-213 in a personal computer
(Dell with Intel Core i7-6770 CPU 3.40 GHZ, 4 GB RAM
and Ubuntu 16.04 OS). In our simulations,14 the simulated
scenario is in a map (see Fig. 10), which is split into four
0.5 × 0.5 km2 blocks and every block is maintained by a
RSU (with communication range of 600 m). The vehicles are
equipped with average speed from 7.5 m/s to 40 m/s, and
communication range of 300 m, as well as broadcast messages
interval of 100 ms. The broadcast bandwidth bound was
6 Mbps, and the packet size was 264 bytes. Other parameters
like Channel, Propagation, Phy, Mac, Queue, and Antenna
were set as WirelessChannel, TwoRayGround, WirelessPhy,
802_11, DropTail/PriQueue, and OmniAntenna, respectively.
The simulation time in each simulation was both 100 s.
According to the deﬁnitions of average packet delay (APD)
and packet loss ratio (PLR) [43], together with simulators
results, we obtains the ﬁnal results as shown in Fig. 11 and
Fig. 12. In the ﬁrst simulator, we set the speed of vehicles as
about 10-20 m/s with increasing the number of vehicles (i.e.
density) from 5 to 100. From Figure 11, we observe that the
12http://vanet.eurecom.fr/
13https://www.isi.edu/nsnam/ns/
14Source codes in our simulation including smart contract, NS test code,
VanetMobiSim test code are available at: https://github.com/colyn91/BCPPA
Fig. 10.
Simulation scenario with 1 × 1 km2.
Fig. 11.
The impact of density in packet delay and loss.
the APD is nearly unchanged (about 40 ms) when the density
is less than 70, after that it grows rapidly. The PLR is almost
zero at the beginning of the frame and sequentially increases
when the density increases. Nevertheless, the increasing rate
of PLR tends to be moderate after the density exceeds 70.
For all combinations of the above results, the performance
degradation of VANETs will be caused when the density is
more than 70. Thus, in the second simulator, we set the
density as 70 to test the impact of different average speeds
in the APD and PLR. The results are shown in Figure 12,
on the one hand, the PLR keeps nearly constant even the
average speed of vehicles increases. This means that the
average speed of vehicles has little inﬂuence on the PLR in
the same density, which corresponds to the reality that only
those packets out of scope of vehicles will be lost. On the
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:53:50 UTC from IEEE Xplore.  Restrictions apply. 



# Page 12

LIN et al.: BCPPA: A BLOCKCHAIN-BCPPA PROTOCOL
7419
Fig. 12.
The impact of speed in packet delay and loss.
other hand, the APD is ﬂuctuating when the average speed
changes. It may be caused by that the different average speeds
of vehicles lead to the unpredictable distance change among
vehicles and hence different APDs. Nevertheless, the span of
APD is not more than 60 ms.
VIII. CONCLUSION
As
driverless
vehicles
become
more
commonplace,
VANETs will play an increasingly important role, for exam-
ple in enhancing trafﬁc safety and efﬁciency. In turn, this
necessitates the design of secure and practical communica-
tion mechanism. Thus, in this paper, we presented a novel
blockchain-based CPPA (BCPPA) protocol designed to facili-
tate secure communication in VANETs. Speciﬁcally, we inte-
grated both blockchain and key derivation algorithm to design
a novel BCPPA protocol. In our proposed BCPPA protocol,
we use ECDSA as the building block which can also be
replaced by some modiﬁed ECDSA (or any other PKI-based
signature) with batch veriﬁcation to improve the performance.
We also demonstrated the security and utility of the proposed
protocol.
Future research includes implementing the proposed mech-
anism in the authors’ institutions with the aims of evaluating
both security and performance in a real-world environment.
REFERENCES
[1] D. He, S. Zeadally, B. Xu, and X. Huang, “An efﬁcient identity-based
conditional privacy-preserving authentication scheme for vehicular ad
hoc networks,” IEEE Trans. Inf. Forensics Security, vol. 10, no. 12,
pp. 2681–2691, Dec. 2015.
[2] A.
Boukerche,
H.
A.
B.
F.
Oliveira,
E.
F.
Nakamura,
and
A. A. F. Loureiro, “Vehicular ad hoc networks: A new challenge
for localization-based systems,” Comput. Commun., vol. 31, no. 12,
pp. 2838–2849, Jul. 2008.
[3] IEEE Trial-Use Standard for Wireless Access in Vehicular Environment
Security Services for Applications and Management Messages, IEEE
Standard 1609.2-2006, 2006.
[4] M. Raya and J.-P. Hubaux, “Securing vehicular ad hoc networks,”
J. Comput. Secur., vol. 15, no. 1, pp. 39–68, 2007.
[5] R. Lu, X. Lin, H. Zhu, P.-H. Ho, and X. Shen, “ECPP: Efﬁcient
conditional privacy preservation protocol for secure vehicular commu-
nications,” in Proc. 27th Conf. Comput. Commun. (IEEE INFOCOM),
Phoenix, AZ, USA, Apr. 2008, pp. 1229–1237.
[6] C. Zhang, X. Lin, R. Lu, and P.-H. Ho, “RAISE: An efﬁcient RSU-
aided message authentication scheme in vehicular communication net-
works,” in Proc. IEEE Int. Conf. Commun., Beijing, China, May 2008,
pp. 1451–1457.
[7] K.-A. Shim, “CPAS: An efﬁcient conditional privacy-preserving authen-
tication scheme for vehicular sensor networks,” IEEE Trans. Veh.
Technol., vol. 61, no. 4, pp. 1874–1883, May 2012.
[8] J. K. Liu, T. H. Yuen, M. H. Au, and W. Susilo, “Improvements on
an authentication scheme for vehicular sensor networks,” Expert Syst.
Appl., vol. 41, no. 5, pp. 2559–2564, Apr. 2014.
[9] M. Bayat, M. Barmshoory, M. Rahimi, and M. R. Aref, “A secure
authentication scheme for VANETs with batch veriﬁcation,” Wireless
Netw., vol. 21, no. 5, pp. 1733–1743, Jul. 2015.
[10] T. W. Chim, S. M. Yiu, L. C. K. Hui, and V. O. K. Li, “SPECS: Secure
and privacy enhancing communications schemes for VANETs,” Ad Hoc
Netw., vol. 9, no. 2, pp. 189–203, Mar. 2011.
[11] J. Zhang, J. Cui, H. Zhong, Z. Chen, and L. Liu, “PA-CRT: Chi-
nese remainder theorem based conditional privacy-preserving authen-
tication scheme in vehicular ad-hoc networks,” IEEE Trans. Depend-
able Secure Comput., early access, Mar. 11, 2019, doi: 10.1109/
TDSC.2019.2904274.
[12] L.
Zhang,
Q.
Wu,
J.
Domingo-Ferrer,
B.
Qin,
and
C.
Hu,
“Distributed aggregate privacy-preserving authentication in VANETs,”
IEEE Trans. Intell. Transp. Syst., vol. 18, no. 3, pp. 516–526, Mar. 2017.
[13] Z. Lu, Q. Wang, G. Qu, H. Zhang, and Z. Liu, “A blockchain-based
privacy-preserving authentication scheme for VANETs,” IEEE Trans.
Very Large Scale Integr. (VLSI) Syst., vol. 27, no. 12, pp. 2792–2801,
Dec. 2019.
[14] D. Zheng, C. Jing, R. Guo, S. Gao, and L. Wang, “A traceable
blockchain-based access authentication system with privacy preservation
in VANETs,” IEEE Access, vol. 7, pp. 117716–117726, 2019.
[15] M. Swan, Blockchain: Blueprint for a New Economy. Newton, MA,
USA: O’Reilly Media, Inc., 2015.
[16] C. Lin, D. He, X. Huang, X. Xie, and K.-K.-R. Choo, “Blockchain-based
system for secure outsourcing of bilinear pairings,” Inf. Sci., vol. 527,
pp. 590–601, Jul. 2020.
[17] C. Lin, D. He, X. Huang, M. Khurram Khan, and K.-K.-R. Choo,
“A new transitively closed undirected graph authentication scheme for
blockchain-based identity management systems,” IEEE Access, vol. 6,
pp. 28203–28212, 2018.
[18] S.
Karati
and
A.
Das,
“Faster
batch
veriﬁcation
of
standard
ECDSA signatures using summation polynomials,” in Proc. 12th
Int. Conf. Appl. Cryptography
Netw. Secur. (ACNS), in Lecture
Notes in Computer Science, vol. 8479, I. Boureanu, P. Owesarski,
and S. Vaudenay, Eds. Lausanne, Switzerland: Springer, Jun. 2014,
pp. 438–456.
[19] S. Karati, A. Das, and D. Roychoudhury, “Randomized batch veriﬁcation
of standard ECDSA signatures,” in Proc. 4th Int. Conf. Secur., Privacy,
Appl. Cryptogr. Eng. (SPACE), in Lecture Notes in Computer Science,
vol. 8804, R. S. Chakraborty, V. Matyas, and P. Schaumont, Eds. Pune,
India: Springer, Oct. 2014, pp. 237–255.
[20] S. Karati, A. Das, D. R. Chowdhury, B. Bellur, D. Bhattacharya, and
A. Iyer, “Batch veriﬁcation of ECDSA signatures,” in Proc. 5th Int.
Conf. Cryptol. Afr. Prog. Cryptol. (AFRICACRYPT), in Lecture Notes
in Computer Science, vol. 7374, A. Mitrokotsa and S. Vaudenay, Eds.
Ifran, Morocco: Springer, Jul. 2012, pp. 1–18.
[21] J. Freudiger, M. Raya, F. Mark, P. Papadimitratos, and J. P. Hubaux,
“Mix-zones for location privacy in vehicular networks,” in Proc. WiN-
ITS, 2007, pp. 1–7.
[22] C. Zhang, R. Lu, X. Lin, P.-H. Ho, and X. Shen, “An efﬁcient identity-
based batch veriﬁcation scheme for vehicular sensor networks,” in
Proc. 27th Conf. Comput. Commun. (IEEE INFOCOM), Apr. 2008,
pp. 246–250.
[23] C. Zhang, P.-H. Ho, and J. Tapolcai, “On batch veriﬁcation with group
testing for vehicular communications,” Wireless Netw., vol. 17, no. 8,
pp. 1851–1865, Nov. 2011.
[24] T. W. Chim, S. Yiu, L. C. K. Hui, Z. L. Jiang, and V. O. K. Li,
“SPECS: Secure and privacy enhancing communications schemes for
VANETs,” in Proc. 1st Int. Conf. Ad Hoc Netw. (ADHOCNETS), in
Lecture Notes of the Institute for Computer Sciences, Social Informat-
ics and Telecommunications Engineering, vol. 28, J. Zheng, S. Mao,
S. F. Midkiff, and H. Zhu, Eds. Niagara Falls, ON, Canada: Springer,
Sep. 2009, pp. 160–175.
[25] J. Zhang, M. Xu, and L. Liu, “On the security of a secure batch
veriﬁcation with group testing for VANET,” Int. J. Netw. Secur., vol. 16,
no. 5, pp. 355–362, 2014.
[26] J. Cui,
X. Zhang,
H. Zhong,
J. Zhang,
and L.
Liu, “Exten-
sible
conditional
privacy
protection
authentication
scheme
for
secure
vehicular
networks
in
a multi-cloud
environment,”
IEEE
Trans. Inf. Forensics Security, vol. 15, pp. 1654–1667, 2020, doi:
10.1109/TIFS.2019.2946933.
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:53:50 UTC from IEEE Xplore.  Restrictions apply. 



# Page 13

7420
IEEE TRANSACTIONS ON INTELLIGENT TRANSPORTATION SYSTEMS, VOL. 22, NO. 12, DECEMBER 2021
[27] C. Lin, D. He, X. Huang, K.-K.-R. Choo, and A. V. Vasilakos, “BSeIn:
A blockchain-based secure mutual authentication with ﬁne-grained
access control system for industry 4.0,” J. Netw. Comput. Appl., vol. 116,
pp. 42–52, Aug. 2018.
[28] C. Lin, D. He, N. Kumar, X. Huang, P. Vijayakumar, and K.-K.-R. Choo,
“HomeChain: A blockchain-based secure mutual authentication system
for smart homes,” IEEE Internet Things J., vol. 7, no. 2, pp. 818–829,
Feb. 2020.
[29] N. Z. Aitzhan and D. Svetinovic, “Security and privacy in decentralized
energy trading through multi-signatures, blockchain and anonymous
messaging streams,” IEEE Trans. Dependable Secure Comput., vol. 15,
no. 5, pp. 840–852, Sep. 2018.
[30] G. Fuchsbauer, M. Orrù, and Y. Seurin, “Aggregate cash systems:
A cryptographic investigation of mimblewimble,” in Proc. 38th Annu.
Int. Conf. Theory Appl. Cryptograph. Techn. Adv. Cryptol. (EURO-
CRYPT), in Lecture Notes in Computer Science, vol. 11476, Y. Ishai and
V. Rijmen, Eds. Darmstadt, Germany: Springer, May 2019, pp. 657–689.
[31] X. Lin, R. Lu, C. Zhang, H. Zhu, P.-H. Ho, and X. Shen, “Security
in vehicular ad hoc networks,” IEEE Commun. Mag., vol. 46, no. 4,
pp. 88–95, Apr. 2008.
[32] G. Gutoski and D. Stebila, “Hierarchical deterministic bitcoin wallets
that tolerate key leakage,” in Proc. 19th Int. Conf. Financial Cryptogr.
Data Secur. (FC), in Lecture Notes in Computer Science, vol. 8975,
R. Böhme and T. Okamoto, Eds. San Juan, PR, USA: Springer,
Jan. 2015, pp. 497–504.
[33] S.
Nakamoto,
Bitcoin:
A
Peer-to-Peer
Electronic
Cash
System.
Consulted, 2008. [Online]. Available: https://git.dhimmel.com/bitcoin-
whitepaper/
[34] G. Wood, “Ethereum: A secure decentralised generalised transaction
ledger,” Ethereum Project Yellow Paper, vol. 151, no. 2014, pp. 1–32,
2014.
[35] E. Androulaki et al., “Hyperledger fabric: A distributed operating system
for permissioned blockchains,” in Proc. 13th EuroSys Conf. (EuroSys),
R. Oliveira, P. Felber, and Y. C. Hu, Eds. New York, NY, USA: ACM,
Apr. 2018, pp. 30:1–30:15.
[36] D. Larimer. (2013). Transactions as Proof of Stake. [Online]. Available:
https://bravenewcoin.com/assets/Uploads/TransactionsAsProofOfStake
10.pdf
[37] M. Castro and B. Liskov, “Practical byzantine fault tolerance,” in
Proc. 3rd USENIX Symp. Operating Syst. Design Implement. (OSDI),
M. I. Seltzer and P. J. Leach, Eds. New Orleans, LA, USA: USENIX
Association, Feb. 1999, pp. 173–186.
[38] D. Ongaro and J. K. Ousterhout, “In search of an understandable
consensus algorithm,” in Proc. USENIX Annu. Tech. Conf. (USENIX
ATC), G. Gibson and N. Zeldovich, Eds. Philadelphia, PA, USA:
USENIX Association, Jun. 2014, pp. 305–319.
[39] Y. Zhang, S. Kasahara, Y. Shen, X. Jiang, and J. Wan, “Smart contract-
based access control for the Internet of Things,” IEEE Internet Things
J., vol. 6, no. 2, pp. 1594–1605, Apr. 2018.
[40] X. Lai, J. Zhou, and H. Li, eds., Information Security: 14th International
Conference (Lecture Notes in Computer Science), vol. 7001. Xi’an,
China: Springer, Oct. 2011.
[41] S. S. Manvi, M. S. Kakkasageri, and D. G. Adiga, “Message authenti-
cation in vehicular ad hoc networks: ECDSA based approach,” in Proc.
Int. Conf. Future Comput. Commun., Apr. 2009, pp. 16–20.
[42] K. Ravi and S. A. Kulkarni, “A secure message authentication scheme
for VANET using ECDSA,” in Proc. 4th Int. Conf. Comput., Commun.
Netw. Technol. (ICCCNT), Jul. 2013, pp. 1–6.
[43] Y. Liu, L. Wang, and H.-H. Chen, “Message authentication using proxy
vehicles in vehicular ad hoc networks,” IEEE Trans. Veh. Technol.,
vol. 64, no. 8, pp. 3697–3710, Aug. 2015.
Chao
Lin
received
the
bachelor’s
and
mas-
ter’s degrees from the School of Mathematics
and Computer Science, Fujian Normal University,
in 2013 and 2017, respectively. He is currently
pursuing the Ph.D. degree with the School of Cyber
Science and Engineering, Wuhan University. His
research interests include authentication of graph
data and blockchain security.
Debiao He (Member, IEEE) received the Ph.D.
degree in applied mathematics from the School
of Mathematics and Statistics, Wuhan University,
in 2009. He is currently a Professor with the School
of Cyber Science and Engineering, Wuhan Univer-
sity. His main research interests include cryptog-
raphy and information security, in particular, and
cryptographic protocols.
Xinyi
Huang
(Member,
IEEE)
received
the
Ph.D. degree from the University of Wollongong,
Australia. He is currently a Professor with the School
of Mathematics and Computer Science, Fujian Nor-
mal University, China, and the Co-Director of the
Fujian Provincial Key Laboratory of Network Secu-
rity and Cryptology. He serves on the Editorial
Board of the International Journal of Information
Security, the program/general chair or program com-
mittee member in over 80 international conferences.
His research interests include applied cryptography
and network security. He is an Associate Editor of the IEEE TRANSACTIONS
ON DEPENDABLE AND SECURE COMPUTING.
Neeraj Kumar (Senior Member, IEEE) received the
Ph.D. degree in CSE from Shri Mata Vaishno Devi
University, Katra, India. He is currently an Associate
Professor with the Department of Computer Science
and Engineering, Thapar University, Patiala, India.
His research interests include mobile computing,
parallel/distributed computing, multiagent systems,
service oriented computing, routing and security
issues in mobile ad-hoc, sensor, and mesh networks.
He has more than 400 technical research articles in
leading journals, such as the IEEE TRANSACTIONS
ON INDUSTRIAL INFORMATICS, the IEEE TRANSACTIONS ON INDUSTRIAL
ELECTRONICS, the IEEE TRANSACTIONS ON DEPENDABLE AND SECURE
COMPUTING, the IEEE Intelligent Transportation Systems Society, the IEEE
TWPS, the IEEE SENSOR JOURNAL, the IEEE Communications Magazine,
the IEEE Walnut Creek Magazine, the IEEE Network Magazine, and confer-
ences. He has authored/edited 10 books from Elsevier, Springer, CRC, and
BPB publications. His research was supported by DST, TCS, and UGC. He has
guided many students leading to their M.E. and Ph.D., degrees.
Kim-Kwang Raymond Choo (Senior Member,
IEEE) received the Ph.D. degree in information
security from the Queensland University of Tech-
nology, Australia, in 2006. He currently holds the
Cloud Technology Endowed Professorship, The Uni-
versity of Texas at San Antonio (UTSA). In 2016,
he was named the Cybersecurity Educator of the
Year-APAC (Cybersecurity Excellence Awards are
produced in cooperation with the Information Secu-
rity Community on LinkedIn). In 2015, he and his
team won the Digital Forensics Research Challenge
organized by Germany’s University of Erlangen-Nuremberg. He is also a fel-
low of the Australian Computer Society. He was a recipient of the 2019 IEEE
Technical Committee on Scalable Computing (TCSC) Award for Excellence in
Scalable Computing (Middle Career Researcher), the 2018 UTSA College of
Business Col. Jean Piccione and Lt. Col. Philip Piccione Endowed Research
Award for Tenured Faculty, the IEEE TrustCom 2018 Best Paper Award,
the ESORICS 2015 Best Research Paper Award, the 2014 Highly Commended
Award by the Australia New Zealand Policing Advisory Agency, the Fulbright
Scholarship in 2009, the 2008 Australia Day Achievement Medallion, and the
British Computer Society’s Wilkes Award in 2008.
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:53:50 UTC from IEEE Xplore.  Restrictions apply. 
