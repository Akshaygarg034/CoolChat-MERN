import { Avatar } from "@chakra-ui/avatar";
import { Box, Text } from "@chakra-ui/layout";

const UserListItem = ({ handleFunction, user }) => {
  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      bg="#686D76"
      _hover={{
        background: "#686D76",
        color: "#fff",
      }}
      w="100%"
      d="flex"
      alignItems="center"
      color="#fff"
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
    >
      <Avatar
        mr={2}
        size="sm"
        cursor="pointer"
        name={user.name}
        src={user.pic}
      />
      <Box>
        <Text>{user.name}</Text>
        <Text fontSize="xs">
          <b>Email : </b>
          {user.email}
        </Text>
      </Box>
    </Box>
  );
};

export default UserListItem;
