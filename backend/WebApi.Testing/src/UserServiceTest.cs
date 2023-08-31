using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Moq;
using WebApi.Business.src.Dtos;
using WebApi.Business.src.Implementations;
using WebApi.Domain.src.Abstractions;
using WebApi.Domain.src.Entities;
using WebApi.WebApi.src.Configuration;
using Xunit;


namespace WebApi.Testing.src
{
    public class UserServiceTest
    {
        [Fact]
        public void Test1()
        {
            Assert.True(true);
        }

        [Fact]
        public async Task CreateOne_ValidUser_ReturnCreatedUser()
        {
            var userCreateDto = new UserCreateDto
            {
                FirstName = "abc",
                LastName = "def",
                Email = "abcdef@mail.com",
                Avater = "http://avater1",
                Password = "abcdef123"
            };

            var expectedUser = new User
            {
                Id = Guid.NewGuid(),
                FirstName = userCreateDto.FirstName,
                LastName = userCreateDto.LastName,
                Email = userCreateDto.Email,
                Avater = userCreateDto.Avater,
                Role = Role.User
            };

            var mapper = new Mapper(new MapperConfiguration(cfg => cfg.AddProfile<MapperProfile>()));

            var userRepoMock = new Mock<IUserRepo>();
            userRepoMock.Setup(repo => repo.CreateOne(It.IsAny<User>()))
                        .ReturnsAsync(expectedUser);

            var userService = new UserService(userRepoMock.Object, mapper);

            var result = await userService.CreateOne(userCreateDto);

            Assert.NotNull(result);
            Assert.Equal(expectedUser.FirstName, result.FirstName);
            Assert.Equal(expectedUser.LastName, result.LastName);
            Assert.Equal(expectedUser.Email, result.Email);
            Assert.Equal(expectedUser.Avater, result.Avater);
            Assert.Equal(expectedUser.Role, result.Role);
        }

        [Fact]
        public async Task UpdatePassword_ValidIdAndNewPassword_SuccessfullyUpdatesPassword()
        {
            // Arrange
            var userId = Guid.NewGuid();
            var newPassword = "abcd123";

            var existingUser = new User
            {
                Id = userId,
                Password = "hashedabcd123",
                Salt = new byte[32]
            };

            var mapper = new Mapper(new MapperConfiguration(cfg => cfg.AddProfile<MapperProfile>()));

            var userRepoMock = new Mock<IUserRepo>();
            userRepoMock.Setup(repo => repo.GetOneById(userId))
                        .ReturnsAsync(existingUser);

            userRepoMock.Setup(repo => repo.UpdatePassword(It.IsAny<User>()))
                        .ReturnsAsync(existingUser);

            var userService = new UserService(userRepoMock.Object, mapper);

            var result = await userService.UpdatePassword(userId, newPassword);

            Assert.NotNull(result);
            Assert.Equal(userId, result.Id);

        }

        [Fact]
        public async Task GetOneById_ValidUser_ReturnUser()
        {

            var itemId = Guid.NewGuid();
            var foundEntity = new User();
            var expectedDto = new UserReadDto();

            var userRepoMock = new Mock<IUserRepo>();
            var mapperProfile = new Mapper(new MapperConfiguration(cfg => cfg.AddProfile<MapperProfile>()));
            var mapper = new Mock<IMapper>();

            userRepoMock.Setup(repo => repo.GetOneById(itemId)).ReturnsAsync(foundEntity);
            mapper.Setup(mapper => mapper.Map<UserReadDto>(foundEntity)).Returns(expectedDto);

            var userService = new UserService(userRepoMock.Object, mapperProfile);

            var result = await userService.GetOneById(itemId);

            Assert.NotNull(result);
            Assert.Same(expectedDto, result);
        }


    }
}