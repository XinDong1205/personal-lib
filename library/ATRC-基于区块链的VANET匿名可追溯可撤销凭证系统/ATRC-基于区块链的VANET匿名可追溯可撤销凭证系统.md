

# Page 1

2482
IEEE TRANSACTIONS ON VEHICULAR TECHNOLOGY, VOL. 73, NO. 2, FEBRUARY 2024
ATRC: An Anonymous Traceable and Revocable
Credential System Using Blockchain for VANETs
Yang Liu
, Debiao He
, Member, IEEE, Min Luo
, Huaqun Wang
, and Qin Liu
Abstract—With the number of smart vehicle drivers increasing
rapidly, privacy-preserving identity management methods in Ve-
hicular Ad-hoc Networks (VANETs) become more imperative and
receive much attention from researchers. Since identity leakage
or a single point of failure may result in serious consequences in
the VANET, the decentralized anonymous credential (DAC) could
be a potential approach to construct a robust network. However,
the supervision under decentrilized environment could be a neces-
sary and troublesome in the VANETs. In this paper, we present
an anonymous traceable and revocable credential system using
blockchain, called ATRC, built over a generalized group signature.
The underlying group signature not only meets the anonymity re-
quirement but also makes the users master their identities. What’s
more, to tackle the privacy leakage in the revocation process, we
employ the Merkle tree to construct a whitelist, which trades off
the efﬁciency and the privacy. Finally, we gives the comparison and
experiment performance to show our scheme holds lightweight on
the user side and has fewer computation costs in the show and
revocation phase.
Index Terms—VANETs, decentralized anonymous credential,
group signature, blockchain.
Manuscript received 30 April 2023; revised 24 July 2023; accepted 3 Septem-
ber 2023. Date of publication 6 September 2023; date of current version 13
February 2024. This work was supported in part by the National Key Research
and Development Program of China under Grant 2022YFB3102400, in part
by the National Natural Science Foundation of China under Grants 61932016,
62172307, 62272238, and 62272348, in part by the New 20 Project of Higher
Education of Jinan under Grant 202228017, in part by the Special Project on Sci-
ence and Technology Program of Hubei Provience under Grants 2020AEA013
and 2021BAA025, and in part by the Fundamental Research Funds for the
Central Universities under Grant 2042023KF0203. The review of this article
was coordinated by Prof. Zibin Zheng. (Corresponding authors: Debiao He;
Qin Liu.)
Yang Liu is with the Key Laboratory of Aerospace Information Security
and Trusted Computing Ministry of Education, School of Cyber Science and
Engineering, Wuhan University, Wuhan 430072, China, and also with the Insti-
tute of Information Technology, Shenzhen Institute of Information Technology,
Shenzhen 518172, China (e-mail: iray.ly@whu.edu.cn).
Debiao He is with the School of Cyber Science and Engineering, Wuhan Uni-
versity, Wuhan 430072, China, and also with the Key Laboratory of Computing
Power Network and Information Security, Ministry of Education, Shandong
Computer Science Center, Qilu University of Technology (Shandong Academy
of Sciences), Jinan 250014, China (e-mail: hedebiao@163.com).
Min Luo is with the School of Cyber Science and Engineering, Wuhan
University, Wuhan 430072, China, and also with the Shanghai Key Laboratory
of Privacy- Preserving Computation, Matrix Elements Technologies, Shanghai
201204, China (e-mail: mluo@whu.edu.cn).
Huaqun Wang is with the School of Computer Science, Nanjing Uni-
versity of Posts and Telecommunications, Nanjing 210003, China (e-mail:
wanghuaqun@aliyun.com).
Qin Liu is with the School of Cyber Science and Engineering, Wuhan
University, Wuhan 430072, China (e-mail: qliu@whu.edu.cn).
Digital Object Identiﬁer 10.1109/TVT.2023.3312547
I. INTRODUCTION
N
OWADAYS drive becomes one of the main transportation
ways in cities, which prompts the research of smart vehi-
cles. Smart vehicles, which are equipped with some computation
devices, are active roles in the Intelligent Transport Systems
(ITS). For an information system with a large user group, the
seriousness of identity privacy leakage could be much great.
As a representative incident, 77 million account information
of PlayStation network subscribers were disclosed, which was
caused by the external intrusion [1], [2]. However, privacy
leakage could be more serious in the VANET environment, since
there are many legal disputes or even fatal road accidents. Com-
pared to traditional central systems, the credential-focus system
means that more data are controlled by vehicle users in order
to protect sensitive information, which makes it much ﬂexible
for vehicle users to take charge of their assets via customized
strategy [3]. What’s more, storing data on the vehicle user side
could avoid most storage costs of certiﬁcate issuance authority,
therefore the ITS could be more robust and the seriousness of
identity leakage may be relieved.
In the VANET environment, the communication entities in-
cluding the On-Board Unit (OBU) and the Road-Side Unit
(RSU) could afford complex operations. Also, the communi-
cations mainly include Vehicular-to-Infrastructure (V2I) and
Vehicle-to-Vehicle (V2V). The smart vehicles equipped with
OBU could get the road information with the infrastructure like
RSU after the identity authentication process. After the records
of bad behavior are reported to the revocation authority, the
certiﬁcates of misbehaving vehicles will be revoked. Although
the revocation by revealing identities may get some convenience,
it practically damages the identity privacy of revoked vehicle
users. The architecture of the VANET is shown in Fig. 1.
However, the revocation operation in credential systems for
VANETs may comprise the privacy of the vehicle user as well
as the efﬁciency of the communication. In detail, two credential
revocation approaches are practical in many related schemes [4].
The ﬁrst is veriﬁer-local revocation, which usually employs a
blacklist or whitelist as the restriction [5]. Especially, both of
them need a trusted third party (TTP) and the vehicle users
have no extra update operation in the revocation except the
membership proof in veriﬁcation. The second is accumulator
revocation that witnesses are generated and distributed for all
vehicle users [6]. Then all vehicle users are supposed to update
their witness after the accumulator updates. For VANETs, the
window time between the report of misbehaving vehicle and the
publication of the new revoke list should be as little as possible,
0018-9545 © 2023 IEEE. Personal use is permitted, but republication/redistribution requires IEEE permission.
See https://www.ieee.org/publications/rights/index.html for more information.
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:44 UTC from IEEE Xplore.  Restrictions apply. 



# Page 2

LIU et al.: ATRC: AN ANONYMOUS TRACEABLE AND REVOCABLE CREDENTIAL SYSTEM USING BLOCKCHAIN FOR VANETs
2483
Fig. 1.
Architecture of VANET.
since the misbehaving vehicle might cause a new accident before
revocation. Thus it is reasonable to take the window time of
revocation into consideration.
The group signature is a special kind of the digital signa-
ture [7], [8], which allows members to generate signatures
on behalf of the group, is one of the key components of the
cryptographic primitive. On the one hand, group signatures
could hide the identity of a speciﬁc signer [9], [10], which
accomplishes anonymousness in practice. On the other hand,
the signer could not escape from the responsibility of malicious
behavior since group signature makes it convenient for the group
manager to trace a speciﬁc member in theory. In fact, it is very
practicable to employ the group signature in credential systems
for anonymousness and traceability.
Inspired by the techniques of Ateniese et al. [11], the vehicle
user regenerates his own pseudonyms locally after the register
phase, while the TTP management authority only takes part in
the register and revocation phase. In our scheme, the manage-
mentauthoritytakesthedutyofgroupmanager.Thepseudonym,
which is actually a group signature generated by a vehicle user,
not only hides the user’s identity information but also is a clue
in the trace phase. In practice, the vehicle user could change
his pseudonym to hide trail for others except for the manage-
ment authority. Based on the framework proposed by Garman
et al. [12], we extend the basic process with the revocation phase,
which is mainly carried out by the management authority. To
address the huge amount of computation in the whitelist, we
employ a Merkle tree to reduce the complexity of computation
on the management authority side. With the Merkle tree, the
management authority is supposed to update the path of revoked
user and uploads the new root to the blockchain for public access
while the cloud server can take charge of path query operation.
A. Contributions
Our main contributions are presented as follows.
1) In this paper, we present a high-level description of
anonymous traceable and revocable credential systems
for VANET, which shows the approach to constructing
these systems using generalized group signatures as well
as customized revocation methods.
2) Moreover, we propose a new privacy-preserving revoca-
tion method using the Merkle tree. In the revocation phase,
misbehaving vehicle users are revoked quickly and still
keep anonymous. In addition, the burden of updating the
whitelist is affordable to the management authority.
3) Finally, inspired by work in Ateniese et al. [11], we
provide an instance scheme and implement the system,
which holds feasible computation costs in the show and
revocation phase.
B. Organization
We organize this paper as follows. In Section II, we will
survey and analyze the relate works of anonymous credential
system. In Section III, some necessary preliminaries will be in-
troduced. Our proposed system will be presented and illustrated
in Section IV and the security analysis is presented in Section V.
Correspondingly, in Section VI performance evaluation will be
displayed. Finally, conclusion is drawn in Section VII.
II. RELATED WORK
Anonymous
credential,
which
is
ﬁrst
proposed
by
Chaum [13], vastly improves the researches of privacy-
preserving identity management systems. Camenisch and
Lysyanskaya [14] proposed a signature scheme that could be
referred to construct anonymous credential systems. Specially,
this scheme employs bilinear pairing, which will make it ﬂexible
for further improvement. As a practical and ﬂexible approach
for privacy-preserving, the anonymous credential is adapted
in many ﬁelds such as IoT [15] and the cloud [16]. Tan and
Groß[17]proposedanewattribute-basedanonymouscredential,
which is especially efﬁcient in unrestricted attribute space. This
scheme modiﬁes the arrangement of attributes in credentials
to implement an access policy. Attribute accumulator is also
valuable for reference. Nakanishi and Kanatani [18] proposed
a blacklist table anonymous credential with a pairing-based
accumulator, which authentication progress holds the constant
size of authentication data without a trusted third party. While
central authority is common in traditional identity management
systems, trusted problems about privacy and single point
of failure are the main potential risks. What’s more, after
the bitcoin [19] becomes popular, distributed systems like
blockchain are employed in many research works to make
systems decentralized and robust [20], [21].
The framework of decentralized anonymous credential is
proposed by Garman et al. [12] for removing the existent of
the trusted credential issuer in anonymous credential systems.
Then plenty of schemes inspired by this framework have been
proposed. Sonnino et al. [22] proposed a special selective dis-
closure credential solution based on the blind signature and
bilinear pairings, which holds a short and very efﬁcient cre-
dential. Halpin [23] was inspired by Sonnino’s work [22], then
he improved this work by transforming the original token into
a well-designed token to append scalability of embedding ar-
bitrary attributes. Lin et al. [24] proposed a privacy-enhancing
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:44 UTC from IEEE Xplore.  Restrictions apply. 



# Page 3

2484
IEEE TRANSACTIONS ON VEHICULAR TECHNOLOGY, VOL. 73, NO. 2, FEBRUARY 2024
decentralized anonymous credentials system with efﬁcient range
proofs aimed at compromising the full user attributes list in
the credential show phase. Cui et al. [25] proposed an anony-
mous and traceable data sharing protocols based consortium
blockchain, which makes the combination of the consortium
blockchain and the base station to avoid the RSU. However, the
situation could be limited as the vehicles hold high movability.
Yang et al. [26] presented a trust model about the vehicle
networks, which constructs the trust among the vehicles and the
punishment could damage the trust. What’s more, the supervi-
sion could be weak. Inedjaren et al. [27] combinated the VANET
and blockchain by applying the optimized link state routing pro-
tocol to solve the potential risks. However, the efﬁciency could
be unpractical since the block is collaboratively generated by
the nodes. Das et al. [28] proposed a secure blockchain-enabled
V2V communication system, called BVCS, which is aimed to
improve the data sharing between vehicles. What’s more, the
lack of security model could be the block of the practical usage.
However above skillful solutions don’t contain revocation,
which is an important feature in credentials systems. With the
revocation function, malicious behavior could be kept within
limits.
Since the revocation function could beneﬁt long-time running,
many solutions have been proposed in different revocation ways.
Derler et al. [5] designed a new revocable multishow attribute-
based anonymous credential building on previous work, which
holds well scalability and the constant work of two roles. In this
system, the accumulator is adapted to construct a blacklist for the
revocation. Yang et al. [4] proposed a lightweight anonymous
authentication based on bilinear pairings with the function of
outsourcedwitnessupdateaimedatthebottleneckofanonymous
credentials. The revoked key will be revealed in the revoca-
tion phase implemented by accumulators. Bui and Aura [29]
constructed a framework of the revocation in distributed access
control to conveniently operate the revocation mehods. In detail,
during the revocation, the public keys of revoked users are
revealed. Ma et al. [30] proposed an attribute-based encryption
algorithmusingblockchain,whichcouldprovidethepreserving-
privacy protocols as well as the audit methods. However, the
revocation is not supported.
As mentioned above, the revocation with accumulator could
either increase the update burden of unrevoked users or reveal
revoked user’s identities. In this case, it’s not reasonable to make
unrevoked users take the burden of revocation and permanently
get rid of some identity for lapses. Maybe, it is a better choice
to keep revoked identity private and disabled.
III. PRELIMINARIES
A. Decentralized Anonymous Credential
In general, the DAC system runs around credentials. For the
credential issuance, an organization will take charge of issuance
policies since there is no single issuance party in the DAC sys-
tems[12],[31],[32].Indetail,anorganizationconsistsofagroup
of users in this decentralized system. The term “organization”
remains consistent with previous work and is a little different in
meaning.
In terms of the DAC framework, we will give a brief intro-
duction as follows.
r Setup: To set up this system, this algorithm receives the
security parameter λ as input, then it returns the public
parameters pp as output.
r KeyGen: To generate the key for users, this algorithm
receives the public parameter pp as input, then it returns
user’s secret key skU as output.
r PIDForm: In order to form the pseudonyms for users, this
algorithmreceivesthepublicparameterppanduser’ssecret
key skU as input, then it returns user’s pseudonyms PID
according to input key skU as output.
r CredForm: In order to form the credentials related to
pseudonyms, this algorithm receives user’s secret key skU,
the user’s pseudonyms PID, the attributes attrs and the
auxiliary aux as input, then it returns the credential c and a
proof πM as output. The proof πM shows the relationship
between the pseudonyms PID and the credential c. The
attributes attrs is included in credential c. Then the results
will be uploaded to the blockchain.
r CredVerf: To verfy the credential, this algorithm receives
user’s pseudonyms PID, attributes attrs, auxiliary aux,
credential c and proof πM as input, then it returns 1 if πM
holds.
r Show: In order to show the qualiﬁcation of credential, this
algorithm receives the secret key skU, the pseudonyms
PID and the credential c as input, then it returns a proof
πS as output. The proof πS shows the qualiﬁcation of the
credential.
r ShowVerf: To verify the shown data, this algorithm receives
proof πS and credential c as input, then it returns 1 if πS
holds.
The decentralized anonymous credential is ﬂexible. Creden-
tial veriﬁcation could be performed publicly as the policy of
credentials is accessible and consistent. Moreover, the attributes
in credentials could be organized by the user to achieve minimal
necessary reveal for privacy-preserving.
B. Group Signature
The group signature is ﬁrst proposed in 1991. The main idea
is that members in the group could generate a group signature,
others outside this group could verify this signature without
knowing the actual signer. In detail, the group is managed by
the group manager, who will take charge of the registration of
group members. Especially, group manager holds the ability to
trace malicious group members. A brief introduction will be
given as follow.
r Setup: The group manager sets up a group, a group key
secretkey and other parameters params.
r Join: The group manager communicates with the user who
wants to join this group. The user will become a group
member with the group key and the group certiﬁcate cert
if the group manager admits.
r Sign: The group member could sign messages representing
this group by using the group key and certiﬁcate cert. Then
it outputs the signature sig corresponding to the message.
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:44 UTC from IEEE Xplore.  Restrictions apply. 



# Page 4

LIU et al.: ATRC: AN ANONYMOUS TRACEABLE AND REVOCABLE CREDENTIAL SYSTEM USING BLOCKCHAIN FOR VANETs
2485
r Verf: Others outside the group could verify group signa-
ture with group public key with knowing nothing except
validation of signature sig.
r Open:Foravalidgroupsignature,thegroupmanagercould
trace the signer by using the group key secretkey.
The group signature has been adapted in many ﬁelds for the
privacy-preserving and traceability. Actually, it may be more
practical if solutions employ group signature with revocation,
which attracts many researchers’ attention and plenty of solu-
tions have been proposed.
C. Merkle Tree
The Merkle tree is improved as a complete binary tree. Nowa-
days, the Merkle tree is still an important and practical technol-
ogy in authentication and integrity checking [33], [34]. What’s
more, researchers paid much attention to the Merkle tree [35],
[36]. Especially, the Merkle tree is employed in blockchain to
make block lightweight and convenient for veriﬁcation.
In blockchain systems, the Merkle tree is very common and
efﬁcient [37]. Merkle tree provides a useful approach to quickly
check the completeness of the transactions in the block since the
roothashcontainsallinformationofthetransactions.Thespecial
tree struct makes it possible that locate the wrong message in
the leaf node without scanning every leaf nodes sequentially.
What’s more, the Merkle tree could play a role in the member
proof. While leaf nodes represent members, the root hash could
reﬂect the whole members. In addition, hash string hides the
real value of user identity and the smart contracts [38] could
provide powerful functions, which may be valuable to construct
a privacy-enhance solution.
IV. OUR PROPOSED SYSTEM
A. System Model
The proposed system is composed of vehicle users, the man-
agement authority(MA), the RSU, and the blockchain. The
whole system is shown in Fig. 2. The four parties are displayed
below:
r Vehicle Users: The vehicle users are the main consumers in
this system. They hold pseudonyms and related credentials
that the OBU makes an agreement with the MA communi-
cating by security channel. After completing the join phase,
vehicle users are able to reform their pseudonyms without
the MA. The credential related to a pseudonym is minted
locally by the vehicle user.
r Management Authority(MA): The MA is responsible for
public parameters and membership management. In de-
tail, the MA is supposed to set up the group signature
parameters and takes charge of the member tracing and
the revocation.
r RSU: The RSU is responsible for vehicle road service
and identity veriﬁcation. The RSU holds real-time road
information. When the RSU shares road information with
the vehicle users, the RSU veriﬁes their identities.
r Blockchain: The blockchain is considered as a distributed
bulletin board in the proposed system. Due to the tamper
Fig. 2.
Overview of proposed system.
resistance, vehicle users and the RSU could have a consis-
tent view of identities. In detail, pseudonyms, credentials,
and the revocation list are all uploaded to the blockchain.
B. High-Level Description
As the illustration above, there are four roles in the proposed
system. All of them take part in the workﬂow. Then we will
present our system from a high-level description.
Our proposed system is mainly consisting of the pseudonym
and the credential. In the pseudonym part, vehicle users could
get their keys and generate their own pseudonyms, which are the
derivatives of the real identities. In the credential part, vehicle
users could form their credentials locally, which are proof of
the vehicle user key and attributes. Before these two parts, the
vehicle user should run the join parts ﬁrst. In fact, the local
generation leaves much ﬂexibility to the vehicle users.
r System Setup: (pp, msk) ←Setup(K). This algorithm
takes the security parameter K as input, then it outputs the
public parameters pp and the master secret key msk. This
process mainly includes the PDN.Setup and Cred.Setup
algorithm and it’s executed by the management authority
for only one time.
r Vehicle Registration: (sku) ←PDN.Join(pp, id). This
algorithm takes the public parameters pp, vehicle user’s
identity information id as input, then it outputs the vehicle
user’s private key sku. This process mainly includes the
PDN.Join algorithm and it’s executed by both the vehicle
user and the management authority. In fact, the manage-
ment authority actually manages the system.
For the pseudonym part, the group signature could be referred,
which could guarantee anonymity.
r Pdn Generation: (pdn) ←PDN.Gen(pp, sku, m). This
algorithm takes the public parameters pp, vehicle user’s
private key sku, customized message m as input, then it
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:44 UTC from IEEE Xplore.  Restrictions apply. 



# Page 5

2486
IEEE TRANSACTIONS ON VEHICULAR TECHNOLOGY, VOL. 73, NO. 2, FEBRUARY 2024
outputs the pseudonym pdn. The process mainly includes
the PDN.Gen algorithm and it’s executed locally by the
user.
r Pdn Veriﬁcation: (b) ←PDN.V erf(pp, pdn, m). This
algorithm takes the public parameters pp, vehicle user’s
pseudonym pdn, customized message m as input, then it
outputs a bit b ∈{0, 1}. The process mainly includes the
PDN.Verf algorithm and it could be executed by everyone
in this system.
r Revoke: (πrevoke) ←Rovoke(pp, pdn, m, msk). This al-
gorithm takes the public parameters pp, vehicle user’s
pseudonym pdn, customized message m, management
authority’s master key msk as input, then it outputs the
revocation proof πrevoke. The Rovoke(·) process mainly
includes the PDN.Open algorithm and the PDN.Revoke
algorithm. In detail, it’s only executed by the management
authority. The PDN.Revoke algorithm is customized and it
could realize additional features.
For the credential part, the DAC could be referred. The users
form credentials in need, then they could enjoy road services by
showing their credentials.
r Cred
Generation:
(c) ←Cred.Form(pp, sku, attrs).
This algorithm takes the public parameters pp, vehicle
user’s private key sku, vehicle user’s attributes set attrs as
input, then it outputs the credential c. The process mainly
includes the Cred.Form algorithm and it’s executed locally
by the vehicle user.
r Cred Veriﬁcation: (b) ←Cred.V erf(pp, c, attrs). This
algorithm takes the public parameters pp, the credential c,
vehicle user’s attributes set attrs as input, then it outputs a
bit b ∈{0, 1}. The process mainly includes the Cred.Verf
algorithm and it could be executed by everyone in this
system.
r CredShow:(πs, πv)←Cred.Show(pp, sku, pdn, c, hint).
This algorithm takes the public parameters pp, vehicle
user’s private key sku, vehicle user’s pseudonym pdn, the
hint of valid identity hint as input, then it outputs the proof
of show πs, the proof of valid identity πv. The process
mainly includes the Cred.Show algorithm. In detail, it’s
executed by the vehicle user.
r Show
Veriﬁcation:(b) ←ShowV erf(pp, pdn, c, attrs,
πs, πv). This algorithm takes the public parameters pp,
vehicle user’s pseudonym pdn, the credential c, vehicle
user’s attributes set attrs, the proof of show πs, the proof of
valid identity πv as input, then it outputs a bit b ∈{0, 1}.
The ShowV erf(·) process mainly includes the Pdn
Veriﬁcation, the Cred Veriﬁcation and the Cred.ShowVerf
algorithm. In detail, it could be executed by everyone in
this system.
For blockchain, it provides a place for the other three roles to
publish and receive information from each other. As for the MA,
he generates user’s certiﬁcates and admits the user as a group
member in the User Registration phase. When some vehicle
users become malicious or break some rules, the MA could trace
them and even revokes their certiﬁcates in the Revoke phase. The
RSUs are responsible to verify the validation of the pseudonym
and the credential before they share road information. In
Fig. 3.
Registration and credentials forming.
Fig. 4.
Request for road information.
addition, it is also necessary to check whether the vehicle user
has been revoked.
In practice, the vehicle user is a much active part of the
VANET. The vehicle user’s activities could be divided into two
stages.
In stage one, the vehicle user becomes a valid member from
a freshman and gets his credential, as shown in Fig. 3. First
of all, the vehicle user is supposed to communicate with the
MA using a secure channel for secret keys and certiﬁcates in
the User Registration phase. The vehicle user will be admitted
to the group as a group member if his identity is veriﬁed by
the management authority. After receiving certiﬁcates, he could
generate his pseudonym and credential locally. The pseudonym
and credential may be uploaded to the blockchain for further
usage. The process of pseudonym and credential generation
could be performed whenever a vehicle user wants.
In stage two, the vehicle user requests the RSU for road
information, as shown in Fig. 4. When a vehicle user is closed to
some RSUs, he is supposed to generate proof on the customized
message to prove he know some secret values. A path of the
Merkle tree is also necessary for membership proof. The RSU
gets related credential information from blockchain and veriﬁes
information, path, and customized messages according to the
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:44 UTC from IEEE Xplore.  Restrictions apply. 



# Page 6

LIU et al.: ATRC: AN ANONYMOUS TRACEABLE AND REVOCABLE CREDENTIAL SYSTEM USING BLOCKCHAIN FOR VANETs
2487
Fig. 5.
Information sharing between vehicles.
Fig. 6.
Sequence of activities in the system.
policy. After all these conditions stand, the RSU responds to
the vehicle user about the road information. In addition to the
V2I, the V2V communication is also necessary for VANETs and
shown in Fig. 5.
To make the process of the proposed system more clear, some
activities in the system are shown in Fig. 6. It could be divided
into three portions. The ﬁrst portion is the preparation, where
the management authority sets up this system and the vehicle
user registers as a group member. Then the second portion
is the mintage, where the vehicle user could generate locally
his pseudonyms and credentials. Of course, the pseudonyms
and credentials will be updated to the blockchain for further
usage. The last portion is the consumption, where the vehicle
user provides the qualiﬁcation proof and the RSU veriﬁes these
proofs. Especially, the revocation operated by the management
authority is independent of the vehicle user’s activities.
From the perspective of the high-level description, the system
satisﬁes the following properties:
r Anonymity: Expect the management authority, it is hard
for others to distinguish the vehicle user’s identity from
his pseudonyms and credentials.
r Unforgeability: It is hard to forge the pseudonym and
credential of a chosen user without knowing his secret key.
The valid pseudonym could only be generated by using
the valid key. As for the credential, it is formed by a valid
vehicle user and is bound with a pseudonym.
r Traceability: Given a valid pseudonym, only the manage-
ment authority could trace the vehicle user’s identity hiding
in this pseudonym.
C. Threat Models
For the identity management systems for VANET, the coali-
tion of system roles may be an important issue and it could
impact the robustness of the system. Even though the manage-
ment authority is engaged in the identity tracing, it could not be
the end of identity forgery if the malicious vehicle users coalesce
to forge the vehicle key of an irregular identity. In our system,
the management authority is the trusted third party, so we could
clearly identify a security and privacy threat model. It is the
coalescing malicious vehicle user’s security model against the
unforgeability for which the coalescing malicious vehicle users
attempt to forge a new user key.
We make a more clear description. We say that our system sat-
isﬁestheunforgeabilityifforanyPPTadversaryA,itsadvantage
AdvUF
A (K) in the game ExpUF
A (K) is negligible, where the K
is the security parameter and AdvUF
A (K) = |Pr[ExpUF
A (K) =
1]|.
The game ExpUF
A (K) is performed between the challenger C
and adversary A. The game is deﬁned as following,
r Setup: The challenger C sets up the system by invoking the
System Setup method. Then he gets the public parameter
pp and the master secret key msk. The challenger C keeps
msk and sends pp to the adversary A.
r RegQuery: The adversary A makes the User Registration
method with the challenger C for user certiﬁcates with user
key. For the i-th query, the user key (Ai, ei) is generated
and sent to the adversary A according to the user key xi.
The total times of queries could not be more than q times.
r Forge: The adversary A forges and outputs the certiﬁcate
(x∗, A∗, e∗), where (x∗, A∗, e∗) ̸= (xi, Ai, ei). The adver-
sary A wins this game if the forged certiﬁcate (x∗, A∗, e∗)
passes veriﬁcation process.
D. Pseudonyms
Referring to the group signature scheme proposed by
Giuseppe Ateniese [11] in section III-B, vehicle users’ real
identities could be covered and pseudonyms could be veriﬁed.
In the proposed system, an extra revoke phase is developed by
using the Merkle tree. The whole phases are presented below:
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:44 UTC from IEEE Xplore.  Restrictions apply. 



# Page 7

2488
IEEE TRANSACTIONS ON VEHICULAR TECHNOLOGY, VOL. 73, NO. 2, FEBRUARY 2024
r PDN.Setup: The MA generates n = pq where p, q are two
large prime numbers and p, q satisfy with p = 2p′ + 1, q =
2q′ + 1, where p′, q′ are prime. Select random numbers
a, a0, g, h ∈QRn and x ∈Z∗
p′q′, where QRn is cyclic sub-
group of quadratic residues modulo n. Compute y = gx
mod n. Finally, the MA publishes the system parameters
params = (n, a, a0, g, h, y) and holds corresponding se-
cret key secretkey = (p′, q′, x) only known by the MA.
r PDN.Join: In this phase, the MA accepts the vehicle user
as a group member. Vehicle user’s secret key is generated
mainly by the user and the user’s certiﬁcate is generated
mainly by the MA. As a result, for i-th vehicle user, his
secret key sk = xi and certiﬁcate cert = (Ai, ei), where
Ai = (axia0)
1
ei
mod n and prime value ei is the part of
certiﬁcate.
r PDN.Gen: The vehicle user generates his pseudonym in
this phase. In detail, the pseudonym, which is actually
consisting of values and proof of knowledge, could be
veriﬁed by others using system parameters params. For
i-th vehicle user, his pseudonym pdni = (T1, T2, T3, πp),
where
T1 = Aiyw,
T2 = gw,
T3 = geihw
πp = PoK{(w, ei, Ai, xi) :
T1 = Aiyw
T2 = gw
T3 = geihw
Ai = (axia0)
1
ei }
and w is randomly chosen by the vehicle user. What’s more,
we could implement this proof of knowledge (PoK) in the
pseudonym referring to the Sigma Protocol and the Fiat-
Shamir Paradigm as following
R1 =
T r1
1
(ar2yr3)
R2 = T r1
2
gr3
R3 = gr4
R4 = gr1hr4
cp = hash(g||h||y||a0||a||T1||T2||T3||R1||R2||R3||R4)
s1 = r1 −cpei
s2 = r2 −cpxi
s3 = r3 −cpeiw
s4 = r4 −cpw
where random numbers r1, r2, r3, r4 ∈Z∗
p′q′ and πp =
(cp, s1, s2, s3, s4).
Fig. 7.
Merkle tree of membership.
r PDN.Verf: The pseudonym could be veriﬁed by others.
Comparing to the original signature, the message corre-
sponding to the signature may be unnecessary. Since the
pseudonym is mainly a proof of knowledge about the
certiﬁcates, the validation could be processed referring to
the πp = (cp, s1, s2, s3, s4) as following
R′
1 = acp
0 T s1
1
as2ys3
R′
2 = T s1
2
gs3
R′
3 = T cp
2 gs4
R′
4 = T cp
3 gs1hs4
and then the proof is valid if the condition cp =
hash(g||h||y||a0||a||T1||T2||T3||R′
1||R′
2||R′
3||R′
4) holds.
r PDN.Open: The MA could trace some vehicle users by
opening his signature. For i-th vehicle user, the MA checks
the validity of his signature. Then Ai could be recovered
by Ai = T1
T x
2 , where the value x is the secret key of the MA.
When publishing this certiﬁcate Ai, the MA is supposed
to prove that logg y = logT2
T1
Ai
mod n.
r PDN.Revoke: A Merkle tree is constructed for the revoca-
tion, as shown in Fig. 7. The leaf node of the Merkle tree
is leaf = Hash(geihw||V ersion), where ei is vehicle
user’s certiﬁcate and V ersion is the version of revocation
list. When i-th vehicle user is accepted in the group, his cor-
responding leaf node is leafi = Hash(geihw||V ersion).
When the MA revokes i-th vehicle user, his corresponding
leaf node will be removed from the Merkle tree, as shown
in Fig. 8. This ﬁgure shows membership proved by using
the Merkle tree path.
E. Credentials
The full credentials construction, which we are inspired by
Garman et al. [12], is provided below:
r Cred.Setup: The MA generates generators g0, g1, . . . , gt of
cyclic group G whose order is n in params of Pseudonyms
section.
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:44 UTC from IEEE Xplore.  Restrictions apply. 



# Page 8

LIU et al.: ATRC: AN ANONYMOUS TRACEABLE AND REVOCABLE CREDENTIAL SYSTEM USING BLOCKCHAIN FOR VANETs
2489
Fig. 8.
Revoke member by using merkle tree.
r Cred.Form:
When
a
vehicle
user
generates
his
pseudonym, he may need a credential for further use.
The vehicle user determines his attributes attrs =
(attr0, attr1, . . . , attrm−1) ∈Zm
n and auxiliary data aux.
Next, the vehicle user selects a random number w′ ∈Zn
and computes the credential c = hw′gei m
j=0 gattrj
j
,
where ei is vehicle user’s certiﬁcate. It outputs (c, πc),
where πc is a signature of knowledge on aux that
pseudonym and credential contain same value ei, i.e:
πc = SoK[aux]
⎧
⎨
⎩(w, ei, w′) :
T3 = geihw
∧c = hw′gei
m

j=0
gattrj
j
⎫
⎬
⎭
The resulting values (c, πc, {gattri
i
}, pdn, aux) are sub-
mitted to blockchain, where pdn is vehicle user’s
pseudonym. Specially, we could implement this signature
of knowledge (SoK) referring to the Sigma Protocol and
the Fiat-Shamir Paradigm as following
R1 = gr2hr1
R2 = hr3gr2
cc = hash (T3||c||R1||R2||aux)
s1 = ccw + r1
s2 = ccei + r2
s3 = ccw′ + r3
where
random
numbers
r1, r2, r3 ∈Z∗
p′q′
and
πc =
(cc, s1, s2, s3).
r Cred.Verf: The veriﬁer accepts this credential iff the proofs
πc and pdn contain the same secret ei referring to the πc =
(cc, s1, s2, s3) as following
R′
1 = gs2hs1(T3)−cc
R′
2 = hs3gs2

c
m
j=0 gattrj
j
−cc
and then the proof is valid if the condition cc =
hash(T3||c||R′
1||R′
2||aux) holds.
r Cred.Show: When the vehicle user requires some road
information from the RSU, it’s necessary for him to show
that the required attribute set {ra} is in his credentials c and
he is not revoked. In fact, the RSUs in different locations
may require characteristic attributes. The vehicle user with
pdn and c will prove that his corresponding leaf node is in
the Merkle tree. The user gets path of his leaf node and
makes a signature of knowledge πs on {ra}, i.e:
πs = SoK
⎧
⎨
⎩(w, ei, {ra}) :
c = hwgei 
i∈{ra}
grai
i

j∈{attr}\{ra}
gattrj
j
⎫
⎬
⎭
Then the user sends (path, πs, geihw, {attr} \ {ra}) to
the RSU. This phase may take place in communication
betweenthevehicleuserandtheRSU.Wecouldimplement
this signature of knowledge referring to the Sigma Protocol
and the Fiat-Shamir Paradigm in the same way as following
R = hrwgre 
i∈{ra}
gri
i
cs = hash(c||R)
sw = csw + rw
se = csei + re
s1 = csra1 + r1
s2 = csra2 + r2
. . .
sm = csram + r3
where m is the size of the set {ra}, random num-
bers rw, re, r1, r2, . . ., rm ∈Z∗
p′q′, rai ∈{ra} and πs =
(cs, sw, se, s1, s2, . . ., sm).
r Cred.ShowVerf: For the veriﬁer, he ﬁnds correspond-
ing
(c, πc, pdn, aux)
on
blockchain
and
receives
(path, πs, geihw, {attr} \ {ra}) from the vehicle user. If
path holds in the Merkle tree and πs is valid, the veriﬁer
will believe that the required attribute set {ra} is included
in c and the vehicle user is not revoked. In detail, the
veriﬁcation process of πs is presented as following
R′ = hswgse 
i∈{ra}
gsi
i

c
m
j=0 gattrj
j
−cs
and then the proof is valid if the condition cs =
hash(c||R′) holds.
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:44 UTC from IEEE Xplore.  Restrictions apply. 



# Page 9

2490
IEEE TRANSACTIONS ON VEHICULAR TECHNOLOGY, VOL. 73, NO. 2, FEBRUARY 2024
V. SECURITY ANALYSIS
A. Correctness
We will give the correctness analysis of our proposed system
as following:
r Pseudonym: After the registation process, it is the ﬁrst
step for vehicle user i to generate the pseudonym with
the user key (Ai, ei). Assume the pseudonym is pdni =
(T1, T2, T3, πp), where
T1 = Aiyw
mod n,
T2 = gw
mod n,
T3 = geihw
mod n,
and w is random. In detail, for the veriﬁer, he could get
the values (R′
1, R′
2, R′
3, R′
4) with the pdni and check the
cp = hash(g||h||y||a0||a||T1||T2||T3||R′
1||R′
2||R′
3||R′
4) if
the following equations stands.
R′
1 = acp
0 T s1
1 /(as2ys3)
= acp
0 T r1−cpei
1
/(ar2−cpxiyr3−cpeiw)
= acp
0 T r1
1 T −cpei
1
/(ar2a−cpxiyr3y−cpeiw)
= acp
0 T r1
1 (Aiyw)−cpei/(ar2a−cpxiyr3y−cpeiw)
= acp
0 T r1
1 (Ai)−cpeiy−cpeiw/(ar2a−cpxiyr3y−cpeiw)
= acp
0 T r1
1 ((axia0)
1
ei )−cpei/(ar2a−cpxiyr3)
= acp
0 T r1
1 (a−cpxia−cp
0
)/(ar2a−cpxiyr3)
= T r1
1 /(ar2yr3)
= R1
R′
2 = T s1
2 /gs3
= T r1−cpei
2
/gr3−cpeiw
= T r1
2 T −cpei
2
/gr3g−cpeiw
= T r1
2 (gw)−cpei/gr3g−cpeiw
= T r1
2 g−cpeiw/gr3g−cpeiw
= T r1
2 /gr3
= R2
R′
3 = T cp
2 gs4
= T cp
2 gr4−cpw
= (gw)cpgr4−cpw
= gwcpgr4−cpw
= gr4
= R3
R′
4 = T cp
3 gs1hs4
= T cp
3 gr1−cpeihr4−cpw
= (geihw)cpgr1−cpeihr4−cpw
= geicphcpwgr1−cpeihr4−cpw
= gr1hr4
= R4
r Credential: The credential should be formed with
the pseudonym. Assume the credential is c = hw′gei
m
j=0 gattrj
j
, where ei is the vehicle user key and w′ is
random. The credential c includes the vehicle user key
and vehicle user’s attributes, so the correctness process of
credential veriﬁcation is to prove that the credential and
pseudonym both include the same user key. The proof
πc guarantees this binding relationship. In detail, for the
veriﬁer, he could get the values (R′
1, R′
2) with the πc and
check the cc = hash(T3||c||R′
1||R′
2||aux) if the following
equations stands.
R′
1 = gs2hs1(T3)−cc
= gccei+r2hccw+r1(geihw)−cc
= gccei+r2−cceihccw+r1+ccw
= gr2hr1
= R1
R′
2 = hs3gs2

c
m
j=0 gattrj
j
−cc
= hccw′+r3gccei+r2

c
m
j=0 gattrj
j
−cc
= hccw′+r3gccei+r2(hw′gei)−cc
= hr3gr2
= R2
r Show: The credential c includes the attributes, which may
be required by the RSU. The correctness process of show
veriﬁcation is to prove that some attribute set in the cre-
dential meets the requirement. In order to present the
required attribute set hiding in the credential c, the proof
πs is necessary. The proof πs guarantees that the required
attributes exist in the credential c and they are qualiﬁed
with the requirement of the RSU. In the construction of the
proof πs, the Sigma Protocol and the Fiat-Shamir Paradigm
could be referred to. In detail, for the veriﬁer, he could get
the values R′ with the πs and check the cc = hash(c||R′)
if the following equations stands.
R′ = hswgse 
i∈{ra}
gsi
i

c

j∈{attr}\{ra} gattrj
j
−cs
=hcsw+rwgcsei+re 
i∈{ra}
gcsrai+ri
i
⎛
⎝hwgei 
i∈{ra}
grai
i
⎞
⎠
−cs
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:44 UTC from IEEE Xplore.  Restrictions apply. 



# Page 10

LIU et al.: ATRC: AN ANONYMOUS TRACEABLE AND REVOCABLE CREDENTIAL SYSTEM USING BLOCKCHAIN FOR VANETs
2491
= hrwgre 
i∈{ra}
gri
i
= R
r Revocation: As for the management authority, he is sup-
posed to revoke malicious users and update the revocation
tree. The correctness process of revocation veriﬁcation
is the checking of the integrity in the Merkle tree. As
shown in Figs. 7 and 8, only the unpruned leaves have the
hash path. Since the management authority could trace the
vehicle user i and prune the corresponding leaf leafi =
Hash(geihw||V ersion), the revoked vehicle user i will
not be valid by verifying the hash path. This process could
be complete when the new revoked tree root is published
in a block.
B. Unforgeability
Theorem 1: If the unforgeability in the work [11] holds, then
the certiﬁcate in our scheme is unforgeable.
Proof.
Assume that there is a P.P.T adversary A that could win the
game ExpUF
A (K) with a non-negligible possibility ϵ, then we
could break the unforgeability of the work [11] with a non-
negligible possibility ϵ′ by taking advantage of the adversary
A.
For convenience, we denote the init and join process in the
work [11] by Oinit, Ojoin respectively, where pp ←Oinit(K),
(A, e) ←Ojoin(pku) and the pku is the user’s part public key.
r Setup: The challenger C get the public parameters pp by
querying the oracle Oinit. Then C sends pp to the adversary
A.
r RegQuery: This query could not be more than q times. For
the i-th query, the adversary A sends pki to the challenger
C as the user’s part public key. Then the challenger C query
the Ojoin with pki and obtains the output (Ai, ei) as the
certiﬁcate. The challenger C sends (Ai, ei) to the adversary
A as response.
r Forge: The adversary A forges and outputs the certiﬁ-
cate (x∗, A∗, e∗), where (x∗, A∗, e∗) ̸= (xi, Ai, ei). The
challenger C outputs (x∗, A∗, e∗) if the forged certiﬁcate
(x∗, A∗, e∗) passes veriﬁcation process. Otherwise, the
challenger terminates and outputs failure.
We consider the possibility to break the unforgeability in the
work [11]. Actually there are events considered for challenger
C as following:
r Pr1. As there is no termination in the RegQuery phase, the
probability of event that it doesn’t abort in the RegQuery
phase, which is Pr1 ≥1.
r Pr2. The probability of event that adversary A wins the
game ExpUF
A (K), which is Pr2 ≥ϵ.
r Pr3. The probability of event that adversary A choose
useful attack in the forgery phase, which is Pr3 ≥1
then we believe challenger C break the work if the above
events happen simultaneously:
ϵ′ = Pr1Pr2Pr3
≥ϵ
□
C. Signature of Knowledge
Theorem 2: If the EUF-CMA holds in the Schnorr signature
scheme, then signature of knowledge πc satisﬁes correctness,
special soundness and honest veriﬁer zero-knowledge.
Proof: Correctness. The proof process about the correctness
has been presented in part Section V-A.
Special Soundness. About the process of proof, if the prover
could convince the veriﬁer, there could be an extractor that ex-
tracts the knowledge about the proof. The soundness implicates
the existing knowledge, which protects the veriﬁer against the
cheating of the prover.
Taking advantage of the rewinding technology, the ex-
tractor could get two transcripts about the proof with the
same random value (r1, r2, r3). Assume these transcripts are
(r1, r2, r3, cc, s1, s2, s3) and ((r1, r2, r3, c′
c, s′
1, s′
2, s′
3)) respec-
tively. Then the knowledge could be extracted as following:
w = s′
1 −s1
c′c −cc
e = s′
2 −s2
c′c −cc
w′ = s′
3 −s3
c′c −cc
Honest Veriﬁer Zero-Knowledge. To present the process, we
assume there is a simulator S, which could generate a simulated
transcript by giving the random cc. For the veriﬁer, he could not
distinguish the real transcript and the simulated transcript.
The generation process of the simulator S is presented as
following with the given random cc:
1) The simulator S generates random numbers (sr
1, sr
2, sr
3).
2) The simulator S computes values as following:
Rr
1 = gsr
2 hsr
1 (T3)−cc
Rr
2 = hsr
3 gsr
2

c
m
j=0 gattrj
j
−cc
3) The
simulator
S
outputs
the
simulated
transcript
(Rr
1, Rr
2, cc, sr
1, sr
2, sr
3)
□
D. System Goals Analysis
In this paper, we could ﬁnd that (1) the vehicle user could
generate pseudonyms and credentials locally, which makes it
possible for vehicles to prepare the pseudonyms and corre-
sponding credentials in reserve; (2) The revocation with the
Merkle tree might be affordable to management authority while
there is no update operation leaving to vehicle users; (3) Most
existing blockchain systems could be qualiﬁed and there are no
prerequisites for system deployment, since the roles in system
are merely uploading and fetching the required data.
In addition, the proposed system should satisfy following
properties, which include those mentioned in Section IV-B.
r Anonymity: The vehicle users’ identities, which is included
in the pseudonym and the credentials, will not be revealed
when the pseudonym and credentials are uploaded to the
public blockchain. What’s more, others could learn nothing
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:44 UTC from IEEE Xplore.  Restrictions apply. 



# Page 11

2492
IEEE TRANSACTIONS ON VEHICULAR TECHNOLOGY, VOL. 73, NO. 2, FEBRUARY 2024
Fig. 9.
Simulation of vehicles by ns2.
more than the selected attributes in anonymous credentials
on the blockchain. The group signature veriﬁcation process
doesn’t reveal the identity of the vehicle user. In the show
phase, gei may be exposed to the RSU, however, ei is still
inaccessible. As anonymity stands, the identity privacy of
vehicle users could be realized.
r Traceability:
The
valid
pseudonym
is
pdn =
(T1, T2, T3, πp), where T1 = Aiyw mod n and T2 = gw
mod n. For the management authority, who holds the
secret x, he could get Ai = T1
T x
2
easily, where Ai is the
part identity of vehicle user i. As for location privacy,
the V2V only involves pseudonyms that hold anonymity
according to group signature. It may provide approaches
to preserve location privacy since the vehicle users could
form pseudonyms and credentials as required.
r Unforgeability: The valid certiﬁcate could be only is-
sued by the management authority. The certiﬁcate cert =
(Ai, ei) is necessary for the generation of pseudonyms and
credentials, which makes it hard to forge pseudonyms and
credentials. What’s more, according to the Theorem 1, our
system holds unforgeability.
VI. PERFORMANCE EVALUATION
In this section, we will evaluate the performance of the
proposed system. Since our system has few requirements for
blockchain, we will mainly concentrate on the functions and
algorithms in the proposed system.
We evaluate these computations corresponding to the de-
notation. The performance is made on a personal computer
(with Intel(R) Core(TM) i7-7700 CPU @3.60GHz(3600 MHz),
Windows 10, 8 GB memory) by using the MIRACL library.
In detail, the running time is an average value of 1000 times
execution in 128-bit security level. We simulated the VANETs
environment by using ns2 tools, as shown in Fig. 9.
Fig. 10.
Experiments results with 70 vehicles and 30 km/h. (a) The average
delay with the RSU number increasing. (b) The loss rate with the RSU number
increasing.
We conduct the test of RSU nodes. The speed is set at 30 km/h
and the number of vehicle nodes is 70. Then we set the number
of RSU nodes at 2, 4, 6, 8, 10, 12, 14 and 16 respectively to test
the inﬂuence of the RSU on the delay and the loss rate.
As shown in Fig. 10(a), the average delay of vehicle nodes
keeps on changing when RSU nodes are increased. The ﬂuc-
tuation range and speciﬁc values of the test results show that
communication congestion is not the main factor affecting the
delay when RSU nodes are increased. Therefore, the processing
of the scheme protocol is the main factor. The Fig. 10(b) shows
an obvious change in the packet loss rate of the system. The
packet loss rate of RSU nodes holds a decreasing trend, which
is consistent with the expectation. Multiple RSUs release the
computing pressure of RSU groups to respond to vehicle node
requests.
Finally we perform the next experiment. We set the vehicle
speed at 30 km/h, the number of RSU nodes at 16, and the vehicle
nodes at 70, 80, 100, 120, 150, 180, 200 and 250 respectively
for testing.
The Fig. 11(a) shows the rising trend of the average request
delay, and it can be seen from this trend that the inﬂuence
of communication queue on vehicle request delay is gradually
increasing. The packet loss rate of system nodes reﬂects a bigger
problem, shown in the Fig. 11(b) The packet loss rate shows a
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:44 UTC from IEEE Xplore.  Restrictions apply. 



# Page 12

LIU et al.: ATRC: AN ANONYMOUS TRACEABLE AND REVOCABLE CREDENTIAL SYSTEM USING BLOCKCHAIN FOR VANETs
2493
Fig. 11.
Experiments results with 16 RSUs and 30 km/h. (a) The average delay
with the vehicle number increasing. (b) The loss rate with the vehicle number
increasing.
very obvious upward trend, and when the vehicle node reaches
250, even if the RSU node almost covers the entire simulation
map, the vehicle packet loss rate is close to 40%, and the RSU
packet loss rate is 55%.
There is a special phenomenon in the above experimental
tests. When the number of vehicle nodes is above 120, each eval-
uation index increases signiﬁcantly. In view of this phenomenon,
the communication intensity may exceed the bottleneck of the
system when the vehicle node is at 120. What’s more, when the
RSU node is at 16 and the vehicle speed is 30 km/h on the simula-
tion map, the simulation system in this paper reaches a relatively
full state when the vehicles node is at 120. For the functional
consideration, the system achieves the identity privacy protec-
tion during the whole process of anonymity and revocation.
VII. CONCLUSION
Identity
privacy
and
location
privacy
are
the
core
privacy-preserving requirements in VANET. As a signiﬁcant
identity management technology, decentralized anonymous
credentials could be a practical approach to preserve the privacy
of vehicle users. Blockchain, as a valuable technology, could
provide anonymous credentials systems with infrastructure,
which makes the process of credential generation and
veriﬁcation trusted. Meanwhile, existing anonymous credentials
systems have limitations in architecture and functionality.
Anonymity may lead to inconvenience in traceability and
revocation, while these two properties are necessary for the
practical application of VANET. As for location privacy, the
leakage could be relieved by reasonable usage of pseudonyms
and credentials. What’s more, efﬁcient revocation is a much
practical requirement in this environment, as misbehavior is
supposed to be stopped to protect the property.
Our proposed system remains the management authority as a
trusted third party to simplify credential issuance, traceability,
and revocation, while blockchain is also employed as a consis-
tent bulletin board for public veriﬁcation. In order to show our
advantage, we make kinds of experiments with the car numbers
and the RSU numbers to obtain the performance of the system.
As a result, our system performs well in the show and revocation
phase and holds ﬂexible privacy functions.
ACKNOWLEDGMENT
We greatly appreciate the invaluable suggestions provided by
the anonymous reviewers and the associate editor.
REFERENCES
[1] S. Alneyadi, E. Sithirasenan, and V. Muthukkumarasamy, “A survey
on data leakage prevention systems,” J. Netw. Comput. Appl., vol. 62,
pp. 137–152, 2016.
[2] S. Soleymani et al., “An authentication and plausibility model for Big Data
analytic under LOS and NLOS conditions in 5G-VANET,” Sci.xg China
Inf. Sci., vol. 63, pp. 1–17, 2020.
[3] Y. Zhang and J.-L. Chen, “Universal identity management model based
on anonymous credentials,” in Proc. IEEE Int. Conf. Serv. Comput., 2010,
pp. 305–312.
[4] Y. Yang, H. Cai, Z. Wei, H. Lu, and K.-K. R. Choo, “Towards lightweight
anonymous entity authentication for IoT applications,” in Australas. Conf.
Inf. Secur. Privacy, 2016, pp. 265–280.
[5] D. Derler, C. Hanser, and D. Slamanig, “A new approach to efﬁcient
revocable attribute-based anonymous credentials,” in Proc. IMA Int. Conf.
Cryptogr. Coding, 2015, pp. 57–74.
[6] J. Camenisch, M. Kohlweiss, and C. Soriente, “An accumulator based on
bilinear maps and efﬁcient revocation for anonymous credentials,” in Proc.
12th Int. Workshop Public Key Cryptogr., 2009, pp. 481–500.
[7] Y. Zhang, D. He, M. Zhang, and K.-K. R. Choo, “A provable-secure
and practical two-party distributed signing protocol for SM2 signature
algorithm,” Front. Comput. Sci., vol. 14, pp. 1–14, 2020.
[8] Y. Jiang, Y. Zhu, J. Wang, and X. Li, “Fully distributed identity-based
threshold signatures with identiﬁable aborts,” Front. Comput. Sci., vol. 17,
no. 5, 2023, Art. no. 175813.
[9] T.Lu,J.Li,L.Zhang,andK.-Y.Lam,“Groupsignatureswithdecentralized
tracing,” in Proc. 15th Int. Conf. Inf. Secur. Cryptol., 2019, pp. 435–442.
[10] L. Hou, D. Lin, and R. Liu, “Hierarchical group signature with veriﬁer-
local revocation revisited,” Sci. China Inf. Sci., vol. 65, no. 8, 2022,
Art. no. 189103.
[11] G. Ateniese, J. Camenisch, M. Joye, and G. Tsudik, “A practical and
provably secure coalition-resistant group signature scheme,” in Proc.
Annu. Int. Cryptol. Conf., 2000, pp. 255–270.
[12] C. Garman, M. Green, and I. Miers, “Decentralized anonymous
credentials,” in Proc. 21st Annu. Netw. Distrib. Syst. Secur. Symp.,
San Diego, California, USA: The Internet Society, Feb. 2014. [Online].
Available:
https://www.ndss-symposium.org/ndss2014/decentralized-
anonymous-credentials
[13] D. Chaum, “Security without identiﬁcation: Transaction systems to make
big brother obsolete,” Commun. ACM, vol. 28, no. 10, pp. 1030–1044,
1985.
[14] J. Camenisch and A. Lysyanskaya, “Signature schemes and anonymous
credentials from bilinear maps,” in Proc. Annu. Int. Cryptol. Conf., 2004,
pp. 56–72.
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:44 UTC from IEEE Xplore.  Restrictions apply. 



# Page 13

2494
IEEE TRANSACTIONS ON VEHICULAR TECHNOLOGY, VOL. 73, NO. 2, FEBRUARY 2024
[15] J. L. C. Sanchez, J. B. Bernabe, and A. F. Skarmeta, “Integration of
anonymous credential systems in IoT constrained environments,” IEEE
Access, vol. 6, pp. 4767–4778, 2018.
[16] U. Haböck and S. Krenn, “Breaking and ﬁxing anonymous credentials
for the cloud,” in Proc. 18th Int. Conf. Cryptol. Netw. Secur., 2019,
pp. 249–269.
[17] S.-Y. Tan and T. Groß, “Monipoly–an expressive Q-SDH-based anony-
mous attribute-based credential system,” in Proc. Int. Conf. Theory Appli-
cation Cryptol. Inf. Secur., 2020, pp. 498–526.
[18] T. Nakanishi and T. Kanatani, “Efﬁcient blacklistable anonymous creden-
tial system with reputation using a pairing-based accumulator,” IET Inf.
Secur., vol. 14, no. 6, pp. 613–624, 2020.
[19] S. Nakamoto, “Bitcoin: A peer-to-peer electronic cash system,” Decen-
tralized Bus. Rev., 2008.
[20] Y. Guo, Z. Wan, and X. Cheng, “When blockchain meets smart grids: A
comprehensive survey,” High-Conﬁdence Comput., vol. 2, no. 2, 2022,
Art. no. 100059.
[21] Y. Chen, H. Chen, Y. Zhang, M. Han, M. Siddula, and Z. Cai, “A survey on
blockchain systems: Attacks, defenses, and privacy preservation,” High-
Conﬁdence Comput., vol. 2, no. 2, 2022, Art. no. 100048.
[22] A. Sonnino, M. Al-Bassam, S. Bano, S. Meiklejohn, and G. Danezis,
“Coconut: Threshold issuance selective disclosure credentials with
applications to distributed ledgers,” 26th Annu. Netw. Distrib. Syst.
Secur. Symp., San Diego, California, USA: The Internet Society, Feb.
2019.
[Online].
Available:
https://www.ndss-symposium.org/ndss-
paper/coconut-threshold-issuance-selective-disclosure-credentials-with-
applications-to-distributed-ledgers/
[23] H. Halpin, “Nym credentials: Privacy-preserving decentralized identity
with blockchains,” in Proc. Crypto Valley Conf. Blockchain Technol., 2020,
pp. 56–67.
[24] C. Lin, D. He, H. Zhang, L. Shao, and X. Huang, “Privacy-enhancing
decentralized anonymous credential in smart grids,” Comput. Standards
Interfaces, vol. 75, 2021, Art. no. 103505.
[25] J. Cui, F. Ouyang, Z. Ying, L. Wei, and H. Zhong, “Secure and efﬁcient data
sharing among vehicles based on consortium blockchain,” IEEE Trans.
Intell. Transp. Syst., vol. 23, no. 7, pp. 8857–8867, Jul. 2022.
[26] Z. Yang, R. Wang, D. Wu, B. Yang, and P. Zhang, “Blockchain-enabled
trust management model for the internet of vehicles,” IEEE Internet Things
J., vol. 10, no. 14, pp. 12044–12054, Jul. 2023.
[27] Y. Inedjaren, M. Maachaoui, B. Zeddini, and J. Barbot, “Blockchain-based
distributed management system for trust in VANET,” Veh. Commun.,
vol. 30, 2021, Art. no. 100350.
[28] D. Das, S. Banerjee, P. Chatterjee, U. Ghosh, and U. Biswas, “A secure
blockchain enabled V2V communication system using smart contracts,”
IEEE Trans. Intell. Transp. Syst., vol. 24, no. 4, pp. 4651–4660, Apr. 2023.
[29] T. Bui and T. Aura, “Application of public ledgers to revocation in
distributed access control,” in Proc. Int. Conf. Inf. Commun. Secur., 2018,
pp. 781–792.
[30] J. Ma, T. Li, J. Cui, Z. Ying, and J. Cheng, “Attribute-based secure
announcement sharing among vehicles using blockchain,” IEEE Internet
Things J., vol. 8, no. 13, pp. 10873–10883, Jul. 2021.
[31] H. Anada, “Decentralized multi-authority anonymous credential system
with bundled languages on identiﬁers,” in Proc. Int. Conf. Inf. Technol.
Commun. Secur., 2020, pp. 71–90.
[32] H. Anada, “A proposal of decentralized multi-authority traceable anony-
mous credential scheme and its generic construction,” IEICE, Tokyo,
Japan, Tech. Rep. ISEC2020-79, 2021.
[33] J. Xu, L. Wei, Y. Zhang, A. Wang, F. Zhou, and C.-Z. Gao, “Dynamic fully
homomorphic encryption-based Merkle tree for lightweight streaming au-
thenticated data structures,” J. Netw. Comput. Appl., vol. 107, pp. 113–124,
2018.
[34] H. Li, R. Lu, L. Zhou, B. Yang, and X. Shen, “An efﬁcient Merkle-tree-
based authentication scheme for smart grid,” IEEE Syst. J., vol. 8, no. 2,
pp. 655–663, Jun. 2014.
[35] M. Szydlo, “Merkle tree traversal in log space and time,” in Proc. Int. Conf.
Theory Appl. Cryptographic Techn., 2004, pp. 541–554.
[36] M. Jakobsson, T. Leighton, S. Micali, and M. Szydlo, “Fractal merkle tree
representation and traversal,” in Proc. Cryptographers’ Track RSA Conf.,
2003, pp. 314–326.
[37] S. Dhumwad, M. Sukhadeve, C. Naik, K. Manjunath, and S. Prabhu, “A
peer to peer money transfer using SHA-256 and merkle tree,” in Proc.
IEEE 23rd Annu. Int. Conf. Adv. Comput. Commun., 2017, pp. 40–43.
[38] Z. Jiang, Z. Zheng, K. Chen, X. Luo, X. Tang, and Y. Li, “Exploring
smart contract recommendation: Towards efﬁcient blockchain develop-
ment,” IEEE Trans. Service Comput., vol. 16, no. 3, pp. 1822–1832,
May/Jun. 2023.
Yang Liu received the Master degree in 2022 from
the School of Cyber Science and Engineering, Wuhan
University, Wuhan, China, where he is currently
working toward the Ph.D. degree with the Key Labo-
ratory of Aerospace Information Security and Trusted
Computing Ministry of Education, School of Cyber
Science and Engineering.
Debiao He (Member, IEEE) received the Ph.D. de-
gree in applied mathematics from the School of Math-
ematics and Statistics, Wuhan University, Wuhan,
China, in 2009. He is currently a Professor of the
School of Cyber Science and Engineering, Wuhan
University. He has authored or coauthored more
than 100 research papers in refereed international
journals and conferences, such as IEEE TRANSAC-
TIONS ON DEPENDABLE AND SECURE COMPUTING,
IEEE TRANSACTIONS ON INFORMATION FORENSICS
AND SECURITY, and Usenix Security Symposium.
His main research interests include cryptography and information security, in
particular, cryptographic protocols. He is on the Editorial Board of several
international journals, such as ACM Distributed Ledger Technologies: Research
and Practice, Frontiers of Computer Science, and IEEE TRANSACTIONS ON
COMPUTERS.
Min Luo received the Ph.D. degree in computer
science from Wuhan University, Wuhan, China, in
2003. He is currently a Professor with the School of
Cyber Science and Engineering, Wuhan University.
He has authored or coauthored papers in international
conferences/journals, such as S&P, ACM TRETS,
IEEE SYSTEM JOURNAL and IEEE TRANSAC-
TIONS ON VEHICULAR TECHNOLOGY. His research
interests mainly include applied cryptography and
blockchain technology.
HuaqunWangreceivedtheB.S.degreeinmathemat-
ics education from the Shandong Normal University,
Jinan, China, in 1997, the M.S. degree in applied
mathematics from the East China Normal University,
Shanghai, China, in 2000, and the Ph.D. degree in
cryptography from the Nanjing University of Posts
and Telecommunications, Nanjing, China, in 2006.
He is currently a Professor of Nanjing University of
Posts and Telecommunications. His research interests
include applied cryptography, network security, and
cloud computing security.
Qin Liu received the Ph.D. degree in computer sci-
ence from Wuhan University, Wuhan, China, in 2007.
She is currently an Associate Professor with the Key
Laboratory of Aerospace Information Security and
Trusted Computing, Ministry of Education, School of
Cyber Science and Engineering, Wuhan University.
Her main research interests include IoT security and
applied cryptography.
Authorized licensed use limited to: Institute of Information EngineeringCAS. Downloaded on March 28,2026 at 14:50:44 UTC from IEEE Xplore.  Restrictions apply. 
