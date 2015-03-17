Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',
    launch: function() {
        this._loadStore();
        console.log('My first rally app!');
    },
    _loadStore: function() {
        var myStore = Ext.create('Rally.data.wsapi.Store', {
            model: 'TestCase',
            autoLoad: true,
            listeners: {
                load: function(myStore, myData, success) {
                    console.log('_loadStore: ', myStore, myData, success);
                    this._loadGrid(myStore);
                },
                scope: this
            },
            fetch: ['CreationDate', 'ObjectID', 'VersionId', 'Subscription', 'Workspace', 'Changesets', 'Description', 'Discussion', 'DisplayColor', 'Expedite', 'FormattedID', 'LastUpdateDate', 'LatestDiscussionAgeInMinutes', 'Milestones', 'Name', 'Notes', 'Owner', 'Project', 'Ready', 'RevisionHistory', 'Tags', 'Attachments', 'DefectStatus', 'DragAndDropRank', 'LastBuild', 'LastRun', 'LastVerdict', 'Method', 'Objective', 'Package', 'PostConditions', 'PreConditions', 'Priority', 'Recycled', 'Results', 'Risk', 'Steps', 'Type', 'ValidationExpectedResult', 'ValidationInput', 'WorkProduct']
        });
    },
    _loadGrid: function(myStore) {
        var searchBar = Ext.create('Ext.form.Panel', {
            title: 'Search Description',
            width: 300,
            bodyPadding: 10,
            // renderTo: this,
            items: [{
                xtype: 'textfield',
                name: 'description',
                fieldLabel: 'Description',
                itemId: 'descriptionTextField',
                allowBlank: false  // requires a non-empty value
            }],
            listeners: {
                blur: function() {
                    console.log('descriptionTextField: ', this.down('#descriptionTextField').getValue());
                    myStore.query('Description', this.down('#descriptionTextField').getValue(), true);
                },
                scope: this
            }
        });
        var myGrid = Ext.create('Rally.ui.grid.Grid', {
            store: myStore,
            columnCfgs: [
                'FormattedID', 'WorkProduct', 'Description', 'Name', 'Tags', 'Objective'
            ],
            scroll: true,
            autoScroll: true
        });
        
        this.add([searchBar, myGrid]);
        
        console.log('what is this?', this);
    },
    _onSearch: function() {
        
    }
});
