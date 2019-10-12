import React, { Component } from 'react'
import { connect } from 'react-redux'

export class Wallet extends Component {
    render() {
        return (
            <div>
                THIS IS THE WALLET PAGE
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Wallet)
