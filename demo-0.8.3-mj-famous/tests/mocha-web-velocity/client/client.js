wrap = function(func) {
	return function() {
		var self = this, args = arguments;
		window.setTimeout(function() {
			func.apply(self, args);
		}, 0);		
	};
}

var wrap2 = function(func) {
	try {
		func()
	} catch (err) {
		done(err);
	}
}

if (!(typeof MochaWeb === 'undefined')){
	MochaWeb.testOnly(function() {

		describe("Data Context tests", function() {

			/*
			it("should fail after 1s", function(done) {
				window.setTimeout(function() {
					// this times out (actually, no code below chai is executed)
					chai.assert.equal(true, false);
					done();

					// this passes (on mirror JS console, I see the failure)
					done();
					chai.assert.equal(true, false);
				}, 1000);
			});
			*/

			it("View with args must return parent data context", function(done) {
				FView.ready(function() {
					Template.dataContext_viewWithArgs.myData = { a: 1 };
					Template.dataContext_viewWithArgs.getData = wrap(function() {
						chai.assert.propertyVal(this, 'a', 1);
						done();
					});
					Blaze.render(Template.dataContext_viewWithArgs);
				});
			});

			it("View with no args must return same data context (#45) (1/2)", function(done) {
				FView.ready(function() {
					Template.dataContext_viewWithoutArgs.myData = { a: 1 };
					Template.dataContext_viewWithoutArgs.getData = wrap(function() {
						chai.assert.propertyVal(this, 'a', 1);
						done();
					});
					Blaze.render(Template.dataContext_viewWithoutArgs);
				});
			});

			it("View with no args must return same data context (#45) (2/2)", function(done) {
				FView.ready(function() {
					Template.dataContext_viewWithoutArgs2.myData = { a: 1 };
					Template.dataContext_viewWithoutArgs2_helper.getData = wrap(function() {
						chai.assert.propertyVal(this, 'a', 1);
						done();
					});
					Blaze.render(Template.dataContext_viewWithoutArgs2);
				});
			});

			it("If data= as dataContext if specified (#46)", function(done) {
				FView.ready(function() {
					Template.dataContext_explicit.myData = { a: 1 };
					Template.dataContext_explicit.getData = wrap(function() {
						chai.assert.propertyVal(this, 'a', 1);
						done();
					});
					Blaze.render(Template.dataContext_explicit);
				});
			});

		});

	});
}
