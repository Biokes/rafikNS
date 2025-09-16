// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.28;

import "forge-std/Test.sol";
import "../contracts/RafikNS.sol";

contract RafikNSTest is Test {
    RafikNS ns;
    address user1 = address(0x1);
    address user2 = address(0x2);
    address user3 = address(0x3);

    function setUp() public {
        ns = new RafikNS();
    }

    function testRegisterUniqueName() public {
        vm.prank(user1);
        ns.createName("rafik", "img1");
        assertFalse(ns.isAvailableName("rafik"));
    }

    function testRevertOnDuplicateName() public {
        vm.prank(user1);
        ns.createName("rafik", "img1");
        vm.prank(user2);
        vm.expectRevert(bytes("Name already taken"));
        ns.createName("rafik", "img2");
    }

    function testDifferentUsersCanRegisterDifferentNames() public {
        vm.prank(user1);
        ns.createName("alice", "img1");
        vm.prank(user2);
        ns.createName("bob", "img2");
        assertFalse(ns.isAvailableName("alice"));
        assertFalse(ns.isAvailableName("bob"));
    }

    function testAvailableNameBeforeRegistration() public {
        assertTrue(ns.isAvailableName("ghost"));
    }

    function testEmitCreatedNameEvent() public {
        vm.prank(user1);
        vm.expectEmit(true, true, false, true);
        emit RafikNS.CreatedName("newname", user1, "ipfs://x");
        ns.createName("newname", "ipfs://x");
    }

    function testSendMessageUpdatesBothInboxes() public {
        vm.prank(user1);
        ns.createName("alice", "img1");
        vm.prank(user2);
        ns.createName("bob", "img2");
        vm.prank(user1);
        ns.message("alice", "bob", "hi");
        RafikNS.Message[] memory inboxAlice = ns.getInbox("alice");
        RafikNS.Message[] memory inboxBob = ns.getInbox("bob");
        assertEq(inboxAlice.length, 1);
        assertEq(inboxBob.length, 1);
        assertEq(inboxAlice[0].sender, "alice");
        assertEq(inboxAlice[0].reciever, "bob");
        assertEq(inboxAlice[0].content, "hi");
        assertEq(inboxBob[0].sender, "alice");
        assertEq(inboxBob[0].reciever, "bob");
        assertEq(inboxBob[0].content, "hi");
    }

    function testMultipleMessagesBetweenUsers() public {
        vm.prank(user1);
        ns.createName("alice", "img1");
        vm.prank(user2);
        ns.createName("bob", "img2");
        vm.prank(user1);
        ns.message("alice", "bob", "msg1");
        vm.prank(user2);
        ns.message("bob", "alice", "msg2");
        RafikNS.Message[] memory inboxAlice = ns.getInbox("alice");
        RafikNS.Message[] memory inboxBob = ns.getInbox("bob");
        assertEq(inboxAlice.length, 2);
        assertEq(inboxBob.length, 2);
        assertEq(inboxAlice[0].content, "msg1");
        assertEq(inboxAlice[1].content, "msg2");
        assertEq(inboxBob[0].content, "msg1");
        assertEq(inboxBob[1].content, "msg2");
    }

    function testEmitMessagingEvent() public {
        vm.prank(user1);
        ns.createName("alice", "img1");
        vm.prank(user2);
        ns.createName("bob", "img2");
        vm.prank(user1);
        vm.expectEmit(true, true, false, true);
        emit RafikNS.Messaging("alice", "bob", "yo");
        ns.message("alice", "bob", "yo");
    }

    function testEmptyContentMessage() public {
        vm.prank(user1);
        ns.createName("alice", "img1");
        vm.prank(user2);
        ns.createName("bob", "img2");
        vm.prank(user1);
        ns.message("alice", "bob", "");
        RafikNS.Message[] memory inboxBob = ns.getInbox("bob");
        assertEq(inboxBob[0].content, "");
    }

    function testDifferentUsersInboxIsolation() public {
        vm.prank(user1);
        ns.createName("alice", "img1");
        vm.prank(user2);
        ns.createName("bob", "img2");
        vm.prank(user3);
        ns.createName("charlie", "img3");
        vm.prank(user1);
        ns.message("alice", "bob", "toBob");
        vm.prank(user2);
        ns.message("bob", "charlie", "toCharlie");
        RafikNS.Message[] memory inboxAlice = ns.getInbox("alice");
        RafikNS.Message[] memory inboxBob = ns.getInbox("bob");
        RafikNS.Message[] memory inboxCharlie = ns.getInbox("charlie");
        assertEq(inboxAlice.length, 1);
        assertEq(inboxBob.length, 2);
        assertEq(inboxCharlie.length, 1);
        assertEq(inboxAlice[0].content, "toBob");
        assertEq(inboxBob[0].content, "toBob");
        assertEq(inboxBob[1].content, "toCharlie");
        assertEq(inboxCharlie[0].content, "toCharlie");
    }
}
