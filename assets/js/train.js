 // ========================================== START CODING BELOW!!

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAlZvcPv4wFLlRfySuTfEKYysBnFZ4_Nao",
        authDomain: "moe87-c39d7.firebaseapp.com",
        databaseURL: "https://moe87-c39d7.firebaseio.com",
        projectId: "moe87-c39d7",
        storageBucket: "moe87-c39d7.appspot.com",
        messagingSenderId: "214735936268"
      };
    
        firebase.initializeApp(config);
    
        var dataRef = firebase.database();
    
        // Initial Values
        var name = "";
        var email = "";
        var age = 0;
        var comment = "";
    
        // Capture Button Click
        $("#add-user").on("click", function(event) {
          event.preventDefault();
    
          // YOUR TASK!!!
          // Code in the logic for storing and retrieving the most recent user.
          // Don't forget to provide initial data to your Firebase database.
          name = $("#name-input").val().trim();
          email = $("#email-input").val().trim();
          age = $("#age-input").val().trim();
          comment = $("#comment-input").val().trim();
    
          // Code for the push
          dataRef.ref().push({
    
            name: name,
            email: email,
            age: age,
            comment: comment,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
          });
        });
    
        // Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
        dataRef.ref().on("child_added", function(childSnapshot) {
    
          // Log everything that's coming out of snapshot
          console.log(childSnapshot.val().name);
          console.log(childSnapshot.val().name);
          console.log(childSnapshot.val().email);
          console.log(childSnapshot.val().age);
          console.log(childSnapshot.val().comment);
          console.log(childSnapshot.val().joinDate);
    
    
          var firstTimeConverted = moment(childSnapshot.val().age, "HH:mm").subtract(1, "years");
          var currentTime = moment();
          var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
          var tRemainder = diffTime % childSnapshot.val().comment;
          var tMinutesTillTrain = childSnapshot.val().comment - tRemainder;
          var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    
          // full list of items to the well
          $("#full-member-list").append("<tr><td> " +
            childSnapshot.val().name +
            " </td><td> " + childSnapshot.val().email +
            " </td><td> " + childSnapshot.val().comment +
            " </td><td> " + moment(nextTrain).format("hh:mm a") +
            " </td><td> " + tMinutesTillTrain +
            " </td></tr>");
    
          // Handle the errors
        }, function(errorObject) {
          console.log("Errors handled: " + errorObject.code);
        });
    
        dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
          // Change the HTML to reflect
          $("#name-display").text(snapshot.val().name);
          $("#email-display").text(snapshot.val().email);
          $("#age-display").text(snapshot.val().age);
          $("#comment-display").text(snapshot.val().comment);
        });
    