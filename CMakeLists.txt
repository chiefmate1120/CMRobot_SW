############################################################
# This is the main CMakeLists file
############################################################

# cmake version
cmake_minimum_required(VERSION 2.8)

# project name
project(CMRobt)

# set third party library head file path
#set(thirdPartyDir ${CMAKE_CURRENT_SOURCE_DIR}/3rdParty)
set(thirdPartyDir CACHE PATH "directory for third party libs")
include_directories(${thirdPartyDir}/Eigen)
include_directories(${thirdPartyDir}/rbdl)
include_directories(${thirdPartyDir}/tinyxml2)
include_directories(${thirdPartyDir}/CoppeliaRemoteAPI)
include_directories(${thirdPartyDir}/CoppeliaRemoteAPI/include)
include_directories(${thirdPartyDir}/nothings/stb)
include_directories(${thirdPartyDir}/bullet3/src)
include_directories(${thirdPartyDir}/bullet3/src/BulletCollision)
include_directories(${thirdPartyDir}/bullet3/src/BulletCollision/CollisionDispatch)
include_directories(${thirdPartyDir}/bullet3/src/LinearMath)
include_directories(${thirdPartyDir}/bullet3/src/BulletDynamics)


# set third party library path
link_directories(${thirdPartyDir}/rbdl/lib)
link_directories(${thirdPartyDir}/tinyxml2/lib)
link_directories(${thirdPartyDir}/CoppeliaRemoteAPI/lib)
link_directories(${thirdPartyDir}/bullet3/lib)

# add all the directories here to be compelled
add_subdirectory(lib)
add_subdirectory(app)