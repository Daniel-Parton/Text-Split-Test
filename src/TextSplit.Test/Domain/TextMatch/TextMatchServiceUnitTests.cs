using System;
using System.Linq;
using System.Threading.Tasks;
using TextSplit.Domain.Shared.Extensions;
using TextSplit.Domain.TextMatch;
using Xunit;

namespace TextSplit.Test.Domain.TextMatch
{
    public class TextMatchServiceUnitTests
    {
        private readonly TextMatchService _service;

        public TextMatchServiceUnitTests()
        {
            _service = new TextMatchService();
        }

        [Fact]
        public void WhenNoMatchesFound_ShouldBeAnEmptyResponse()
        {
            //Arrange and Act
            var noMatch1 = _service.Match("abc", "d");
            var noMatch2 = _service.Match("123", "45");
            var noMatch3 = _service.Match("zzzzzzz", "aaa");

            Assert.True(noMatch1.MatchCharacterPositions.IsNullOrEmpty());
            Assert.True(noMatch2.MatchCharacterPositions.IsNullOrEmpty());
            Assert.True(noMatch3.MatchCharacterPositions.IsNullOrEmpty());
        }

        [Fact]
        public void WhenTextIsNull_ShouldBeAnEmptyResponse()
        {
            //Arrange and Act
            var noMatch = _service.Match(null, "d");

            Assert.True(noMatch.MatchCharacterPositions.IsNullOrEmpty());
        }

        [Fact]
        public void WhenSubTextIsNull_ShouldBeAnEmptyResponse()
        {
            //Arrange and Act
            var noMatch = _service.Match("abc", null);

            Assert.True(noMatch.MatchCharacterPositions.IsNullOrEmpty());
        }

        [Fact]
        public void WhenSubTextHasOneMatch_ShouldShowInResponse()
        {
            //Arrange and Act
            var response1 = _service.Match("abc", "a");
            var expectedResponse1 = 0;

            var response2 = _service.Match("abc", "b");
            var expectedResponse2 = 1;
            
            var response3 = _service.Match("abc", "c");
            var expectedResponse3 = 2;

            //Assert
            Assert.True(!response1.MatchCharacterPositions.IsNullOrEmpty());
            Assert.True(response1.MatchCharacterPositions.Count() == 1);
            Assert.True(response1.MatchCharacterPositions[0] == expectedResponse1);

            Assert.True(!response2.MatchCharacterPositions.IsNullOrEmpty());
            Assert.True(response2.MatchCharacterPositions.Count() == 1);
            Assert.True(response2.MatchCharacterPositions[0] == expectedResponse2);

            Assert.True(!response3.MatchCharacterPositions.IsNullOrEmpty());
            Assert.True(response3.MatchCharacterPositions.Count() == 1);
            Assert.True(response3.MatchCharacterPositions[0] == expectedResponse3);
        }

        [Fact]
        public void WhenSubTextHasMultipleMatches_ShouldShowInResponse()
        {
            //Arrange and Act
            var response1 = _service.Match("abcanbna", "a");
            var expectedResponse1 = new[] { 0, 3, 7 };

            var response2 = _service.Match("car1234car123ar123car6978", "car");
            var expectedResponse2 = new[] { 0, 7, 18 };

            var response3 = _service.Match("car1234car123ar123car697812af4ef123a", "123");
            var expectedResponse3 = new[] { 3, 10, 15, 32 };

            //Assert
            Assert.True(!response1.MatchCharacterPositions.IsNullOrEmpty());
            Assert.True(response1.MatchCharacterPositions.Count() == expectedResponse1.Length);
            Assert.True(expectedResponse1.All(e => response1.MatchCharacterPositions.Contains(e)));

            Assert.True(!response2.MatchCharacterPositions.IsNullOrEmpty());
            Assert.True(response2.MatchCharacterPositions.Count() == expectedResponse2.Length);
            Assert.True(expectedResponse2.All(e => response2.MatchCharacterPositions.Contains(e)));

            Assert.True(!response3.MatchCharacterPositions.IsNullOrEmpty());
            Assert.True(response3.MatchCharacterPositions.Count() == expectedResponse3.Length);
            Assert.True(expectedResponse3.All(e => response3.MatchCharacterPositions.Contains(e)));
        }
    }
}